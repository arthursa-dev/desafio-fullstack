CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE EXTENSION pgcrypto;

CREATE TABLE professional_type (
  id UUID default gen_random_uuid() PRIMARY KEY,
  description TEXT,
  situation BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON professional_type
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE professional (
  id UUID default gen_random_uuid() PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email Text,
  professional_type UUID references professional_type(id),
  situation BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON professional
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

