CREATE TABLE entry_views (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  entry_id TEXT NOT NULL,
  locale TEXT NOT NULL,
  views BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(entry_id, locale)
);

ALTER TABLE entry_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_can_view_counts" 
ON entry_views FOR SELECT USING (true);

CREATE POLICY "only_service_role_can_insert" 
ON entry_views FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "only_service_role_can_update" 
ON entry_views FOR UPDATE USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

CREATE INDEX idx_entry_views_entry_id ON entry_views(entry_id);
CREATE INDEX idx_entry_views_locale ON entry_views(locale);