const icon = (name) => {
  const paths = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2"/>',
    bookmark: '<path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4z"/>',
    chart: '<path d="M3 3v18h18M8 15l4-4 4 3 5-7"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 13h4"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>'
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;
};

const jobs = window.PORTAL_DATA.jobs;
const app = document.querySelector('#app');
const page = document.body.dataset.page;
const inPages = window.location.pathname.includes('/pages/');
const route = (name) => {
  if (name === 'home') return '/';
  return `${inPages ? '' : 'pages/'}${name}.html`;
};
const demoApplications = [
  { id: 'app-01', student: 'Aanya Kapoor', initials: 'AK', title: 'Frontend Developer Intern', company: 'Northstar Labs', status: 'Interview', date: 'Oct 6, 2026', school: 'National Institute of Design', skills: 'HTML, CSS, JavaScript' },
  { id: 'app-02', student: 'Aanya Kapoor', initials: 'AK', title: 'Product Design Intern', company: 'Goodfolk Studio', status: 'In review', date: 'Oct 2, 2026', school: 'National Institute of Design', skills: 'Figma, Prototyping, Research' },
  { id: 'app-03', student: 'Aanya Kapoor', initials: 'AK', title: 'Data Analyst Intern', company: 'Verde Mobility', status: 'Submitted', date: 'Sep 29, 2026', school: 'National Institute of Design', skills: 'SQL, Excel, Python' }
];
const companyJobs = [jobs[0], jobs[1], jobs[3]];

function renderJobCard(job) {
  return `<a class="job-card" href="${route('job-detail')}?id=${encodeURIComponent(job.id)}">
    <span class="company-logo ${job.color}">${job.initials}</span>
    <span>
      <h3>${job.title}</h3><span class="company-name">${job.company}</span>
      <span class="job-meta"><span>${icon('pin')}${job.location}</span><span>${icon('briefcase')}${job.mode}</span><span>${icon('clock')}${job.stipend}</span></span>
    </span>
    <span class="job-type ${job.kind === 'Internship' ? 'internship' : ''}">${job.kind}</span>
  </a>`;
}

