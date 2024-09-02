import Airtable from "airtable";
import { createClient } from "@supabase/supabase-js";
import { ServerClient } from "postmark/dist";
import { AIRTABLE_API_KEY, POSTMARK_KEY, SUPABASE_SERVICE_KEY, SUPABASE_URL } from "airtable.config";

export const AirtableService = new Airtable({
  apiKey: AIRTABLE_API_KEY,
});

export const SupabaseService = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY
);

export const PostmarkService = new ServerClient(POSTMARK_KEY);
