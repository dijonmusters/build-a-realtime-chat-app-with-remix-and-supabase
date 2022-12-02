import { createClient } from "@supabase/supabase-js";

import type { Database } from "db_types";

export default createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
