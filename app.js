import { states, indianStates, courses, plans, services, faqs } from './data/site-config.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const track = (name, data = {}) => { if (typeof window.va === 'function') window.va('event', { name, ...data }); };

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
function markUnreadyResources() {
  const cards = $$('.resource-card');
  cards.forEach((card) => card.insertAdjacentHTML('afterbegin', '<span class="coming-soon-badge">COMING SOON</span>'));
  const rankButton = $('#predict-btn'); rankButton.textContent = 'Notify me'; rankButton.addEventListener('click', () => { window.location.hash = 'contact'; });
  const notesCard = cards[1];
  $$('.chip-row button', notesCard).forEach((button) => { button.disabled = true; button.title = 'Coming soon'; });
  $('.resource-link', notesCard).textContent = 'Notify me';
  $('#cutoff-select').disabled = true;
  $('#cutoff-result').textContent = 'Coming soon. Verified cutoff data will be added after review.';
  $('.plans-section .section-row > p').textContent = 'Choose the right support for your stage. Contact us for pricing on paid guidance.';
}
function addVerificationNotes() {
  $$('.info-card p').forEach((copy) => copy.insertAdjacentHTML('afterend', '<small class="verification-note">Verify with the official brochure for the current counselling year.</small>'));
  $$('.course-card').forEach((card) => card.insertAdjacentHTML('beforeend', '<small class="verification-note">Verify with the official brochure for the current counselling year.</small>'));
  $$('.state-card').forEach((card) => card.insertAdjacentHTML('beforeend', '<small class="verification-note">Verify with the official brochure for the current counselling year.</small>'));
  $('.checklist-card .small-note').textContent = 'Verify with the official brochure for the current counselling year. Certificate format and validity dates matter.';
  $('.lead-form .small-note').textContent = 'Your details are sent to the configured Daakhila contact sheet only after you submit. You can also contact us directly via WhatsApp or email.';
}

