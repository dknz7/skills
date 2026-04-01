# Claude Code Skills Reference

A curated collection of Claude Code skills — ready-to-use, plug them into your own setup and adapt as needed. Covers UI/UX, frontend, design systems, automation, debugging, testing, browser control, image generation, SEO, and more.

---

## How to Use

Each skill lives in its own folder with a `SKILL.md` file. To use a skill:

1. Copy the skill folder into your `~/.claude/skills/` directory (or wherever your Claude Code instance loads skills from).
2. The skill's `SKILL.md` becomes available as a callable skill — trigger it via the `Skill` tool or by name depending on your setup.
3. Some skills include supporting `references/`, `resources/`, `scripts/`, or `examples/` — keep the folder structure intact.

For skills that reference external APIs or tools, check for an `.env.example` file and configure accordingly.

---

## Skills

### Design & UI

| Skill | Description |
|---|---|
| [`frontend-design`](./frontend-design/) | Production-grade UI — bold typography, intentional color, no generic AI aesthetics |
| [`brand-design`](./brand-design/) | Single source of truth for brand guidelines, design tokens, voice/tone, and tech stack |
| [`impeccable-style/`](./impeccable-style/) | Suite of 16 precision UI skills — audit, polish, adapt, animate, and more (see below) |
| [`video-to-website`](./video-to-website/) | Scroll-driven video-hero landing pages with GSAP animations and cinematic layouts |
| [`stop-scroll-builder`](./stop-scroll-builder/) | Builds Apple-style scroll-driven video animation sites from a video file |
| [`stop-scroll-prompter`](./stop-scroll-prompter/) | Generates AI image/video prompts for scroll-stopping content (product deconstruction shots, transitions) |
| [`excalidraw-visuals`](./excalidraw-visuals/) | Generates hand-drawn Excalidraw-style PNG diagrams from a description |
| [`image-enhancer`](./image-enhancer/) | Enhances image resolution, sharpness, and clarity for presentations or social |
| [`nano-banana-images`](./nano-banana-images/) | Hyper-realistic image generation via parameterized JSON prompting (Gemini / Nano Banana 2) |

### Stitch Design Suite

| Skill | Description |
|---|---|
| [`stitch-design`](./stitch-design/) | Unified Stitch entry point — prompt enhancement, DESIGN.md synthesis, screen generation |
| [`stitch-design-md`](./stitch-design-md/) | Synthesizes a Stitch project's design system into a `DESIGN.md` source-of-truth file |
| [`stitch-enhance-prompt`](./stitch-enhance-prompt/) | Transforms vague UI ideas into polished, Stitch-optimized prompts |
| [`stitch-loop`](./stitch-loop/) | Autonomous baton-passing loop for iterative website building with Stitch |
| [`stitch-react-components`](./stitch-react-components/) | Converts Stitch designs into modular Vite + React components with AST validation |
| [`stitch-remotion`](./stitch-remotion/) | Generates Remotion walkthrough videos from Stitch projects |
| [`stitch-shadcn-ui`](./stitch-shadcn-ui/) | Expert guidance for integrating shadcn/ui — discovery, install, customization, best practices |

### Impeccable Style Suite

A modular UI refinement toolkit — apply individual skills to target specific design problems.

| Skill | What It Does |
|---|---|
| [`impeccable-audit`](./impeccable-style/impeccable-audit/) | Full interface quality audit — accessibility, performance, theming, responsive |
| [`impeccable-frontend-design`](./impeccable-style/impeccable-frontend-design/) | High-quality frontend generation with strong design opinion |
| [`impeccable-adapt`](./impeccable-style/impeccable-adapt/) | Adapt a design to work across different contexts or constraints |
| [`impeccable-animate`](./impeccable-style/impeccable-animate/) | Review and add purposeful motion to interfaces |
| [`impeccable-arrange`](./impeccable-style/impeccable-arrange/) | Improve layout, spacing, and visual hierarchy |
| [`impeccable-bolder`](./impeccable-style/impeccable-bolder/) | Amplify safe or boring design decisions |
| [`impeccable-clarify`](./impeccable-style/impeccable-clarify/) | Fix unclear UX copy and confusing interface flows |
| [`impeccable-colorize`](./impeccable-style/impeccable-colorize/) | Add strategic color to flat or monochrome interfaces |
| [`impeccable-critique`](./impeccable-style/impeccable-critique/) | Evaluate design effectiveness with actionable feedback |
| [`impeccable-delight`](./impeccable-style/impeccable-delight/) | Add moments of joy, personality, and polish |
| [`impeccable-distill`](./impeccable-style/impeccable-distill/) | Strip designs to their essential, most impactful form |
| [`impeccable-extract`](./impeccable-style/impeccable-extract/) | Extract and consolidate design patterns across a codebase |
| [`impeccable-harden`](./impeccable-style/impeccable-harden/) | Improve interface resilience — edge cases, empty states, errors |
| [`impeccable-normalize`](./impeccable-style/impeccable-normalize/) | Normalize design to match a target style or system |
| [`impeccable-onboard`](./impeccable-style/impeccable-onboard/) | Design or improve onboarding flows |
| [`impeccable-optimize`](./impeccable-style/impeccable-optimize/) | Improve interface performance and perceived speed |
| [`impeccable-overdrive`](./impeccable-style/impeccable-overdrive/) | Push interfaces past safe — maximum visual impact |
| [`impeccable-polish`](./impeccable-style/impeccable-polish/) | Final quality pass before shipping |
| [`impeccable-quieter`](./impeccable-style/impeccable-quieter/) | Tone down overly bold or noisy design |
| [`impeccable-teach-impeccable`](./impeccable-style/impeccable-teach-impeccable/) | One-time setup to install the full Impeccable suite |
| [`impeccable-typeset`](./impeccable-style/impeccable-typeset/) | Improve typography — hierarchy, pairing, readability |

