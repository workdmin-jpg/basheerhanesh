/*
# Create site_content table for Bashier editable website

1. New Tables
- `site_content`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `key` (text, unique, not null) — identifies which content blob (e.g. 'main')
  - `data` (jsonb, not null) — stores the entire editable site content as a JSON object
  - `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `site_content`.
- This is a single-tenant public website with an admin panel protected by a password
  stored in the frontend; there is no Supabase auth sign-in screen. All content is
  intentionally public to read, and writable by anon + authenticated so the admin
  panel can save changes via the anon-key client.
- Four separate CRUD policies scoped TO anon, authenticated.

3. Notes
- The entire site's editable content (hero, about, services, projects, news,
  testimonials, partners, faq, contact, footer, design settings, language strings)
  lives in a single jsonb `data` column keyed by 'main'. This keeps the schema
  simple and lets the admin panel save the whole content object at once.
*/

CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_site_content" ON site_content;
CREATE POLICY "anon_select_site_content"
  ON site_content FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_site_content" ON site_content;
CREATE POLICY "anon_insert_site_content"
  ON site_content FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_site_content" ON site_content;
CREATE POLICY "anon_update_site_content"
  ON site_content FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_site_content" ON site_content;
CREATE POLICY "anon_delete_site_content"
  ON site_content FOR DELETE
  TO anon, authenticated USING (true);
