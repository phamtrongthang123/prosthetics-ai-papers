# The Prosthetics & AI Review

A personally curated research archive, published with GitHub Pages. The archive starts empty: papers appear only when the owner chooses and adds them. Search and topic filters run in the browser; the data lives in `data/papers.json` and is kept separate from the design.

## Add a paper

From a local clone, run Python 3 with the paper you chose:

```sh
python3 scripts/add_paper.py \
  --title 'Paper title' \
  --url 'https://example.org/paper' \
  --year '2026' \
  --authors 'Author names' \
  --venue 'Journal or conference' \
  --notes 'Your note about the paper.' \
  --tags 'Myoelectric control, Machine learning'
```

Only `--title` and `--url` are required. The new entry is placed first. Review `data/papers.json`, then commit and push it to `main`; GitHub Pages publishes the update. Alternatively, edit that file in GitHub's web interface: add an object inside `papers` following this example, retaining valid JSON:

```json
{
  "title": "Paper title",
  "url": "https://example.org/paper",
  "year": "2026",
  "authors": "Author names",
  "venue": "Journal or conference",
  "notes": "Your note about the paper.",
  "tags": ["Myoelectric control", "Machine learning"]
}
```

Use a comma between objects, but not after the final object. The site does not import papers automatically. Its JSON file works well for a modest collection; a larger collection can later move to an indexed backend while preserving these fields and the public design.

## Preview locally

Run `python3 -m http.server 8000` in this directory and visit `http://localhost:8000/`. The browser needs HTTP to load the archive data.
