/**
 * MediMart — Medicine data (self-contained for web build)
 * Source of truth kept in sync with shared/data/medicines.js
 */

export const MEDICINES = [
  { id: 1,  slug: 'napa-extra',     name: 'Napa Extra',      generic: 'Paracetamol 500mg + Caffeine 65mg',  company: 'Beximco Pharma',    type: 'Tablet',  price: 2.50, mrp: 2.80, strip: 10, category: 'Pain Relief',    rx: false, stock: true,  discount: 11, desc: 'Used for headache, toothache, body pain and fever.',                                       dosage: '1-2 tablets every 4-6 hours.',          alternatives: [11, 14] },
  { id: 2,  slug: 'seclo-20',       name: 'Seclo 20',        generic: 'Omeprazole 20mg',                    company: 'Square Pharma',     type: 'Capsule', price: 6,    mrp: 7,    strip: 14, category: 'Gastric',       rx: false, stock: true,  discount: 14, desc: 'Used for gastric ulcer, heartburn, and acid reflux.',                                     dosage: '1 capsule before breakfast daily.',      alternatives: [3, 4, 19] },
  { id: 3,  slug: 'losectil-20',    name: 'Losectil 20',     generic: 'Omeprazole 20mg',                    company: 'Incepta Pharma',    type: 'Capsule', price: 5.50, mrp: 6.50, strip: 14, category: 'Gastric',       rx: false, stock: true,  discount: 15, desc: 'Generic alternative for Seclo. Used for acid reflux and GERD.',                          dosage: '1 capsule before breakfast daily.',      alternatives: [2, 4, 19] },
  { id: 4,  slug: 'sergel-20',      name: 'Sergel 20',       generic: 'Esomeprazole 20mg',                  company: 'Healthcare Pharma', type: 'Capsule', price: 8,    mrp: 9,    strip: 14, category: 'Gastric',       rx: false, stock: true,  discount: 11, desc: 'Proton pump inhibitor for GERD and peptic ulcers.',                                       dosage: '1 capsule daily, 1 hour before meal.',   alternatives: [2, 3, 13] },
  { id: 5,  slug: 'monas-10',       name: 'Monas 10',        generic: 'Montelukast 10mg',                   company: 'Square Pharma',     type: 'Tablet',  price: 12,   mrp: 14,   strip: 10, category: 'Respiratory',   rx: true,  stock: true,  discount: 14, desc: 'For asthma prevention and allergic rhinitis.',                                            dosage: '1 tablet at bedtime.',                   alternatives: [] },
  { id: 6,  slug: 'ciprocin-500',   name: 'Ciprocin 500',    generic: 'Ciprofloxacin 500mg',                company: 'Square Pharma',     type: 'Tablet',  price: 10,   mrp: 12,   strip: 10, category: 'Antibiotic',    rx: true,  stock: true,  discount: 17, desc: 'Broad-spectrum antibiotic for urinary, respiratory, and skin infections.',                dosage: '1 tablet twice daily for 5-7 days.',     alternatives: [9, 10] },
  { id: 7,  slug: 'amlodac-5',      name: 'Amlodac 5',       generic: 'Amlodipine 5mg',                     company: 'Opsonin Pharma',    type: 'Tablet',  price: 3,    mrp: 3.50, strip: 30, category: 'Blood Pressure', rx: true,  stock: true,  discount: 14, desc: 'Calcium channel blocker for hypertension and angina.',                                    dosage: '1 tablet once daily.',                   alternatives: [15, 17] },
  { id: 8,  slug: 'neurofer-plus',  name: 'Neurofer Plus',   generic: 'Iron + Folic Acid + B12',            company: 'Renata',            type: 'Capsule', price: 5,    mrp: 5.50, strip: 30, category: 'Vitamins',      rx: false, stock: true,  discount: 9,  desc: 'For iron deficiency anemia, pregnancy support, and nerve health.',                       dosage: '1 capsule daily after meal.',            alternatives: [] },
  { id: 9,  slug: 'azifast-500',    name: 'Azifast 500',     generic: 'Azithromycin 500mg',                 company: 'Beximco Pharma',    type: 'Tablet',  price: 40,   mrp: 45,   strip: 3,  category: 'Antibiotic',    rx: true,  stock: true,  discount: 11, desc: 'Macrolide antibiotic for respiratory, ENT, and skin infections.',                        dosage: '1 tablet daily for 3 days.',             alternatives: [6] },
  { id: 10, slug: 'fluclav-500',    name: 'Fluclav 500',     generic: 'Amoxicillin + Clavulanic Acid',      company: 'Incepta Pharma',    type: 'Tablet',  price: 22,   mrp: 25,   strip: 8,  category: 'Antibiotic',    rx: true,  stock: false, discount: 12, desc: 'For severe bacterial infections resistant to amoxicillin alone.',                        dosage: '1 tablet 3 times daily.',                alternatives: [6, 9, 16] },
  { id: 11, slug: 'tofen-400',      name: 'Tofen 400',       generic: 'Ibuprofen 400mg',                    company: 'Square Pharma',     type: 'Tablet',  price: 3,    mrp: 3.50, strip: 10, category: 'Pain Relief',    rx: false, stock: true,  discount: 14, desc: 'NSAID for pain, inflammation, and fever. Take with food.',                               dosage: '1 tablet 3 times daily after food.',     alternatives: [1, 14] },
  { id: 12, slug: 'ceevit',         name: 'Ceevit',          generic: 'Vitamin C 250mg',                    company: 'Square Pharma',     type: 'Tablet',  price: 1.50, mrp: 1.80, strip: 10, category: 'Vitamins',      rx: false, stock: true,  discount: 17, desc: 'Vitamin C supplement for immune support and antioxidant protection.',                    dosage: '1-2 tablets daily.',                     alternatives: [] },
  { id: 13, slug: 'maxpro-20',      name: 'Maxpro 20',       generic: 'Esomeprazole 20mg',                  company: 'Renata',            type: 'Capsule', price: 7,    mrp: 8,    strip: 14, category: 'Gastric',       rx: false, stock: true,  discount: 12, desc: 'For acid reflux, GERD, and stomach ulcers.',                                             dosage: '1 capsule daily before meal.',           alternatives: [2, 3, 4] },
  { id: 14, slug: 'ace-plus',       name: 'Ace Plus',        generic: 'Paracetamol 500mg + Caffeine 65mg',  company: 'Square Pharma',     type: 'Tablet',  price: 2,    mrp: 2.50, strip: 10, category: 'Pain Relief',    rx: false, stock: true,  discount: 20, desc: 'For headache, fever, cold and muscle pain.',                                             dosage: '1-2 tablets every 4-6 hours.',           alternatives: [1, 11] },
  { id: 15, slug: 'losartan-50',    name: 'Losartan 50',     generic: 'Losartan Potassium 50mg',            company: 'Beximco Pharma',    type: 'Tablet',  price: 5,    mrp: 6,    strip: 30, category: 'Blood Pressure', rx: true,  stock: true,  discount: 17, desc: 'ARB for hypertension and diabetic nephropathy.',                                         dosage: '1 tablet once daily.',                   alternatives: [7, 17] },
  { id: 16, slug: 'moxacil-500',    name: 'Moxacil 500',     generic: 'Amoxicillin 500mg',                  company: 'Beximco Pharma',    type: 'Capsule', price: 6,    mrp: 7,    strip: 12, category: 'Antibiotic',    rx: true,  stock: true,  discount: 14, desc: 'Broad-spectrum penicillin antibiotic for ENT, respiratory, and urinary infections.',    dosage: '1 capsule 3 times daily for 5-7 days.',  alternatives: [10] },
  { id: 17, slug: 'telma-40',       name: 'Telma 40',        generic: 'Telmisartan 40mg',                   company: 'Incepta Pharma',    type: 'Tablet',  price: 8,    mrp: 9,    strip: 28, category: 'Blood Pressure', rx: true,  stock: true,  discount: 11, desc: 'ARB antihypertensive with 24-hour blood pressure control.',                              dosage: '1 tablet once daily.',                   alternatives: [7, 15] },
  { id: 18, slug: 'd-rise-20000',   name: 'D-Rise 20000',    generic: 'Cholecalciferol 20000 IU',           company: 'Square Pharma',     type: 'Capsule', price: 15,   mrp: 18,   strip: 5,  category: 'Vitamins',      rx: false, stock: true,  discount: 17, desc: 'Vitamin D3 supplement for deficiency correction.',                                       dosage: '1 capsule weekly.',                      alternatives: [] },
  { id: 19, slug: 'pantonix-40',    name: 'Pantonix 40',     generic: 'Pantoprazole 40mg',                  company: 'ACI Ltd',           type: 'Tablet',  price: 7,    mrp: 8,    strip: 14, category: 'Gastric',       rx: false, stock: true,  discount: 12, desc: 'PPI for gastric ulcer, GERD, and heartburn.',                                            dosage: '1 tablet daily before meal.',            alternatives: [2, 3, 13] },
  { id: 20, slug: 'metform-500',    name: 'Metform 500',     generic: 'Metformin HCl 500mg',                company: 'Square Pharma',     type: 'Tablet',  price: 2,    mrp: 2.50, strip: 30, category: 'Diabetes',      rx: true,  stock: true,  discount: 20, desc: 'First-line treatment for Type 2 Diabetes.',                                              dosage: '1 tablet twice daily with meals.',       alternatives: [] },
  { id: 21, slug: 'fexo-120',       name: 'Fexo 120',        generic: 'Fexofenadine 120mg',                 company: 'Square Pharma',     type: 'Tablet',  price: 8,    mrp: 9,    strip: 10, category: 'Allergy',       rx: false, stock: true,  discount: 11, desc: 'Non-drowsy antihistamine for allergic rhinitis and urticaria.',                          dosage: '1 tablet once daily.',                   alternatives: [] },
  { id: 22, slug: 'doxicap-100',    name: 'Doxicap 100',     generic: 'Doxycycline 100mg',                  company: 'Square Pharma',     type: 'Capsule', price: 4,    mrp: 5,    strip: 10, category: 'Antibiotic',    rx: true,  stock: true,  discount: 20, desc: 'Broad-spectrum antibiotic for acne, chest, and urinary infections.',                    dosage: '1 capsule twice daily.',                 alternatives: [6, 9] },
  { id: 23, slug: 'naselin-spray',  name: 'Naselin Spray',   generic: 'Oxymetazoline 0.05%',                company: 'Renata',            type: 'Nasal',   price: 60,   mrp: 65,   strip: 1,  category: 'Respiratory',   rx: false, stock: true,  discount: 8,  desc: 'Nasal decongestant for blocked nose and sinusitis. Max 3 consecutive days.',           dosage: '2-3 sprays per nostril twice daily.',    alternatives: [] },
  { id: 24, slug: 'dermazin-cream', name: 'Dermazin Cream',  generic: 'Silver Sulfadiazine 1%',             company: 'Square Pharma',     type: 'Cream',   price: 85,   mrp: 90,   strip: 1,  category: 'Skin Care',     rx: false, stock: true,  discount: 6,  desc: 'Topical antibiotic cream for burns, wounds, and skin infections.',                      dosage: 'Apply thin layer to affected area once or twice daily.', alternatives: [] },
  { id: 25, slug: 'gluconil-5',     name: 'Gluconil 5',      generic: 'Glibenclamide 5mg',                  company: 'Opsonin Pharma',    type: 'Tablet',  price: 2,    mrp: 2.50, strip: 30, category: 'Diabetes',      rx: true,  stock: true,  discount: 20, desc: 'Sulfonylurea for Type 2 Diabetes. Stimulates insulin secretion.',                       dosage: '1 tablet daily before breakfast.',       alternatives: [20] },
];

