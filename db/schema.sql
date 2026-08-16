DROP TABLE IF EXISTS walks;
DROP TABLE IF EXISTS feedings;

CREATE TABLE walks (
  id SERIAL PRIMARY KEY,
  duration INTEGER NOT NULL,
  notes TEXT,
  potty_breaks TEXT[],
  quick_notes TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE feedings (
  id SERIAL PRIMARY KEY,
  portion_size INTEGER NOT NULL,
  food_type TEXT NOT NULL,
  appetite TEXT,
  notes TEXT,
  fed_at TIMESTAMPTZ DEFAULT NOW()
);
