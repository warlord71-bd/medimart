// Local medicine database — mirrors the React Native app data
// Used as fallback when WooCommerce API is unavailable

export const medicines = [
  { id: 1,  slug: 'napa-extra',      name: 'Napa Extra',       generic: 'Paracetamol 500mg + Caffeine 65mg',  company: 'Beximco Pharma',    type: 'Tablet',  price: 2.50, mrp: 2.80, strip: 10, category: 'Pain Relief',    rx: false, stock: true,  discount: 11, desc: 'Used for headache, toothache, body pain and fever. Widely available over the counter.',       alternatives: [2, 11] },
  { id: 2,  slug: 'seclo-20',        name: 'Seclo 20',         generic: 'Omeprazole 20mg',                    company: 'Square Pharma',     type: 'Capsule', price: 6,    mrp: 7,    strip: 14, category: 'Gastric',       rx: false, stock: true,  discount: 14, desc: 'Used for gastric ulcer, heartburn, and acid reflux. Proton pump inhibitor.',               alternatives: [3, 4]  },
  { id: 3,  slug: 'losectil-20',     name: 'Losectil 20',      generic: 'Omeprazole 20mg',                    company: 'Incepta Pharma',    type: 'Capsule', price: 5.50, mrp: 6.50, strip: 14, category: 'Gastric',       rx: false, stock: true,  discount: 15, desc: 'Generic alternative for Seclo. Used for acid reflux and GERD.',                           alternatives: [2, 4]  },
  { id: 4,  slug: 'sergel-20',       name: 'Sergel 20',        generic: 'Esomeprazole 20mg',                  company: 'Healthcare Pharma', type: 'Capsule', price: 8,    mrp: 9,    strip: 14, category: 'Gastric',       rx: false, stock: true,  discount: 11, desc: 'Proton pump inhibitor for GERD and peptic ulcers.',                                         alternatives: [2, 3]  },
  { id: 5,  slug: 'monas-10',        name: 'Monas 10',         generic: 'Montelukast 10mg',                   company: 'Square Pharma',     type: 'Tablet',  price: 12,   mrp: 14,   strip: 10, category: 'Respiratory',   rx: true,  stock: true,  discount: 14, desc: 'For asthma prevention and allergic rhinitis. Leukotriene receptor antagonist.',            alternatives: []      },
  { id: 6,  slug: 'ciprocin-500',    name: 'Ciprocin 500',     generic: 'Ciprofloxacin 500mg',                company: 'Square Pharma',     type: 'Tablet',  price: 10,   mrp: 12,   strip: 10, category: 'Antibiotic',    rx: true,  stock: true,  discount: 17, desc: 'Broad-spectrum antibiotic for urinary, respiratory, and skin infections.',                  alternatives: [9, 10] },
  { id: 7,  slug: 'amlodac-5',       name: 'Amlodac 5',        generic: 'Amlodipine 5mg',                     company: 'Opsonin Pharma',    type: 'Tablet',  price: 3,    mrp: 3.50, strip: 30, category: 'Blood Pressure', rx: true,  stock: true,  discount: 14, desc: 'Calcium channel blocker for hypertension and angina.',                                      alternatives: []      },
  { id: 8,  slug: 'neurofer-plus',   name: 'Neurofer Plus',    generic: 'Iron + Folic Acid + B12',            company: 'Renata',            type: 'Capsule', price: 5,    mrp: 5.50, strip: 30, category: 'Vitamins',      rx: false, stock: true,  discount: 9,  desc: 'For iron deficiency anemia, pregnancy support, and nerve health.',                          alternatives: []      },
  { id: 9,  slug: 'azifast-500',     name: 'Azifast 500',      generic: 'Azithromycin 500mg',                 company: 'Beximco Pharma',    type: 'Tablet',  price: 40,   mrp: 45,   strip: 3,  category: 'Antibiotic',    rx: true,  stock: true,  discount: 11, desc: 'Macrolide antibiotic for respiratory, ENT, and skin infections.',                            alternatives: [6]     },
  { id: 10, slug: 'fluclav-500',     name: 'Fluclav 500',      generic: 'Amoxicillin + Clavulanic Acid',      company: 'Incepta Pharma',    type: 'Tablet',  price: 22,   mrp: 25,   strip: 8,  category: 'Antibiotic',    rx: true,  stock: false, discount: 12, desc: 'For severe bacterial infections resistant to amoxicillin alone.',                            alternatives: [6, 9]  },
  { id: 11, slug: 'tofen-400',       name: 'Tofen 400',        generic: 'Ibuprofen 400mg',                    company: 'Square Pharma',     type: 'Tablet',  price: 3,    mrp: 3.50, strip: 10, category: 'Pain Relief',    rx: false, stock: true,  discount: 14, desc: 'NSAID for pain, inflammation, and fever. Take with food.',                                  alternatives: [1]     },
  { id: 12, slug: 'ceevit',          name: 'Ceevit',           generic: 'Vitamin C 250mg',                    company: 'Square Pharma',     type: 'Tablet',  price: 1.50, mrp: 1.80, strip: 10, category: 'Vitamins',      rx: false, stock: true,  discount: 17, desc: 'Vitamin C supplement for immune support and antioxidant protection.',                       alternatives: []      },
  { id: 13, slug: 'glucophage-500',  name: 'Glucophage 500',   generic: 'Metformin HCl 500mg',                company: 'Square Pharma',     type: 'Tablet',  price: 4,    mrp: 4.50, strip: 30, category: 'Diabetes',      rx: true,  stock: true,  discount: 11, desc: 'First-line treatment for type 2 diabetes. Reduces glucose production in the liver.',        alternatives: []      },
  { id: 14, slug: 'losartan-50',     name: 'Losartan 50',      generic: 'Losartan Potassium 50mg',            company: 'Opsonin Pharma',    type: 'Tablet',  price: 5,    mrp: 6,    strip: 30, category: 'Blood Pressure', rx: true,  stock: true,  discount: 17, desc: 'ARB for hypertension and diabetic nephropathy.',                                            alternatives: [7]     },
  { id: 15, slug: 'moxacil-500',     name: 'Moxacil 500',      generic: 'Amoxicillin 500mg',                  company: 'Beximco Pharma',    type: 'Capsule', price: 6,    mrp: 7,    strip: 12, category: 'Antibiotic',    rx: true,  stock: true,  discount: 14, desc: 'Broad-spectrum penicillin antibiotic for ENT, respiratory, and urinary infections.',        alternatives: [10]    },
  { id: 16, slug: 'naselin',         name: 'Naselin Spray',    generic: 'Oxymetazoline 0.05%',                company: 'Renata',            type: 'Nasal',   price: 60,   mrp: 65,   strip: 1,  category: 'Respiratory',   rx: false, stock: true,  discount: 8,  desc: 'Nasal decongestant spray for blocked nose, sinusitis. Max 3 days use.',                     alternatives: []      },
  { id: 17, slug: 'telma-40',        name: 'Telma 40',         generic: 'Telmisartan 40mg',                   company: 'Incepta Pharma',    type: 'Tablet',  price: 8,    mrp: 9,    strip: 28, category: 'Blood Pressure', rx: true,  stock: true,  discount: 11, desc: 'ARB antihypertensive with 24-hour blood pressure control.',                                 alternatives: [7, 14] },
  { id: 18, slug: 'dermazin',        name: 'Dermazin Cream',   generic: 'Silver Sulfadiazine 1%',             company: 'Square Pharma',     type: 'Cream',   price: 85,   mrp: 90,   strip: 1,  category: 'Skin Care',     rx: false, stock: true,  discount: 6,  desc: 'Topical antibiotic cream for burns, wounds, and skin infections.',                           alternatives: []      },
  { id: 19, slug: 'fexo-120',        name: 'Fexo 120',         generic: 'Fexofenadine 120mg',                 company: 'Square Pharma',     type: 'Tablet',  price: 10,   mrp: 12,   strip: 10, category: 'Respiratory',   rx: false, stock: true,  discount: 17, desc: 'Non-drowsy antihistamine for allergic rhinitis, urticaria.',                               alternatives: []      },
  { id: 20, slug: 'gluconil-5',      name: 'Gluconil 5',       generic: 'Glibenclamide 5mg',                  company: 'Opsonin Pharma',    type: 'Tablet',  price: 2,    mrp: 2.50, strip: 30, category: 'Diabetes',      rx: true,  stock: true,  discount: 20, desc: 'Sulfonylurea for type 2 diabetes. Stimulates insulin secretion.',                           alternatives: [13]    },
];

