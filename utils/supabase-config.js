// Configuracion publica de Supabase para el marketplace.
// Rellena estos dos valores con los de Project Settings > API.
// Tambien puedes guardarlos en localStorage como supabaseUrl y supabaseAnonKey.
window.SUPABASE_URL = window.SUPABASE_URL || localStorage.getItem('supabaseUrl') || '';
window.SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || localStorage.getItem('supabaseAnonKey') || '';

// Opcional: conservar el ID del negocio cliente si otras paginas lo usan.
window.NEGOCIO_ID_POR_DEFECTO = window.NEGOCIO_ID_POR_DEFECTO || '08638828-1a42-4c60-a6d4-4f2b2b841646';
