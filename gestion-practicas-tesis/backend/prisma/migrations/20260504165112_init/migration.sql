/*
  Warnings:

  - Added the required column `updated_at` to the `avances_tesis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `informes_practica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `practicas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tesis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "avances_tesis" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "informes_practica" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "practicas" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tesis" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
