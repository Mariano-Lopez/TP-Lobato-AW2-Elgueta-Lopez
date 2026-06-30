import {
  renderizarProductos,
  filtrarProductos,
  obtenerProductosJSON,
  esconderNavbarScroll,
  mostrarMenuHamburguesa,
  esperarQueCargueRecursos,
} from '../funciones.mjs'
import {API_PRODUCTOS_URL, API_PROMOCIONES_URL} from '../config.mjs'

const $cabecera = document.getElementById('cabecera-principal')

const $contenedorPizzas = document.querySelector('#contenedor-pizzas')

const $contenedorEmpanadas = document.querySelector('#contenedor-empanadas')

const $contenedorBebidas = document.querySelector('#contenedor-bebidas')

const $contenedorPromociones = document.querySelector('#contenedor-promociones')

const $menuHamburguesa = document.querySelector('.menu-hamburguesa')

const $nav = document.querySelector('.nav-principal')

const $abrirMenuBtn = document.querySelector('.abrir-menu')

const $cerrarMenuBtn = document.querySelector('.cerrar-menu')

esperarQueCargueRecursos()

// para ocultar y mostrar navbar al hacer scroll
esconderNavbarScroll($cabecera)

// Mostrar menú hamburguesa
mostrarMenuHamburguesa($abrirMenuBtn, $cerrarMenuBtn, $nav)

const productos = await obtenerProductosJSON(API_PRODUCTOS_URL)

const promociones = await obtenerProductosJSON(API_PROMOCIONES_URL)

renderizarProductos(productos.filter((producto) => producto.categoria === 'Pizza'), $contenedorPizzas)

renderizarProductos(productos.filter((producto) => producto.categoria === 'Empanada'), $contenedorEmpanadas)

renderizarProductos(productos.filter((producto) => producto.categoria === 'Bebida'), $contenedorBebidas)

renderizarProductos(promociones, $contenedorPromociones)

// --------------------------------------------------------
// 1) Unir todos los productos en un solo array
// --------------------------------------------------------
const todosLosProductos = [
  ...productos,
  ...promociones,
]

// --------------------------------------------------------
// 2) Referencias del DOM
// --------------------------------------------------------
const secciones = document.querySelectorAll('.seccion-principal')
const seccionResultados = document.getElementById('resultados-busqueda')
const contenedorResultados = document.getElementById('resultados-productos')
const lineaDivisora = document.getElementById('linea-divisora-carta-promo')

const btnBuscar = document.getElementById('boton-buscar')
const btnLimpiar = document.getElementById('boton-limpiar')

// --------------------------------------------------------
// 3) Funciones de UI
// --------------------------------------------------------
function ocultarTodasLasSecciones() {
  secciones.forEach((sec) => {
    if (sec !== seccionResultados) sec.style.display = 'none'
  })
  lineaDivisora.style.display = 'none'
}

function mostrarTodasLasSecciones() {
  secciones.forEach((sec) => (sec.style.display = 'block'))
  lineaDivisora.style.display = 'block'
}

function mostrarResultados(productosFiltrados) {
  seccionResultados.style.display = 'block'

  renderizarProductos(productosFiltrados, contenedorResultados)
}

function limpiarResultados() {
  contenedorResultados.innerHTML = ''
  seccionResultados.style.display = 'none'
}

// --------------------------------------------------------
// 4) Eventos
// --------------------------------------------------------
btnBuscar.addEventListener('click', () => {
  const filtrados = filtrarProductos(todosLosProductos)

  ocultarTodasLasSecciones()
  mostrarResultados(filtrados)
})

btnLimpiar.addEventListener('click', () => {
  mostrarTodasLasSecciones()

  // Resetear el formulario
  document.querySelector('.form-busqueda').reset()
  limpiarResultados()
})