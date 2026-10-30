INSERT INTO artworks (title, image_url)
SELECT seeded.title, seeded.image_url
FROM (
    SELECT 'Use Us' AS title, '/artworks/use-us-udstilling.jpg' AS image_url
    UNION ALL SELECT 'Call Center', '/artworks/call-center-udstilling.jpg'
    UNION ALL SELECT 'Unshore', '/artworks/unshore-udstilling.jpg'
    UNION ALL SELECT 'Landskab i italiensk manér', '/artworks/johanmandelberglandskab.jpg'
) AS seeded
WHERE NOT EXISTS (
    SELECT 1
    FROM artworks AS existing
    WHERE existing.title = seeded.title
);
