#!/usr/bin/env python3
"""Add a personally selected paper to the local archive."""
import argparse
import json
from pathlib import Path
from urllib.parse import urlparse

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--title', required=True)
parser.add_argument('--url', required=True, help='Original paper URL (http or https)')
parser.add_argument('--year', default='')
parser.add_argument('--authors', default='')
parser.add_argument('--venue', default='')
parser.add_argument('--notes', default='', help='Your short description or reason for including it')
parser.add_argument('--tags', default='', help='Comma-separated topics')
parser.add_argument('--archive', type=Path, default=Path(__file__).resolve().parents[1] / 'data' / 'papers.json')
a = parser.parse_args()
if not a.title.strip() or urlparse(a.url).scheme not in ('http', 'https') or not urlparse(a.url).netloc:
    parser.error('A non-empty title and a valid http(s) URL are required')
data = json.loads(a.archive.read_text(encoding='utf-8'))
if any(p['url'].rstrip('/') == a.url.rstrip('/') for p in data['papers']):
    parser.error('That URL is already in the archive')
paper = {'title': a.title.strip(), 'url': a.url.strip(), 'year': a.year.strip(), 'authors': a.authors.strip(),
         'venue': a.venue.strip(), 'notes': a.notes.strip(), 'tags': [x.strip() for x in a.tags.split(',') if x.strip()]}
data['papers'].insert(0, paper)
a.archive.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('Added:', paper['title'])
