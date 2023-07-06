-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               PostgreSQL 15.3, compiled by Visual C++ build 1914, 64-bit
-- Server OS:                    
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table public.documents
CREATE TABLE IF NOT EXISTS "documents" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''documents_id_seq''::regclass)',
	"original_file_name" TEXT NOT NULL,
	"size" INTEGER NOT NULL,
	"encoding" TEXT NOT NULL,
	"type" TEXT NOT NULL,
	"destination" TEXT NOT NULL,
	"file_name" TEXT NOT NULL,
	"path" TEXT NOT NULL,
	"digest" TEXT NULL DEFAULT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT '2023-05-24 19:01:27.066584+05:30',
	"ip_address" VARCHAR(255) NULL DEFAULT 'NULL::character varying',
	"tags" TEXT NULL DEFAULT NULL,
	"deleted" INTEGER NULL DEFAULT '0',
	"folder_id" INTEGER NULL DEFAULT NULL,
	"module_id" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("id")
);

-- Dumping data for table public.documents: 2 rows
/*!40000 ALTER TABLE "documents" DISABLE KEYS */;
INSERT INTO "documents" ("id", "original_file_name", "size", "encoding", "type", "destination", "file_name", "path", "digest", "created_at", "ip_address", "tags", "deleted", "folder_id", "module_id") VALUES
	(123, 'Screenshot 2023-03-28 113330.png', 37929, '7bit', 'image/png', 'uploads/water', '1687502133313-907328882.png', 'uploads\water\1687502133313-907328882.png', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2023-05-24 19:01:27.066584+05:30', '::ffff:192.168.0.106', 'water', 0, 1, 22),
	(125, 'Screenshot 2023-03-31 152231.png', 71927, '7bit', 'image/png', 'uploads/property', '1687503420755-129332366.png', 'uploads\property\1687503420755-129332366.png', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2023-05-24 19:01:27.066584+05:30', '::ffff:192.168.0.106', 'test', 0, 2, 24),
	(122, 'Screenshot 2023-03-28 105409.png', 91336, '7bit', 'image/png', 'uploads/property', '1687502073420-657175177.png', 'uploads\property\1687502073420-657175177.png', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2023-05-24 19:01:27.066584+05:30', '::ffff:192.168.0.106', 'myFile', 0, 2, 24),
	(124, 'Screenshot 2023-03-28 113330.png', 37929, '7bit', 'image/png', 'uploads/water', '1687503118749-837115360.png', 'uploads\water\1687503118749-837115360.png', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2023-05-24 19:01:27.066584+05:30', '::ffff:192.168.0.106', 'water', 0, 1, 22);
/*!40000 ALTER TABLE "documents" ENABLE KEYS */;

-- Dumping structure for table public.folders
CREATE TABLE IF NOT EXISTS "folders" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''folders_folder_id_seq''::regclass)',
	"folder_token" VARCHAR(100) NOT NULL,
	"folder_name" VARCHAR(100) NOT NULL,
	"metadata" JSONB NULL DEFAULT NULL,
	"created_at" TIMESTAMP NULL DEFAULT 'now()',
	"parent_folder_id" INTEGER NULL DEFAULT NULL,
	"folder_tags" VARCHAR(50) NULL DEFAULT 'NULL::character varying',
	"module_id" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "folders_folder_token_key" ("folder_token")
);

-- Dumping data for table public.folders: 2 rows
/*!40000 ALTER TABLE "folders" DISABLE KEYS */;
INSERT INTO "folders" ("id", "folder_token", "folder_name", "metadata", "created_at", "parent_folder_id", "folder_tags", "module_id") VALUES
	(1, '111', 'water', NULL, '2023-06-16 12:34:13.522384', 0, NULL, 22),
	(2, '112', 'property', NULL, '2023-06-16 12:53:09.515904', 0, NULL, 24);
/*!40000 ALTER TABLE "folders" ENABLE KEYS */;

-- Dumping structure for table public.modules
CREATE TABLE IF NOT EXISTS "modules" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''module_master_id_seq''::regclass)',
	"module_name" VARCHAR NULL DEFAULT NULL,
	"created_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"status" INTEGER NULL DEFAULT '1',
	PRIMARY KEY ("id")
);

