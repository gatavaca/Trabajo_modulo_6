<template>
  <div class="lista-libros-view">
    <!-- Encabezado de la página -->
    <div class="catalog-header">
      <div>
        <span class="catalog-badge">Colección Editorial Nova</span>
        <h1 class="catalog-title">Catálogo General de Libros</h1>
        <p class="catalog-subtitle">
          Explora, filtra y administra todas las publicaciones disponibles en la plataforma.
        </p>
      </div>

      <!-- Botón para alternar visibilidad del formulario usando v-show -->
      <button
        type="button"
        class="btn btn-primary"
        @click="alternarVisibilidadFormulario"
      >
        {{ mostrarFormulario ? '✖️ Ocultar Formulario' : '➕ Añadir Nuevo Libro' }}
      </button>
    </div>

    <!-- Mensaje de notificación reactivo al agregar o eliminar -->
    <div v-if="mensajeNotificacion" class="alert-box alert-success">
      <span>{{ mensajeNotificacion }}</span>
      <button type="button" class="btn-close-alert" @click="mensajeNotificacion = ''">✕</button>
    </div>

    <!-- Sección del Formulario controlada con directiva v-show (Lección 2 y 3) -->
    <section v-show="mostrarFormulario" class="form-section">
      <FormularioLibro @libro-agregado="alAgregarLibro" />
    </section>

    <!-- Barra de Filtros y Búsqueda -->
    <div class="filters-bar card">
      <div class="filter-group filter-search">
        <label for="busquedaTexto" class="filter-label">🔍 Buscar libro o autor:</label>
        <input
          id="busquedaTexto"
          type="text"
          class="form-control"
          v-model="filtroTexto"
          placeholder="Escribe título o autor..."
        />
      </div>

      <div class="filter-group filter-category">
        <label for="filtroCategoria" class="filter-label">📂 Filtrar por categoría:</label>
        <select id="filtroCategoria" class="form-select" v-model="categoriaSeleccionada">
          <option value="">Todas las categorías</option>
          <option value="Novela">Novela</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
          <option value="Historia">Historia</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Poesía">Poesía</option>
          <option value="Filosofía">Filosofía</option>
        </select>
      </div>

      <div class="filter-stats">
        <span class="stats-counter">
          Mostrando <strong>{{ librosFiltrados.length }}</strong> de <strong>{{ totalLibros }}</strong> libros
        </span>
        <button
          v-if="filtroTexto || categoriaSeleccionada"
          type="button"
          class="btn btn-secondary btn-sm"
          @click="limpiarFiltros"
        >
          Limpiar filtros
        </button>
      </div>
    </div>

    <!-- Mensaje si NO hay libros en el catálogo general (Lección 2: v-if) -->
    <div v-if="totalLibros === 0" class="empty-state card">
      <div class="empty-icon">📭</div>
      <h3>No hay libros disponibles en el catálogo</h3>
      <p>Actualmente la base de datos se encuentra vacía. Puedes registrar una nueva obra o restaurar las de muestra.</p>
      <div class="empty-actions">
        <button type="button" class="btn btn-primary" @click="mostrarFormulario = true">
          ➕ Registrar el primer libro
        </button>
        <button type="button" class="btn btn-secondary" @click="restaurarCatalogo">
          🔄 Restaurar catálogo de muestra
        </button>
      </div>
    </div>

    <!-- Mensaje si el filtro no arrojó resultados -->
    <div v-else-if="librosFiltrados.length === 0" class="empty-state card">
      <div class="empty-icon">🔎</div>
      <h3>Sin resultados para la búsqueda</h3>
      <p>No encontramos libros que coincidan con "{{ filtroTexto }}" en la categoría seleccionada.</p>
      <button type="button" class="btn btn-secondary btn-sm" @click="limpiarFiltros">
        Quitar filtros
      </button>
    </div>

    <!-- Grilla de Libros iterada con v-for (Lección 2) -->
    <div v-else class="libros-grid">
      <!-- Componente Libro.vue con props pasadas con v-bind y evento @eliminar -->
      <Libro
        v-for="libro in librosFiltrados"
        :key="libro.id"
        :libro="libro"
        @eliminar="alEliminarLibro"
      />
    </div>
  </div>
