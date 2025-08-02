-- Insert sample events for each tier
-- Free tier events
INSERT INTO events (title, description, event_date, image_url, tier) VALUES
(
    'Introduction to Web Development',
    'Learn the basics of HTML, CSS, and JavaScript in this beginner-friendly workshop. Perfect for those starting their coding journey.',
    '2024-02-15 18:00:00+00',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    'free'
),
(
    'Open Source Community Meetup',
    'Join fellow developers to discuss open source projects, share experiences, and network with like-minded individuals.',
    '2024-02-20 19:00:00+00',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop',
    'free'
);

-- Silver tier events
INSERT INTO events (title, description, event_date, image_url, tier) VALUES
(
    'Advanced React Patterns Workshop',
    'Deep dive into advanced React patterns including hooks, context, and performance optimization techniques.',
    '2024-02-18 14:00:00+00',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    'silver'
),
(
    'Cloud Architecture Masterclass',
    'Learn how to design scalable cloud architectures using AWS, Azure, and Google Cloud Platform.',
    '2024-02-25 16:00:00+00',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    'silver'
);

-- Gold tier events
INSERT INTO events (title, description, event_date, image_url, tier) VALUES
(
    'Executive Tech Leadership Summit',
    'Exclusive summit for tech leaders discussing strategy, innovation, and digital transformation.',
    '2024-03-01 09:00:00+00',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
    'gold'
),
(
    'AI & Machine Learning Conference',
    'Cutting-edge conference featuring the latest developments in artificial intelligence and machine learning.',
    '2024-03-05 10:00:00+00',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    'gold'
);

-- Platinum tier events
INSERT INTO events (title, description, event_date, image_url, tier) VALUES
(
    'Private Investor Pitch Night',
    'Exclusive opportunity to pitch your startup ideas to top-tier venture capitalists and angel investors.',
    '2024-03-10 18:00:00+00',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
    'platinum'
),
(
    'C-Suite Technology Dinner',
    'Intimate dinner gathering for C-level executives to discuss technology trends and business strategy.',
    '2024-03-15 19:00:00+00',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    'platinum'
); 