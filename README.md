# NotesApp

Una aplicación web de notas desarrollada como ejercicio técnico para Ensolvers. Permite crear, editar, eliminar, archivar y filtrar notas por etiquetas. Cuenta con autenticación JWT y arquitectura full stack con separación por capas.

## Tecnologías Utilizadas

### Frontend
- [Angular 17] (https://angular.dev/)
- TypeScript
- SCSS
- RxJS
- Angular Router
- Reactive Forms
- Bootstrap (estilos personalizados)

### Backend
- Java 17
- Spring Boot 3
- Spring Security (JWT)
- Spring Data JPA
- MySQL
- Maven

## Requisitos Previos

- Node.js 18.x
- Angular CLI (`npm install -g @angular/cli`)
- Java 17+
- Maven
- MySQL
- Git

## Instalación y Ejecución
Pruebas locales

### 🔹 Clonar el repositorio

```bash
git clone https://github.com/LeoKGX/NotesAppFrontend
cd NotesAppFrontend
npm install
ng serve
```
-----
## Deploy

### 🔹 Frontend en Firebase
```bash
ng build --configuration production
firebase deploy
```
URL de producción: https://notesapp-ensolvers.web.app

----

Estructura del projecto

.
├── backend/
│   ├── src/main/java/com/notesapp
│   ├── src/main/resources
│   └── pom.xml
├── frontend/
    ├── src/app/components
    ├── src/app/services
    ├── angular.json
    └── package.json
