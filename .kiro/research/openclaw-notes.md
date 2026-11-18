# OpenClaw Research Notes

## Saved: 2026-04-09

### Official Docs Key Findings

**Skill locations (precedence order, highest first):**

1. `<workspace>/skills/`
2. `<workspace>/.agents/skills/`
3. `~/.agents/skills/`
4. `~/.openclaw/skills/`
5. Bundled skills
6. `skills.load.extraDirs`

**SKILL.md format:**

```
---
name: skill-name (required, 1-64 chars, lowercase alphanumeric)
description: ... (required, max 1024 chars)
license: MIT
compatibility: opencode
user-invocable: true|false (default: true)
disable-model-invocation: true|false (default: false)
command-dispatch: tool (optional)
command-tool: tool-name
metadata: {"openclaw": {"requires": {"bins": [], "env": [], "config": []}, "primaryEnv": "API_KEY", "emoji": "🔧", "os": ["darwin","linux","win32"]}}
---
```

**Token impact:**

- Base overhead (≥1 skill): 195 chars
- Per skill: 97 chars + name + description + location lengths
- ~24 tokens per skill (rough estimate)

**ClawHub registry:** https://clawhub.ai

**CLI commands:**

```
openclaw skills search "query"
openclaw skills install <slug>
openclaw skills update --all
openclaw skills list
openclaw skills info <name>
openclaw skills check
```

### ClawSkills.sh Stats (as of 2026-04-09)

- 5,147 skills indexed
- 30 categories
- 2,917 contributors
- Filtered out: 7,060 (spam, duplicates, malicious, etc.)

### Top Skills by Downloads

1. agent-browser (thesethrose) - 137.7k downloads
2. gog/Google Workspace (steipete) - 117.1k
3. auto-updater (maximeprades) - 46.8k
4. api-gateway (byungkyu) - 45.7k
5. baidu-search (ide-rea) - 45.2k

### Top Categories

1. Coding Agents & IDEs: 1,160
2. Web & Frontend Development: 903
3. DevOps & Cloud: 375
4. Search & Research: 342
5. Browser & Automation: 306

### Key Integrations Available

GitHub, X/Twitter, Telegram, YouTube, Docker, Anthropic, Instagram, Gmail, Playwright, LinkedIn, Discord, TikTok, Reddit, Slack, Google, OpenRouter, ElevenLabs, Google Calendar, Notion, Amazon, WhatsApp, Cloudflare, Supabase, Claude Code, Cursor, Vercel, Hugging Face, Perplexity, Shopify, Obsidian, Azure, Brave, Google Analytics, Spotify, Ahrefs, Airtable, Google Sheets, Grok, Figma

### Security Notes (from official docs)

- Treat third-party skills as untrusted code
- Prefer sandboxed runs for untrusted inputs
- `skills.entries.*.env` and `skills.entries.*.apiKey` inject into HOST process
- Gateway-backed installs run dangerous-code scanner before executing
- `openclaw skills install` does NOT use the scanner

### Permission System (openclaw.json)

```json
{
  "agents": {
    "defaults": { "skills": ["github", "weather"] },
    "list": [
      { "id": "writer" },
      { "id": "docs", "skills": ["docs-search"] },
      { "id": "locked-down", "skills": [] }
    ]
  }
}
```

### Notable Skills for Article

- **mattpocock/skills** series: grill-me, write-a-prd, prd-to-issues, tdd, improve-codebase-architecture
- **steipete** skills: gog (Google Workspace), apple-notes, apple-reminders, blogwatcher, 1password
- **thesethrose** skills: agent-browser (most downloaded), clawdbot-security-check
- **Security scanners**: clawdefender, yoder-skill-auditor, security-skill-scanner, arc-security-audit
- **Memory systems**: elite-longterm-memory, neural-memory, agent-memory, persistent-memory

### Interesting Patterns

- Many "agent social networks": Moltbook, AgentGram, BotWorld, ClawGang, etc.
- Agent commerce: x402 payments, USDC, Lightning Network integration
- Self-improvement skills: self-evolve, agent-evolver, mulch
- Security audit skills are very popular (many competing ones)
- IoT/Smart home: Home Assistant, IKEA, Tesla, Govee, etc.
