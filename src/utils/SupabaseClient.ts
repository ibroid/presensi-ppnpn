import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl || 'http://192.168.0.202:8888', supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjcxODE0ODAwLAogICAgImV4cCI6IDE4Mjk1ODEyMDAKfQ.137M3YCJ6BriMJmHVnXrYXJ8BKMOCKZr_dxmXvpvni4');

