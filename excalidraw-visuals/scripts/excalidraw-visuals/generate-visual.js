/**
 * Generate an Excalidraw-style visual using Google Gemini (direct API)
 *
 * Usage:
 *   node generate-visual.js "<prompt>" <output-file.png> [aspect-ratio] [--input <image> ...]
 *
 * Aspect ratios: 16:9 (default), 1:1, 4:5
 * --input: one or more reference images (local paths, up to 8)
 * Requires GEMINI_API_KEY in .env file at project root
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_ROOT = path.resolve(__dirname, '../..');

// ---------------------------------------------------------------------------
// Load .env
// ---------------------------------------------------------------------------
const envPath = path.join(PROJECT_ROOT, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex > 0) {
        const key = trimmed.slice(0, eqIndex);
        const value = trimmed.slice(eqIndex + 1);
        process.env[key] = value;
      }
    }
  }
}

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error('Error: GEMINI_API_KEY not set. Add it to your .env file.');
  console.error('Get your key at: https://aistudio.google.com/apikey');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Parse arguments
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const PROMPT = args[0];
const OUTPUT_FILE = args[1];

if (!PROMPT || !OUTPUT_FILE) {
  console.error('Usage: node generate-visual.js "<prompt>" <output-file.png> [aspect-ratio] [--input <image> ...]');
  process.exit(1);
}

let ASPECT_RATIO = '16:9';
const inputImages = [];

for (let i = 2; i < args.length; i++) {
  if (args[i] === '--input' && args[i + 1]) {
    i++;
    while (i < args.length && !args[i].startsWith('--')) {
      inputImages.push(args[i]);
      i++;
    }
    i--;
  } else if (!args[i].startsWith('--')) {
    ASPECT_RATIO = args[i];
  }
}

const VALID_RATIOS = ['16:9', '1:1', '4:5'];
if (!VALID_RATIOS.includes(ASPECT_RATIO)) {
  console.error(`Error: Invalid aspect ratio "${ASPECT_RATIO}". Use: ${VALID_RATIOS.join(', ')}`);
  process.exit(1);
}

if (inputImages.length > 8) {
  console.error('Error: Maximum 8 input images allowed.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeMap = {
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
  };
  return mimeMap[ext] || 'image/png';
}

function loadImageAsBase64(filePath) {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Input image not found: ${absolutePath}`);
  }
  return {
    data: fs.readFileSync(absolutePath).toString('base64'),
    mimeType: getMimeType(filePath),
  };
}

function httpsPost(hostname, apiPath, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname,
      path: apiPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: Buffer.concat(chunks).toString('utf-8'),
        });
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const mode = inputImages.length > 0 ? 'image-to-image' : 'text-to-image';
  console.log(`Generating Excalidraw visual (${mode}, ${ASPECT_RATIO})...`);
  console.log(`Prompt length: ${PROMPT.length} chars`);

  // Build the contents array.
  // Reference images go first as inlineData parts, then the text prompt.
  const parts = [];

  if (inputImages.length > 0) {
    console.log(`Loading ${inputImages.length} reference image(s)...`);
    for (const imgPath of inputImages) {
      const { data, mimeType } = loadImageAsBase64(imgPath);
      parts.push({ inlineData: { mimeType, data } });
      console.log(`  Loaded: ${path.basename(imgPath)}`);
    }
  }

  parts.push({ text: PROMPT });

  const requestBody = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ['IMAGE', 'TEXT'],
      imageConfig: {
        aspectRatio: ASPECT_RATIO,
      },
    },
  };

  const MODEL = 'gemini-2.0-flash-preview-image-generation';
  const apiPath = `/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  console.log('Sending request to Google Gemini API...');

  const response = await httpsPost(
    'generativelanguage.googleapis.com',
    apiPath,
    requestBody
  );

  if (response.status !== 200) {
    console.error(`Error: API returned status ${response.status}`);
    console.error(response.body);
    process.exit(1);
  }

  const responseData = JSON.parse(response.body);
  const parts_out = responseData?.candidates?.[0]?.content?.parts || [];

  // Find the image part in the response
  const imagePart = parts_out.find((p) => p.inlineData?.mimeType?.startsWith('image/'));

  if (!imagePart) {
    console.error('Error: No image returned from API.');
    // Print any text response for debugging
    const textPart = parts_out.find((p) => p.text);
    if (textPart) console.error('Model response:', textPart.text);
    console.error('Full response:', response.body);
    process.exit(1);
  }

  // Ensure output directory exists
  const outputDir = path.dirname(path.resolve(OUTPUT_FILE));
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, Buffer.from(imagePart.inlineData.data, 'base64'));
  console.log(`Saved to: ${OUTPUT_FILE}`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err.message || err);
  process.exit(1);
});