function renderHome() {
  app.innerHTML = `
    <header class="topbar">
      <a class="brand" href="${route('home')}" aria-label="Launchpad home"><span class="brand-mark">${icon('arrow')}</span>launchpad</a>
      <nav class="topnav" aria-label="Main navigation"><a class="active" href="${route('home')}">Overview</a><a href="${route('jobs')}">Find opportunities</a><a href="${route('company-dashboard')}">For companies</a></nav>
      <div class="top-actions"><a class="secondary-button header-access" href="${route('student-login')}">Log in</a><a class="primary-button header-access" href="${route('student-signup')}">Sign up</a></div>
    </header>
    <div class="layout">
      <aside class="sidebar">
        <p class="side-label">Student workspace</p>
        <nav class="side-nav" aria-label="Student workspace">
          <a class="side-link active" href="${route('home')}">${icon('grid')}Overview</a>
          <a class="side-link" href="${route('jobs')}">${icon('search')}Find jobs</a>
          <a class="side-link" href="${route('internships')}">${icon('briefcase')}Internships</a>
          <a class="side-link" href="${route('applications')}">${icon('bookmark')}My applications</a>
          <a class="side-link" href="${route('skill-gap')}">${icon('chart')}Skills & learning</a>
          <a class="side-link" href="${route('profile')}">${icon('user')}My profile</a>
        </nav>
        <p class="side-label">For your career</p>
        <nav class="side-nav"><a class="side-link" href="${route('learning')}">${icon('book')}Learning paths</a><a class="side-link" href="${route('student-login')}">${icon('user')}Student log in</a><a class="side-link" href="${route('student-signup')}">${icon('user')}Create student account</a><a class="side-link" href="${route('company-login')}">${icon('briefcase')}Company log in</a><a class="side-link" href="${route('company-signup')}">${icon('briefcase')}Company sign up</a></nav>
        <div class="side-note"><span>✳</span><h3>Your next step</h3><p>A focused profile helps the right opportunities find you.</p></div>
      </aside>
      <main class="main">
        <section class="welcome-hero">
          <div class="hero-copy"><p class="hero-kicker">GOOD MORNING, AANYA <span>·</span> ${new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</p><h1>Find your place in what’s next.</h1><p>Thoughtful internships and first roles, all in one place. Your next step starts with a search.</p><a class="hero-link" href="${route('jobs')}">Explore opportunities ${icon('arrow')}</a></div>
          <div class="hero-image" role="img" aria-label="Early-career colleagues sharing ideas around a table"><div class="hero-image-caption"><span>ROOM TO GROW</span><strong>Start with what makes you curious.</strong></div></div>
        </section>
        <form class="search-panel" id="job-search" role="search">
          <label class="search-field">${icon('search')}<input id="search-keyword" type="search" placeholder="Job title, skill, or company" aria-label="Job title, skill, or company"></label>
          <label class="search-field">${icon('pin')}<input id="search-location" type="search" placeholder="City or remote" aria-label="City or remote"></label>
          <button class="primary-button" type="submit">Search opportunities ${icon('arrow')}</button>
        </form>
        <section class="stats-grid" aria-label="Application overview">
          <article class="stat-card"><span class="stat-icon">${icon('briefcase')}</span><span><strong>06</strong><span>Applications sent</span></span></article>
          <article class="stat-card"><span class="stat-icon orange">${icon('bell')}</span><span><strong>02</strong><span>Awaiting a response</span></span></article>
          <article class="stat-card"><span class="stat-icon yellow">${icon('target')}</span><span><strong>72%</strong><span>Profile complete</span></span></article>
        </section>
        <p class="demo-caption stats-caption">Illustrative dashboard metrics only. No student profile or application data is stored.</p>
        <div class="content-grid">
          <section>
            <div class="section-heading"><div><h2>Picked for you</h2><p>Recent roles that match your interests</p></div><a class="text-link" href="${route('jobs')}">Browse all ${icon('arrow')}</a></div>
            <div class="job-list" id="featured-jobs">${jobs.slice(0, 4).map(renderJobCard).join('')}</div>
            <p class="demo-caption">Sample listings for this frontend demo. Applications are not submitted or saved.</p>
          </section>
          <aside class="right-rail">
            <section class="rail-panel"><h2>Complete your profile</h2><div class="progress-row"><span>Almost there</span><strong>72%</strong></div><div class="progress-track"><div class="progress-value"></div></div><ul class="checklist"><li><span class="check">✓</span>Basic details</li><li><span class="check">✓</span>Education</li><li><span class="check pending">•</span>Add your projects</li><li><span class="check pending">•</span>Upload a resume</li></ul><a class="secondary-button rail-action" href="${route('profile')}">Edit my profile ${icon('arrow')}</a></section>
            <a class="rail-panel photo-panel" href="${route('learning')}"><p>Small steps. Strong starts.<span>Explore a learning path ${icon('arrow')}</span></p></a>
          </aside>
        </div>
      </main>
    </div>`;

  document.querySelector('#job-search').addEventListener('submit', (event) => {
    event.preventDefault();
    const keyword = document.querySelector('#search-keyword').value.trim().toLowerCase();
    const location = document.querySelector('#search-location').value.trim().toLowerCase();
    const matches = jobs.filter((job) => {
      const text = `${job.title} ${job.company} ${job.category} ${job.description}`.toLowerCase();
      return (!keyword || text.includes(keyword)) && (!location || job.location.toLowerCase().includes(location) || job.mode.toLowerCase().includes(location));
    });
    const list = document.querySelector('#featured-jobs');
    list.innerHTML = matches.length ? matches.map(renderJobCard).join('') : '<div class="empty-state">No sample listings match those filters. Try another title or location.</div>';
  });
  document.querySelector('[aria-label="Notifications"]').addEventListener('click', () => showNotice('Notifications are a visual preview. There are no saved application updates.'));
}

function showNotice(message, parent = app) {
  let notice = parent.querySelector('.inline-notice');
  if (!notice) {
    notice = document.createElement('p');
    notice.className = 'inline-notice';
    notice.setAttribute('role', 'status');
    parent.append(notice);
  }
  notice.textContent = message;
}

function shell(title, description, content, active = '', company = false) {
  app.innerHTML = `
    <header class="topbar"><a class="brand" href="${route('home')}" aria-label="Launchpad home"><span class="brand-mark">${icon('arrow')}</span>launchpad</a>
      <nav class="topnav" aria-label="Main navigation"><a href="${route('home')}">Student</a><a href="${route('jobs')}">Opportunities</a><a class="${company ? 'active' : ''}" href="${route('company-dashboard')}">For companies</a></nav>
      <div class="top-actions"><a class="secondary-button header-access" href="${route(company ? 'company-login' : 'student-login')}">Log in</a><button class="icon-button mobile-menu" type="button" aria-label="Open student dashboard" onclick="location.href='${route('home')}'">${icon('grid')}</button></div>
    </header>
    <main class="page-main"><div class="page-heading"><div><p class="eyebrow">${company ? 'Company workspace' : 'Student workspace'}</p><h1>${title}</h1><p>${description}</p></div><span class="preview-label">FRONTEND PREVIEW · SAMPLE DATA</span></div>${content}</main>`;
  document.querySelectorAll('[data-nav="' + active + '"]').forEach((link) => link.classList.add('active'));
}