export const categories = [
  { id: 1, name: 'Pain Relief',    icon: '🩹', count: 120, color: 'bg-orange-50', border: 'border-orange-200' },
  { id: 2, name: 'Gastric',        icon: '🫁', count: 85,  color: 'bg-green-50',  border: 'border-green-200'  },
  { id: 3, name: 'Antibiotic',     icon: '🧬', count: 200, color: 'bg-blue-50',   border: 'border-blue-200'   },
  { id: 4, name: 'Blood Pressure', icon: '❤️', count: 95,  color: 'bg-red-50',    border: 'border-red-200'    },
  { id: 5, name: 'Vitamins',       icon: '💪', count: 150, color: 'bg-purple-50', border: 'border-purple-200' },
  { id: 6, name: 'Respiratory',    icon: '🌬️', count: 70,  color: 'bg-cyan-50',   border: 'border-cyan-200'   },
  { id: 7, name: 'Diabetes',       icon: '🩸', count: 110, color: 'bg-yellow-50', border: 'border-yellow-200' },
  { id: 8, name: 'Skin Care',      icon: '✨', count: 60,  color: 'bg-pink-50',   border: 'border-pink-200'   },
];

export const companies = [
  'Square Pharma', 'Beximco Pharma', 'Incepta Pharma',
  'Opsonin Pharma', 'Healthcare Pharma', 'Renata', 'ACI Ltd', 'Aristopharma',
];

export function getMedicineBySlug(slug) {
  return medicines.find(m => m.slug === slug) || null;
}

export function getMedicineById(id) {
  return medicines.find(m => m.id === Number(id)) || null;
}

export function getAlternatives(medicine) {
  if (!medicine?.alternatives?.length) return [];
  return medicine.alternatives.map(id => getMedicineById(id)).filter(Boolean);
}

export function searchMedicines({ query = '', category = '', company = '', inStock = false } = {}) {
  return medicines.filter(m => {
    const q = query.toLowerCase();
    const matchQ = !q || m.name.toLowerCase().includes(q) || m.generic.toLowerCase().includes(q) || m.company.toLowerCase().includes(q);
    const matchCat = !category || m.category === category;
    const matchCo = !company || m.company === company;
    const matchStock = !inStock || m.stock;
    return matchQ && matchCat && matchCo && matchStock;
  });
}
