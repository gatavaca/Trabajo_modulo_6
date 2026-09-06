<template>
  <div class="formulario-libro-container">
    <div class="form-wrapper card">
      <div class="form-header">
        <h2 class="form-title">📝 Registrar Nuevo Libro</h2>
        <p class="form-subtitle">Completa los campos para incorporar un título al catálogo de Editorial Nova.</p>
        
        <!-- Botón con modificador .once según requerimiento de Lección 4 -->
        <button
          type="button"
          class="btn-consejo"
          @click.once="mostrarConsejoEditorial"
        >
          💡 {{ consejoMostrado ? 'Consejo aplicado' : 'Ver sugerencia de catalogación (.once)' }}
        </button>
      </div>

      <div v-if="consejoMostrado" class="alert-box alert-info">
        <span>✨ <strong>Sugerencia de la Editorial:</strong> Recuerda incluir una sinopsis concisa para despertar el interés de los lectores. ¡Este aviso se ejecutó con el modificador <code>.once</code>!</span>
      </div>

      <!-- Formulario con modificador .prevent según requerimiento de Lección 4 -->
      <form @submit.prevent="enviarFormulario" class="form-content">
        <!-- Campo: Título con input y evento @keyup.enter -->
        <div class="form-group">
          <label for="titulo" class="form-label">Título del Libro *</label>
          <input
            id="titulo"
            type="text"
            class="form-control"
            v-model="formulario.titulo"
            placeholder="Ej: Rayuela"
            @keyup.enter="enviarFormulario"
            required
          />
          <span class="form-hint">Presiona Enter o haz clic en "Agregar Libro"</span>
        </div>

        <!-- Campo: Autor con input y evento @keyup.enter -->
        <div class="form-group">
          <label for="autor" class="form-label">Autor / Escritor *</label>
          <input
            id="autor"
            type="text"
            class="form-control"
            v-model="formulario.autor"
            placeholder="Ej: Julio Cortázar"
            @keyup.enter="enviarFormulario"
            required
          />
        </div>

        <div class="form-row">
          <!-- Campo: Categoría con select -->
          <div class="form-group form-col">
            <label for="categoria" class="form-label">Categoría *</label>
            <select
              id="categoria"
              class="form-select"
              v-model="formulario.categoria"
              required
            >
              <option disabled value="">Selecciona una categoría</option>
              <option value="Novela">Novela</option>
              <option value="Ciencia Ficción">Ciencia Ficción</option>
              <option value="Historia">Historia</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Fantasía">Fantasía</option>
              <option value="Poesía">Poesía</option>
              <option value="Filosofía">Filosofía</option>
            </select>
          </div>

          <!-- Campo: Año con input -->
          <div class="form-group form-col">
            <label for="anio" class="form-label">Año de Publicación</label>
            <input
              id="anio"
              type="number"
              class="form-control"
              v-model.number="formulario.anio"
              placeholder="Ej: 1963"
              min="1000"
              :max="new Date().getFullYear()"
            />
          </div>
        </div>

        <!-- Campo: URL Portada (opcional) -->
        <div class="form-group">
          <label for="portada" class="form-label">URL de la Portada (opcional)</label>
          <input
            id="portada"
            type="url"
            class="form-control"
            v-model="formulario.portada"
            placeholder="https://images.unsplash.com/..."
          />
          <span class="form-hint">Si lo dejas vacío, se asignará una portada editorial por defecto</span>
        </div>

        <!-- Campo: Sinopsis con textarea -->
        <div class="form-group">
          <label for="descripcion" class="form-label">Sinopsis o Reseña *</label>
          <textarea
            id="descripcion"
            class="form-textarea"
            v-model="formulario.descripcion"
            placeholder="Escribe una breve descripción del libro..."
            rows="3"
            required
          ></textarea>
        </div>

        <!-- Botones de acción -->
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="!formularioValido">
            ➕ Agregar Libro al Catálogo
          </button>
          <button type="button" class="btn btn-secondary" @click="limpiarFormulario">
            🔄 Limpiar Campos
          </button>
        </div>
      </form>
    </div>

    <!-- Panel de Vista Previa en tiempo real (Requerimiento Lección 3) -->
    <div class="preview-wrapper card">
      <div class="preview-header">
        <span class="preview-tag">👁️ Vista Previa en Tiempo Real</span>
        <span class="preview-badge-status" :class="{ 'activo': tieneDatos }">
          {{ tieneDatos ? 'Actualizando modelo' : 'Esperando datos' }}
        </span>
      </div>

      <div class="preview-card-body">
        <div class="preview-image-box">
          <img
            :src="formulario.portada || portadaPlaceholder"
            :alt="formulario.titulo || 'Portada preliminar'"
            class="preview-img"
          />
        </div>
        
        <div class="preview-info">
          <div class="preview-meta">
            <span class="badge" :class="claseCategoriaPreview">
              {{ formulario.categoria || 'Categoría no seleccionada' }}
            </span>
            <span class="preview-anio" v-if="formulario.anio">
              📅 {{ formulario.anio }}
            </span>
          </div>

          <h3 class="preview-titulo">
            {{ formulario.titulo || 'Título del libro...' }}
          </h3>
          <p class="preview-autor">
            ✍️ <em>{{ formulario.autor || 'Nombre del autor...' }}</em>
          </p>
          <p class="preview-descripcion">
            {{ formulario.descripcion || 'Aquí aparecerá la sinopsis en tiempo real a medida que escribas en el formulario...' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormularioLibro',
  emits: ['libro-agregado'],
  data() {
    return {
      // Modelo vinculado reactivamente con v-model (Lección 3)
      formulario: {
        titulo: '',
        autor: '',
        categoria: 'Novela',
        anio: new Date().getFullYear(),
        portada: '',
        descripcion: ''
      },
      consejoMostrado: false,
      portadaPlaceholder: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    }
  },
  computed: {
    formularioValido() {
      return (
        this.formulario.titulo.trim().length > 0 &&
        this.formulario.autor.trim().length > 0 &&
        this.formulario.categoria.trim().length > 0 &&
        this.formulario.descripcion.trim().length > 0
      )
    },
    tieneDatos() {
      return (
        this.formulario.titulo.trim().length > 0 ||
        this.formulario.autor.trim().length > 0 ||
        this.formulario.descripcion.trim().length > 0
      )
    },
    claseCategoriaPreview() {
      const cat = (this.formulario.categoria || '').toLowerCase()
      if (cat.includes('novela')) return 'badge-novela'
      if (cat.includes('ciencia')) return 'badge-ciencia-ficcion'
      if (cat.includes('historia')) return 'badge-historia'
      if (cat.includes('tecnología') || cat.includes('tecnologia')) return 'badge-tecnologia'
      if (cat.includes('fantasía') || cat.includes('fantasia')) return 'badge-fantasia'
      return 'badge-general'
    }
  },
  methods: {
    mostrarConsejoEditorial() {
      // Método disparado con @click.once (Lección 4)
      this.consejoMostrado = true
    },
    enviarFormulario() {
      if (!this.formularioValido) return

      // Emitir el libro para que el store o componente padre lo incorpore
      this.$emit('libro-agregado', { ...this.formulario })

      // Limpiar campos luego de agregar
      this.limpiarFormulario()
    },
    limpiarFormulario() {
      this.formulario = {
        titulo: '',
        autor: '',
        categoria: 'Novela',
        anio: new Date().getFullYear(),
        portada: '',
        descripcion: ''
      }
    }
  }
}
</script>

<style scoped>
.formulario-libro-container {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.form-wrapper {
  padding: 2rem;
}

.form-header {
  margin-bottom: 1.5rem;
  position: relative;
}

.form-title {
  font-size: 1.4rem;
  margin-bottom: 0.35rem;
}

.form-subtitle {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}

.btn-consejo {
  background-color: #f1f5f9;
  border: 1px dashed #cbd5e1;
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: var(--transition);
}

.btn-consejo:hover {
  background-color: var(--color-accent-bg);
  border-color: var(--color-accent);
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-col {
  flex: 1;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* Vista previa reactiva */
.preview-wrapper {
  padding: 1.5rem;
  background: #ffffff;
  border: 1.5px dashed #cbd5e1;
  display: flex;
  flex-direction: column;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

.preview-tag {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.preview-badge-status {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: var(--border-radius-full);
  background-color: #f1f5f9;
  color: var(--color-text-muted);
}

.preview-badge-status.activo {
  background-color: var(--color-success-bg);
  color: var(--color-success);
}

.preview-card-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-image-box {
  width: 100%;
  height: 220px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.preview-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-anio {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.preview-titulo {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--color-primary-dark);
}

.preview-autor {
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.preview-descripcion {
  font-size: 0.85rem;
  color: var(--color-text-main);
  background-color: #f8fafc;
  padding: 0.85rem;
  border-radius: var(--border-radius-sm);
  line-height: 1.4;
  word-break: break-word;
}

@media (max-width: 900px) {
  .formulario-libro-container {
    grid-template-columns: 1fr;
  }
}
</style>