export const CATEGORIES = [
  { id: 1,  name: 'Pain Relief',    icon: '🩹', count: 120, color: 'bg-orange-50', border: 'border-orange-200' },
  { id: 2,  name: 'Gastric',        icon: '🫁', count: 85,  color: 'bg-green-50',  border: 'border-green-200'  },
  { id: 3,  name: 'Antibiotic',     icon: '🧬', count: 200, color: 'bg-blue-50',   border: 'border-blue-200'   },
  { id: 4,  name: 'Blood Pressure', icon: '❤️', count: 95,  color: 'bg-red-50',    border: 'border-red-200'    },
  { id: 5,  name: 'Vitamins',       icon: '💪', count: 150, color: 'bg-purple-50', border: 'border-purple-200' },
  { id: 6,  name: 'Respiratory',    icon: '🌬️', count: 70,  color: 'bg-cyan-50',   border: 'border-cyan-200'   },
  { id: 7,  name: 'Diabetes',       icon: '🩸', count: 110, color: 'bg-yellow-50', border: 'border-yellow-200' },
  { id: 8,  name: 'Allergy',        icon: '🤧', count: 60,  color: 'bg-pink-50',   border: 'border-pink-200'   },
  { id: 9,  name: 'Skin Care',      icon: '✨', count: 45,  color: 'bg-gray-50',   border: 'border-gray-200'   },
  { id: 10, name: 'Eye Care',       icon: '👁️', count: 35,  color: 'bg-indigo-50', border: 'border-indigo-200' },
];

