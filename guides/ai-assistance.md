---
title: AI-Assisted Development
---

# AI-Assisted Development

The SuperApp SDK includes an AI skill that provides contextual help with the SDK's API, integration patterns, and best practices.

## Setup

The skill files are included in the SDK package at `skills/` (`SKILL.md` plus its `references/` folder). To use it:

### Cursor IDE

Copy the skill to your Cursor skills directory:

```bash
mkdir -p ~/.cursor/skills/superapp-sdk
cp -r node_modules/@grabjs/superapp-sdk/skills/. ~/.cursor/skills/superapp-sdk/
```

Restart Cursor after copying.

### Claude Desktop

Copy the skill to Claude's skills directory:

```bash
mkdir -p ~/.claude/skills/grabjs-superapp-sdk
cp -r node_modules/@grabjs/superapp-sdk/skills/. ~/.claude/skills/grabjs-superapp-sdk/
```

Restart Claude Desktop after copying.

## Usage

Once the skill is installed, mention the SDK when asking for help:

```text
"Show me how to scan a QR code using @grabjs/superapp-sdk"
```

```text
"Implement OAuth authorization with PKCE for this miniapp"
```

```text
"Handle a 403 permission error when calling LocationModule"
```

```text
"Set up the container UI with a custom title and hide the back button"
```

```text
"Subscribe to location updates and handle the response stream"
```

The AI will provide SDK-specific answers with accurate method names, types, and patterns.
