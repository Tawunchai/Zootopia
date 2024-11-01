BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "behaviorals" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"behavioral"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "genders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"gender"	text,
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
CREATE TABLE IF NOT EXISTS "animals" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"description"	text,
	"weight"	real,
	"height"	real,
	"birthplace"	text,
	"birth_day"	datetime,
	"picture"	text,
	"status"	text,
	"note"	text,
	"gender_id"	integer,
	"category_id"	integer,
	"behavioral_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_genders_animals" FOREIGN KEY("gender_id") REFERENCES "genders"("id"),
	CONSTRAINT "fk_categories_animals" FOREIGN KEY("category_id") REFERENCES "categories"("id"),
	CONSTRAINT "fk_behaviorals_animals" FOREIGN KEY("behavioral_id") REFERENCES "behaviorals"("id")
);
CREATE TABLE IF NOT EXISTS "user_roles" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"role_name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "users" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"username"	text,
	"password"	text,
	"email"	text,
	"first_name"	text,
	"last_name"	text,
	"birthday"	datetime,
	"profile"	longtext,
	"user_role_id"	integer,
	"gender_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_genders_users" FOREIGN KEY("gender_id") REFERENCES "genders"("id"),
	CONSTRAINT "fk_user_roles_users" FOREIGN KEY("user_role_id") REFERENCES "user_roles"("id")
);
CREATE TABLE IF NOT EXISTS "employees" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"bio"	text,
	"experience"	text,
	"education"	text,
	"user_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_users_employees" FOREIGN KEY("user_id") REFERENCES "users"("id")
);
CREATE TABLE IF NOT EXISTS "reviews" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"rating"	integer,
	"comment"	text,
	"review_date"	datetime,
	"picture"	longtext,
	"user_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_users_reviews" FOREIGN KEY("user_id") REFERENCES "users"("id")
);
CREATE TABLE IF NOT EXISTS "likes" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"user_id"	integer,
	"review_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_reviews_like" FOREIGN KEY("review_id") REFERENCES "reviews"("id")
);
CREATE TABLE IF NOT EXISTS "tasks" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"title"	text,
	"start_date"	datetime,
	"end_date"	datetime,
	"all_day"	numeric,
	"user_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_users_task" FOREIGN KEY("user_id") REFERENCES "users"("id")
);
CREATE INDEX IF NOT EXISTS "idx_behaviorals_deleted_at" ON "behaviorals" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_genders_deleted_at" ON "genders" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_categories_deleted_at" ON "categories" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_animals_deleted_at" ON "animals" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_user_roles_deleted_at" ON "user_roles" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_users_deleted_at" ON "users" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_employees_deleted_at" ON "employees" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_reviews_deleted_at" ON "reviews" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_likes_deleted_at" ON "likes" (
	"deleted_at"
);
CREATE UNIQUE INDEX IF NOT EXISTS "user_review_unique" ON "likes" (
	"user_id",
	"review_id"
);
CREATE INDEX IF NOT EXISTS "idx_tasks_deleted_at" ON "tasks" (
	"deleted_at"
);
COMMIT;
