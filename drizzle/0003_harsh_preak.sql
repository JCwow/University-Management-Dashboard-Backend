-- Step 1: Add a new temporary boolean column (nullable first)
ALTER TABLE "user" ADD COLUMN "email_verified_new" boolean DEFAULT false;--> statement-breakpoint
-- Step 2: Convert existing data: NULL -> false, any timestamp -> true
UPDATE "user" SET "email_verified_new" = CASE WHEN "email_verified" IS NULL THEN false ELSE true END;--> statement-breakpoint
-- Step 3: Set the new column to NOT NULL
ALTER TABLE "user" ALTER COLUMN "email_verified_new" SET NOT NULL;--> statement-breakpoint
-- Step 4: Drop the old timestamp column
ALTER TABLE "user" DROP COLUMN "email_verified";--> statement-breakpoint
-- Step 5: Rename the new column to the original name
ALTER TABLE "user" RENAME COLUMN "email_verified_new" TO "email_verified";