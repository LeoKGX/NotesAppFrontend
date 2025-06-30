# NotesApp

Una aplicación web de notas desarrollada en 3 dias como ejercicio técnico para una evaluacion. Permite crear, editar, eliminar, archivar y filtrar notas por etiquetas. Cuenta con autenticación JWT y arquitectura full stack con separación por capas.

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
URL de producción: https://notesapplk.web.app/register

----

## Puedes utilizar el run.sh (debes renombrar las carpetas a "frontend" y "backend" respectivamente o cambiar el nombre en el run.sh)