function renderListings(internshipsOnly = false) {
  const displayed = internshipsOnly ? jobs.filter((job) => job.kind === 'Internship') : jobs;
  const content = `<form class="filter-bar" id="listing-search"><label class="form-field"><span>Search roles</span><input id="listing-keyword" type="search" placeholder="Title, company, or skill"></label><label class="form-field"><span>Location</span><input id="listing-location" type="search" placeholder="City or remote"></label><label class="form-field"><span>Work type</span><select id="listing-mode"><option value="">All work types</option><option>Remote</option><option>Hybrid</option><option>On-site</option></select></label><button class="primary-button" type="submit">${icon('search')} Search</button></form>
    <div class="listing-subhead"><span id="listing-count">${displayed.length} sample opportunities</span><a class="text-link" href="${route(internshipsOnly ? 'jobs' : 'internships')}">View ${internshipsOnly ? 'all jobs' : 'internships'} ${icon('arrow')}</a></div>
    <div class="job-list listing-grid" id="listing-results">${displayed.map(renderJobCard).join('')}</div><p class="demo-caption">These example opportunities are static frontend content. Applying is a preview only.</p>`;
  shell(internshipsOnly ? 'Internships worth exploring' : 'Find your next opportunity', internshipsOnly ? 'Build experience with teams ready to help you grow.' : 'Search early-career jobs and internships from thoughtful teams.', content, internshipsOnly ? 'internships' : 'jobs');
  document.querySelector('#listing-search').addEventListener('submit', (event) => {
    event.preventDefault();
    const keyword = document.querySelector('#listing-keyword').value.trim().toLowerCase();
    const location = document.querySelector('#listing-location').value.trim().toLowerCase();
    const mode = document.querySelector('#listing-mode').value.toLowerCase();
    const matches = displayed.filter((job) => `${job.title} ${job.company} ${job.category} ${job.description}`.toLowerCase().includes(keyword) && (!location || job.location.toLowerCase().includes(location) || job.mode.toLowerCase().includes(location)) && (!mode || job.mode.toLowerCase() === mode));
    document.querySelector('#listing-count').textContent = `${matches.length} sample ${matches.length === 1 ? 'opportunity' : 'opportunities'}`;
    document.querySelector('#listing-results').innerHTML = matches.length ? matches.map(renderJobCard).join('') : '<div class="empty-state">No sample roles match these filters. Try broadening your search.</div>';
  });
}

function renderJobDetail() {
  const job = jobs.find((item) => item.id === new URLSearchParams(location.search).get('id')) || jobs[0];
  const content = `<a class="back-link" href="${route('jobs')}">← Back to opportunities</a><div class="detail-layout"><article class="detail-panel"><div class="detail-company"><span class="company-logo ${job.color}">${job.initials}</span><div><span class="company-name">${job.company}</span><h2>${job.title}</h2></div></div><div class="detail-tags"><span>${job.kind}</span><span>${job.mode}</span><span>${job.duration}</span></div><h3>About this opportunity</h3><p class="body-copy">${job.description}</p><h3>What you’ll bring</h3><ul class="detail-list"><li>Curiosity and a willingness to learn through feedback.</li><li>Clear communication and care for collaborative work.</li><li>Relevant coursework, projects, or growing portfolio.</li></ul><p class="demo-caption">Posted ${job.posted} · Example listing for the frontend preview</p></article><aside class="detail-panel apply-panel"><p class="eyebrow">${job.category}</p><h2>${job.stipend}</h2><p class="body-copy">${job.location}<br>${job.mode} · ${job.duration}</p><button class="primary-button full-button" id="apply-button">Apply for this role ${icon('arrow')}</button><p class="demo-caption">Preview only. No application will be sent or stored.</p><div id="apply-feedback" aria-live="polite"></div></aside></div>`;
  shell('Opportunity details', 'A closer look at a role that could be your next step.', content, 'jobs');
  document.querySelector('#apply-button').addEventListener('click', () => showNotice('This is a frontend preview. Sign-in and application submission are not connected yet.', document.querySelector('#apply-feedback')));
}

function statusClass(status) {
  return status.toLowerCase().replaceAll(' ', '-');
}

