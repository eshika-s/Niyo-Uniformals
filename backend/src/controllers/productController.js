import { supabase } from '../config/supabase.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category, featured, search, gender, fabric_type, customization, max_price, page = 1, limit = 12, showHidden = false } = req.query;
    
    let query = supabase
      .from('products')
      .select('*, categories(id, name, slug)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (showHidden !== 'true') query = query.eq('is_visible', true);
    if (category) query = query.eq('category_id', category);
    if (featured === 'true') query = query.eq('is_featured', true);
    if (search) query = query.ilike('name', `%${search}%`);
    if (gender) query = query.eq('gender', gender);
    if (fabric_type) query = query.ilike('fabric', `%${fabric_type}%`);
    if (customization !== undefined && customization !== '') {
      query = query.eq('customization_available', customization === 'true');
    }
    if (max_price) query = query.lte('price_max', max_price);

    const { data, count, error } = await query;
    
    if (error) throw error;
    res.json({ data, count });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(id, name, slug)')
      .eq('id', req.params.id)
      .single();
      
    if (error) throw error;
    if (!data) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json({ data });
  } catch (error) {
    next(error);
  }
};