### Development & Engineering

| Skill | Description |
|---|---|
| [`playwright-skill`](./playwright-skill/) | Full browser automation — tests, screenshots, form fills, login flows, responsive checks |
| [`error-handling-patterns`](./error-handling-patterns/) | Error handling patterns across languages — exceptions, Result types, graceful degradation |
| [`playground`](./playground/) | Creates interactive single-file HTML playgrounds with live config controls and preview |

### Skill Engineering

| Skill | Description |
|---|---|
| [`skill-builder`](./skill-builder/) | Guides creation and optimization of Claude Code skills using official best practices |
| [`skill-creator`](./skill-creator/) | Full skill development lifecycle — write, test, eval, benchmark, improve descriptions |
| [`superpowers/`](./superpowers/) | Meta-skills for Claude Code workflows — TDD, debugging, planning, agents, git worktrees, and more (see below) |

### Superpowers Suite

Workflow discipline skills for Claude Code — enforce good patterns, not just good vibes.

| Skill | What It Does |
|---|---|
| [`using-superpowers`](./superpowers/using-superpowers/) | Entry point — how the superpowers system works, skill invocation rules |
| [`brainstorming`](./superpowers/brainstorming/) | Structured ideation before jumping into implementation |
| [`writing-plans`](./superpowers/writing-plans/) | Write scoped, executable implementation plans |
| [`executing-plans`](./superpowers/executing-plans/) | Execute a written plan step-by-step with discipline |
| [`test-driven-development`](./superpowers/test-driven-development/) | TDD workflow — red, green, refactor, no shortcuts |
| [`systematic-debugging`](./superpowers/systematic-debugging/) | Root cause first, hypothesis-driven debugging process |
| [`subagent-driven-development`](./superpowers/subagent-driven-development/) | Parallel implementation using spec, implementer, and review subagents |
| [`dispatching-parallel-agents`](./superpowers/dispatching-parallel-agents/) | Coordinate multiple agents on independent workstreams |
| [`using-git-worktrees`](./superpowers/using-git-worktrees/) | Feature branch isolation via git worktrees |
| [`requesting-code-review`](./superpowers/requesting-code-review/) | Prepare and submit code for review the right way |
| [`receiving-code-review`](./superpowers/receiving-code-review/) | Process and respond to code review feedback |
| [`finishing-a-development-branch`](./superpowers/finishing-a-development-branch/) | Pre-PR checklist — clean up, verify, and wrap a branch |
| [`verification-before-completion`](./superpowers/verification-before-completion/) | Final checks before claiming a task is done |
| [`writing-skills`](./superpowers/writing-skills/) | How to write great Claude Code skills — structure, triggers, best practices |

### Research & Content

| Skill | Description |
|---|---|
| [`notebooklm`](./notebooklm/) | Full programmatic API for Google NotebookLM — notebooks, sources, artifacts, downloads |
| [`seo-strategy`](./seo-strategy/) | Two modes: single-page optimisation or full site-wide SEO audit and strategy |

### Claude Code Setup

| Skill | Description |
|---|---|
| [`claude-automation-recommender`](./claude-automation-recommender/) | Analyse a codebase and recommend Claude Code automations — hooks, subagents, skills, MCP servers |
| [`claude-code-setup`](./claude-code-setup/) | Packaged plugin version of the automation recommender, ready for Claude Code plugin install |

---

## Notes

- Skills are snapshots. If a skill references an external API (NotebookLM, Stitch, Nano Banana), you'll need your own credentials.
- The `nano-banana-images/prompts/` folder includes example prompts — swap in your own subject matter.
