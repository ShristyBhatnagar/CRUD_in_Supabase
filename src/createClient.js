import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://dfeciifptcpcjypnctgb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmZWNpaWZwdGNwY2p5cG5jdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5ODE3ODMsImV4cCI6MjAwOTU1Nzc4M30.RTy-8BugdsuJDQJUYtRG07zz5oQTnRYkUn2Lgijiqtw"
);
