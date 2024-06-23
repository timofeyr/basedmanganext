import { createClient } from '@/utils/supabase/server'

export const getServerSideSupabase = async (req?: any, res?: any) => {
  const supabase = createClient();
  const { data: sessionData } = await (await supabase).auth.getSession();

  return { session: sessionData?.session?.user.id };
};