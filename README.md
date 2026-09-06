# 📖 BookList SPA — Editorial Nova

> Proyecto de evaluación del **Módulo #6: Desarrollo de Interfaces Interactivas con Framework Vue** (Alkemy).

Una Single Page Application (SPA) interactiva desarrollada con **Vue.js 3** y **Vue Router 4** para la catalogación y gestión de libros de la ficticia *Editorial Nova*.

---

## Características y Requisitos Implementados

- **Lección 1: Introducción a Vue.js**
  - Componente principal [`App.vue`](src/App.vue) con estructura `<template>`, `<script>` y `<style>`.
  - Patrón **MVVM** con actualización de nombre de usuario en tiempo real.
  - Contador reactivo de libros leídos utilizando `data` y `methods`.

- **Lección 2: Templates y Rendering**
  - Componente modular [`Libro.vue`](src/components/Libro.vue) para renderizar cada obra mediante `v-bind`.
  - Renderizado condicional con `v-if`, `v-show` y bucles con `v-for`.
  - Estado vacío descriptivo con botón de restauración cuando no hay libros disponibles.

- **Lección 3: Binding de Formularios**
  - Formulario [`FormularioLibro.vue`](src/components/FormularioLibro.vue) interactivo con campos `input`, `select` y `textarea`.
  - Vinculación bidireccional mediante `v-model`.
  - Panel de **Vista Previa en Tiempo Real** que refleja los datos mientras el usuario tipea.

- **Lección 4: Manejo de Eventos**
  - Captura de eventos `@click` para adición y eliminación de libros.
  - Modificadores de evento `.prevent` (evita recarga) y `.once` (acciones únicas).
  - Evento de teclado `@keyup.enter` para registrar libros al presionar la tecla Enter.

- **Lección 5: Manejo de Rutas con Vue Router**
  - Configuración de rutas en [`src/router/index.js`](src/router/index.js):
    - `/` -> [`InicioView.vue`](src/views/InicioView.vue)
    - `/libros` -> [`ListaLibros.vue`](src/views/ListaLibros.vue)
    - `/libros/:id` -> [`DetalleLibro.vue`](src/views/DetalleLibro.vue)
  - Paso de parámetros dinámicos desacoplados mediante `props: true`.

---

## Tecnologías

- **Vue.js 3** (Options API)
- **Vue Router 4**
- **Vite 6**
- **HTML5 & CSS3 moderno** (Diseño editorial responsivo)
- **Persistencia local con `localStorage`**

---

## 💻 Instalación y Uso

1. Clonar o abrir el repositorio en la terminal:
   ```bash
   npm install
   ```

2. Ejecutar el entorno de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir la dirección local en el navegador (ejemplo: `http://localhost:5173`).

4. Compilar para producción:
   ```bash
   npm run build
   ```

---

## Documentación Completa de Entrega

Para consultar la explicación detallada de cada decisión de diseño y cómo se validó cada lección, consulta el archivo [DOCUMENTO_ENTREGA.md](DOCUMENTO_ENTREGA.md).
