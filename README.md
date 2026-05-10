<p align="center">
  <img src="assets/README-hero.svg" alt="AI Code Safety Gate" width="900" />
</p>

# AI Code Safety Gate — Powered by PROVE BY GENESIS

**A proof-first gate for AI-generated code.**

Stop trusting AI-generated code blindly. Verify the outcome.

---

## Live Demo

**Try it now — no install required:**

| Page | What it shows |
|---|---|
| [aicodesafety.com](https://aicodesafety.com/) | Decision gate: ALLOW / REQUIRE_APPROVAL / BLOCK |
| [aicodesafety.com/bugbot-demo.html](https://aicodesafety.com/bugbot-demo.html) | Bugbot proof chain: PR → Proof → Learning → Insight → Outcome → Contract |

---

## The Problem

AI coding tools generate changes faster than teams can verify them.

A single line of AI-generated code can silently destroy a module's public interface, disable an entire code path, or introduce a structural regression that passes tests and only surfaces in production.

The risk is not that AI is wrong. The risk is that AI is fast, confident, and structurally blind to downstream impact.

Code Safety shows how AI-generated changes can be gated by deterministic proof — before they merge.

---

## What It Shows

### 1. Decision Surface

Every change gets an explicit classification before it runs:

| Decision | Meaning |
|---|---|
| `ALLOW` | Pattern is safe — safe to proceed |
| `REQUIRE_APPROVAL` | Risky pattern detected — human sign-off required |
| `BLOCK` | Destructive change stopped |

```
module.exports = null;   →  BLOCK
if (false) { ... }       →  REQUIRE_APPROVAL
function formatDate(){}  →  ALLOW
```

### 2. Bugbot Proof Chain

Bugbot is the proof layer. It does not guess — it verifies and produces a chain of evidence:

```
PR → Proof → Learning → Insight → Outcome → Contract
```

Each step is deterministic, machine-readable, and privacy-safe. No raw source code is stored. No diff content is stored. Only metadata.

---

## Why This Is Different

| Property | Standard AI code review | Code Safety / Bugbot |
|---|---|---|
| Basis | Model confidence | Deterministic proof |
| Output | Natural language | Structured JSON + human report |
| GitHub access | Often writes comments, status checks | Read-only only — no writes |
| Data stored | May store code content | Metadata only |
| False success posture | Can hallucinate safe | Explicit INCONCLUSIVE on missing evidence |
| Learning | Session memory only | Local learning archive |
| Insight | Qualitative | Signal counts, candidate rules |
| Contract validation | None | Machine-readable contract check |

**Proof-first means:** the system cannot claim ACCEPTED unless each proof step completes without error. Any gap produces INCONCLUSIVE — not a false pass.

---

## What It Is Not

- **Not a production security scanner yet.** This is a public concept demo and prototype.
- **Not a GitHub App yet.** No automatic PR comments, no status check writes, no webhook.
- **Not an auto-merge tool.** The gate informs human decision — it does not merge automatically.
- **Not a replacement for human review.** It is a verification layer that runs before human review, not instead of it.
- **Not live execution from the website.** The demo pages use sample data. Bugbot requires a local verifier environment to run against a real PR.

---

## Quick Demo

### Main page — [aicodesafety.com](https://aicodesafety.com/)

The decision gate. Four scenarios you can run in the browser:

1. Safe helper function → `ALLOW`
2. Dead-code gate `if(false)` → `REQUIRE_APPROVAL`
3. Export nullification `module.exports = null` → `BLOCK`
4. Custom input — paste your own code and see the decision

### Bugbot demo page — [aicodesafety.com/bugbot-demo.html](https://aicodesafety.com/bugbot-demo.html)

The proof chain. Walks through each step of a Bugbot run against a sample PR:

- **Proof** — GitHub read-only verification, write surface check
- **Learning** — metadata archive written, no raw code stored
- **Insight** — dominant patterns, active signals, candidate rules
- **Outcome** — trusted/blocked decision with supporting evidence
- **Contract** — machine-readable contract validation result

Each step shows the real JSON shape produced by the verifier.

---

## Repository Structure

```
index.html                               — Decision gate demo page
bugbot-demo.html                         — Bugbot proof chain demo page
examples/
  demo-safe.json                         — Safe helper function scenario
  demo-danger.json                       — Export destruction scenario
  demo-dead-code.json                    — Dead-code gate scenario
  bugbot-outcome-sample.json             — Sample Bugbot outcome JSON
  bugbot-contract-sample.json            — Sample contract validation result
  bugbot-learning-archive-sample.jsonl   — Sample learning archive (JSONL)
  bugbot-proof-summary.md                — Sample human-readable proof report
docs/
  PRODUCT_OVERVIEW.md                    — Product name, positioning, problem, solution
  BUGBOT_PROOF_CHAIN.md                  — Each proof step explained
  DIFFERENTIATION.md                     — Why proof-first matters
  DEMO_FLOW.md                           — How to evaluate the demo
  LIMITATIONS.md                         — Honest scope and boundaries
  SOCIAL_COPY.md                         — Ready-to-post social material
  diagrams/
    bugbot-proof-flow.mmd                — Mermaid: PR → proof chain → contract
    code-safety-positioning.mmd          — Mermaid: positioning map
    contract-validation-flow.mmd         — Mermaid: contract validation
assets/
  social-card-code-safety.svg            — Social card: decision gate
  social-card-bugbot.svg                 — Social card: Bugbot proof chain
scripts/
  genesis-demo.js                        — CLI demo runner
  test-demo.js                           — Test harness
```

---

## Run Locally

```bash
git clone https://github.com/aicodesafety/genesis-ai-code-safety-demo.git
cd genesis-ai-code-safety-demo
npm install
npm test
```

Run the scenarios:

```bash
npm run demo            # module.exports = null → BLOCK
npm run demo:safe       # safe helper function → ALLOW
npm run demo:danger     # module.exports = null → BLOCK
npm run demo:dead-code  # if(false) dead-code gate → REQUIRE_APPROVAL
```

---

## Status

**Prototype / public concept demo.**

The decision engine and proof chain are functional. The Bugbot verifier runs locally against real GitHub PRs in a private development environment. This public repo demonstrates the output surface — the decision types, proof JSON, and contract format.

Production packaging, GitHub App, and platform integrations are on the roadmap but not yet available.

---

## Contact

Questions, feedback, or integration interest: [hello@aicodesafety.com](mailto:hello@aicodesafety.com)

**Live demo:** [https://aicodesafety.com](https://aicodesafety.com/)

**Public repo:** [https://github.com/aicodesafety/genesis-ai-code-safety-demo](https://github.com/aicodesafety/genesis-ai-code-safety-demo)

---

## License

MIT — see [LICENSE](LICENSE)