function renderApplications(companyView = false) {
  const rows = demoApplications.map((item) => `<article class="application-row"><span class="student-avatar">${item.initials}</span><div class="application-main">${companyView ? `<a href="${route('student-details')}?id=${item.id}"><strong>${item.student}</strong></a>` : `<strong>${item.title}</strong>`}<span>${companyView ? item.title : item.company} · ${item.date}</span></div><span class="status-pill ${statusClass(item.status)}" data-status-label>${item.status}</span>${companyView ? `<select class="status-select" aria-label="Update status for ${item.student} application"><option ${item.status === 'Submitted' ? 'selected' : ''}>Submitted</option><option ${item.status === 'In review' ? 'selected' : ''}>In review</option><option ${item.status === 'Interview' ? 'selected' : ''}>Interview</option><option ${item.status === 'Offer' ? 'selected' : ''}>Offer</option><option ${item.status === 'Not selected' ? 'selected' : ''}>Not selected</option></select>` : ''}</article>`).join('');
  const content = `<div class="notice-banner">${companyView ? 'Changing a status updates this preview only. Nothing is saved.' : 'Example application activity for layout preview. No applications are stored.'}</div><div class="application-list">${rows}</div>`;
  shell(companyView ? 'Application inbox' : 'My applications', companyView ? 'Review candidate details and preview status updates.' : 'Keep track of the opportunities you have explored.', companyView ? content : `${content}<a class="primary-button browse-button" href="${route('jobs')}">Explore opportunities ${icon('arrow')}</a>`, companyView ? 'company-applications' : 'applications', companyView);
  if (companyView) document.querySelectorAll('.status-select').forEach((select) => select.addEventListener('change', () => {
    const pill = select.closest('.application-row').querySelector('[data-status-label]');
    pill.textContent = select.value;
    pill.className = `status-pill ${statusClass(select.value)}`;
    showNotice('Preview updated on this page only; the change is not saved.');
  }));
}

