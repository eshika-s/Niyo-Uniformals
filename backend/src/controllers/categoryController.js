import { supabase } from '../config/supabase.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true })
      .order('name');
      
    if (error) throw error;
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories with product count
// @route   GET /api/categories/with-count
// @access  Public
export const getCategoriesWithCount = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*, products(count)')
      .order('display_order', { ascending: true })
      .order('name');
      
    if (error) throw error;
    
    const normalized = data.map(c => ({
      ...c,
      product_count: Array.isArray(c.products) ? c.products[0]?.count ?? 0 : 0,
    }));
    
    res.json({ data: normalized });
  } catch (error) {
    next(error);
  }
};
