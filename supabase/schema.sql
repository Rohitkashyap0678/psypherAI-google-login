-- Create custom types
CREATE TYPE tier_type AS ENUM ('free', 'silver', 'gold', 'platinum');

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    image_url TEXT,
    tier tier_type NOT NULL DEFAULT 'free',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Anyone can read events (filtering will be done in the application)
CREATE POLICY "Events are viewable by everyone" ON events
    FOR SELECT USING (true);

-- Only admins can insert/update/delete events (you can modify this as needed)
CREATE POLICY "Only admins can modify events" ON events
    FOR ALL USING (false);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS events_tier_idx ON events(tier);
CREATE INDEX IF NOT EXISTS events_date_idx ON events(event_date);
CREATE INDEX IF NOT EXISTS events_created_at_idx ON events(created_at);

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 