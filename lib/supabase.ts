import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zocncwchaakjtsvlscmd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Ot34P55l4JGe2RjZywLovA_UokWsJ0I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
