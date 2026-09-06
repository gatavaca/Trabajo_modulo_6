<template>
  <div class="detalle-libro-view">
    <!-- Navegación de regreso -->
    <div class="detalle-topbar">
      <router-link to="/libros" class="btn btn-secondary btn-sm">
        ← Volver al Catálogo de Libros
      </router-link>
      <span class="ruta-info">
        Ruta dinámica activa: <code>/libros/{{ id }}</code>
      </span>
    </div>

    <!-- Caso 1: Libro NO encontrado -->
    <div v-if="!libro" class="empty-state card">
      <div class="empty-icon">🔎</div>
      <h2>Libro no encontrado</h2>
      <p>
        No existe ningún libro registrado en Editorial Nova con el identificador <code>#{{ id }}</code>.
        Es posible que haya sido eliminado o el enlace sea incorrecto.
      </p>
      <router-link to="/libros" class="btn btn-primary">
        Explorar catálogo completo
      </router-link>
    </div>

    <!-- Caso 2: Ficha completa del Libro usando datos pasados por props -->
    <article v-else class="card detalle-card">
      <div class="detalle-cover-col">
        <div class="detalle-img-wrapper">
          <img
            v-bind:src="libro.portada"
            v-bind:alt="'Portada de ' + libro.titulo"
            class="detalle-cover-img"
            @error="onImageError"
          />
        </div>

        <div class="detalle-quick-stats">
          <div class="stat-item">
            <span class="stat-label">Identificador (ID)</span>
            <span class="stat-value">#{{ libro.id }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Año de edición</span>
            <span class="stat-value">{{ libro.anio || 'N/D' }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Extensión</span>
            <span class="stat-value">{{ libro.paginas ? libro.paginas + ' págs.' : 'N/D' }}</span>
          </div>
        </div>
      </div>

      <div class="detalle-info-col">
        <div class="detalle-header">
          <div class="detalle-tags">
            <span v-bind:class="['badge', claseCategoria]">
              {{ libro.categoria }}
            </span>
            <span v-if="libro.destacado" class="badge badge-destacado-chip">
              ⭐ Colección Destacada
            </span>
          </div>

          <h1 class="detalle-titulo font-serif">{{ libro.titulo }}</h1>
          <p class="detalle-autor">
            Por <strong>{{ libro.autor }}</strong>
          </p>
        </div>

        <div class="detalle-section">
          <h3 class="section-subtitle-sm">Sinopsis Editorial</h3>
          <p class="detalle-descripcion">
            {{ libro.descripcion }}
          </p>
        </div>

        <div class="detalle-section">
          <h3 class="section-subtitle-sm">Acciones de Lectura & Gestión</h3>
          
          <div class="detalle-actions-bar">
            <!-- Interacción con el contador global de lecturas de la Lección 1 -->
            <button
              type="button"
              class="btn btn-primary"
              @click="marcarComoLeido"
            >
              📖 Marcar como leído (+1 al contador)
            </button>

            <!-- Acción de eliminar libro -->
            <button
              type="button"
              class="btn btn-danger"
              @click="eliminarEsteLibro"
            >
              🗑️ Eliminar del Catálogo
            </button>
          </div>

          <p v-if="avisoLectura" class="aviso-lectura-msg">
            {{ avisoLectura }}
          </p>
        </div>

        <div class="editorial-seal">
          <span>🏛️ Publicación avalada por el sello <strong>Editorial Nova</strong></span>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { store } from '../store/librosStore.js'

export default {
  name: 'DetalleLibro',
  // Requerimiento Lección 5: Recibir id como prop mediante la ruta dinámica
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      avisoLectura: '',
      fallbackImg: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    }
  },
  computed: {
    // Busca reactivamente el libro en el store mediante el prop id
    libro() {
      return store.obtenerLibroPorId(this.id)
    },
    claseCategoria() {
      if (!this.libro) return 'badge-general'
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
    marcarComoLeido() {
      store.incrementarContador()
      this.avisoLectura = `🎉 ¡Excelente! Has sumado "${this.libro.titulo}" a tu contador de lecturas (Total: ${store.contadorLecturas}).`
      setTimeout(() => {
        this.avisoLectura = ''
      }, 4000)
    },
    eliminarEsteLibro() {
      if (!this.libro) return
      const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar permanentemente "${this.libro.titulo}"?`)
      if (confirmar) {
        store.eliminarLibro(this.libro.id)
        this.$router.push('/libros')
      }
    },
    onImageError(event) {
      event.target.src = this.fallbackImg
    }
  }
}
</script>

<style scoped>
.detalle-libro-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detalle-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.ruta-info {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.ruta-info code {
  background-color: #f1f5f9;
  padding: 0.2rem 0.5rem;
  border-radius: var(--border-radius-sm);
  color: var(--color-primary);
  font-weight: 600;
}

.detalle-card {
  display: grid;
  grid-template-columns: 320px 1fr;
  overflow: hidden;
  gap: 2.5rem;
  padding: 2.5rem;
}

.detalle-cover-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detalle-img-wrapper {
  width: 100%;
  height: 420px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.detalle-cover-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.detalle-quick-stats {
  background-color: #f8fafc;
  border-radius: var(--border-radius);
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  text-align: center;
  border: 1px solid var(--border-color);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.stat-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--color-text-muted);
  font-weight: 600;
}

.stat-value {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-primary-dark);
}

.detalle-info-col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detalle-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.badge-destacado-chip {
  background-color: #fef3c7;
  color: #b45309;
}

.detalle-titulo {
  font-size: 2.35rem;
  line-height: 1.2;
  margin-bottom: 0.4rem;
}

.detalle-autor {
  font-size: 1.15rem;
  color: var(--color-text-muted);
}

.section-subtitle-sm {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary-light);
  margin-bottom: 0.75rem;
}

.detalle-descripcion {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #334155;
  background-color: #fdfdfd;
  padding: 1.25rem;
  border-left: 3px solid var(--color-accent);
  border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
}

.detalle-actions-bar {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.aviso-lectura-msg {
  margin-top: 0.85rem;
  background-color: var(--color-success-bg);
  color: var(--color-success);
  padding: 0.65rem 1rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid #a7f3d0;
  font-size: 0.9rem;
}

.editorial-seal {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px dashed var(--border-color);
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

@media (max-width: 950px) {
  .detalle-card {
    grid-template-columns: 1fr;
    padding: 1.75rem;
  }
  .detalle-img-wrapper {
    height: 320px;
  }
}
</style>
