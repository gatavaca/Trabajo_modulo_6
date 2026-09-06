<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <!-- Logo y Marca Editorial -->
      <router-link to="/" class="navbar-brand">
        <div class="brand-logo-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            <path d="M8 7h8"></path>
            <path d="M8 11h6"></path>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-title font-serif">Editorial Nova</span>
          <span class="brand-subtitle">BookList SPA</span>
        </div>
      </router-link>

      <!-- Navegación Central -->
      <nav class="navbar-nav">
        <router-link to="/" class="nav-link" active-class="nav-link-active">
          <span class="nav-icon">🏠</span>
          <span>Inicio</span>
        </router-link>
        <router-link to="/libros" class="nav-link" active-class="nav-link-active">
          <span class="nav-icon">📚</span>
          <span>Catálogo</span>
          <span class="nav-badge" v-if="totalLibros > 0" title="Total de obras">{{ totalLibros }}</span>
        </router-link>
      </nav>

      <!-- Zona Derecha: Botón Acción Rápida + Avatar y Perfil -->
      <div class="navbar-actions">
        <!-- Botón de Acción Rápida: Añadir Libro -->
        <button
          type="button"
          class="btn-nuevo-libro"
          @click="irAAgregarLibro"
          title="Abrir formulario para registrar un libro"
        >
          <span class="btn-icon">➕</span>
          <span class="btn-text">Nuevo Libro</span>
        </button>

        <!-- Pastilla de Usuario y Avatar Interactivo -->
        <div class="user-menu-container" ref="userMenuRef">
          <button
            type="button"
            class="user-profile-btn"
            :class="{ 'active': menuUsuarioAbierto }"
            @click="toggleMenuUsuario"
            aria-label="Menú de perfil del usuario"
          >
            <!-- Avatar con iniciales calculadas -->
            <div class="user-avatar-circle">
              <span class="user-initials">{{ iniciales }}</span>
              <span class="status-indicator" title="En línea"></span>
            </div>

            <!-- Datos de usuario en barra -->
            <div class="user-info-text">
              <span class="user-name-display">{{ usuario }}</span>
              <span class="user-stats-pill">📖 {{ contadorLecturas }} leídos</span>
            </div>

            <span class="chevron-icon">{{ menuUsuarioAbierto ? '▲' : '▼' }}</span>
          </button>

          <!-- Menú Popover de Perfil y Ajustes en Tiempo Real -->
          <transition name="fade-scale">
            <div v-if="menuUsuarioAbierto" class="user-popover card">
              <div class="popover-header">
                <div class="popover-avatar-large">
                  <span>{{ iniciales }}</span>
                </div>
                <div class="popover-header-info">
                  <h4 class="popover-user-name">{{ usuario }}</h4>
                  <span class="popover-user-rank badge" :class="rangoLectorClase">
                    {{ rangoLector }}
                  </span>
                </div>
              </div>

              <div class="popover-body">
                <!-- Edición del nombre de usuario en tiempo real (MVVM) -->
                <div class="popover-field">
                  <label class="popover-label" for="navUserEdit">Editar nombre de usuario:</label>
                  <div class="input-with-icon">
                    <span class="input-icon">✏️</span>
                    <input
                      id="navUserEdit"
                      type="text"
                      class="form-control form-control-sm"
                      v-model="nombreLocal"
                      @input="actualizarNombre"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <small class="popover-hint">Se actualiza en vivo en toda la app.</small>
                </div>

                <!-- Control rápido del contador de lecturas -->
                <div class="popover-counter-box">
                  <div class="counter-box-header">
                    <span class="counter-box-label">Lecturas acumuladas:</span>
                    <span class="counter-box-value">{{ contadorLecturas }}</span>
                  </div>
                  <div class="counter-box-buttons">
                    <button
                      type="button"
                      class="btn-counter-mini"
                      @click="decrementarLectura"
                      :disabled="contadorLecturas === 0"
                      title="Restar lectura"
                    >
                      ➖
                    </button>
                    <button
                      type="button"
                      class="btn-counter-mini btn-counter-add"
                      @click="incrementarLectura"
                      title="Sumar lectura"
                    >
                      ➕ Sumar
                    </button>
                  </div>
                </div>

                <!-- Enlaces rápidos dentro del popover -->
                <div class="popover-links">
                  <router-link to="/" class="popover-link-item" @click="menuUsuarioAbierto = false">
                    <span>🏠 Vista de Bienvenida</span>
                    <span>→</span>
                  </router-link>
                  <router-link to="/libros" class="popover-link-item" @click="menuUsuarioAbierto = false">
                    <span>📚 Ver todo el Catálogo</span>
                    <span>→</span>
                  </router-link>
                </div>
              </div>

              <div class="popover-footer">
                <button
                  type="button"
                  class="btn-popover-close"
                  @click="menuUsuarioAbierto = false"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { store } from '../store/librosStore.js'