</template>

<script>
import { store } from '../store/librosStore.js'
import Libro from '../components/Libro.vue'
import FormularioLibro from '../components/FormularioLibro.vue'

export default {
  name: 'ListaLibros',
  components: {
    Libro,
    FormularioLibro
  },
  data() {
    return {
      filtroTexto: '',
      categoriaSeleccionada: '',
      mensajeNotificacion: ''
    }
  },
  computed: {
    mostrarFormulario() {
      return store.formularioAbierto
    },
    libros() {
      return store.libros
    },
    totalLibros() {
      return store.libros.length
    },
    // Lista reactiva filtrada dinámicamente
    librosFiltrados() {
      return this.libros.filter(libro => {
        const coincideCategoria = this.categoriaSeleccionada === '' ||
          (libro.categoria && libro.categoria.toLowerCase() === this.categoriaSeleccionada.toLowerCase())
        
        const texto = this.filtroTexto.trim().toLowerCase()
        const coincideTexto = texto === '' ||
          (libro.titulo && libro.titulo.toLowerCase().includes(texto)) ||
          (libro.autor && libro.autor.toLowerCase().includes(texto))

        return coincideCategoria && coincideTexto
      })
    }
  },
  methods: {
    alternarVisibilidadFormulario() {
      store.toggleFormulario()
    },
    alAgregarLibro(datosLibro) {
      const nuevo = store.agregarLibro(datosLibro)
      this.mensajeNotificacion = `✅ El libro "${nuevo.titulo}" fue incorporado con éxito al catálogo.`
      // Desplazar suavemente o cerrar formulario opcional
      setTimeout(() => {
        if (this.mensajeNotificacion.includes(nuevo.titulo)) {
          this.mensajeNotificacion = ''
        }
      }, 5000)
    },
    alEliminarLibro(id) {
      const libro = store.obtenerLibroPorId(id)
      const titulo = libro ? libro.titulo : 'Libro'
      const confirmado = window.confirm(`¿Estás seguro de que deseas eliminar "${titulo}" del catálogo?`)
      
      if (confirmado) {
        store.eliminarLibro(id)
        this.mensajeNotificacion = `🗑️ El libro "${titulo}" ha sido eliminado del catálogo.`
        setTimeout(() => {
          this.mensajeNotificacion = ''
        }, 4000)
      }
    },
    restaurarCatalogo() {
      store.restaurarPorDefecto()
      this.mensajeNotificacion = '🔄 Catálogo restaurado con los libros de muestra originales.'
      setTimeout(() => {
        this.mensajeNotificacion = ''
      }, 4000)
    },
    limpiarFiltros() {
      this.filtroTexto = ''
      this.categoriaSeleccionada = ''
    }
  }
}
</script>

<style scoped>
.lista-libros-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.catalog-badge {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.catalog-title {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  margin: 0.2rem 0 0.4rem;
}

.catalog-subtitle {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.btn-close-alert {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: inherit;
}

/* Barra de filtros */
.filters-bar {
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.filter-search {
  flex: 2;
  min-width: 240px;
}

.filter-category {
  flex: 1.2;
  min-width: 200px;
}

.filter-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.filter-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.stats-counter {
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

/* Grilla de libros */
.libros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

/* Estado vacío */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  font-size: 3.5rem;
  line-height: 1;
}

.empty-state h3 {
  font-size: 1.4rem;
  color: var(--color-primary-dark);
}

.empty-state p {
  color: var(--color-text-muted);
  max-width: 480px;
  font-size: 0.95rem;
}

.empty-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .catalog-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .filter-stats {
    margin-left: 0;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
