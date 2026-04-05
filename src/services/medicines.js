/**
 * Re-exports from the shared medicine database.
 * Single source of truth: /shared/data/medicines.js
 */
export {
  MEDICINES,
  CATEGORIES,
  COMPANIES,
  getMedicineById,
  getMedicineBySlug,
  getAlternatives,
  getSimilarByGeneric,
  searchMedicines,
  getDeals,
  getFeatured,
  getPopular,
  // legacy aliases
  medicines,
  categories,
  companies,
} from '../../shared/data/medicines';

// App-specific aliases kept for backward-compat with existing screens
export { MEDICINES as getSimilar } from '../../shared/data/medicines';
