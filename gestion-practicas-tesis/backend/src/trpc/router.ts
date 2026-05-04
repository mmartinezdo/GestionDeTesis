// backend/src/trpc/router.ts
import { router } from './trpc.service';
import { authRouter } from '../modules/auth/auth.router';
import { practicasRouter } from '../modules/practicas/practicas.router';
import { tesisRouter } from '../modules/tesis/tesis.router';
import { dashboardRouter } from '../modules/dashboard/dashboard.router';
import { reportesRouter } from '../modules/reportes/reportes.router';
import { estudiantesRouter } from '../modules/estudiantes/estudiantes.router';
import { empresasRouter } from '../modules/empresas/empresas.router';

export const appRouter = router({
  auth: authRouter,
  practicas: practicasRouter,
  tesis: tesisRouter,
  dashboard: dashboardRouter,
  reportes: reportesRouter,
  estudiantes: estudiantesRouter,
  empresas: empresasRouter,
});

export type AppRouter = typeof appRouter;