function renderProfile() {
  const content = `<form class="profile-form" id="profile-form">
    <div class="form-section-title"><span class="student-avatar large" id="profile-avatar">?</span><div><h2 id="profile-heading">Your profile</h2><p id="profile-subheading">Update your details and preview your changes before saving.</p></div></div>
    <div class="form-grid">
      <label class="form-field"><span>Full name</span><input id="profile-name" name="name" required minlength="2" maxlength="120" autocomplete="name"></label>
      <label class="form-field"><span>Email</span><input id="profile-email" name="email" type="email" readonly aria-describedby="profile-email-help"><small id="profile-email-help">Email is linked to your account and cannot be changed here.</small></label>
      <label class="form-field full-span"><span>Education</span><input id="profile-education" name="education" maxlength="180" placeholder="e.g. MCA, Bharati Vidyapeeth"></label>
      <label class="form-field"><span>Graduation year</span><select id="profile-year" name="graduation_year"><option value="">Select year</option>${Array.from({length: 9}, (_, i) => 2026 + i).map(year => `<option value="${year}">${year}</option>`).join('')}</select></label>
      <label class="form-field full-span"><span>About</span><textarea id="profile-about" name="about" rows="4" maxlength="2000" placeholder="Tell employers a little about yourself..."></textarea></label>
      <label class="form-field full-span"><span>Skills</span><input id="profile-skills" name="skills" maxlength="500" placeholder="e.g. Python, Java, SQL, Communication"></label>
    </div>
    <div class="profile-actions"><button class="secondary-button" type="button" id="preview-profile">Preview profile update ${icon('arrow')}</button><button class="primary-button" type="button" id="save-profile">Save changes ${icon('arrow')}</button></div>
    <p class="demo-caption" id="profile-message" role="status">Your saved profile details will appear here after loading.</p>
    <section id="profile-preview" class="rail-panel" hidden aria-live="polite"><p class="eyebrow">PROFILE PREVIEW</p><h2 id="preview-name"></h2><p id="preview-email"></p><p id="preview-education"></p><p id="preview-year"></p><p id="preview-about"></p><p><strong>Skills:</strong> <span id="preview-skills"></span></p></section>
  </form>`;
  shell('Your profile', 'A clear snapshot of your interests, education, and growing skills.', content, 'profile');
  const form = document.querySelector('#profile-form');
  const message = document.querySelector('#profile-message');
  const fields = {
    name: document.querySelector('#profile-name'),
    email: document.querySelector('#profile-email'),
    education: document.querySelector('#profile-education'),
    graduation_year: document.querySelector('#profile-year'),
    about: document.querySelector('#profile-about'),
    skills: document.querySelector('#profile-skills')
  };
  const initials = name => (name || '?').trim().split(/\s+/).slice(0, 2).map(part => part.charAt(0).toUpperCase()).join('') || '?';
  const getValues = () => Object.fromEntries(Object.entries(fields).filter(([key]) => key !== 'email').map(([key, field]) => [key, field.value.trim()]));
  const preview = () => {
    const data = getValues();
    document.querySelector('#preview-name').textContent = data.name || 'Your name';
    document.querySelector('#preview-email').textContent = fields.email.value;
    document.querySelector('#preview-education').textContent = data.education || 'Education not added yet';
    document.querySelector('#preview-year').textContent = data.graduation_year ? `Graduation year: ${data.graduation_year}` : 'Graduation year not selected';
    document.querySelector('#preview-about').textContent = data.about || 'No about section added yet.';
    document.querySelector('#preview-skills').textContent = data.skills || 'No skills added yet';
    document.querySelector('#profile-preview').hidden = false;
    message.textContent = 'Preview updated below. Click Save changes to store these details in your account.';
  };
  document.querySelector('#preview-profile').addEventListener('click', preview);
  document.querySelector('#save-profile').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    const button = document.querySelector('#save-profile');
    button.disabled = true;
    message.textContent = 'Saving your profile…';
    try {
      const response = await fetch('/api/profile', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(getValues())});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not save your profile.');
      const user = result.profile;
      fields.name.value = user.name || '';
      fields.email.value = user.email || '';
      fields.education.value = user.education || '';
      fields.graduation_year.value = user.graduation_year || '';
      fields.about.value = user.about || '';
      fields.skills.value = user.skills || '';
      document.querySelector('#profile-heading').textContent = user.name || 'Your profile';
      document.querySelector('#profile-avatar').textContent = initials(user.name);
      preview();
      message.textContent = 'Your profile has been saved to MySQL successfully.';
      showNotice('Profile changes saved successfully.');
    } catch (error) {
      message.textContent = error.message;
      if (error.message.toLowerCase().includes('log in')) showNotice('Please log in to update your profile.');
    } finally {
      button.disabled = false;
    }
  });
  (async () => {
    try {
      const response = await fetch('/api/profile');
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Please log in to view and edit your profile.');
      const user = result.profile;
      fields.name.value = user.name || '';
      fields.email.value = user.email || '';
      fields.education.value = user.education || '';
      fields.graduation_year.value = user.graduation_year || '';
      fields.about.value = user.about || '';
      fields.skills.value = user.skills || '';
      document.querySelector('#profile-heading').textContent = user.name || 'Your profile';
      document.querySelector('#profile-avatar').textContent = initials(user.name);
      document.querySelector('#profile-subheading').textContent = `${user.role === 'company' ? 'Company' : 'Student'} profile · Edit the fields below and preview your changes.`;
      message.textContent = 'Your saved profile is loaded. Edit any field, preview it, then save your changes.';
    } catch (error) {
      message.textContent = error.message + ' Open the site through Flask and log in first.';
      form.querySelectorAll('input, textarea, select, button').forEach(control => control.disabled = true);
      showNotice('Please log in before editing your profile.');
    }
  })();
}
function renderLearning(skillGap = false) {
  const cards = `<div class="learning-grid"><article class="learning-card"><span class="learning-number">01</span><p class="eyebrow">Recommended · 4 weeks</p><h2>JavaScript foundations</h2><p>Build confidence with modern JavaScript, DOM events, and small interactive projects.</p><a class="text-link" href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript" target="_blank" rel="noreferrer">Explore free guide ${icon('arrow')}</a></article><article class="learning-card"><span class="learning-number">02</span><p class="eyebrow">Recommended · 3 weeks</p><h2>Designing for everyone</h2><p>Practice accessibility basics and inclusive patterns with hands-on design exercises.</p><a class="text-link" href="https://www.w3.org/WAI/fundamentals/accessibility-intro/" target="_blank" rel="noreferrer">Explore free guide ${icon('arrow')}</a></article><article class="learning-card"><span class="learning-number">03</span><p class="eyebrow">Recommended · 2 weeks</p><h2>Portfolio storytelling</h2><p>Shape a project case study around the decisions, tradeoffs, and outcomes that matter.</p><a class="text-link" href="${route('profile')}">Review your profile ${icon('arrow')}</a></article></div>`;
  const content = `${skillGap ? `<section class="skill-summary"><div><p class="eyebrow">Your target role</p><h2>Frontend Developer</h2><p>Based on a sample early-career role from Northstar Labs.</p></div><div class="skill-meter"><strong>3 of 5</strong><span>skills to strengthen</span></div></section><div class="skill-list"><div><span>HTML & CSS</span><span class="skill-tag matched">Comfortable</span></div><div><span>JavaScript</span><span class="skill-tag growing">Keep building</span></div><div><span>Accessibility</span><span class="skill-tag growing">Practice next</span></div><div><span>Git & collaboration</span><span class="skill-tag matched">Comfortable</span></div><div><span>Testing fundamentals</span><span class="skill-tag growing">Practice next</span></div></div><p class="demo-caption">This illustrative skill comparison is not an assessment of your actual skills.</p>` : ''}<div class="section-heading learning-heading"><div><h2>${skillGap ? 'Recommendations for your next step' : 'A little learning goes a long way'}</h2><p>Free starting points selected for this frontend preview.</p></div></div>${cards}`;
  shell(skillGap ? 'Skills to grow into your next role' : 'Learning paths', skillGap ? 'Explore practical ideas to build confidence in the skills employers mention.' : 'Short, focused ways to keep your momentum going.', content, skillGap ? 'skill-gap' : 'learning');
}

