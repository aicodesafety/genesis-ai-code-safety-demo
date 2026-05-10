# Limitations — Honest Scope

This document states clearly what Code Safety and Bugbot do not do, what the demo does and does not show, and what is planned but not yet built.

Honest limitations are not a weakness. They are the proof that this project is not overpromising.

---

## The Demo Is Static

The live demo at [aicodesafety.com](https://aicodesafety.com/) and [aicodesafety.com/bugbot-demo.html](https://aicodesafety.com/bugbot-demo.html) uses sample data.

- The decision gate runs in the browser using a client-side pattern classifier
- The Bugbot demo page renders pre-computed sample JSON
- No live GitHub API calls are made from the website
- The PR reference in the Bugbot demo (`example-org/example-repo/pull/42`) is fictional

**What this means for evaluation:**
The demo shows the output surface — the decision types, proof JSON shapes, and contract format. It does not show live execution against a real PR.

---

## No Live GitHub Execution from the Website

Running Bugbot against a real GitHub PR requires a local verifier environment:
- A machine with Node.js and the GitHub CLI (`gh`) installed
- GitHub authentication scoped to read-only PR access
- The Bugbot verifier running locally

There is no hosted execution. There is no API endpoint that accepts a PR URL and returns a Bugbot result. This is intentional — live execution has infrastructure costs and security considerations that are not yet resolved.

---

## No GitHub App

Bugbot is not yet a GitHub App.

It does not:
- Install into a GitHub repository
- Listen for PR events via webhook
- Post PR comments automatically
- Update PR status checks
- Trigger on push or merge

These capabilities are on the roadmap. They are not available today.

---

## No Automatic Merge Gate

The gate informs human decision — it does not merge or block merges automatically.

The output (`ALLOW`, `REQUIRE_APPROVAL`, `BLOCK`) is a classification. Acting on that classification is a human decision. There is no enforcement layer that prevents a merge when the decision is `BLOCK`.

---

## Sample Data Only

All data in `examples/` is:
- Sanitized
- Fictional
- Not derived from any real user's codebase
- Not representative of any specific repository or organization

The learning archive sample (`bugbot-learning-archive-sample.jsonl`) contains one record. A real archive would accumulate one record per PR run over time.

---

## Not a Production Security Engine

Code Safety is a prototype and public concept demo.

It has not been:
- Security-audited
- Load-tested
- Integrated into a production CI/CD pipeline
- Reviewed by a security engineering team

It should not be used as the sole safety control for a production system. It is designed to demonstrate the proof concept and invite technical feedback.

---

## Not a Replacement for Human Review

The gate is designed to run before human review, not instead of it.

`ALLOW` means the pattern is safe based on the classifier's rules. It does not mean a human should skip reading the diff. It does not mean the code is correct. It means the specific destructive patterns the classifier knows about were not found.

`BLOCK` means a known-dangerous pattern was detected. It does not mean the PR is malicious. It means human judgment is required before proceeding.

---

## Local Archive Only

The learning archive is a local JSONL file. It is:
- Append-only
- Single-machine
- Not synced to any remote storage
- Not shared across repositories or team members

There is no dashboard, no aggregate view, no cross-team learning. Each local environment has its own archive.

---

## Candidate Rules Are Suggestions Only

The insight runner derives candidate rules from signal frequency in the learning archive. These are strings in the output — they are never injected into the rule engine. No automatic rule mutation occurs.

Promoting a candidate rule to an enforced rule requires a human decision and a deliberate code change.

---

## No Cryptographic Signing

The contract validation (`bugbot.module.contract.v1`) checks output shape and safety flags. It does not cryptographically sign the output. It does not prove chain of custody. It does not prevent tampering with the output JSON after the fact.

Contract validation proves the output conforms to the declared schema and that safety flags are correct — nothing more.

---

## Planned but Not Yet Built

| Capability | Status |
|---|---|
| GitHub App with webhook listener | Planned — not built |
| PR status check integration | Planned — not built |
| Hosted Bugbot execution endpoint | Planned — not built |
| Multi-repo learning archive | Planned — not built |
| Team dashboard | Planned — not built |
| Rule promotion workflow | Planned — not built |
| Cryptographic output signing | Under consideration |
| Security audit | Not yet performed |

---

*AI Code Safety Gate · Powered by PROVE BY GENESIS · hello@aicodesafety.com*
