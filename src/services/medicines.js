// MediMart Local Medicine Database
// In production, this would come from your backend API / WooCommerce

export const MEDICINES = [
  { id: 1, name: 'Napa Extra', generic: 'Paracetamol 500mg + Caffeine 65mg', company: 'Beximco Pharma', type: 'Tablet', price: 2.50, mrp: 2.80, strip: 10, category: 'Pain Relief', rx: false, stock: true, discount: 11, desc: 'Used for headache, toothache, body pain and fever.', dosage: '1-2 tablets every 4-6 hours as needed.' },
  { id: 2, name: 'Seclo 20', generic: 'Omeprazole 20mg', company: 'Square Pharma', type: 'Capsule', price: 6, mrp: 7, strip: 14, category: 'Gastric', rx: false, stock: true, discount: 14, desc: 'Used for gastric ulcer, heartburn, and acid reflux.', dosage: '1 capsule before breakfast daily.' },
  { id: 3, name: 'Losectil 20', generic: 'Omeprazole 20mg', company: 'Incepta Pharma', type: 'Capsule', price: 5.50, mrp: 6.50, strip: 14, category: 'Gastric', rx: false, stock: true, discount: 15, desc: 'Alternative for Seclo. Used for acid reflux and GERD.', dosage: '1 capsule before breakfast daily.' },
  { id: 4, name: 'Sergel 20', generic: 'Esomeprazole 20mg', company: 'Healthcare Pharma', type: 'Capsule', price: 8, mrp: 9, strip: 14, category: 'Gastric', rx: false, stock: true, discount: 11, desc: 'Proton pump inhibitor for GERD and peptic ulcers.', dosage: '1 capsule daily, 1 hour before meal.' },
  { id: 5, name: 'Monas 10', generic: 'Montelukast 10mg', company: 'Square Pharma', type: 'Tablet', price: 12, mrp: 14, strip: 10, category: 'Respiratory', rx: true, stock: true, discount: 14, desc: 'For asthma prevention and allergic rhinitis.', dosage: '1 tablet at bedtime.' },
  { id: 6, name: 'Ciprocin 500', generic: 'Ciprofloxacin 500mg', company: 'Square Pharma', type: 'Tablet', price: 10, mrp: 12, strip: 10, category: 'Antibiotic', rx: true, stock: true, discount: 17, desc: 'Broad-spectrum antibiotic for bacterial infections.', dosage: '1 tablet twice daily for 5-7 days.' },
  { id: 7, name: 'Amlodac 5', generic: 'Amlodipine 5mg', company: 'Opsonin Pharma', type: 'Tablet', price: 3, mrp: 3.50, strip: 30, category: 'Blood Pressure', rx: true, stock: true, discount: 14, desc: 'Calcium channel blocker for hypertension.', dosage: '1 tablet once daily.' },
  { id: 8, name: 'Neurofer Plus', generic: 'Iron + Folic Acid + B12', company: 'Renata', type: 'Capsule', price: 5, mrp: 5.50, strip: 30, category: 'Vitamins', rx: false, stock: true, discount: 9, desc: 'For iron deficiency anemia and pregnancy support.', dosage: '1 capsule daily after meal.' },
  { id: 9, name: 'Azifast 500', generic: 'Azithromycin 500mg', company: 'Beximco Pharma', type: 'Tablet', price: 40, mrp: 45, strip: 3, category: 'Antibiotic', rx: true, stock: true, discount: 11, desc: 'Macrolide antibiotic for respiratory and skin infections.', dosage: '1 tablet daily for 3 days.' },
  { id: 10, name: 'Fluclav 500', generic: 'Amoxicillin + Clavulanic Acid', company: 'Incepta Pharma', type: 'Tablet', price: 22, mrp: 25, strip: 8, category: 'Antibiotic', rx: true, stock: false, discount: 12, desc: 'For severe bacterial infections resistant to other antibiotics.', dosage: '1 tablet 3 times daily.' },
  { id: 11, name: 'Tofen 400', generic: 'Ibuprofen 400mg', company: 'Square Pharma', type: 'Tablet', price: 3, mrp: 3.50, strip: 10, category: 'Pain Relief', rx: false, stock: true, discount: 14, desc: 'NSAID for pain, inflammation, and fever.', dosage: '1 tablet 3 times daily after food.' },
  { id: 12, name: 'Ceevit', generic: 'Vitamin C 250mg', company: 'Square Pharma', type: 'Tablet', price: 1.50, mrp: 1.80, strip: 10, category: 'Vitamins', rx: false, stock: true, discount: 17, desc: 'Vitamin C supplement for immune support.', dosage: '1-2 tablets daily.' },
  { id: 13, name: 'Maxpro 20', generic: 'Esomeprazole 20mg', company: 'Renata', type: 'Capsule', price: 7, mrp: 8, strip: 14, category: 'Gastric', rx: false, stock: true, discount: 12, desc: 'For acid reflux, GERD, and stomach ulcers.', dosage: '1 capsule daily before meal.' },
  { id: 14, name: 'Ace Plus', generic: 'Paracetamol 500mg + Caffeine 65mg', company: 'Square Pharma', type: 'Tablet', price: 2, mrp: 2.50, strip: 10, category: 'Pain Relief', rx: false, stock: true, discount: 20, desc: 'For headache, fever, cold and muscle pain.', dosage: '1-2 tablets every 4-6 hours.' },
  { id: 15, name: 'Losartan 50', generic: 'Losartan 50mg', company: 'Beximco Pharma', type: 'Tablet', price: 5, mrp: 6, strip: 30, category: 'Blood Pressure', rx: true, stock: true, discount: 17, desc: 'ARB for hypertension and kidney protection.', dosage: '1 tablet once daily.' },
  { id: 16, name: 'Metform 500', generic: 'Metformin 500mg', company: 'Square Pharma', type: 'Tablet', price: 2, mrp: 2.50, strip: 30, category: 'Diabetes', rx: true, stock: true, discount: 20, desc: 'First-line treatment for Type 2 Diabetes.', dosage: '1 tablet twice daily with meals.' },
  { id: 17, name: 'D-Rise 20000', generic: 'Cholecalciferol 20000 IU', company: 'Square Pharma', type: 'Capsule', price: 15, mrp: 18, strip: 5, category: 'Vitamins', rx: false, stock: true, discount: 17, desc: 'Vitamin D3 supplement for deficiency.', dosage: '1 capsule weekly.' },
  { id: 18, name: 'Fexo 120', generic: 'Fexofenadine 120mg', company: 'Square Pharma', type: 'Tablet', price: 8, mrp: 9, strip: 10, category: 'Allergy', rx: false, stock: true, discount: 11, desc: 'Non-drowsy antihistamine for allergy relief.', dosage: '1 tablet once daily.' },
  { id: 19, name: 'Pantonix 40', generic: 'Pantoprazole 40mg', company: 'ACI Ltd', type: 'Tablet', price: 7, mrp: 8, strip: 14, category: 'Gastric', rx: false, stock: true, discount: 12, desc: 'PPI for gastric ulcer, GERD, and heartburn.', dosage: '1 tablet daily before meal.' },
  { id: 20, name: 'Doxicap 100', generic: 'Doxycycline 100mg', company: 'Square Pharma', type: 'Capsule', price: 4, mrp: 5, strip: 10, category: 'Antibiotic', rx: true, stock: true, discount: 20, desc: 'Broad-spectrum antibiotic for various infections.', dosage: '1 capsule twice daily.' },
];