export const COMPANIES = [
  'Square Pharma', 'Beximco Pharma', 'Incepta Pharma',
  'Opsonin Pharma', 'Healthcare Pharma', 'Renata',
  'ACI Ltd', 'Aristopharma', 'Eskayef', 'Radiant Pharma',
];

// Named aliases
export const medicines   = MEDICINES;
export const categories  = CATEGORIES;
export const companies   = COMPANIES;

export const getMedicineBySlug = (slug) => MEDICINES.find(m => m.slug === slug) || null;
export const getMedicineById   = (id)   => MEDICINES.find(m => m.id === Number(id)) || null;
export const getAlternatives   = (med)  => (med?.alternatives || []).map(id => getMedicineById(id)).filter(Boolean);
export const getSimilarByGeneric = (med) => MEDICINES.filter(m => m.generic === med.generic && m.id !== med.id);

export const searchMedicines = ({ query = '', category = '', company = '', inStock = false } = {}) =>
  MEDICINES.filter(m => {
    const q = query.toLowerCase();
    return (!q        || m.name.toLowerCase().includes(q) || m.generic.toLowerCase().includes(q) || m.company.toLowerCase().includes(q))
        && (!category || m.category === category)
        && (!company  || m.company  === company)
        && (!inStock  || m.stock);
  });

export const getDeals    = (limit = 6) => [...MEDICINES].sort((a, b) => b.discount - a.discount).slice(0, limit);
export const getFeatured = (limit = 8) => MEDICINES.filter(m => m.stock && m.discount >= 11).slice(0, limit);
export const getPopular  = (limit = 6) => MEDICINES.filter(m => !m.rx && m.stock).slice(0, limit);
