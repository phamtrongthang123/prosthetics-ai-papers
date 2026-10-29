const list = document.querySelector('#papers');
const count = document.querySelector('#count');
const search = document.querySelector('#search');
const topic = document.querySelector('#topic');
const more = document.querySelector('#more');
const moreWrap = document.querySelector('#more-wrap');
const featuredTitle = document.querySelector('#intro-title');
const featuredMeta = document.querySelector('#featured-meta');
const featuredSummary = document.querySelector('#featured-summary');
const featuredLink = document.querySelector('#featured-link');
let papers = [], limit = 12;
const element = (name, text, className) => { const e = document.createElement(name); if (text) e.textContent = text; if (className) e.className = className; return e; };
function render() {
  const q = search.value.trim().toLocaleLowerCase();
  const filtered = papers.filter(p => (!topic.value || (p.tags || []).includes(topic.value)) && (!q || [p.title, p.authors, p.venue, p.notes, ...Object.values(p.details || {}), ...(p.tags || [])].filter(Boolean).join(' ').toLocaleLowerCase().includes(q)));
  count.textContent = `${filtered.length} ${filtered.length === 1 ? 'PAPER' : 'PAPERS'}${q || topic.value ? ' FOUND' : ' IN THE COLLECTION'}`;
  list.replaceChildren();
  if (!filtered.length) {
    const empty = element('div', '', 'empty');
    empty.append(element('h3', papers.length ? 'No papers found.' : 'The first edition is taking shape.'), element('p', papers.length ? 'Try a different search or topic.' : 'The archive is ready for its first personally selected papers.'));
    list.append(empty);
  }
  filtered.slice(0, limit).forEach(p => {
    const article = element('article', '', 'paper');
    if (p === papers[0]) article.id = 'featured-paper';
    const meta = element('div', [p.year, p.venue].filter(Boolean).join(' · '), 'paper-meta');
    const body = element('div'); const title = element('h3'); const link = element('a', p.title);
    link.href = p.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; title.append(link); body.append(title);
    if (p.authors) body.append(element('p', p.authors));
    if (p.details) {
      const fields = [['abstract', 'Problem & proposal'], ['architecture', 'Architecture'], ['training', 'Data & training'], ['loss', 'Loss & objective'], ['metrics', 'Results & metrics'], ['availability', 'Availability']];
      const details = element('div', '', 'paper-details');
      fields.forEach(([key, label]) => {
        if (!p.details[key]) return;
        const section = element('section', '', 'detail-section');
        section.append(element('h4', label), element('p', p.details[key]));
        if (key === 'architecture' && p.method_references?.length) {
          const refs = element('div', '', 'method-references');
          refs.append(element('span', 'Method papers: '));
          p.method_references.forEach((ref, i) => {
            if (i) refs.append(document.createTextNode(' · '));
            const link = element('a', ref.label);
            link.href = ref.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
            refs.append(link);
          });
          section.append(refs);
        }
        details.append(section);
      });
      body.append(details);
    } else if (p.notes) body.append(element('p', p.notes));
    {
      const resources = element('div', '', 'paper-resources');
      [{ label: 'Read paper', url: p.url }, ...(p.resources || [])].forEach(resource => {
        const link = element('a', `${resource.label} ↗`);
        link.href = resource.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
        resources.append(link);
      });
      body.append(resources);
    }
    article.append(meta, body, element('div', (p.tags || []).join(' / '), 'paper-tags')); list.append(article);
  });
  moreWrap.hidden = filtered.length <= limit;
}
search.addEventListener('input', () => { limit = 12; render(); });
topic.addEventListener('change', () => { limit = 12; render(); });
more.addEventListener('click', () => { limit += 12; render(); });
fetch('data/papers.json', { cache: 'no-store' }).then(response => { if (!response.ok) throw new Error('Archive unavailable'); return response.json(); }).then(data => {
  if (!Array.isArray(data.papers)) throw new Error('Invalid archive');
  papers = data.papers;
  if (papers.length) {
    const featured = papers[0];
    featuredTitle.textContent = featured.title;
    featuredMeta.textContent = [featured.authors, featured.venue, featured.year].filter(Boolean).join(' · ');
    featuredSummary.textContent = featured.notes || featured.details?.abstract || '';
    featuredLink.href = '#featured-paper';
    featuredLink.textContent = 'READ THE RESEARCH NOTE ↓';
  } else {
    featuredTitle.textContent = 'The research collection is taking shape.';
  }
  const tags = [...new Set(papers.flatMap(p => p.tags || []))].sort((a,b) => a.localeCompare(b));
  tags.forEach(tag => { const option = element('option', tag); option.value = tag; topic.append(option); }); render();
}).catch(() => { featuredTitle.textContent = 'Featured research is temporarily unavailable.'; count.textContent = 'ARCHIVE UNAVAILABLE'; list.replaceChildren(element('p', 'The archive could not be loaded. Please try again later.', 'empty')); });