function renderAuthPage(kind) {
  const company = kind.startsWith('company-');
  const signup = kind.endsWith('signup');
  const audience = company ? 'company' : 'student';
  const title = signup ? 'Create your account' : 'Welcome back';
  const introTitle = company
    ? (signup ? 'Build your team with emerging talent.' : 'Welcome back to your hiring workspace.')
    : (signup ? 'Your next opportunity starts here.' : 'Make your next move count.');
  const introText = company
    ? 'Create a company profile to showcase roles and connect with early-career candidates.'
    : 'Explore internships, first roles, and learning resources to support your career journey.';
  const fields = signup
    ? `<label class="form-field full-span"><span>${company ? 'Company name' : 'Full name'}</span><input name="name" autocomplete="${company ? 'organization' : 'name'}" placeholder="${company ? 'Your organization' : 'Your full name'}" required minlength="2"></label>
       <label class="form-field full-span"><span>Email address</span><input name="email" type="email" autocomplete="email" placeholder="you@example.com" required></label>
       <label class="form-field full-span"><span>Create password</span><input name="password" type="password" autocomplete="new-password" placeholder="At least 8 characters" required minlength="8"></label>
       <label class="form-field full-span"><span>Confirm password</span><input name="confirmPassword" type="password" autocomplete="new-password" placeholder="Re-enter your password" required minlength="8"></label>`
    : `<label class="form-field full-span"><span>Email address</span><input name="email" type="email" autocomplete="username" placeholder="you@example.com" required></label>
       <label class="form-field full-span"><span>Password</span><input name="password" type="password" autocomplete="current-password" placeholder="Enter your password" required minlength="8"></label>
       <div class="auth-extra"><label><input type="checkbox" name="remember"> Remember me</label><span>Demo form</span></div>`;
  const content = `<section class="access-layout auth-layout">
    <div class="access-intro"><p class="eyebrow">${company ? 'FOR COMPANIES' : 'FOR STUDENTS'}</p><h2>${introTitle}</h2><p>${introText}</p><ul class="auth-benefits"><li>✓ Discover relevant opportunities</li><li>✓ Keep career steps organized</li><li>✓ Build skills for what comes next</li></ul></div>
    <div class="access-panel"><div class="auth-brandline"><span class="brand-mark">${icon('arrow')}</span><span>launchpad</span></div><h2>${title}</h2><p class="form-hint">${signup ? 'Create your Launchpad account with your details below.' : 'Enter your registered email and password to continue.'}</p>
      <form id="auth-form" class="form-grid" novalidate>${fields}<button class="primary-button full-span" type="submit">${signup ? 'Create account' : 'Log in'} ${icon('arrow')}</button></form>
      <div id="auth-feedback" aria-live="polite"></div>
      <p class="auth-switch">${signup ? 'Already have an account?' : 'New to Launchpad?'} <a href="${route(`${audience}-${signup ? 'login' : 'signup'}`)}">${signup ? 'Log in' : 'Create an account'}</a></p>
      <p class="demo-caption auth-demo-note">Your account is stored in the connected database. Use the same account type when logging in.</p>
    </div></section>`;
  shell(`${company ? 'Company' : 'Student'} ${signup ? 'sign up' : 'log in'}`, 'Account access interface for the Launchpad career portal.', content, '', company);
  document.querySelector('#auth-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const feedback = document.querySelector('#auth-feedback');
    const password = form.elements.password.value;
    if (signup && password !== form.elements.confirmPassword.value) {
      showNotice('The passwords do not match. Please check them and try again.', feedback);
      form.elements.confirmPassword.focus();
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const originalButtonText = button.textContent.trim();
    button.disabled = true;
    button.textContent = signup ? 'Creating account…' : 'Signing in…';

    try {
      const response = await fetch(signup ? '/api/signup' : '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          name: signup ? form.elements.name.value.trim() : undefined,
          email: form.elements.email.value.trim(),
          password,
          role: audience
        })
      });
      const result = await response.json();
      if (!response.ok) {
        showNotice(result.error || 'We could not complete that request. Please try again.', feedback);
        return;
      }
      showNotice(result.message || (signup ? 'Account created successfully.' : 'Login successful.'), feedback);
      window.location.href = result.redirect || (audience === 'company' ? '/pages/company-dashboard.html' : '/');
    } catch (error) {
      showNotice('Could not reach the Launchpad server. Start the Flask app and try again.', feedback);
    } finally {
      button.disabled = false;
      button.textContent = originalButtonText;
    }
  });
}