export default {
  name: 'Navbar',
  data() {
    return {
      menuUsuarioAbierto: false,
      nombreLocal: store.usuario
    }
  },
  computed: {
    usuario() {
      return store.usuario
    },
    totalLibros() {
      return store.libros.length
    },
    contadorLecturas() {
      return store.contadorLecturas
    },
    // Calcula las iniciales del usuario (ej: "Alex Gómez" -> "AG")
    iniciales() {
      const nombre = (this.usuario || '').trim()
      if (!nombre) return 'EN'
      const partes = nombre.split(/\s+/)
      if (partes.length === 1) {
        return partes[0].slice(0, 2).toUpperCase()
      }
      return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
    },
    rangoLector() {
      if (this.contadorLecturas >= 5) return '🏆 Lector Estrella'
      if (this.contadorLecturas >= 1) return '📖 Lector Activo'
      return '🌱 Lector Principiante'
    },
    rangoLectorClase() {
      if (this.contadorLecturas >= 5) return 'badge-novela'
      if (this.contadorLecturas >= 1) return 'badge-tecnologia'
      return 'badge-general'
    }
  },
  watch: {
    // Si el usuario cambia desde InicioView, sincronizar con el input local del popover
    usuario(nuevo) {
      this.nombreLocal = nuevo
    }
  },
  mounted() {
    // Cerrar el popover al hacer clic fuera del menú
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    toggleMenuUsuario() {
      this.menuUsuarioAbierto = !this.menuUsuarioAbierto
      if (this.menuUsuarioAbierto) {
        this.nombreLocal = this.usuario
      }
    },
    actualizarNombre() {
      store.actualizarUsuario(this.nombreLocal)
    },
    incrementarLectura() {
      store.incrementarContador()
    },
    decrementarLectura() {
      store.decrementarContador()
    },
    irAAgregarLibro() {
      store.abrirFormulario()
      if (this.$route.path !== '/libros') {
        this.$router.push('/libros')
      } else {
        // Desplazar suavemente hacia la sección del formulario
        window.scrollTo({ top: 120, behavior: 'smooth' })
      }
    },
    handleClickOutside(event) {
      const container = this.$refs.userMenuRef
      if (container && !container.contains(event.target)) {
        this.menuUsuarioAbierto = false
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.85);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
  transition: var(--transition);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 74px;
  gap: 1.5rem;
}

/* Marca / Logo */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-logo-icon {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(30, 58, 138, 0.25);
  transition: transform 0.3s ease;
}

.navbar-brand:hover .brand-logo-icon {
  transform: scale(1.05) rotate(-2deg);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  letter-spacing: -0.01em;
  line-height: 1.15;
}

.brand-subtitle {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.09em;
}

/* Enlaces de Navegación */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-muted);
  padding: 0.55rem 1rem;
  border-radius: var(--border-radius);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
}

.nav-icon {
  font-size: 1.05rem;
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-surface-hover);
}

.nav-link-active {
  color: var(--color-primary);
  background-color: var(--color-accent-bg);
  font-weight: 700;
}

