CREATE DATABASE IF NOT EXISTS smk_project
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE smk_project;

CREATE TABLE IF NOT EXISTS artists (
    artist_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (artist_id),
    UNIQUE KEY uq_artists_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS categories (
    category_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (category_id),
    UNIQUE KEY uq_categories_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS artworks (
    artwork_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    artist_id INT UNSIGNED NULL,
    category_id INT UNSIGNED NULL,
    title VARCHAR(255) NOT NULL,
    artwork_year SMALLINT UNSIGNED NULL,
    description TEXT NULL,
    image_url VARCHAR(2048) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (artwork_id),
    KEY idx_artworks_artist_id (artist_id),
    KEY idx_artworks_category_id (category_id),
    CONSTRAINT fk_artworks_artist
        FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_artworks_category
        FOREIGN KEY (category_id) REFERENCES categories (category_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
