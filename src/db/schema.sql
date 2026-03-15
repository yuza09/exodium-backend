CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  race VARCHAR(50) NOT NULL DEFAULT 'Les Vestiges',
  level INTEGER NOT NULL DEFAULT 1,
  xp BIGINT NOT NULL DEFAULT 0,
  score BIGINT NOT NULL DEFAULT 0,
  federation_rep INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  last_active_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS planets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES players(id) ON DELETE SET NULL,
  name VARCHAR(100) NOT NULL,
  coords VARCHAR(50) NOT NULL,
  galaxy INTEGER NOT NULL DEFAULT 1,
  system_id VARCHAR(50),
  rarity VARCHAR(20) DEFAULT 'common',
  model CHAR(1) DEFAULT 'A',
  planet_level INTEGER DEFAULT 1,
  planet_xp BIGINT DEFAULT 0,
  buildings JSONB DEFAULT '{}',
  resources JSONB DEFAULT '{"mfe":1000,"celec":500,"gneb":200,"bio":300,"energy":100}',
  drones JSONB DEFAULT '{"total":1,"assigned":{}}',
  last_production_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fleets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES players(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'orbit',
  mission VARCHAR(30) DEFAULT 'transport',
  origin VARCHAR(100),
  destination VARCHAR(100),
  ships JSONB DEFAULT '{}',
  cargo JSONB DEFAULT '{}',
  formation VARCHAR(20) DEFAULT 'mur',
  fleet_xp INTEGER DEFAULT 0,
  fleet_level INTEGER DEFAULT 1,
  departed_at TIMESTAMP,
  arrival_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS market_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  type VARCHAR(4) NOT NULL,
  resource VARCHAR(20) NOT NULL,
  quantity BIGINT NOT NULL,
  price INTEGER NOT NULL,
  filled BIGINT DEFAULT 0,
  status VARCHAR(10) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS combats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attacker_id UUID REFERENCES players(id),
  defender_id UUID REFERENCES players(id),
  location VARCHAR(100),
  result VARCHAR(10),
  rounds JSONB DEFAULT '[]',
  loot JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_planets_owner ON planets(owner_id);
CREATE INDEX IF NOT EXISTS idx_fleets_owner ON fleets(owner_id);
CREATE INDEX IF NOT EXISTS idx_market_resource ON market_orders(resource, status);