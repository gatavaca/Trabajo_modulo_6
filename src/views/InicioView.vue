<template>
  <div class="inicio-view">
    <!-- Hero Banner -->
    <section class="hero-card card">
      <div class="hero-content">
        <span class="hero-badge">Plataforma Editorial 2.0</span>
        <h1 class="hero-title">
          Bienvenido a <span class="text-gradient">BookList SPA</span>
        </h1>
        <p class="hero-description">
          El sistema interactivo de gestión y catálogo bibliográfico de <strong>Editorial Nova</strong>.
          Administra obras, explora colecciones y descubre nuevas lecturas con una experiencia fluida.
        </p>

        <!-- Mensaje interactivo con modificador .once (Lección 4) -->
        <div class="welcome-box">
          <button
            type="button"
            class="btn btn-outline-primary btn-sm"
            @click.once="activarMembresia"
            :disabled="membresiaActivada"
          >
            🎁 {{ membresiaActivada ? '¡Bienvenida activada!' : 'Activar bienvenida especial (.once)' }}
          </button>
          <p v-if="membresiaActivada" class="membresia-msg">
            🎉 ¡Genial! Has recibido tu credencial de <strong>Lector Honorífico Nova</strong>. (Acción ejecutada una única vez con <code>@click.once</code>).
          </p>
        </div>

        <div class="hero-actions">
          <router-link to="/libros" class="btn btn-primary">
            📖 Explorar Catálogo de Libros
          </router-link>
          <a href="#modulo-mvvm" class="btn btn-secondary">
            ⚙️ Panel MVVM & Contador
          </a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="floating-badge">
          <span class="floating-icon">📚</span>
          <div>
            <strong>{{ totalLibros }} Títulos</strong>
            <small>en catálogo activo</small>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Lección 1: Demostración del Patrón MVVM y Contador Reactivo -->
    <section id="modulo-mvvm" class="leccion-section">
      <div class="section-title-wrap">
        <span class="section-tag">Lección 1 — Fundamentos de Vue.js</span>
        <h2 class="section-title">Patrón MVVM y Reactividad</h2>
        <p class="section-subtitle">
          Demostración práctica del modelo-vista-vistamodelo (MVVM), vinculación de datos bidireccional y métodos reactivos.
        </p>
      </div>

      <div class="mvvm-grid">
        <!-- Tarjeta: Modelo de Usuario (MVVM) -->
        <div class="card mvvm-card">
          <div class="mvvm-card-header">
            <span class="mvvm-icon">👤</span>
            <div>
              <h3>Gestión de Perfil de Usuario</h3>
              <small>Two-way data binding (v-model)</small>
            </div>
          </div>

          <div class="mvvm-body">
            <div class="form-group">
              <label class="form-label" for="nombreInput">Nombre del Usuario (Model):</label>
              <input
                id="nombreInput"
                type="text"
                class="form-control"
                v-model="nombreUsuarioLocal"
                @input="guardarNombreUsuario"
                placeholder="Ingresa tu nombre"
              />
              <span class="form-hint">Escribe para ver reflejado el cambio en la Vista simultáneamente.</span>
            </div>

            <!-- Vista reactiva (View) -->
            <div class="preview-user-box">
              <span class="preview-label">Salida en la Vista (View):</span>
              <p class="user-greeting">
                👋 Hola, <strong>{{ nombreUsuarioLocal || 'Visitante' }}</strong>. ¡Bienvenido a la biblioteca digital!
              </p>
            </div>
          </div>
        </div>

        <!-- Tarjeta: Contador Reactivo (data, methods) -->
        <div class="card mvvm-card">
          <div class="mvvm-card-header">
            <span class="mvvm-icon">🎯</span>
            <div>
              <h3>Contador Reactivo de Lecturas</h3>
              <small>Implementado con data() y methods</small>
            </div>
          </div>

          <div class="mvvm-body">
            <p class="contador-desc">
              Lleva el registro de tus libros leídos durante el ciclo actual de la Editorial:
            </p>

            <div class="contador-display-box">
              <span class="contador-numero">{{ contador }}</span>
              <span class="contador-label">
                {{ contador === 1 ? 'libro leído' : 'libros leídos' }}
              </span>
            </div>

            <div class="contador-actions">
              <!-- Botones con directiva @click y llamadas a methods -->
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                @click="decrementar"
                :disabled="contador === 0"
                title="Decrementar contador"
              >
                ➖ Restar
              </button>

              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="incrementar"
                title="Incrementar contador"
              >
                ➕ Añadir Lectura
              </button>

              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="reiniciar"
                :disabled="contador === 0"
                title="Reiniciar a cero"
              >
                🔄 Reiniciar
              </button>
            </div>

            <!-- Mensaje condicional con v-if / v-else según meta -->
            <div class="contador-feedback">
              <span v-if="contador >= 5" class="feedback-badge feedback-gold">
                🏆 ¡Lector estrella! Has superado la meta de 5 lecturas.
              </span>
              <span v-else-if="contador > 0" class="feedback-badge feedback-blue">
                📖 ¡Buen ritmo! Vas avanzando en tu meta de lectura.
              </span>
              <span v-else class="feedback-badge feedback-gray">
                💡 Aún no has registrado libros leídos. ¡Comienza hoy!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resumen de Módulos / Acceso Rápido -->
    <section class="features-section">
      <h2 class="text-center mb-4">Estructura del Proyecto BookList SPA</h2>
      <div class="features-grid">
        <div class="card feature-card">
          <div class="feature-icon">🧩</div>
          <h4>Componentes Modulares</h4>
          <p>Componente independiente <code>Libro.vue</code> y <code>FormularioLibro.vue</code> reutilizables y limpios.</p>
        </div>
        <div class="card feature-card">
          <div class="feature-icon">⚡</div>
          <h4>Formularios Reactivos</h4>
          <p>Directiva <code>v-model</code> con preview en tiempo real y validación de campos obligatorios.</p>
        </div>
        <div class="card feature-card">
          <div class="feature-icon">🧭</div>
          <h4>Navegación Dinámica</h4>
          <p>Vue Router con rutas parametrizadas <code>/libros/:id</code> pasando propiedades a la vista.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { store } from '../store/librosStore.js'

