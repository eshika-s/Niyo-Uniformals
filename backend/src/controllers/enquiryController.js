import { supabase } from '../config/supabase.js';

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Public / Admin
export const getEnquiries = async (req, res, next) => {
  try {
    const { type, status, search, dateFrom, dateTo, page = 1, limit = 50 } = req.query;
    
    let query = supabase
      .from('enquiries')
      .select('*, products(id, name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (type) query = query.eq('type', type);
    if (status) query = query.eq('status', status);
    if (search) query = query.or(`customer_name.ilike.%${search}%,phone.ilike.%${search}%`);
    if (dateFrom) query = query.gte('created_at', dateFrom);
    if (dateTo) query = query.lte('created_at', dateTo);

    const { data, count, error } = await query;
    if (error) throw error;
    res.json({ data, count });
  } catch (error) {
    next(error);
  }
};

// @desc    Create an enquiry
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res, next) => {
  try {
    const { name, ...rest } = req.body;
    const { data, error } = await supabase
      .from('enquiries')
      .insert({ ...rest, customer_name: name ?? req.body.customer_name })
      .select()
      .single();
      
    if (error) throw error;
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id/status
// @access  Admin
export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { data, error } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();
      
    if (error) throw error;
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Admin
export const deleteEnquiry = async (req, res, next) => {
  try {
    const { error } = await supabase.from('enquiries').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

// @desc    Get enquiry stats
// @route   GET /api/enquiries/stats
// @access  Admin
export const getEnquiryStats = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const [total, todayCount, unread] = await Promise.all([
      supabase.from('enquiries').select('*', { count: 'exact', head: true }),
      supabase.from('enquiries').select('*', { count: 'exact', head: true }).gte('created_at', today),
      supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    ]);
    
    res.json({
      data: {
        enquiries: total.count ?? 0,
        today: todayCount.count ?? 0,
        unread: unread.count ?? 0,
      }
    });
  } catch (error) {
    next(error);
  }
};
