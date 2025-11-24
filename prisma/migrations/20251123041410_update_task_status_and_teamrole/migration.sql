/*
  Warnings:

  - The values [BLOCKED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - The values [OWNER,ADMIN,MEMBER] on the enum `TeamRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Made the column `subtopicId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE', 'SUBMITTED', 'APPROVED', 'REJECTED');
ALTER TABLE "public"."Task" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'TODO';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TeamRole_new" AS ENUM ('MANAGER', 'STAFF');
ALTER TABLE "public"."UserTeam" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "UserTeam" ALTER COLUMN "role" TYPE "TeamRole_new" USING ("role"::text::"TeamRole_new");
ALTER TYPE "TeamRole" RENAME TO "TeamRole_old";
ALTER TYPE "TeamRole_new" RENAME TO "TeamRole";
DROP TYPE "public"."TeamRole_old";
ALTER TABLE "UserTeam" ALTER COLUMN "role" SET DEFAULT 'STAFF';
COMMIT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "subtopicId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "UserTeam" ALTER COLUMN "role" SET DEFAULT 'STAFF';

-- DropEnum
DROP TYPE "public"."Role";
