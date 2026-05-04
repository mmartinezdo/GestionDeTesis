# Gestión de Prácticas y Tesis

Sistema integral para la gestión de prácticas pre-profesionales y tesis universitarias.

## Estructura del Proyecto

- **frontend/**: Aplicación Next.js 14 con tRPC y Tailwind CSS.
- **backend/**: API REST desarrollada con NestJS y TypeORM.
- **docker/**: Configuraciones para despliegue con Docker y Docker Compose.
- **.github/workflows/**: Pipelines de Integración y Despliegue Continuo (CI/CD).

## Requisitos Previos

- Node.js 18+
- Docker y Docker Compose
- PostgreSQL (si no se usa Docker)

## Instalación y Uso

### Con Docker (Recomendado)

```bash
cd docker
docker-compose up --build
```

### Desarrollo Local

#### Backend
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Tecnologías Utilizadas

- **Frontend**: Next.js, tRPC, Tailwind CSS, Lucide React.
- **Backend**: NestJS, TypeORM, PostgreSQL.
- **DevOps**: Docker, GitHub Actions.
