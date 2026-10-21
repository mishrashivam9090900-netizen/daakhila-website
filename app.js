import { states, courses, plans, services, faqs } from './data/site-config.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function renderStates(filter = 'all', search = '') {
  const grid = $('#state-grid');
  const items = states.filter((state) => (filter === 'all' || state.status === filter) && state.name.toLowerCase().includes(search.toLowerCase()));
  grid.innerHTML = items.map((state) => `<article class="state-card ${state.status === 'live' ? 'state-live' : ''}"><div class="state-top"><span class="state-code">${state.code}</span><span class="status status-${state.status}">${state.status === 'live' ? 'Live' : state.status === 'soon' ? 'Coming soon' : 'On request'}</span></div><h3>${state.name}</h3><p>${state.counselling}</p><div class="state-meta"><span>${state.exam}</span><span>${state.seats}</span></div><a href="#checker" data-state="${state.name}" class="state-link">${state.status === 'request' ? 'Ask about this route' : 'Open guide'} <span>&#8599;</span></a></article>`).join('') || '<p class="empty-state">No state found. Try another search.</p>';
  $$('.state-link', grid).forEach((link) => link.addEventListener('click', () => { $('#state-search').value = link.dataset.state; }));
}

function renderCourses() { $('#course-grid').innerHTML = courses.map((course) => `<article class="course-card course-${course.accent}"><div class="course-top"><span>${course.meta}</span><span class="status">${course.status}</span></div><h3>${course.title}</h3><div class="module-list">${course.modules.map((module, i) => `<span><b>0${i + 1}</b>${module}</span>`).join('')}</div><a class="button ${course.status === 'Live' ? 'button-dark' : 'button-outline'}" href="#contact">${course.status === 'Live' ? 'View course' : 'Get notified'} <span>&#8599;</span></a></article>`).join(''); }
function renderPlans() { $('#plan-grid').innerHTML = plans.map((plan) => `<article class="plan-card plan-${plan.accent}"><span class="plan-label">${plan.label}</span><h3>${plan.name}</h3><p>${plan.copy}</p><strong class="plan-price">${plan.price}</strong><ul>${plan.features.map((feature) => `<li>${feature}</li>`).join('')}</ul><a class="button ${plan.accent === 'navy' ? 'button-primary' : 'button-dark'}" href="#contact">${plan.action} <span>&#8599;</span></a></article>`).join(''); }
function renderServices() { $('#service-list').innerHTML = services.map(([number, title, copy]) => `<article class="service-row"><span class="service-number">${number}</span><h3>${title}</h3><p>${copy}</p><a href="#contact" aria-label="Ask about ${title}">&#8599;</a></article>`).join(''); }
function renderFaqs() { $('#faq-list').innerHTML = faqs.map(([question, answer], index) => `<details class="faq-item" ${index === 0 ? 'open' : ''}><summary>${question}<span>+</span></summary><p>${answer}</p></details>`).join(''); }

