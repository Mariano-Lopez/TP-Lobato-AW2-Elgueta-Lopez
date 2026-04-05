import {
  renderizarProductos,
  filtrarProductos,
  obtenerProductosJSON,
  esconderNavbarScroll,
  mostrarMenuHamburguesa,
  esperarQueCargueRecursos,
} from '../funciones.js'
import {API_PRODUCTOS_URL, API_PROMOCIONES_URL} from '../config.js'

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

renderizarProductos(productos.pizzas, $contenedorPizzas)

renderizarProductos(productos.empanadas, $contenedorEmpanadas)

renderizarProductos(productos.bebidas, $contenedorBebidas)

renderizarProductos(promociones.promociones, $contenedorPromociones)
// --------------------------------------------------------
// 1) Unir todos los productos en un solo array
// --------------------------------------------------------
const todosLosProductos = [
  ...productos.pizzas,
  ...productos.empanadas,
  ...productos.bebidas,
  ...(promociones.promociones ?? []), // por si después agregan promos
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

$menuHamburguesa.addEventListener('click', () => {
  const $navegacion = document.querySelector('.menu-mobile')
  $navegacion.classList.toggle('mostrar-menu')
  $menuHamburguesa.style.display = 'block'
})
