USE smk_project;

INSERT IGNORE INTO artists (name)
VALUES ('Kunstner A'), ('Kunstner B'), ('Johan Mandelberg');

INSERT IGNORE INTO categories (name)
VALUES ('Danish Art'), ('European Art');

INSERT INTO artworks (title, artist_id, category_id, artwork_year, description, image_url)
SELECT
    seeded.title,
    artists.artist_id,
    categories.category_id,
    seeded.artwork_year,
    seeded.description,
    seeded.image_url
FROM (
    SELECT
        'Use Us' AS title,
        'Kunstner A' AS artist_name,
        'Danish Art' AS category_name,
        NULL AS artwork_year,
        NULL AS description,
        '/artworks/use-us-udstilling.jpg' AS image_url
    UNION ALL SELECT
        'Call Center', 'Kunstner B', 'European Art', NULL, NULL,
        '/artworks/call-center-udstilling.jpg'
    UNION ALL SELECT
        'Unshore', 'Kunstner A', 'Danish Art', NULL, NULL,
        '/artworks/unshore-udstilling.jpg'
    UNION ALL SELECT
        'Landskab i italiensk manér', 'Johan Mandelberg', 'Danish Art', 1745,
        'Landskab i italiensk manér blev malet af Johan Mandelberg mellem 1745 og 1786. Værket er udført i olie på træ og bruger primært brune toner.',
        '/artworks/johanmandelberglandskab.jpg'
) AS seeded
JOIN artists ON artists.name = seeded.artist_name
JOIN categories ON categories.name = seeded.category_name
WHERE NOT EXISTS (
    SELECT 1
    FROM artworks AS existing
    WHERE existing.title = seeded.title
);
