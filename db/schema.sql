CREATE TABLE walks (
  id SERIAL PRIMARY KEY,
  duration INTEGER NOT NULL,
  notes TEXT,
  potty_breaks TEXT[],
  quick_notes TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE feedings (
  id SERIAL PRIMARY KEY,
  amount TEXT NOT NULL,
  fed_at TIMESTAMP DEFAULT NOW(),
  notes TEXT
);
