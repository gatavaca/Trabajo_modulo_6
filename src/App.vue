<template>
  <div id="app-root" class="app-layout">
    <!-- Barra de navegación principal moderna y unificada -->
    <Navbar />

    <!-- Contenedor dinámico de vistas según la ruta activa (Lección 5) -->
    <main class="main-content">
      <div class="container">
        <router-view />
      </div>
    </main>

    <!-- Pie de página institucional -->
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-left">
          <p><strong>Editorial Nova</strong> — Plataforma de Gestión BookList SPA</p>
          <small>Evaluación Módulo #6: Desarrollo de Interfaces Interactivas con Framework Vue</small>
        </div>
        <div class="footer-right">
          <span class="tech-tag">Vue.js 3</span>
          <span class="tech-tag">Vue Router 4</span>
          <span class="tech-tag">Vite</span>
          <span class="tech-tag">Patrón MVVM</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import { store } from './store/librosStore.js'

export default {
  name: 'App',
  components: {
    Navbar
  },
  // Estructura template / script / style según requerimiento Lección 1
  data() {
    return {
      appName: 'BookList SPA — Editorial Nova'
    }
  },
  computed: {
    usuario() {
      return store.usuario
    },
    contadorLecturas() {
      return store.contadorLecturas
    },
    totalLibros() {
      return store.libros.length
    }
  },
  methods: {
    // Métodos accesibles para el componente principal
    obtenerTituloPagina() {
      return this.appName
    }
  }
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.tech-tag {
  display: inline-block;
  background-color: #f1f5f9;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: var(--border-radius-sm);
  margin-left: 0.4rem;
}

.footer-left small {
  color: var(--color-text-muted);
  display: block;
  margin-top: 0.25rem;
}

@media (max-width: 640px) {
  .d-none-sm {
    display: none;
  }
}
</style>
