# Documento Resumen de Entrega — BookList SPA
## Evaluación del Módulo #6: Desarrollo de Interfaces Interactivas con Framework Vue
**Unidad Solicitante:** Área de Desarrollo Frontend – Editorial Nova  
**Proyecto:** BookList SPA – Gestor de Libros Interactiva con Vue.js  

---

## 1. Resumen Ejecutivo del Proyecto
La **Editorial Nova** requería modernizar su plataforma de gestión y catalogación bibliográfica, migrando de formularios HTML tradicionales y navegación estática hacia una **Single Page Application (SPA)** reactiva, modular y fluida desarrollada con **Vue.js** y **Vue Router**.

La solución construida, **BookList SPA**, permite al equipo editorial y a los lectores:
- Consultar un catálogo completo de libros con filtrado por categoría y búsqueda textual en tiempo real.
- Registrar nuevas obras mediante un formulario interactivo con vista previa simultánea.
- Visualizar detalles completos de cada obra a través de rutas dinámicas (`/libros/:id`).
- Modificar el estado reactivo mediante adición, eliminación y seguimiento de lecturas.
- Mantener persistencia local con `localStorage` y disponer de una opción para restaurar el catálogo de muestra.

---

## 2. Cumplimiento de Requisitos por Lección

### Lección 1: Introducción a Vue.js
* **Objetivo:** Comprender la estructura básica de un componente Vue y el patrón MVVM.
* **Implementación:**
  * **Estructura Single File Component (SFC):** Componente principal [src/App.vue](file:///C:/Users/Desktop/Desktop/Front%20End/CLASES/M%C3%B3dulo%206/Proyecto%20final%20m%C3%B3dulo%206/src/App.vue) y vistas construidas con la división estándar `<template>`, `<script>`, `<style scoped>`.
  * **Patrón MVVM (Model - View - ViewModel):** En [src/views/InicioView.vue](file:///C:/Users/Desktop/Desktop/Front%20End/CLASES/M%C3%B3dulo%206/Proyecto%20final%20m%C3%B3dulo%206/src/views/InicioView.vue), el nombre del usuario se vincula bidireccionalmente entre el input del modelo y la vista en pantalla.
  * **Contador reactivo:** Implementado mediante `data()` y `methods` (`incrementar()`, `decrementar()`, `reiniciar()`), permitiendo llevar el cómputo de libros leídos.

### Lección 2: Templates y Rendering
* **Objetivo:** Representar datos dinámicamente mediante directivas y componentes modulares.
* **Implementación:**
  * **Componente `Libro.vue`:** Ubicado en [src/components/Libro.vue](file:///C:/Users/Desktop/Desktop/Front%20End/CLASES/M%C3%B3dulo%206/Proyecto%20final%20m%C3%B3dulo%206/src/components/Libro.vue). Utiliza `v-bind` para enlazar atributos dinámicos (`:src="libro.portada"`, `:alt="libro.titulo"`, `:title="libro.titulo"`, `:class="claseCategoria"`).
  * **Directiva `v-for`:** Itera la lista reactiva de libros filtrados en [src/views/ListaLibros.vue](file:///C:/Users/Desktop/Desktop/Front%20End/CLASES/M%C3%B3dulo%206/Proyecto%20final%20m%C3%B3dulo%206/src/views/ListaLibros.vue).
  * **Directiva `v-show`:** Alterna la visibilidad de la sinopsis dentro de cada tarjeta y el despliegue del formulario de registro sin desmontar los elementos del DOM.
  * **Directiva `v-if` y mensaje de estado vacío:** Si el catálogo no tiene libros (`totalLibros === 0`), se muestra un mensaje informativo con botón para restaurar el catálogo inicial.

### Lección 3: Binding de Formularios
* **Objetivo:** Implementar formularios interactivos y reactivos con `v-model`.
* **Implementación:**
  * **Campos del Formulario:** Creado en [src/components/FormularioLibro.vue](file:///C:/Users/Desktop/Desktop/Front%20End/CLASES/M%C3%B3dulo%206/Proyecto%20final%20m%C3%B3dulo%206/src/components/FormularioLibro.vue) incorporando:
    * `<input>` de texto para título y autor.
    * `<select>` para la categoría literaria (Novela, Ciencia Ficción, Historia, Tecnología, etc.).
    * `<textarea>` para la sinopsis o reseña editorial.
    * `<input>` numérico para el año de publicación con modificador `v-model.number`.
  * **Vista previa en tiempo real (Live Preview):** Panel lateral que reproduce en vivo exactamente el aspecto de la tarjeta a medida que el usuario tipea.

### Lección 4: Manejo de Eventos
* **Objetivo:** Capturar eventos de usuario para alterar el estado reactivo.
* **Implementación:**
  * **Directiva `@click`:** Utilizada para añadir libros, eliminar libros con ventana de confirmación, y manipular el contador.
  * **Modificador `.prevent`:** Utilizado en `@submit.prevent="enviarFormulario"` para interceptar el envío del formulario y prevenir la recarga de página por defecto del navegador.
  * **Modificador `.once`:** Implementado en el botón de sugerencia editorial en [src/components/FormularioLibro.vue](file:///C:/Users/Desktop/Desktop/Front%20End/CLASES/M%C3%B3dulo%206/Proyecto%20final%20m%C3%B3dulo%206/src/components/FormularioLibro.vue) y en la bienvenida especial en [src/views/InicioView.vue](file:///C:/Users/Desktop/Desktop/Front%20End/CLASES/M%C3%B3dulo%206/Proyecto%20final%20m%C3%B3dulo%206/src/views/InicioView.vue), asegurando que el evento se dispare una sola vez.
  * **Evento de teclado `@keyup.enter`:** Permite registrar el libro presionando la tecla Enter en los campos del formulario.

### Lección 5: Manejo de Rutas
* **Objetivo:** Navegación fluida entre vistas como Single Page Application.
* **Implementación:**
  * **Configuración de Vue Router:** En [src/router/index.js](file:///C:/Users/Desktop/Desktop/Front%20End/CLASES/M%C3%B3dulo%206/Proyecto%20final%20m%C3%B3dulo%206/src/router/index.js), se definieron las 3 rutas obligatorias:
    * `/`: Renderiza [src/views/InicioView.vue](file:///C:/Users/Desktop/Desktop/Front%20End/CLASES/M%C3%B3dulo%206/Proyecto%20final%20m%C3%B3dulo%206/src/views/InicioView.vue).
    * `/libros`: Renderiza [src/views/ListaLibros.vue](file:///C:/Users/Desktop/Desktop/Front%20End/CLASES/M%C3%B3dulo%206/Proyecto%20final%20m%C3%B3dulo%206/src/views/ListaLibros.vue).
    * `/libros/:id`: Renderiza [src/views/DetalleLibro.vue](file:///C:/Users/Desktop/Desktop/Front%20End/CLASES/M%C3%B3dulo%206/Proyecto%20final%20m%C3%B3dulo%206/src/views/DetalleLibro.vue).
  * **Rutas dinámicas y paso de Props:** La ruta `/libros/:id` tiene habilitado `props: true`, lo cual desacopla el componente del enrutador y recibe el `id` como una `prop` estándar.

---

## 3. Decisiones Arquitectónicas y de Diseño

1. **Gestor de paquetes y empaquetador moderno (Vite):** Se eligió Vite por sobre Vue CLI antiguo debido a tiempos de compilación instantáneos en desarrollo y generación de bundles optimizados para producción.
2. **Options API con `data` y `methods`:** Se respetó estrictamente la rúbrica pedagógica del módulo para facilitar la corrección y evaluación académica.
3. **Módulo de Estado Centralizado y Persistencia:** Se creó [src/store/librosStore.js](file:///C:/Users/Desktop/Desktop/Front%20End/CLASES/M%C3%B3dulo%206/Proyecto%20final%20m%C3%B3dulo%206/src/store/librosStore.js) con `reactive` y sincronización con `localStorage`, garantizando que las modificaciones de libros y contadores permanezcan al navegar entre vistas o recargar la página.
4. **Diseño Visual Editorial Nova:** Paleta de colores sobria (azul marino, cian editorial, pizarra y acentos ámbar), tipografía serif y sans-serif y diseño 100% responsivo adaptable a pantallas de escritorio, tablets y móviles.
5. **Navbar Unificado con Glassmorphism y Popover de Perfil:** Cabecera moderna con efecto glassmorphism, avatar con iniciales dinámicas, botón de acción rápida *"➕ Nuevo Libro"* accesible desde cualquier pantalla y un popover interactivo que permite editar el nombre del usuario y manipular el contador de lecturas en tiempo real.

---

## 4. Instrucciones para Ejecutar el Proyecto

### Requisitos previos
- Node.js instalado (v18 o superior).

### Pasos
1. Abrir la terminal en la carpeta del proyecto:
   ```bash
   cd "C:\Users\Desktop\Desktop\Front End\CLASES\Módulo 6\Proyecto final módulo 6"
   ```
2. Instalar dependencias (ya instaladas):
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir la URL mostrada en la terminal (usualmente `http://localhost:5173`) en el navegador.

5. Generar build de producción (para verificar compilación limpia):
   ```bash
   npm run build
   ```
