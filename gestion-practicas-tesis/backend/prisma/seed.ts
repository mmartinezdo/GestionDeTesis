import { PrismaClient, Role, EstadoPractica, EstadoTesis } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando poblamiento de base de datos con datos realistas...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Crear Permisos (Upsert para no duplicar)
  const permisosData = [
    { nombre: 'practicas:leer', recurso: 'practicas', accion: 'leer', descripcion: 'Ver lista de prácticas' },
    { nombre: 'practicas:crear', recurso: 'practicas', accion: 'crear', descripcion: 'Postular a prácticas' },
    { nombre: 'practicas:gestionar', recurso: 'practicas', accion: 'gestionar', descripcion: 'Asignar y validar prácticas' },
    { nombre: 'tesis:leer', recurso: 'tesis', accion: 'leer', descripcion: 'Ver tesis' },
    { nombre: 'tesis:crear', recurso: 'tesis', accion: 'crear', descripcion: 'Registrar tesis y avances' },
    { nombre: 'tesis:evaluar', recurso: 'tesis', accion: 'evaluar', descripcion: 'Evaluar tesis (asesor/jurado)' },
    { nombre: 'usuarios:gestionar', recurso: 'usuarios', accion: 'gestionar', descripcion: 'CRUD de usuarios' },
    { nombre: 'reportes:generar', recurso: 'reportes', accion: 'generar', descripcion: 'Generar reportes PDF' },
  ];

  const permisosMap: Record<string, number> = {};
  for (const p of permisosData) {
    const permiso = await prisma.permiso.upsert({
      where: { nombre: p.nombre },
      update: {},
      create: p,
    });
    permisosMap[p.nombre] = permiso.id;
  }

  // 2. Crear Roles
  const rolesDef = [
    { nombre: 'ADMIN', desc: 'Administrador total', perms: Object.values(permisosMap) },
    { nombre: 'ESTUDIANTE', desc: 'Estudiante', perms: ['practicas:leer', 'practicas:crear', 'tesis:leer', 'tesis:crear', 'reportes:generar'].map(n => permisosMap[n]) },
    { nombre: 'ASESOR', desc: 'Docente asesor', perms: ['practicas:leer', 'tesis:leer', 'tesis:evaluar', 'reportes:generar'].map(n => permisosMap[n]) },
    { nombre: 'COORDINADOR', desc: 'Coordinador de facultad', perms: ['practicas:leer', 'practicas:gestionar', 'tesis:leer', 'reportes:generar'].map(n => permisosMap[n]) }
  ];

  const rolesMap: Record<string, number> = {};
  for (const r of rolesDef) {
    const role = await prisma.roleInfo.upsert({
      where: { nombre: r.nombre },
      update: { descripcion: r.desc },
      create: { nombre: r.nombre, descripcion: r.desc },
    });
    rolesMap[r.nombre] = role.id;

    for (const pId of r.perms) {
      await prisma.rolPermiso.upsert({
        where: { rolId_permisoId: { rolId: role.id, permisoId: pId } },
        update: {},
        create: { rolId: role.id, permisoId: pId },
      });
    }
  }

  // 3. Crear Empresas (10 registros)
  const empresasData = [
    { ruc: '20123456781', razonSocial: 'Global Tech Solutions S.A.C.', direccion: 'Av. Larco 456, Trujillo', telefono: '044-203040', emailContacto: 'contacto@globaltech.pe', sector: 'Tecnología' },
    { ruc: '20556677881', razonSocial: 'Constructora del Norte E.I.R.L.', direccion: 'Calle Pizarro 123, Trujillo', telefono: '044-506070', emailContacto: 'proyectos@constnorte.com', sector: 'Construcción' },
    { ruc: '20334455661', razonSocial: 'Clínica San José', direccion: 'Av. Mansiche 789, Trujillo', telefono: '044-304050', emailContacto: 'rrhh@clinicasanjose.pe', sector: 'Salud' },
    { ruc: '20998877661', razonSocial: 'EducaMás S.A.', direccion: 'Jr. Independencia 555, Trujillo', telefono: '044-102030', emailContacto: 'talento@educamas.edu.pe', sector: 'Educación' },
    { ruc: '20112233441', razonSocial: 'AgroIndustrias Virú', direccion: 'Panamericana Norte Km 520, Virú', telefono: '044-607080', emailContacto: 'info@agroviru.com.pe', sector: 'Agroindustrial' },
    { ruc: '20443322111', razonSocial: 'Software & Data Startups', direccion: 'Hub Coworking, Trujillo', telefono: '987654321', emailContacto: 'founder@softdata.io', sector: 'Tecnología' },
    { ruc: '20667788991', razonSocial: 'Logística Express del Perú', direccion: 'Vía de Evitamiento 200, Trujillo', telefono: '044-809010', emailContacto: 'operaciones@logexpress.pe', sector: 'Logística' },
    { ruc: '20887766551', razonSocial: 'Financiera Confianza', direccion: 'Jr. Gamarra 300, Trujillo', telefono: '044-405060', emailContacto: 'empleos@fconfianza.pe', sector: 'Finanzas' },
    { ruc: '20223344551', razonSocial: 'Turismo Trujillo S.A.C.', direccion: 'Calle San Martín 100, Trujillo', telefono: '044-708090', emailContacto: 'ventas@turismotrujillo.pe', sector: 'Turismo' },
    { ruc: '20554433221', razonSocial: 'Minera Aurífera Retamas', direccion: 'Parque Industrial, Trujillo', telefono: '044-901020', emailContacto: 'seleccion@marsa.com.pe', sector: 'Minería' },
  ];

  const empresas = [];
  for (const emp of empresasData) {
    const e = await prisma.empresa.upsert({
      where: { ruc: emp.ruc },
      update: emp,
      create: emp,
    });
    empresas.push(e);
  }

  // 4. Crear Usuarios y Estudiantes (15 registros)
  const estudiantesInfo = [
    { dni: '70000001', nombres: 'Juan', apellidos: 'Pérez García', email: 'jperez@unitru.edu.pe', codigo: '1020304051', escuela: 'Ingeniería de Sistemas', anio: 2022 },
    { dni: '70000002', nombres: 'María', apellidos: 'Rodríguez Paz', email: 'mrodriguez@unitru.edu.pe', codigo: '1020304052', escuela: 'Administración', anio: 2021 },
    { dni: '70000003', nombres: 'Carlos', apellidos: 'Sánchez Ruiz', email: 'csanchez@unitru.edu.pe', codigo: '1020304053', escuela: 'Derecho', anio: 2020 },
    { dni: '70000004', nombres: 'Ana', apellidos: 'López Vega', email: 'alopez@unitru.edu.pe', codigo: '1020304054', escuela: 'Ingeniería Industrial', anio: 2022 },
    { dni: '70000005', nombres: 'Luis', apellidos: 'Torres Milla', email: 'ltorres@unitru.edu.pe', codigo: '1020304055', escuela: 'Contabilidad', anio: 2021 },
    { dni: '70000006', nombres: 'Elena', apellidos: 'Castro Solis', email: 'ecastro@unitru.edu.pe', codigo: '1020304056', escuela: 'Ingeniería de Sistemas', anio: 2022 },
    { dni: '70000007', nombres: 'Roberto', apellidos: 'Díaz Luna', email: 'rdiaz@unitru.edu.pe', codigo: '1020304057', escuela: 'Economía', anio: 2020 },
    { dni: '70000008', nombres: 'Sofía', apellidos: 'Mendoza Flores', email: 'smendoza@unitru.edu.pe', codigo: '1020304058', escuela: 'Ingeniería Civil', anio: 2021 },
    { dni: '70000009', nombres: 'Diego', apellidos: 'Ramírez Soto', email: 'dramirez@unitru.edu.pe', codigo: '1020304059', escuela: 'Arquitectura', anio: 2019 },
    { dni: '70000010', nombres: 'Lucía', apellidos: 'Vargas Peña', email: 'lvargas@unitru.edu.pe', codigo: '1020304060', escuela: 'Medicina', anio: 2018 },
    { dni: '70000011', nombres: 'Miguel', apellidos: 'Huamán Quispe', email: 'mhuaman@unitru.edu.pe', codigo: '1020304061', escuela: 'Ingeniería de Sistemas', anio: 2022 },
    { dni: '70000012', nombres: 'Rosa', apellidos: 'Morales Alva', email: 'rmorales@unitru.edu.pe', codigo: '1020304062', escuela: 'Educación', anio: 2021 },
    { dni: '70000013', nombres: 'Jorge', apellidos: 'Salinas Tello', email: 'jsalinas@unitru.edu.pe', codigo: '1020304063', escuela: 'Ingeniería Mecánica', anio: 2020 },
    { dni: '70000014', nombres: 'Carmen', apellidos: 'Reyes Ortiz', email: 'creyes@unitru.edu.pe', codigo: '1020304064', escuela: 'Enfermería', anio: 2022 },
    { dni: '70000015', nombres: 'Pedro', apellidos: 'Guerrero Silva', email: 'pguerrero@unitru.edu.pe', codigo: '1020304065', escuela: 'Ingeniería Agroindustrial', anio: 2021 },
  ];

  const estudiantes = [];
  for (const est of estudiantesInfo) {
    const user = await prisma.user.upsert({
      where: { email: est.email },
      update: {},
      create: {
        email: est.email,
        password: hashedPassword,
        nombres: est.nombres,
        apellidos: est.apellidos,
        dni: est.dni,
        rolId: rolesMap['ESTUDIANTE'],
      },
    });

    const e = await prisma.estudiante.upsert({
      where: { codigo: est.codigo },
      update: { escuela: est.escuela, anioIngreso: est.anio },
      create: {
        codigo: est.codigo,
        escuela: est.escuela,
        anioIngreso: est.anio,
        userId: user.id,
      },
    });
    estudiantes.push(e);
  }

  // 5. Crear Asesores (3 registros)
  const asesoresInfo = [
    { dni: '10000001', nombres: 'Alberto', apellidos: 'Zavaleta Rivas', email: 'azavaleta@unitru.edu.pe', especialidad: 'Sistemas Distribuidos', depto: 'Informática' },
    { dni: '10000002', nombres: 'Beatriz', apellidos: 'Gálvez Soto', email: 'bgalvez@unitru.edu.pe', especialidad: 'Gestión de Proyectos', depto: 'Administración' },
    { dni: '10000003', nombres: 'César', apellidos: 'Vigo Morillo', email: 'cvigo@unitru.edu.pe', especialidad: 'Estructuras', depto: 'Ingeniería Civil' },
  ];

  const asesores = [];
  for (const as of asesoresInfo) {
    const user = await prisma.user.upsert({
      where: { email: as.email },
      update: {},
      create: {
        email: as.email,
        password: hashedPassword,
        nombres: as.nombres,
        apellidos: as.apellidos,
        dni: as.dni,
        rolId: rolesMap['ASESOR'],
      },
    });

    const a = await prisma.asesor.upsert({
      where: { userId: user.id },
      update: { especialidad: as.especialidad, departamento: as.depto },
      create: {
        especialidad: as.especialidad,
        departamento: as.depto,
        userId: user.id,
      },
    });
    asesores.push(a);
  }

  // 6. Crear Administrador y Coordinador
  await prisma.user.upsert({
    where: { email: 'admin@sistema.unt' },
    update: {},
    create: {
      email: 'admin@sistema.unt',
      password: hashedPassword,
      nombres: 'Admin',
      apellidos: 'Principal',
      dni: '00000001',
      rolId: rolesMap['ADMIN'],
    },
  });

  const coordUser = await prisma.user.upsert({
    where: { email: 'coordinador@unitru.edu.pe' },
    update: {},
    create: {
      email: 'coordinador@unitru.edu.pe',
      password: hashedPassword,
      nombres: 'Coord',
      apellidos: 'Facultad Ingeniería',
      dni: '00000002',
      rolId: rolesMap['COORDINADOR'],
    },
  });

  await prisma.coordinador.upsert({
    where: { userId: coordUser.id },
    update: { facultad: 'Ingeniería' },
    create: { facultad: 'Ingeniería', userId: coordUser.id },
  });

  // Limpiar tablas para evitar duplicados (Opcional, pero recomendado para seed repetible)
  // await prisma.practica.deleteMany({});
  // await prisma.tesis.deleteMany({});
  // ...

  // 7. Crear Prácticas (8 registros)
  const practicasDef = [
    { titulo: 'Desarrollo Backend Node.js', desc: 'Implementación de microservicios y APIs REST.', req: 'Conocimientos de TypeScript, NestJS y PostgreSQL.', horas: 480, empIdx: 0, estIdx: 0, asIdx: 0, estado: EstadoPractica.EN_CURSO },
    { titulo: 'Asistente de Obra', desc: 'Supervisión de acabados y control de materiales.', req: 'Estudiante de últimos ciclos de Ing. Civil.', horas: 320, empIdx: 1, estIdx: 7, asIdx: 2, estado: EstadoPractica.ASIGNADO },
    { titulo: 'Analista de Procesos Salud', desc: 'Optimización de flujos de atención al paciente.', req: 'Manejo de BPMN y Excel avanzado.', horas: 400, empIdx: 2, estIdx: 1, asIdx: 1, estado: EstadoPractica.FINALIZADO },
    { titulo: 'Gestión de Talento Humano', desc: 'Apoyo en procesos de reclutamiento y selección.', req: 'Proactividad y buen trato.', horas: 240, empIdx: 3, estIdx: 4, asIdx: 1, estado: EstadoPractica.EN_CURSO },
    { titulo: 'Control de Calidad Agro', desc: 'Análisis de laboratorio en línea de producción.', req: 'Manejo de equipos de medición.', horas: 480, empIdx: 4, estIdx: 14, asIdx: 0, estado: EstadoPractica.POSTULADO },
    { titulo: 'Desarrollo Frontend React', desc: 'Maquetación de dashboards corporativos.', req: 'React, Tailwind CSS, Redux.', horas: 400, empIdx: 5, estIdx: 5, asIdx: 0, estado: EstadoPractica.EN_CURSO },
    { titulo: 'Analista de Riesgos', desc: 'Evaluación crediticia de MYPES.', req: 'Conocimientos de matemática financiera.', horas: 360, empIdx: 7, estIdx: 6, asIdx: 1, estado: EstadoPractica.RECHAZADO },
    { titulo: 'Supervisión de Seguridad Minera', desc: 'Apoyo en implementación de protocolos SSOMA.', req: 'Disponibilidad para trabajar en campamento.', horas: 600, empIdx: 9, estIdx: 12, asIdx: 2, estado: EstadoPractica.EN_CURSO },
  ];

  for (const p of practicasDef) {
    await prisma.practica.upsert({
      where: { id: practicasDef.indexOf(p) + 1 }, // Usar ID secuencial para el seed inicial
      update: {},
      create: {
        titulo: p.titulo,
        descripcion: p.desc,
        requisitos: p.req,
        horasRequeridas: p.horas,
        fechaInicio: new Date('2026-05-15'),
        fechaFin: new Date('2026-11-15'),
        estado: p.estado,
        empresaId: empresas[p.empIdx].id,
        estudianteId: p.estIdx !== null ? estudiantes[p.estIdx].id : null,
        asesorId: p.asIdx !== null ? asesores[p.asIdx].id : null,
      },
    });
  }

  // 8. Crear Tesis (8 registros)
  const tesisDef = [
    { titulo: 'Aplicación de Blockchain para la Trazabilidad de Productos Agrícolas', res: 'Propuesta de un sistema descentralizado...', estIdx: 0, asIdx: 0, estado: EstadoTesis.EN_DESARROLLO },
    { titulo: 'Impacto del Teletrabajo en la Productividad de las PYMES en Trujillo', res: 'Estudio descriptivo sobre la modalidad remota...', estIdx: 1, asIdx: 1, estado: EstadoTesis.REGISTRADA },
    { titulo: 'Análisis Estructural de Edificaciones con Disipadores de Energía', res: 'Simulación sísmica en terrenos arenosos...', estIdx: 7, asIdx: 2, estado: EstadoTesis.ASIGNADA },
    { titulo: 'Optimización de la Cadena de Suministro mediante Inteligencia Artificial', res: 'Uso de algoritmos genéticos para logística...', estIdx: 10, asIdx: 0, estado: EstadoTesis.EN_DESARROLLO },
    { titulo: 'Derechos Laborales en la Economía Gig: El caso de los Delivery en Perú', res: 'Análisis jurídico sobre la subordinación...', estIdx: 2, asIdx: 1, estado: EstadoTesis.SUSTENTADA },
    { titulo: 'Diseño de un Centro de Salud Sostenible con Materiales de la Región', res: 'Arquitectura bioclimática aplicada...', estIdx: 8, asIdx: 2, estado: EstadoTesis.EN_DESARROLLO },
    { titulo: 'Estrategias de Marketing Digital para el Sector Turismo Post-Pandemia', res: 'Plan de acción para reactivación económica...', estIdx: 6, asIdx: 1, estado: EstadoTesis.RECHAZADA },
    { titulo: 'Implementación de un Sistema ERP para el Control de Inventarios en Minería', res: 'Software integrado para gestión de repuestos...', estIdx: 5, asIdx: 0, estado: EstadoTesis.EN_DESARROLLO },
  ];

  for (const t of tesisDef) {
    await prisma.tesis.upsert({
      where: { id: tesisDef.indexOf(t) + 1 },
      update: {},
      create: {
        titulo: t.titulo,
        resumen: t.res,
        estado: t.estado,
        estudianteId: estudiantes[t.estIdx].id,
        asesorId: t.asIdx !== null ? asesores[t.asIdx].id : null,
      },
    });
  }

  console.log('Seed completado con éxito. Se han insertado roles, permisos, empresas, usuarios, estudiantes, asesores, prácticas y tesis.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
