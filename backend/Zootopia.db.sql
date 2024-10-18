BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "genders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "categories" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "behaviorals" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"behavioral"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "animals" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"description"	text,
	"birth_day"	datetime,
	"gender_id"	integer,
	"category_id"	integer,
	"behavioral_id"	integer,
	CONSTRAINT "fk_behaviorals_animals" FOREIGN KEY("behavioral_id") REFERENCES "behaviorals"("id"),
	CONSTRAINT "fk_categories_animals" FOREIGN KEY("category_id") REFERENCES "categories"("id"),
	CONSTRAINT "fk_genders_animals" FOREIGN KEY("gender_id") REFERENCES "genders"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE INDEX IF NOT EXISTS "idx_genders_deleted_at" ON "genders" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_categories_deleted_at" ON "categories" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_behaviorals_deleted_at" ON "behaviorals" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_animals_deleted_at" ON "animals" (
	"deleted_at"
);
COMMIT;