export default {
  name: 'InicioView',
  // Datos reactivos del componente según la Lección 1
  data() {
    return {
      nombreUsuarioLocal: store.usuario,
      membresiaActivada: false
    }
  },
  computed: {
    contador() {
      return store.contadorLecturas
    },
    totalLibros() {
      return store.libros.length
    }
  },
  // Métodos según requerimiento de la Lección 1 (data, methods)
  methods: {
    incrementar() {
      store.incrementarContador()
    },
    decrementar() {
      store.decrementarContador()
    },
    reiniciar() {
      store.reiniciarContador()
    },
    guardarNombreUsuario() {
      store.actualizarUsuario(this.nombreUsuarioLocal)
    },
    activarMembresia() {
      // Método disparado una única vez con el modificador .once
      this.membresiaActivada = true
    }
  }
}
</script>

<style scoped>
.inicio-view {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

/* Hero Section */
.hero-card {
  padding: 3rem;
  background: linear-gradient(135deg, #ffffff 0%, #f0fdfa 50%, #eff6ff 100%);
  border: 1px solid #bfdbfe;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  align-items: center;
  gap: 2rem;
  position: relative;
  overflow: hidden;
}

.hero-badge {
  display: inline-block;
  background-color: var(--color-accent-bg);
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.3rem 0.75rem;
  border-radius: var(--border-radius-full);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  line-height: 1.15;
  margin-bottom: 1rem;
  color: var(--color-primary-dark);
}

.text-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.welcome-box {
  margin-bottom: 1.5rem;
}

.membresia-msg {
  margin-top: 0.6rem;
  font-size: 0.88rem;
  color: var(--color-success);
  background-color: var(--color-success-bg);
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid #a7f3d0;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-badge {
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  border: 1px solid var(--border-color);
  animation: float 4s ease-in-out infinite;
}

.floating-icon {
  font-size: 2.75rem;
}

.floating-badge strong {
  display: block;
  font-size: 1.4rem;
  color: var(--color-primary-dark);
}

.floating-badge small {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

/* Lección 1 Section */
.leccion-section {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.section-title-wrap {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.section-tag {
  color: var(--color-primary-light);
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-title {
  font-size: 1.85rem;
  margin: 0.25rem 0 0.5rem;
}

.section-subtitle {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.mvvm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.mvvm-card {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
}

.mvvm-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.mvvm-icon {
  font-size: 2rem;
}

.mvvm-card-header h3 {
  font-size: 1.15rem;
}

.mvvm-card-header small {
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.preview-user-box {
  background-color: var(--color-accent-bg);
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  margin-top: 1rem;
  border: 1px solid #bae6fd;
}

.preview-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0369a1;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
}

.user-greeting {
  font-size: 0.95rem;
  color: #0c4a6e;
}

/* Contador */
.contador-desc {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.contador-display-box {
  background-color: #f8fafc;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  text-align: center;
  border: 1px dashed var(--border-color);
  margin-bottom: 1.25rem;
}

.contador-numero {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
}

.contador-label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.contador-actions {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.contador-feedback {
  text-align: center;
}

.feedback-badge {
  display: inline-block;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.4rem 0.85rem;
  border-radius: var(--border-radius-full);
}

.feedback-gold {
  background-color: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
}

.feedback-blue {
  background-color: #e0f2fe;
  color: #0369a1;
  border: 1px solid #bae6fd;
}

.feedback-gray {
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

/* Features section */
.features-section {
  margin-top: 1rem;
}

.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  padding: 1.75rem;
  text-align: center;
}

.feature-icon {
  font-size: 2.25rem;
  margin-bottom: 0.75rem;
}

.feature-card h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

@media (max-width: 850px) {
  .hero-card {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
  .hero-visual {
    order: -1;
  }
  .mvvm-grid {
    grid-template-columns: 1fr;
  }
}
</style>