export const CATEGORIES = [
  { id: 1, name: 'Pain Relief', icon: '\uD83E\uDE79', count: 120, color: '#FFF3E0' },
  { id: 2, name: 'Gastric', icon: '\uD83E\uDEC1', count: 85, color: '#E8F5E9' },
  { id: 3, name: 'Antibiotic', icon: '\uD83E\uDDEC', count: 200, color: '#E3F2FD' },
  { id: 4, name: 'Blood Pressure', icon: '\u2764\uFE0F', count: 95, color: '#FCE4EC' },
  { id: 5, name: 'Vitamins', icon: '\uD83D\uDCAA', count: 150, color: '#F3E5F5' },
  { id: 6, name: 'Respiratory', icon: '\uD83C\uDF2C\uFE0F', count: 70, color: '#E0F7FA' },
  { id: 7, name: 'Diabetes', icon: '\uD83E\uDE78', count: 110, color: '#FFF8E1' },
  { id: 8, name: 'Allergy', icon: '\uD83E\uDD27', count: 60, color: '#FAFAFA' },
  { id: 9, name: 'Skin Care', icon: '\u2728', count: 45, color: '#FFF0F5' },
  { id: 10, name: 'Eye Care', icon: '\uD83D\uDC41\uFE0F', count: 35, color: '#E8EAF6' },
];

export const COMPANIES = [
  'Square Pharma', 'Beximco Pharma', 'Incepta Pharma',
  'Opsonin Pharma', 'Healthcare Pharma', 'Renata',
  'ACI Ltd', 'Aristopharma', 'Eskayef', 'Radiant Pharma',
];

export const getMedicines = (category, search) => {
  let results = [...MEDICINES];
  if (category) results = results.filter(m => m.category === category);
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.generic.toLowerCase().includes(q) ||
      m.company.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
    );
  }
  return results;
};

export const getSimilar = (med) => {
  return MEDICINES.filter(m => m.generic === med.generic && m.id !== med.id);
};

export const getDeals = () => MEDICINES.filter(m => m.discount >= 14).slice(0, 6);
export const getPopular = () => MEDICINES.filter(m => !m.rx).slice(0, 6);
