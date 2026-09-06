<template>
  <article :class="['libro-card', 'card', { 'card-destacado': libro.destacado }]">
    <!-- Imagen de portada usando v-bind -->
    <div class="libro-cover-wrapper">
      <img
        v-bind:src="libro.portada"
        v-bind:alt="'Portada del libro ' + libro.titulo"
        v-bind:title="libro.titulo"
        class="libro-cover-img"
        @error="onImageError"
      />
      <span v-if="libro.destacado" class="badge-destacado" title="Libro destacado">
        ⭐ Destacado
      </span>
    </div>

    <!-- Contenido del libro -->
    <div class="libro-body">
      <div class="libro-meta">
        <!-- Badge de categoría con clase dinámica usando v-bind -->
        <span v-bind:class="['badge', claseCategoria]">
          {{ libro.categoria }}
        </span>
        <span v-if="libro.anio" class="libro-anio">
          📅 {{ libro.anio }}
        </span>
      </div>

      <h3 class="libro-titulo" v-bind:title="libro.titulo">
        {{ libro.titulo }}
      </h3>
      <p class="libro-autor">
        ✍️ <strong>{{ libro.autor }}</strong>
      </p>

      <!-- Botón para alternar visibilidad de la sinopsis usando v-show -->
      <div class="libro-sinopsis-toggle">
        <button
          type="button"
          class="btn-toggle"
          @click="alternarSinopsis"
          :title="mostrarSinopsis ? 'Ocultar sinopsis' : 'Mostrar sinopsis'"
        >
          {{ mostrarSinopsis ? '▲ Ocultar reseña' : '▼ Ver reseña' }}
        </button>

        <!-- Directiva v-show para mostrar/ocultar según requerimiento Lección 2 -->
        <p v-show="mostrarSinopsis" class="libro-sinopsis">
          {{ libro.descripcion }}
        </p>
      </div>

      <!-- Acciones del libro con eventos @click -->
      <div class="libro-actions">
        <!-- Navegación a la vista dinámica /libros/:id -->
        <router-link
          v-bind:to="'/libros/' + libro.id"
          class="btn btn-outline-primary btn-sm"
        >
          🔍 Ver Detalle
        </router-link>

        <!-- Evento @click para eliminar con emisión hacia el padre -->
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click="solicitarEliminacion(libro.id)"
          v-bind:title="'Eliminar ' + libro.titulo"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Libro',
  props: {
    // Objeto libro recibido mediante v-bind
    libro: {
      type: Object,
      required: true
    }
  },
  emits: ['eliminar'],
  data() {
    return {
      // Estado local para v-show de la sinopsis
      mostrarSinopsis: false,
      fallbackImg: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    }
  },
  computed: {
    claseCategoria() {
      const cat = (this.libro.categoria || '').toLowerCase()
      if (cat.includes('novela')) return 'badge-novela'
      if (cat.includes('ciencia')) return 'badge-ciencia-ficcion'
      if (cat.includes('historia')) return 'badge-historia'
      if (cat.includes('tecnología') || cat.includes('tecnologia')) return 'badge-tecnologia'
      if (cat.includes('fantasía') || cat.includes('fantasia')) return 'badge-fantasia'
      return 'badge-general'
    }
  },
  methods: {
    alternarSinopsis() {
      this.mostrarSinopsis = !this.mostrarSinopsis
    },
    solicitarEliminacion(id) {
      // Emite el evento al componente padre para eliminar el libro
      this.$emit('eliminar', id)
    },
    onImageError(event) {
      event.target.src = this.fallbackImg
    }
  }
}
</script>

<style scoped>
.libro-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.card-destacado {
  border-color: #f59e0b;
  box-shadow: 0 0 0 1px #f59e0b, var(--shadow-sm);
}

.libro-cover-wrapper {
  position: relative;
  width: 100%;
  height: 250px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.libro-cover-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.libro-card:hover .libro-cover-img {
  transform: scale(1.04);
}

.badge-destacado {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(245, 158, 11, 0.95);
  color: #ffffff;
  padding: 0.25rem 0.6rem;
  border-radius: var(--border-radius-full);
  font-size: 0.72rem;
  font-weight: 700;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.libro-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.libro-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.libro-anio {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.libro-titulo {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--color-primary-dark);
  margin-bottom: 0.35rem;
  line-height: 1.3;
}

.libro-autor {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 0.85rem;
}

.libro-sinopsis-toggle {
  margin-bottom: 1rem;
  background-color: #f8fafc;
  padding: 0.6rem 0.75rem;
  border-radius: var(--border-radius-sm);
}

.btn-toggle {
  background: none;
  border: none;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-accent);
  cursor: pointer;
  padding: 0;
}

.btn-toggle:hover {
  text-decoration: underline;
}

.libro-sinopsis {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--color-text-main);
  line-height: 1.45;
  border-top: 1px dashed var(--border-color);
  padding-top: 0.5rem;
}

.libro-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}

.libro-actions .btn {
  flex: 1;
}
</style>
