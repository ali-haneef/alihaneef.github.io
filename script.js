const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  siteNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const projectCards = document.querySelectorAll('.project-card');
const liveProjects = [
  { index: 1, url: 'https://allcleardandc.com/', title: 'All Clear Diagnostics & Calibration', description: 'On-site OEM-compliant ADAS calibration, diagnostics, programming and repair support for collision centers.' },
  { index: 3, url: 'https://dynamicautosol.com/', title: 'Dynamic Automotive Solutions', description: 'OEM tools and mobile ADAS recalibration systems with expert support for automotive professionals.' }
];

liveProjects.forEach(({ index, url, title, description }) => {
  const card = projectCards[index];
  if (!card) return;
  card.querySelector('h3').textContent = title;
  card.querySelector('.project-info > p').textContent = description;
  const link = document.createElement('a');
  link.className = 'text-link live-link';
  link.href = url;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = 'View live website ↗';
  card.querySelector('.project-info').append(link);
});

const liveCard = document.createElement('article');
liveCard.className = 'project-card';
liveCard.innerHTML = `<div class="project-art maverick-art"><span class="art-label">MAVERICK<br><b>DIAGNOSTICS</b></span><div class="maverick-panel"><small>OEM TOOLING / SUPPORT</small><strong>Master vehicle<br>diagnostics.</strong><span>SHOP NOW ↗</span></div><span class="maverick-word">UK · WORLDWIDE SUPPORT</span></div><div class="project-info"><div><span class="project-number">06 / 06</span><h3>Maverick Diagnostics</h3></div><span class="arrow-button">↗</span><p>Online automotive diagnostics shop offering OEM tools, aftermarket equipment, technical support and training.</p><div class="tags"><span>E-commerce</span><span>OEM tools</span><span>Support</span></div><a class="text-link live-link" href="https://www.maverickdiagnostics.com/" target="_blank" rel="noreferrer">View live website ↗</a></div>`;
document.querySelector('.project-grid')?.append(liveCard);
const maverickArt = liveCard.querySelector('.maverick-art');
Object.assign(maverickArt.style, { background: '#d6e0d9', color: '#14231d', padding: '25px' });
Object.assign(liveCard.querySelector('.maverick-panel').style, { position: 'absolute', left: '25px', right: '25px', bottom: '30px', background: '#1d382c', color: '#e9f5e7', padding: '22px' });