function renderCompanyDashboard() {
  const content = `<div class="stats-grid company-stats"><article class="stat-card"><span class="stat-icon">${icon('briefcase')}</span><span><strong>03</strong><span>Example open roles</span></span></article><article class="stat-card"><span class="stat-icon orange">${icon('user')}</span><span><strong>12</strong><span>Example applications</span></span></article><article class="stat-card"><span class="stat-icon yellow">${icon('clock')}</span><span><strong>04</strong><span>Need your review</span></span></article></div><div class="section-heading"><div><h2>Your example roles</h2><p>Preview role management and candidate activity.</p></div><a class="primary-button" href="${route('post-job')}">＋ Post a job</a></div><div class="job-list">${companyJobs.map((job) => `<div class="job-card"><span class="company-logo ${job.color}">${job.initials}</span><span><h3>${job.title}</h3><span class="company-name">${job.kind} · ${job.mode} · ${job.location}</span><span class="job-meta"><span>${job.duration}</span><span>${job.stipend}</span></span></span><a class="text-link" href="${route('manage-jobs')}">Manage ${icon('arrow')}</a></div>`).join('')}</div><div class="company-actions"><a class="secondary-button" href="${route('company-applications')}">Review example applications ${icon('arrow')}</a><a class="secondary-button" href="${route('manage-jobs')}">Manage roles ${icon('arrow')}</a></div><p class="demo-caption">This is a sample company dashboard. No company account or job data is stored.</p>`;
  shell('Good morning, Northstar', 'A clear view of your early-career hiring activity.', content, 'company-dashboard', true);
}

function renderPostJob() {
  const content = `<form class="profile-form demo-form"><div class="form-grid"><label class="form-field full-span"><span>Role title</span><input required placeholder="e.g. Product Design Intern"></label><label class="form-field"><span>Employment type</span><select><option>Internship</option><option>Full-time</option><option>Part-time</option></select></label><label class="form-field"><span>Work arrangement</span><select><option>Hybrid</option><option>Remote</option><option>On-site</option></select></label><label class="form-field"><span>Location</span><input required placeholder="City, country"></label><label class="form-field"><span>Compensation</span><input placeholder="e.g. ₹20,000 / month"></label><label class="form-field full-span"><span>Role description</span><textarea rows="6" required placeholder="What will the person work on? What will help them thrive?"></textarea></label></div><button class="primary-button" type="submit">Preview job post ${icon('arrow')}</button><p class="demo-caption">Preview only. This role will not be posted or saved.</p></form>`;
  shell('Create a role preview', 'Draft a clear, welcoming opportunity for early-career talent.', content, 'post-job', true);
  document.querySelector('.demo-form').addEventListener('submit', (event) => { event.preventDefault(); showNotice('Preview only. Your job post was not published or saved.'); });
}

function renderManageJobs() {
  const content = `<div class="notice-banner">Example company roles. Actions here are for interface preview and do not change stored data.</div><div class="job-list">${companyJobs.map((job, index) => `<article class="manage-row"><span class="company-logo ${job.color}">${job.initials}</span><div class="application-main"><strong>${job.title}</strong><span>${job.kind} · ${job.location} · ${index === 1 ? 'Paused' : 'Accepting applications'}</span></div><a class="text-link" href="${route('company-applications')}">Applications ${icon('arrow')}</a><button class="icon-button preview-toggle" type="button" aria-label="Preview pause control for ${job.title}" title="Preview pause control">⋯</button></article>`).join('')}</div><a class="primary-button browse-button" href="${route('post-job')}">＋ Create a role preview</a>`;
  shell('Manage your roles', 'Keep track of postings and candidate activity.', content, 'manage-jobs', true);
  document.querySelectorAll('.preview-toggle').forEach((button) => button.addEventListener('click', () => showNotice('Role management is a visual preview. Changes are not saved.')));
}

