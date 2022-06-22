-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "name" SET DEFAULT E'';
