-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COORDINADOR', 'ASESOR', 'ESTUDIANTE', 'EMPRESA_REP');

-- CreateEnum
CREATE TYPE "EstadoPractica" AS ENUM ('POSTULADO', 'ASIGNADO', 'EN_CURSO', 'FINALIZADO', 'RECHAZADO');

-- CreateEnum
CREATE TYPE "EstadoTesis" AS ENUM ('REGISTRADA', 'ASIGNADA', 'EN_DESARROLLO', 'SUSTENTADA', 'APROBADA', 'RECHAZADA');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'ESTUDIANTE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estudiantes" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "escuela" TEXT NOT NULL,
    "anioIngreso" INTEGER NOT NULL,
    "telefono" TEXT,
    "direccion" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "estudiantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asesores" (
    "id" SERIAL NOT NULL,
    "especialidad" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "asesores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coordinadores" (
    "id" SERIAL NOT NULL,
    "facultad" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "coordinadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "ruc" TEXT NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "emailContacto" TEXT NOT NULL,
    "sector" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresas_representantes" (
    "id" SERIAL NOT NULL,
    "cargo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "empresas_representantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "convenios" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "documento_url" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "convenios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practicas" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "requisitos" TEXT NOT NULL,
    "horas_requeridas" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoPractica" NOT NULL DEFAULT 'POSTULADO',
    "empresaId" INTEGER NOT NULL,
    "estudianteId" INTEGER,
    "asesorId" INTEGER,

    CONSTRAINT "practicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "informes_practica" (
    "id" SERIAL NOT NULL,
    "semana" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "horas" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivo_url" TEXT,
    "practicaId" INTEGER NOT NULL,

    CONSTRAINT "informes_practica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tesis" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_sustentacion" TIMESTAMP(3),
    "estado" "EstadoTesis" NOT NULL DEFAULT 'REGISTRADA',
    "archivo_url" TEXT,
    "acta_url" TEXT,
    "estudianteId" INTEGER NOT NULL,
    "asesorId" INTEGER,

    CONSTRAINT "tesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avances_tesis" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_entrega" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivo_url" TEXT,
    "observacion" TEXT,
    "tesisId" INTEGER NOT NULL,

    CONSTRAINT "avances_tesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jurados" (
    "id" SERIAL NOT NULL,
    "dictamen" TEXT,
    "observaciones" TEXT,
    "asesorId" INTEGER NOT NULL,
    "tesisId" INTEGER NOT NULL,

    CONSTRAINT "jurados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_dni_key" ON "usuarios"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_codigo_key" ON "estudiantes"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_userId_key" ON "estudiantes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "asesores_userId_key" ON "asesores"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "coordinadores_userId_key" ON "coordinadores"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_ruc_key" ON "empresas"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_representantes_userId_key" ON "empresas_representantes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "convenios_codigo_key" ON "convenios"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "jurados_asesorId_tesisId_key" ON "jurados"("asesorId", "tesisId");

-- AddForeignKey
ALTER TABLE "estudiantes" ADD CONSTRAINT "estudiantes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asesores" ADD CONSTRAINT "asesores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinadores" ADD CONSTRAINT "coordinadores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empresas_representantes" ADD CONSTRAINT "empresas_representantes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empresas_representantes" ADD CONSTRAINT "empresas_representantes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "convenios" ADD CONSTRAINT "convenios_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practicas" ADD CONSTRAINT "practicas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practicas" ADD CONSTRAINT "practicas_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "estudiantes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practicas" ADD CONSTRAINT "practicas_asesorId_fkey" FOREIGN KEY ("asesorId") REFERENCES "asesores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informes_practica" ADD CONSTRAINT "informes_practica_practicaId_fkey" FOREIGN KEY ("practicaId") REFERENCES "practicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tesis" ADD CONSTRAINT "tesis_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "estudiantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tesis" ADD CONSTRAINT "tesis_asesorId_fkey" FOREIGN KEY ("asesorId") REFERENCES "asesores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avances_tesis" ADD CONSTRAINT "avances_tesis_tesisId_fkey" FOREIGN KEY ("tesisId") REFERENCES "tesis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jurados" ADD CONSTRAINT "jurados_asesorId_fkey" FOREIGN KEY ("asesorId") REFERENCES "asesores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jurados" ADD CONSTRAINT "jurados_tesisId_fkey" FOREIGN KEY ("tesisId") REFERENCES "tesis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
