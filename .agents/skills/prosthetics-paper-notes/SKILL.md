---
name: prosthetics-paper-notes
description: Create or update structured paper entries for the Prosthetics & AI Review archive, including source-checked methods, training, results, and research links.
---

# Prosthetics paper notes

Use this skill when adding or revising a research paper in this repository. The archive is AI-maintained; the owner reviews and filters the posts. Do not present an automatically discovered paper as owner-selected or publish one without authorization. The owner's selected papers establish the collection; preserve existing entries unless the task calls for a change.

## Research and writing

Read the original paper and, when useful, its supplementary material and official code or dataset documentation. Verify titles, authors, dates, methods, numerical results, and links against primary sources. Summarize in your own words; do not copy the paper's abstract. Give a reader enough detail to assess the method without inventing unavailable facts.

For every entry, fill these `details` fields:

- `abstract`: What problem does the paper address, and what does it propose?
- `architecture`: Describe the model or actual method, including relevant components, input/output, and architecture sizes where reported. Briefly explain specialized named models and what each does in this paper, or link to their original papers; do not assume readers know every named architecture. Familiar general terms such as MLP need no extra explanation. Say explicitly when no deep learning model is proposed.
- `training`: Identify training and evaluation data, sample sizes, relevant splits, preprocessing, and meaningful training settings where reported. Distinguish training data from study participants and test data.
- `loss`: Give the training loss or objective, including weights when reported. Distinguish training losses from evaluation metrics, agency constraints, and other similarly named quantities. Mark as not applicable or not reported, as appropriate.
- `metrics`: Provide useful numerical results, units, baselines, uncertainty, experimental cohort and protocol, and limitations needed to interpret the comparison. Do not conflate test conditions or present an offline benchmark as clinical evidence.
- `availability`: Explain the availability of code and data. If a public resource was not identified, say so rather than claiming it does not exist.

The entry's `url` must link to the paper. Add available official code and dataset links in `resources` as objects with `label` and `url`. When citing named components, put their original paper links in `method_references` using the same object format; they appear alongside the architecture description. Check that links lead to the relevant resources. Include a concise `notes` summary, tags, authors, venue, and year. Preserve owner-supplied context where consistent with the source, and report unresolved discrepancies rather than filling gaps with guesses.

## Repository workflow

1. Inspect the current `data/papers.json`, `README.md`, and rendering code before editing; preserve the existing schema and unrelated content. Add `details` to each new or revised entry and order papers as requested. Search existing titles and URLs to avoid duplicates.
2. The website renders the six fields above and the paper and `resources` links. If a change introduces a new schema field, update rendering, search behavior as appropriate, and the README template. Preserve compatibility with existing entries.
3. Validate JSON, links, relevant JavaScript syntax, and the page's displayed content. If publication is authorized, commit and push the scoped changes, then verify the live GitHub Pages build and data. The site requests fresh archive data; when needed, use a fresh page URL or a hard refresh to check browser caching.

The owner may also request research or a draft without publication. In that case, keep the requested scope and distinguish a draft from a published entry.