function renderStudentDetails() {
  const candidate = demoApplications.find((item) => item.id === new URLSearchParams(location.search).get('id')) || demoApplications[0];
  const content = `<a class="back-link" href="${route('company-applications')}">← Back to applications</a><section class="detail-panel candidate-panel"><div class="form-section-title"><span class="student-avatar large">${candidate.initials}</span><div><p class="eyebrow">Example candidate</p><h2>${candidate.student}</h2><p>${candidate.school} · Class of 2027</p></div></div><div class="candidate-info"><div><span>Applied for</span><strong>${candidate.title}</strong></div><div><span>Application status</span><strong>${candidate.status} · ${candidate.date}</strong></div><div><span>Skills</span><strong>${candidate.skills}</strong></div></div><a class="secondary-button" href="${route('company-applications')}">Return to applications ${icon('arrow')}</a><p class="demo-caption">Example candidate details for preview only. No real student information is shown.</p></section>`;
  shell('Candidate overview', 'Example application details for a company-side preview.', content, 'company-applications', true);
}

if (page === 'home') renderHome();
else if (page === 'jobs') renderListings();
else if (page === 'internships') renderListings(true);
else if (page === 'job-detail') renderJobDetail();
else if (page === 'applications') renderApplications();
else if (page === 'skill-gap') renderLearning(true);
else if (page === 'learning') renderLearning();
else if (page === 'profile') renderProfile();
else if (page === 'student-access' || page === 'student-login') renderAuthPage('student-login');
else if (page === 'student-signup') renderAuthPage('student-signup');
else if (page === 'company-access' || page === 'company-login') renderAuthPage('company-login');
else if (page === 'company-signup') renderAuthPage('company-signup');
else if (page === 'company-dashboard') renderCompanyDashboard();
else if (page === 'post-job') renderPostJob();
else if (page === 'manage-jobs') renderManageJobs();
else if (page === 'company-applications') renderApplications(true);
else if (page === 'student-details') renderStudentDetails();
else renderHome();


// Update the navbar from the server-side Flask session.
// This runs after the page is rendered, so it works on the home page and inner pages.
async function refreshAuthHeader() {
  const actions = document.querySelector('.top-actions');
  if (!actions) return;

  try {
    const response = await fetch('/api/me', {
      credentials: 'same-origin',
      cache: 'no-store',
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error(`Session check failed (${response.status})`);

    const result = await response.json();

    // Only show login/signup when the server confirms there is no active session.
    if (!result.authenticated || !result.user) {
      actions.innerHTML = page === 'home'
        ? `<a class="secondary-button header-access" href="${route('student-login')}">Log in</a><a class="primary-button header-access" href="${route('student-signup')}">Sign up</a>`
        : `<a class="secondary-button header-access" href="${route(page.startsWith('company') ? 'company-login' : 'student-login')}">Log in</a>`;
      return;
    }

    const displayName = String(result.user.name || 'User').trim() || 'User';
    const initial = displayName.charAt(0).toUpperCase();
    actions.replaceChildren();

    const identity = document.createElement('div');
    identity.className = 'auth-identity';
    identity.setAttribute('aria-label', `Logged in as ${displayName}`);

    const avatar = document.createElement('span');
    avatar.className = 'auth-avatar';
    avatar.textContent = initial;
    avatar.setAttribute('aria-hidden', 'true');

    const greeting = document.createElement('span');
    greeting.className = 'auth-greeting';
    greeting.textContent = `Hi, ${displayName}`;
    identity.append(avatar, greeting);

    const logout = document.createElement('button');
    logout.type = 'button';
    logout.className = 'secondary-button header-access';
    logout.textContent = 'Log out';
    logout.addEventListener('click', async () => {
      logout.disabled = true;
      try {
        const logoutResponse = await fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin',
          cache: 'no-store'
        });
        if (!logoutResponse.ok) throw new Error('Logout request failed');
        window.location.replace('/');
      } catch (error) {
        logout.disabled = false;
        console.error('Could not log out of Launchpad:', error);
        alert('Could not log out. Please check that the Flask server is running and try again.');
      }
    });

    actions.append(identity, logout);
  } catch (error) {
    // If this happens, the site is likely not being served by Flask or the server is stopped.
    console.error('Launchpad could not check your login session. Run python app.py and open http://127.0.0.1:5000/.', error);
  }
}
refreshAuthHeader();
