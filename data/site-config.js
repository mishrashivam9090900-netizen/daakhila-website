export const siteConfig = {
  brand: 'Daakhila | Admission Partner',
  instagram: 'https://www.instagram.com/daakhila.sathi/',
  whatsapp: '+916398851246',
  whatsappLink: 'https://wa.me/916398851246',
  email: 'daakhila.sathi@gmail.com',
  formDestination: 'Configured by the Vercel API environment',
  coursePrices: { delhi: 'Contact us for pricing', package: 'Contact us for pricing' },
  hindiAtLaunch: false,
};

export const states = [
  { name: 'Delhi', code: 'DL', counselling: 'JAC Delhi', status: 'live', exam: 'JEE', seats: 'Home-state + open seats', note: 'First course to launch.' },
  { name: 'Uttar Pradesh', code: 'UP', counselling: 'UPTAC', status: 'soon', exam: 'JEE', seats: 'State counselling', note: 'Course in preparation.' },
  { name: 'Haryana', code: 'HR', counselling: 'Haryana counselling', status: 'soon', exam: 'JEE', seats: 'State counselling', note: 'Course in preparation.' },
  { name: 'Maharashtra', code: 'MH', counselling: 'CAP', status: 'soon', exam: 'JEE', seats: 'State counselling', note: 'Course in preparation.' },
  { name: 'NIT / IIIT', code: 'NIT', counselling: 'JoSAA', status: 'soon', exam: 'JEE', seats: 'Home-state inside national process', note: 'Course in preparation.' },
  { name: 'Other states', code: 'REQ', counselling: 'On request', status: 'request', exam: 'JEE / NEET / UG', seats: 'Ask about your route', note: 'Tell us what you need.' },
];

export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

export const courses = [
  { title: 'Delhi quota course', status: 'Live', accent: 'yellow', meta: 'JEE / JAC Delhi', modules: ['Quota rules', 'Documents', 'Cutoffs', 'Choice filling', 'Timeline', 'Backups'] },
  { title: 'UPTAC quota course', status: 'Coming soon', accent: 'paper', meta: 'JEE / Uttar Pradesh', modules: ['Quota rules', 'Documents', 'Cutoffs', 'Choice filling'] },
  { title: 'NIT home-state guide', status: 'Coming soon', accent: 'blue', meta: 'JEE / JoSAA / CSAB', modules: ['Home-state seats', 'Choice filling', 'Rounds', 'Backups'] },
];

export const plans = [
  { name: 'Free starter', label: 'START HERE', accent: 'paper', price: 'Free', copy: 'Understand the route before you commit.', features: ['Quota explainer', 'Starter document checklist', 'Selected notes and PYQs'], action: 'Explore resources' },
  { name: 'Quota course', label: 'SELF-PACED SUPPORT', accent: 'yellow', price: 'Contact us for pricing', copy: 'A written guide and mentor-led structure for one state or exam route.', features: ['Quota rules and documents', 'Cutoff reading and choice filling', 'Timeline and backup plans'], action: 'Ask about the course' },
  { name: 'Complete package', label: 'PERSONALISED SUPPORT', accent: 'navy', price: 'Contact us for pricing', copy: 'Guidance across documents, choices and rounds for your admission journey.', features: ['One-to-one counselling', 'Document verification', 'Follow-up through rounds'], action: 'Talk about a package' },
];

export const faqs = [
  ['What is a quota?', 'A share of seats kept for a group, such as students of the same state, students from other states, or a reserved category.'],
  ['Can I use more than one quota?', 'Often yes. A student may qualify for a home-state quota in one state, an all-India quota elsewhere and a category reservation. The rules differ by counselling, so check each one.'],
  ['Do I need a domicile certificate?', 'Many home-state quotas ask for domicile or residence proof. Requirements differ by state, so use the document checklist for your state.'],
  ['Does Daakhila guarantee a seat?', 'No. Seats depend on rank, seat availability and your choices. Daakhila helps you choose well and avoid avoidable mistakes.'],
  ['Is NIOS right for me?', 'Only in some situations. Ask us before registering, because it can help in some cases and not in others.'],
  ['When should I start?', 'As early as possible, ideally before results. Documents take time to get.'],
];

export const services = [
  ['01', 'Counseling', 'One-to-one planning: quotas, counselling processes, college shortlist and timeline.'],
  ['02', 'Quota guidance', 'Plain-language explanation of every quota you may be eligible for.'],
  ['03', 'Document verification', 'A check of domicile, category, income and other certificates before submission.'],
  ['04', 'IITian mentors', 'Sessions with people who have done the process and can explain it from experience.'],
  ['05', 'Scholarships + loans', 'Find aid, compare options and understand the paperwork before you commit.'],
  ['06', 'Notes, PYQs + predictors', 'Study resources and tools to make your college list more sensible.'],
  ['07', 'NIOS registration help', 'Understand when this route may help and when it may not before you register.'],
  ['08', 'Complete package', 'Counselling, documents, choice filling and follow-up through all rounds.'],
];
