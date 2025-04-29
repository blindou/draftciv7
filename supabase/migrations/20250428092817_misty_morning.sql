/*
  # Create drafts table

  1. New Tables
    - `drafts`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `settings` (jsonb)
      - `state` (jsonb)
      - `team1_connected` (boolean)
      - `team2_connected` (boolean)

  2. Security
    - Enable RLS on `drafts` table
    - Add policies for reading and updating drafts
*/

CREATE TABLE IF NOT EXISTS drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  settings jsonb NOT NULL,
  state jsonb NOT NULL,
  team1_connected boolean DEFAULT false,
  team2_connected boolean DEFAULT false
);

ALTER TABLE drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read drafts"
  ON drafts
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert drafts"
  ON drafts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update drafts"
  ON drafts
  FOR UPDATE
  TO anon
  USING (true);