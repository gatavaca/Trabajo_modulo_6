import { reactive } from 'vue'
import { librosIniciales } from '../data/librosIniciales.js'

const STORAGE_KEY = 'booklist_spa_libros'

function cargarLibrosDesdeStorage() {
  try {
    const guardados = localStorage.getItem(STORAGE_KEY)
    if (guardados) {
      const parsed = JSON.parse(guardados)
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Actualizar portadas si coinciden con los libros iniciales y tenían fotos genéricas
        return parsed.map(libro => {
          const original = librosIniciales.find(l => l.id === libro.id)
          if (original && libro.portada && libro.portada.includes('unsplash.com')) {
            return { ...libro, portada: original.portada }
          }
          return libro
        })
      }
    }
  } catch (error) {
    console.error('Error al recuperar libros de localStorage:', error)
  }
  return [...librosIniciales]
}

function persistirLibros(libros) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(libros))
  } catch (error) {
    console.error('Error al guardar libros en localStorage:', error)
  }
}

export const store = reactive({
  usuario: 'Alex Gómez',
  contadorLecturas: 3,
  libros: cargarLibrosDesdeStorage(),
  formularioAbierto: false,

  abrirFormulario() {
    this.formularioAbierto = true
  },

  cerrarFormulario() {
    this.formularioAbierto = false
  },

  toggleFormulario() {
    this.formularioAbierto = !this.formularioAbierto
  },

  // Acciones para libros
  agregarLibro(datosLibro) {
    const nuevo = {
      id: Date.now(),
      titulo: datosLibro.titulo.trim(),
      autor: datosLibro.autor.trim(),
      categoria: datosLibro.categoria || 'General',
      descripcion: datosLibro.descripcion ? datosLibro.descripcion.trim() : 'Sin descripción disponible.',
      anio: datosLibro.anio || new Date().getFullYear(),
      paginas: datosLibro.paginas || 200,
      portada: datosLibro.portada && datosLibro.portada.trim().length > 0
        ? datosLibro.portada.trim()
        : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      destacado: false
    }
    this.libros.unshift(nuevo)
    persistirLibros(this.libros)
    return nuevo
  },

  eliminarLibro(id) {
    const index = this.libros.findIndex(item => String(item.id) === String(id))
    if (index !== -1) {
      const libroEliminado = this.libros[index]
      this.libros.splice(index, 1)
      persistirLibros(this.libros)
      return libroEliminado
    }
    return null
  },

  obtenerLibroPorId(id) {
    return this.libros.find(item => String(item.id) === String(id))
  },

  restaurarPorDefecto() {
    this.libros = [...librosIniciales]
    persistirLibros(this.libros)
  },

  // Acciones para contador
  incrementarContador() {
    this.contadorLecturas++
  },

  decrementarContador() {
    if (this.contadorLecturas > 0) {
      this.contadorLecturas--
    }
  },

  reiniciarContador() {
    this.contadorLecturas = 0
  },

  actualizarUsuario(nuevoNombre) {
    if (nuevoNombre && nuevoNombre.trim()) {
      this.usuario = nuevoNombre.trim()
    }
  }
})
