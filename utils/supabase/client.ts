import { createBrowserClient } from "@supabase/ssr";

const defaultUrl = "https://tcujehskyiwrxzshlgmx.supabase.co";
const defaultKey = "sb_publishable_z3h2JMx6HkwU5ZN8pfQYJQ_xrFCr5gu";

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || defaultUrl;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    defaultKey;

  return createBrowserClient(supabaseUrl, supabaseKey);
};
