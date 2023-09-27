import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://iwxacjmydxiforzrvurs.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eGFjam15ZHhpZm9yenJ2dXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4NTAwMTksImV4cCI6MjAxMDQyNjAxOX0.KkiYYTJUNTD3K7OkHASV3_ZEv5NIFN-Farw9lT7QIfk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)