-- Dumping data for table public.modules: -1 rows
/*!40000 ALTER TABLE "modules" DISABLE KEYS */;
INSERT INTO "modules" ("id", "module_name", "created_at", "updated_at", "status") VALUES
	(22, 'Water', NULL, NULL, 1),
	(24, 'Property', NULL, NULL, 1),
	(27, 'mrinal', NULL, NULL, 1),
	(28, 'mrinal', NULL, NULL, 1),
	(29, 'mrinal', NULL, NULL, 1),
	(30, 'mrinal', NULL, NULL, 1),
	(31, 'mrinal', NULL, NULL, 1),
	(32, 'mrinal', NULL, NULL, 1),
	(33, 'mrinal', NULL, NULL, 1),
	(34, 'mrinal', NULL, NULL, 1),
	(35, 'mrinal', NULL, NULL, 1),
	(36, 'mrinal', NULL, NULL, 1),
	(37, 'mrinal', NULL, NULL, 1),
	(38, 'mrinal', NULL, NULL, 1),
	(39, 'mrinal', NULL, NULL, 1),
	(40, 'mrinal', NULL, NULL, 1),
	(41, 'mrinal', NULL, NULL, 1),
	(42, 'mrinal', NULL, NULL, 1),
	(43, 'mrinal', NULL, NULL, 1),
	(44, 'mrinal', NULL, NULL, 1);
/*!40000 ALTER TABLE "modules" ENABLE KEYS */;

-- Dumping structure for table public.tokens
CREATE TABLE IF NOT EXISTS "tokens" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''tokens_id_seq''::regclass)',
	"token" VARCHAR(255) NULL DEFAULT NULL,
	"module_id" INTEGER NULL DEFAULT NULL,
	"status" INTEGER NULL DEFAULT '1',
	"created_at" TIMESTAMP NULL DEFAULT 'CURRENT_TIMESTAMP',
	"updated_at" TIMESTAMP NULL DEFAULT 'CURRENT_TIMESTAMP',
	PRIMARY KEY ("id"),
	UNIQUE INDEX "tokens_token_key" ("token")
);

-- Dumping data for table public.tokens: -1 rows
/*!40000 ALTER TABLE "tokens" DISABLE KEYS */;
INSERT INTO "tokens" ("id", "token", "module_id", "status", "created_at", "updated_at") VALUES
	(7, '420', 24, 1, '2023-06-23 13:36:43.496749', '2023-06-23 13:36:43.496749'),
	(9, '320', 22, 1, '2023-06-23 13:36:56.624722', '2023-06-23 13:36:56.624722'),
	(27, '4202', 44, 1, '2023-07-04 18:43:18.743414', '2023-07-04 18:43:18.743414');
/*!40000 ALTER TABLE "tokens" ENABLE KEYS */;

-- Dumping structure for table public.user_infos
CREATE TABLE IF NOT EXISTS "user_infos" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''user_infos_id_seq''::regclass)',
	"name" VARCHAR NULL DEFAULT NULL,
	"phone" VARCHAR NULL DEFAULT NULL,
	"email" VARCHAR(50) NULL DEFAULT NULL,
	"password" VARCHAR NOT NULL DEFAULT '123',
	PRIMARY KEY ("id")
);

-- Dumping data for table public.user_infos: 5 rows
/*!40000 ALTER TABLE "user_infos" DISABLE KEYS */;
INSERT INTO "user_infos" ("id", "name", "phone", "email", "password") VALUES
	(1, 'Dipu', '5858585858', NULL, '123'),
	(3, 'sam', '12345', NULL, '123'),
	(11, 'dipu', '8574747474', 'tes', '123'),
	(16, 'Raj kukmar', '9685857474', 'raj@gmail.com', '123'),
	(17, 'dipu', '5343434', 'disng@f.com', '$2b$10$c2nxsG5jnoLwZIeXaNHeOue8TZ0CxKDSzxbTyQl8PsyaFQuRlcs3a'),
	(18, 'dipu', '5343434', 'one@com', '$2b$10$z8dB9GdTEWPnXG0.HNaPIOEHUSvG6ejczlupPHnqsv1W81nsshC4G'),
	(19, 'dipu', '5343434', 'one@g.com', '$2b$10$gxJ/r80.kejmP57YuY2wTeUiZorE0oy/fP7NFVn6Qiscy40ltPAf.'),
	(20, 'dipu', '5343434', 'one@g.com', '$2b$10$59bRvASGC5amFrMr2c6EAuSFznaTPjnXdSwEa.7rUuzkXkqjIiT2i');
/*!40000 ALTER TABLE "user_infos" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
