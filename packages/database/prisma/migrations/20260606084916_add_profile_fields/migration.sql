-- AlterTable
ALTER TABLE "user_profiles" ADD COLUMN     "country" VARCHAR(100),
ADD COLUMN     "first_name" VARCHAR(60),
ADD COLUMN     "last_name" VARCHAR(60),
ADD COLUMN     "timezone" VARCHAR(64);