const checker = { homeState: '', target: '', category: '', exam: '' };
function showCheckerQuestion() {
  const question = $('.checker-step');
  const n = Object.values(checker).filter(Boolean).length;
  if (n >= 4) return showCheckerResult();
  const prompts = [
    ['Where is your home state?', 'Your home state may open a separate seat pool.', ['Delhi', 'Uttar Pradesh', 'Haryana', 'Maharashtra', 'Another state'], 'homeState'],
    ['Which state or route are you targeting?', 'We use this to compare home-state and open seats.', ['Delhi', 'Uttar Pradesh', 'Haryana', 'Maharashtra', 'NIT / IIIT'], 'target'],
    ['Which category applies to you?', 'Category rules sit inside each quota.', ['Open', 'OBC', 'SC', 'ST', 'EWS'], 'category'],
    ['What are you applying for?', 'Choose the exam or admission route.', ['JEE', 'NEET', 'BA / BSc / BCom'], 'exam'],
  ];
  const [title, copy, options, key] = prompts[n];
  $('.step-count', question).innerHTML = `STEP <b>0${n + 1}</b> / 04`;
  $('h3', question).textContent = title; $('p', question).textContent = copy;
  $('.option-grid', question).innerHTML = options.map((option) => `<button data-value="${option}" data-key="${key}">${option}</button>`).join('');
  $('.progress-fill').style.width = `${(n / 4) * 100}%`;
  $$('.option-grid button', question).forEach((button) => button.addEventListener('click', () => { checker[button.dataset.key] = button.dataset.value; showCheckerQuestion(); }));
}
function showCheckerResult() {
  $('.checker-step').hidden = true; $('.checker-result').hidden = false; $('.progress-fill').style.width = '100%';
  const home = checker.homeState === checker.target;
  $('#result-list').innerHTML = [`<div class="result-item"><b>${home ? 'Home-state quota' : 'Other-state / all-India quota'}</b><span>${home ? `Check ${checker.target}'s domicile or residence rules.` : `Check open seats in ${checker.target} and its official counselling brochure.`}</span></div>`, `<div class="result-item"><b>${checker.category} category rules</b><span>Keep the certificate format, issuing authority and validity date ready.</span></div>`, `<div class="result-item"><b>${checker.exam} counselling</b><span>Compare the relevant state process with national counselling where applicable.</span></div>`].join('');
}

function updateEmi() { const amount = +$('#amount').value, rate = +$('#rate').value / 1200, months = +$('#years').value * 12; const emi = rate ? amount * rate * (1 + rate) ** months / ((1 + rate) ** months - 1) : amount / months; $('#amount-output').textContent = `₹${amount.toLocaleString('en-IN')}`; $('#rate-output').textContent = `${$('#rate').value}%`; $('#years-output').textContent = `${$('#years').value} years`; $('#emi').textContent = `₹${Math.round(emi).toLocaleString('en-IN')}`; }
function submitLead(data) { sessionStorage.setItem('daakhilaLead', JSON.stringify({ ...data, savedAt: new Date().toISOString() })); }

renderStates(); renderCourses(); renderPlans(); renderServices(); renderFaqs(); showCheckerQuestion(); updateEmi();
$$('.tab').forEach((tab) => tab.addEventListener('click', () => { $$('.tab').forEach((item) => item.classList.remove('active')); tab.classList.add('active'); renderStates(tab.dataset.filter, $('#state-search').value); }));
$('#state-search').addEventListener('input', (event) => renderStates($('.tab.active').dataset.filter, event.target.value));
$('.restart').addEventListener('click', () => { Object.keys(checker).forEach((key) => { checker[key] = ''; }); $('.checker-step').hidden = false; $('.checker-result').hidden = true; showCheckerQuestion(); });
['amount', 'rate', 'years'].forEach((id) => $(`#${id}`).addEventListener('input', updateEmi));
$('#print-checklist').addEventListener('click', () => window.print());
$('#predict-btn').addEventListener('click', () => { const rank = +$('#rank-input').value; $('#predict-result').textContent = rank ? 'This is a starting point only. Add your state, category and current official cutoffs before shortlisting.' : 'Enter a positive rank to get a starting point.'; });
$('#cutoff-select').addEventListener('change', (event) => { $('#cutoff-result').textContent = event.target.value === 'all' ? 'No verified cutoff data is published here yet.' : `${event.target.value}: current official cutoff data will be added after verification.`; }); $('#cutoff-select').dispatchEvent(new Event('change'));

const leadForm = $('#lead-form');
function clearFormErrors() { $$('.field-error', leadForm).forEach((error) => { error.textContent = ''; }); $$('input, select', leadForm).forEach((field) => field.removeAttribute('aria-invalid')); }
function validateLeadForm() {
  clearFormErrors(); let valid = true;
  leadForm.querySelectorAll('input, select').forEach((field) => {
    if (field.name === 'consent') return;
    const invalid = !field.value.trim() || (field.name === 'phone' && !/^[0-9 +()-]{8,}$/.test(field.value));
    if (invalid) { valid = false; field.setAttribute('aria-invalid', 'true'); const error = $(`[data-error-for="${field.name}"]`, leadForm); if (error) error.textContent = field.name === 'phone' ? 'Enter a valid phone number.' : 'This field is required.'; }
  });
  const consent = $('[name="consent"]', leadForm); if (!consent.checked) { valid = false; $('[data-error-for="consent"]', leadForm).textContent = 'Please confirm before continuing.'; }
  return valid;
}
leadForm.addEventListener('submit', (event) => { event.preventDefault(); $('#form-message').textContent = ''; if (!validateLeadForm()) { $('#form-message').textContent = 'Please check the highlighted fields.'; return; } submitLead(Object.fromEntries(new FormData(event.currentTarget))); $('#form-message').innerHTML = 'Your details are saved in this browser for this demo. Please <a href="https://wa.me/916398851246" target="_blank" rel="noreferrer">message us on WhatsApp</a> or email us for a reply.'; event.currentTarget.reset(); });
$('.theme-toggle').addEventListener('click', () => document.body.classList.toggle('dark'));
$('.menu-toggle').addEventListener('click', () => { const nav = $('.nav-links'); const open = nav.classList.toggle('open'); $('.menu-toggle').setAttribute('aria-expanded', open); });