.nav-badge {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: var(--border-radius-full);
}

/* Acciones Derecha */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Botón Nuevo Libro */
.btn-nuevo-libro {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1.15rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #ffffff;
  border: none;
  border-radius: var(--border-radius-full);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
  transition: var(--transition);
  font-family: inherit;
}

.btn-nuevo-libro:hover {
  transform: translateY(-1.5px);
  box-shadow: 0 6px 16px rgba(2, 132, 199, 0.35);
}

.btn-icon {
  font-size: 0.9rem;
}

/* Menú de Usuario y Popover */
.user-menu-container {
  position: relative;
}

.user-profile-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #ffffff;
  border: 1.5px solid var(--border-color);
  padding: 0.4rem 0.75rem 0.4rem 0.4rem;
  border-radius: var(--border-radius-full);
  cursor: pointer;
  transition: var(--transition);
  font-family: inherit;
}

.user-profile-btn:hover, .user-profile-btn.active {
  border-color: var(--color-primary-light);
  background-color: #f8fafc;
  box-shadow: var(--shadow-sm);
}

.user-avatar-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  position: relative;
  letter-spacing: 0.02em;
}

.status-indicator {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 10px;
  height: 10px;
  background-color: #10b981;
  border: 2px solid #ffffff;
  border-radius: 50%;
}

.user-info-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.user-name-display {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-text-main);
  line-height: 1.2;
}

.user-stats-pill {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.chevron-icon {
  font-size: 0.65rem;
  color: var(--color-text-light);
  margin-left: 0.25rem;
}

/* Popover Flotante */
.user-popover {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 310px;
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 1.5rem;
  z-index: 1100;
}

.popover-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.popover-avatar-large {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  font-weight: 800;
}

.popover-header-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.popover-user-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-primary-dark);
}

.popover-user-rank {
  font-size: 0.7rem;
}

.popover-body {
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.popover-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.popover-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.input-with-icon {
  display: flex;
  align-items: center;
  position: relative;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  font-size: 0.85rem;
}

.form-control-sm {
  padding-left: 2.2rem;
  font-size: 0.88rem;
  padding-top: 0.45rem;
  padding-bottom: 0.45rem;
}

.popover-hint {
  font-size: 0.72rem;
  color: var(--color-text-light);
}

/* Control del contador en popover */
.popover-counter-box {
  background-color: #f8fafc;
  padding: 0.85rem 1rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.counter-box-header {
  display: flex;
  flex-direction: column;
}

.counter-box-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.counter-box-value {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-primary);
}

.counter-box-buttons {
  display: flex;
  gap: 0.4rem;
}

.btn-counter-mini {
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.btn-counter-mini:hover:not(:disabled) {
  background-color: var(--color-surface-hover);
  border-color: #cbd5e1;
}

.btn-counter-add {
  background-color: var(--color-accent-bg);
  border-color: #bae6fd;
  color: #0369a1;
}

/* Enlaces del popover */
.popover-links {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.popover-link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.85rem;
  color: var(--color-text-main);
  font-weight: 500;
  transition: var(--transition);
}

.popover-link-item:hover {
  background-color: #f1f5f9;
  color: var(--color-primary);
}

.popover-footer {
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-color);
  text-align: right;
}

.btn-popover-close {
  background: none;
  border: none;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: var(--border-radius-sm);
}

.btn-popover-close:hover {
  color: var(--color-text-main);
  background-color: #f1f5f9;
}

/* Animaciones del popover */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}

/* Responsividad */
@media (max-width: 768px) {
  .btn-text {
    display: none;
  }
  .btn-nuevo-libro {
    padding: 0.5rem 0.8rem;
  }
  .user-info-text {
    display: none;
  }
  .brand-subtitle {
    display: none;
  }
}

@media (max-width: 520px) {
  .nav-link span:not(.nav-icon):not(.nav-badge) {
    display: none;
  }
  .user-popover {
    width: 280px;
    right: -10px;
  }
}
</style>
