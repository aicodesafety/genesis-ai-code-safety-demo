# Differentiation — Why Proof-First Matters

This document explains what separates Code Safety / Bugbot from generic AI-assisted code review, without claiming perfection or naming competitors.

---

## Standard AI Code Review

Most AI code review tools work like this:

1. Read the pull request diff
2. Send the diff to a language model
3. The model returns a natural language summary and list of issues
4. The output is posted as a PR comment

This is useful. It is also not proof.

**The core problem:** A language model can say "this looks safe" and be wrong. It has no mechanism for producing evidence. Its output is always a confident-sounding opinion — even when the confidence is unjustified.

This creates a false success posture: the tool ran, it found nothing, therefore it is safe. But "found nothing" is not the same as "proven safe."

---

## Code Safety / Bugbot

Code Safety takes a different approach: **proof-first, not vibes-first.**

Instead of asking a model to evaluate code quality, the system runs a deterministic chain of verifiable steps and produces machine-readable evidence at each step.

The difference in practice:

| Question | Standard AI review | Code Safety / Bugbot |
|---|---|---|
| "Is this PR safe?" | Model says: probably yes | Chain says: here is what was verified |
| "How do you know?" | Confidence score | JSON evidence at each step |
| "What if you're wrong?" | No mechanism | INCONCLUSIVE — not a false pass |
| "What was stored?" | Depends on provider | Metadata only — provably safe |
| "Did you write to GitHub?" | Often yes (comments) | Never — read-only only |
| "Can I audit the output?" | Natural language | Machine-readable JSON |
| "Does it learn?" | Session memory | Local learning archive |

---

## Why Read-Only Matters

Most code review integrations write to GitHub: PR comments, review submissions, status check updates. This creates several problems:

- **Noise.** Every PR gets a comment whether or not it needs human attention.
- **Trust erosion.** Developers start ignoring automated comments.
- **Incomplete proof.** Writing a comment does not prove the underlying analysis was correct.
- **Permission creep.** Writing to GitHub requires broader OAuth scopes.

Bugbot is read-only by design. It does not post comments. It does not update status checks. It does not create PRs. Every run includes an explicit write surface proof: before-state and after-state of comments, reviews, and check runs — to prove nothing changed.

Read-only means the verifier cannot contaminate the repository it is inspecting.

---

## Why Machine-Readable Contracts Matter

Natural language summaries are not auditable. You cannot write a test that checks whether a model's prose response is correct.

Code Safety output is structured JSON with a declared schema (`bugbot.module.contract.v1`). This means:

- **Pipelines can consume it.** Any tool that reads JSON can parse the outcome.
- **Tests can verify it.** Contract validation is a deterministic pass/fail check.
- **Diffs are visible.** When output changes between runs, the diff is exact.
- **Humans and machines agree on the format.** The JSON and the human report derive from the same data.

The contract is not a cryptographic signature. It is a machine-readable shape guarantee: if the output conforms to the contract and all flags are correct, the run is provably within scope.

---

## Why No False-Success Posture Matters

False success is the most dangerous failure mode in safety tooling: the tool ran, it returned "safe," and it was wrong.

Code Safety eliminates this posture through explicit INCONCLUSIVE status:

- Missing archive → INCONCLUSIVE
- Malformed records → INCONCLUSIVE
- Invalid records → INCONCLUSIVE
- Any proof step fails → INCONCLUSIVE
- GitHub writes detected → BLOCKED

INCONCLUSIVE is not a failure of the tool. It is the correct response to insufficient evidence. It is the mechanism that prevents the system from claiming ACCEPTED when it has not earned it.

A system that never returns INCONCLUSIVE is not a safety tool. It is a confidence machine.

---

## Why a Learning Archive Matters

Generic AI review has no memory. Each run is independent. If the same class of problem appears in ten consecutive PRs, the tool has no way to notice.

Bugbot writes a privacy-safe learning record for every run. The archive accumulates metadata over time: which surfaces are touched most often, which signals appear repeatedly, which patterns correlate with blocked decisions.

The insight runner reads this archive and derives deterministic patterns. No AI inference — just counting and threshold logic. Candidate rules are suggested based on signal frequency, not model intuition.

Over time, the archive becomes a local institutional memory of what this team's PRs actually look like — and where the repeated risks are.

---

## Summary

Code Safety / Bugbot is differentiated on five properties:

1. **Proof-first** — every decision is backed by evidence, not confidence
2. **Read-only** — no GitHub writes, no contamination, explicit write surface proof
3. **Machine-readable contracts** — structured JSON, auditable, testable
4. **No false-success posture** — INCONCLUSIVE is a first-class output
5. **Learning archive** — local, privacy-safe, deterministic insight derivation

None of these properties require AI inference. They require discipline.

---

*AI Code Safety Gate · Powered by PROVE BY GENESIS*
