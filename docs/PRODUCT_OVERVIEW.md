# Product Overview — AI Code Safety Gate

## Product Name

**AI Code Safety Gate — Powered by PROVE BY GENESIS**

Short handle: **Code Safety**

---

## Public Positioning

A proof-first gate for AI-generated code.

Every AI-generated change is classified before it runs.
Every classification is backed by deterministic, machine-readable proof.
No silent passes. No hallucinated safety.

---

## The Problem

AI coding tools (Cursor, Copilot, and others) have become part of production engineering workflows.
They generate changes fast. That speed is the value — and also the risk.

The gap is not that AI is wrong. The gap is that AI is confident and structurally blind to downstream impact.

Patterns that slip through undetected:

- `module.exports = null` — silently destroys a module's public interface
- `if (false) { ... }` — disables an entire code path with no warning
- Export rewrites that look like refactors but break downstream consumers
- Structural changes that pass all tests and only surface in production

Teams that move fast with AI assume that review will catch these changes.
Review does not always catch them — especially at volume.

---

## The Solution

Code Safety sits between AI output and the merge decision.

It evaluates every change and returns one of three decisions:

| Decision | Meaning |
|---|---|
| `ALLOW` | Pattern is safe — proceed |
| `REQUIRE_APPROVAL` | Risky pattern detected — human sign-off required |
| `BLOCK` | Destructive change — do not merge |

Beyond the decision gate, **Bugbot** provides a full proof chain:

```
PR → Proof → Learning → Insight → Outcome → Contract
```

Every step is deterministic. Every output is machine-readable JSON.
No raw code is stored. No diffs are stored. Only privacy-safe metadata.

---

## Target User

**Developers using AI coding assistants**
You ship AI-generated code regularly. You have seen it break something unexpected.
You want a safety layer that does not slow you down.

**Engineering leads building AI-assisted teams**
You want your team to use AI at speed — but not at the cost of production stability.
You need a control layer with an auditable trail.

**AI tooling builders**
You are building on top of LLMs and need a deterministic gate before execution.
You need machine-readable output that integrates with your pipeline.

---

## Current State

- Public concept demo: live at [aicodesafety.com](https://aicodesafety.com/)
- Decision gate: functional, browser-runnable
- Bugbot proof chain: functional, runs locally against real GitHub PRs
- Learning archive: local JSONL, privacy-safe, append-only
- Insight runner: deterministic pattern analysis from archive metadata
- Contract validator: machine-readable contract check on Bugbot output
- All Bugbot components: unit-tested, exit-code correct, injection-safe

---

## What Is Not Included (Public Repo)

- Private GENESIS core (risk engine, pattern classifier, execution control)
- Live GitHub execution from the website
- GitHub App, webhook, or CI integration
- Database or cloud storage

The public repo demonstrates the output surface only. GENESIS core is always private.

---

## Next Logical Evolution

1. GitHub App — attach Bugbot as a PR status check
2. Webhook listener — trigger proof chain on PR open/sync
3. Dashboard — aggregate learning archive across repos
4. Rule promotion — promote candidate rules to enforced rules after validation
5. Team configuration — per-repo trust thresholds and approval routing

None of these are available yet. This is a prototype.

---

*AI Code Safety Gate · Powered by PROVE BY GENESIS · hello@aicodesafety.com*