const checker = { homeState: '', target: '', category: '', exam: '' };
function showCheckerQuestion() {
  const question = $('.checker-step');
  const n = Object.values(checker).filter(Boolean).length;
  if (n >= 4) return showCheckerResult();
  const prompts = [
    ['Where is your home state?', 'Your home state may open a separate seat pool. Verify with the official brochure.', ['Delhi', 'Uttar Pradesh', 'Haryana', 'Maharashtra', 'Another state'], 'homeState'],
    ['Which state or route are you targeting?', 'We use this to compare possible routes. Verify with the official brochure.', ['Delhi', 'Uttar Pradesh', 'Haryana', 'Maharashtra', 'NIT / IIIT'], 'target'],
    ['Which category applies to you?', 'Category rules sit inside each quota. Verify with the official brochure.', ['Open', 'OBC', 'SC', 'ST', 'EWS'], 'category'],
    ['What are you applying for?', 'Choose the exam or admission route.', ['JEE', 'NEET', 'BA / BSc / BCom'], 'exam'],
  ];
  const [title, copy, options, key] = prompts[n];
  $('.step-count', question).innerHTML = `STEP <b>0${n + 1}</b> / 04`;
  $('h3', question).textContent = title; $('p', question).textContent = copy;
  $('.option-grid', question).innerHTML = options.map((option) => `<button type="button" data-value="${option}" data-key="${key}">${option}</button>`).join('');
  $('.progress-fill').style.width = `${(n / 4) * 100}%`;
  $$('.option-grid button', question).forEach((button) => button.addEventListener('click', () => { checker[button.dataset.key] = button.dataset.value; showCheckerQuestion(); }));
}
function showCheckerResult() {
  $('.checker-step').hidden = true; $('.checker-result').hidden = false; $('.progress-fill').style.width = '100%'; track('quota_checker_completed', { exam: checker.exam });
  const home = checker.homeState === checker.target;
  $('#result-list').innerHTML = [`<div class="result-item"><b>${home ? 'Home-state quota' : 'Other-state / all-India quota'}</b><span>${home ? `Check ${checker.target}'s domicile or residence rules in the current official brochure.` : `Check open seats in ${checker.target} and its current official counselling brochure.`}</span></div>`, `<div class="result-item"><b>${checker.category} category rules</b><span>Keep the certificate format, issuing authority and validity date ready. Verify with the official brochure.</span></div>`, `<div class="result-item"><b>${checker.exam} counselling</b><span>Compare the relevant state process with current official counselling information.</span></div>`].join('');
}

function updateEmi() { const amount = Number($('#amount').value) || 0, rate = Number($('#rate').value) / 1200 || 0, months = Number($('#years').value) * 12 || 0; const emi = months > 0 ? (rate ? amount * rate * (1 + rate) ** months / ((1 + rate) ** months - 1) : amount / months) : 0; $('#amount-output').textContent = `₹${amount.toLocaleString('en-IN')}`; $('#rate-output').textContent = `${Number($('#rate').value) || 0}%`; $('#years-output').textContent = `${Number($('#years').value) || 0} years`; $('#emi').textContent = `₹${Number.isFinite(emi) ? Math.round(emi).toLocaleString('en-IN') : '0'}`; }

renderStates(); renderCourses(); renderPlans(); renderServices(); renderFaqs(); markUnreadyResources(); addVerificationNotes(); showCheckerQuestion(); updateEmi();
$$('.tab').forEach((tab) => tab.addEventListener('click', () => { $$('.tab').forEach((item) => item.classList.remove('active')); tab.classList.add('active'); renderStates(tab.dataset.filter, $('#state-search').value); }));
$('#state-search').addEventListener('input', (event) => renderStates($('.tab.active').dataset.filter, event.target.value));
$('.restart').addEventListener('click', () => { Object.keys(checker).forEach((key) => { checker[key] = ''; }); $('.checker-step').hidden = false; $('.checker-result').hidden = true; showCheckerQuestion(); });
['amount', 'rate', 'years'].forEach((id) => $(`#${id}`).addEventListener('input', updateEmi));
$('#checklist-state').addEventListener('change', (event) => track('document_checklist_state_selected', { state: event.target.value }));
$('#print-checklist').addEventListener('click', () => window.print());
$('#predict-btn').addEventListener('click', () => { const rank = Number($('#rank-input').value); $('#predict-result').textContent = rank > 0 ? 'Coming soon. Contact us to be notified when verified data is available.' : 'Enter a positive rank to continue.'; });
$('#cutoff-select').addEventListener('change', (event) => { $('#cutoff-result').textContent = event.target.value === 'all' ? 'Coming soon. No verified cutoff data is published here yet.' : 'Coming soon. Current official cutoff data will be added after verification.'; }); $('#cutoff-select').dispatchEvent(new Event('change'));

const leadForm = $('#lead-form');
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const stateInput = $('[name="state"]', leadForm);
const stateSelect = document.createElement('select');
stateSelect.name = 'state'; stateSelect.id = 'state'; stateSelect.required = true; stateSelect.setAttribute('aria-label', 'Home state');
stateSelect.innerHTML = '<option value="">Select your state or union territory</option>' + indianStates.map((state) => `<option value="${state}">${state}</option>`).join('');
stateInput.replaceWith(stateSelect);
const phoneInput = $('[name="phone"]', leadForm);
const phoneWrapper = document.createElement('span'); phoneWrapper.className = 'phone-input';
const phonePrefix = document.createElement('span'); phonePrefix.className = 'phone-prefix'; phonePrefix.setAttribute('aria-hidden', 'true'); phonePrefix.textContent = '+91';
phoneInput.placeholder = '98765 43210'; phoneInput.parentNode.insertBefore(phoneWrapper, phoneInput); phoneWrapper.append(phonePrefix, phoneInput);
leadForm.insertAdjacentHTML('afterbegin', '<input class="honeypot" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" />');
const consentLabel = $('.consent', leadForm);
consentLabel.insertAdjacentHTML('beforeend', ' <span class="consent-links">Read our <a href="/privacy.html">privacy notice</a> and <a href="/terms.html">terms</a>.</span>');
$$('label', leadForm).forEach((label, index) => { const input = $('input, select', label); if (input && !input.id) { input.id = input.name || `lead-field-${index}`; const text = label.childNodes[0]; if (text && text.nodeType === Node.TEXT_NODE) label.dataset.fieldLabel = text.textContent.trim(); } });
function clearFormErrors() { $$('.field-error', leadForm).forEach((error) => { error.textContent = ''; }); $$('input, select', leadForm).forEach((field) => field.removeAttribute('aria-invalid')); }
function normalizePhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
  return digits;
}
function validateLeadForm() {
  clearFormErrors(); let valid = true;
  const fields = { name: $('[name="name"]', leadForm), classYear: $('[name="class"]', leadForm), exam: $('[name="exam"]', leadForm), state: $('[name="state"]', leadForm), phone: $('[name="phone"]', leadForm) };
  const errors = [
    ['name', fields.name.value.trim().length < 2, 'Please enter your name.'],
    ['class', !fields.classYear.value.trim(), 'Please enter your class or year.'],
    ['exam', !fields.exam.value, 'Please select your exam.'],
    ['state', !fields.state.value.trim(), 'Please enter your home state.'],
    ['phone', !INDIAN_MOBILE_REGEX.test(normalizePhone(fields.phone.value)), 'Enter a valid 10-digit mobile number.'],
  ];
  errors.forEach(([fieldName, invalid, message]) => { if (invalid) { valid = false; const field = fieldName === 'class' ? fields.classYear : fields[fieldName]; field.setAttribute('aria-invalid', 'true'); $(`[data-error-for="${fieldName}"]`, leadForm).textContent = message; } });
  const consent = $('[name="consent"]', leadForm); if (!consent.checked) { valid = false; $('[data-error-for="consent"]', leadForm).textContent = 'Please tick the consent box.'; }
  return valid;
}
$$('input, select', leadForm).forEach((field) => ['input', 'change'].forEach((eventName) => field.addEventListener(eventName, () => {
  const errorField = field.name === 'class' ? 'class' : field.name;
  const error = $(`[data-error-for="${errorField}"]`, leadForm);
  if (error) error.textContent = '';
  field.removeAttribute('aria-invalid');
  if (field.name === 'consent' && field.checked) $('[data-error-for="consent"]', leadForm).textContent = '';
})));
leadForm.addEventListener('submit', async (event) => {
  event.preventDefault(); $('#form-message').textContent = '';
  if (!validateLeadForm()) { $('#form-message').textContent = 'Please check the highlighted fields.'; return; }
  const button = $('button[type="submit"]', leadForm); button.disabled = true; button.setAttribute('aria-busy', 'true'); button.dataset.label = button.textContent; button.textContent = 'Sending...';
  try {
    const formData = new FormData(leadForm); const payload = Object.fromEntries(formData); payload.classYear = payload.class; delete payload.class; payload.phone = normalizePhone(payload.phone); payload.consent = formData.get('consent') === 'on';
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json(); if (!response.ok) { const apiError = new Error(result.error || 'Unable to send.'); apiError.field = result.field; throw apiError; }
    track('contact_form_submitted', { exam: payload.exam }); leadForm.reset(); $('#form-message').innerHTML = 'Thank you. We received your enquiry. You can also <a data-whatsapp-link href="https://wa.me/916398851246" target="_blank" rel="noreferrer">message us on WhatsApp</a>.';
  } catch (error) { if (error.field) { const field = error.field === 'classYear' ? 'class' : error.field; const input = $(`[name="${field}"]`, leadForm); if (input) input.setAttribute('aria-invalid', 'true'); const fieldError = $(`[data-error-for="${field}"]`, leadForm); if (fieldError) fieldError.textContent = error.message; } $('#form-message').textContent = error.message || 'We could not send your enquiry. Please use WhatsApp or email instead.'; }
  finally { button.disabled = false; button.removeAttribute('aria-busy'); button.textContent = button.dataset.label; }
});
$$('[data-whatsapp-link], a[href*="wa.me"]').forEach((link) => link.addEventListener('click', () => track('whatsapp_click')));
$('.theme-toggle').addEventListener('click', () => document.body.classList.toggle('dark'));
$('.menu-toggle').addEventListener('click', () => { const nav = $('.nav-links'); const open = nav.classList.toggle('open'); $('.menu-toggle').setAttribute('aria-expanded', open); });
