import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: InicioView
  },
  {
    path: '/libros',
    name: 'ListaLibros',
    component: ListaLibros
  },
  {
    path: '/libros/:id',
    name: 'DetalleLibro',
    component: DetalleLibro,
    // Requerimiento Lección 5: habilitar props para pasar :id directamente a la vista
    props: true
  },
  {
    // Redirección en caso de ruta inexistente
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
