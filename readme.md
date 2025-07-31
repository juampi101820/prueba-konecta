# PRUEBA TÉCNICA FULL STACK - KONECTA

Prueba técnica para Konecta — **Juan Pablo Marín**  
Incluye backend (Node.js + PostgreSQL) y frontend (React), ambos dockerizados.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Instalación rápida](#instalación-rápida)
- [Variables de entorno](#variables-de-entorno)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Decisiones y buenas prácticas](#decisiones-y-buenas-prácticas)
- [Seguridad](#seguridad)

---

## Descripción

Sistema con autenticación JWT, manejo de roles (ADMINISTRADOR, EMPLEADO), CRUD de empleados y solicitudes, validación de datos, paginación, y seguridad.

---

## Instalación rápida

### Docker (recomendado)

1. Clona el repo y entra a la carpeta:
    ```bash
    git clone https://github.com/juampi101820/prueba-konecta
    cd prueba-konecta
    ```

2. Copia y edita `.env.example` como `.env` dentro de `/backend` si lo necesitas.

3. Levanta todo:
    ```bash
    docker compose up --build
    ```

- El backend queda en [http://localhost:3000](http://localhost:3000)
- La base de datos en `localhost:5433`, usuario `usuario_prueba`, clave `12345`, base `prueba_konectadb`
- Script para roles/tablas en `BD/scriptTablas.sql` (se debe ejecutar en el pgadmin)

### Sin Docker

- Instala Node.js 18+
- Crea la BD y el `.env`
- Corre `npm install` y `npm start` en `/backend`

---

## Variables de entorno

Ejemplo en `/backend/.env.example`:
```env
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_NAME=prueba_konectadb
DB_USER=usuario_prueba
DB_PASSWORD=12345
JWT_SECRET=pruebajwt
JWT_EXPIRATION=1h
```

## Estructura del proyecto
<img width="991" height="393" alt="arquitectura drawio" src="https://github.com/user-attachments/assets/4d6b22f0-6b04-4a54-a617-7e0fdb7ef549" />

## Decisiones y buenas prácticas
- Código en capas (rutas, controladores, servicios, repositorios) manejando la arquitectura DDD
- Roles protegidos (solo admin puede borrar solicitudes)
- Validación de datos y uso de ORM (Sequelize) para evitar SQL Injection
- JWT para autenticación
- Paginación y filtrado en endpoints
- Docker y .env para despliegue simple

### Seguridad
- JWT seguro y expiración corta
- Roles desde la BD
- Entradas validadas
- Claves fuera del código (env)
- No se expone info sensible en respuestas

## Diseño responsive
<img width="1772" height="552" alt="image" src="https://github.com/user-attachments/assets/b358db59-85b0-4423-84dc-a1165f948799" />

