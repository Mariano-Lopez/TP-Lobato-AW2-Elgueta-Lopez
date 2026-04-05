import {
  renderizarProductos,
  obtenerProductosJSON,
  esconderNavbarScroll,
  mostrarMenuHamburguesa,
  verTodosProductos,
  verTodasPromos
} from '../funciones.js'
import {API_PRODUCTOS_URL, API_PROMOCIONES_URL} from '../config.js'

// Selección de elementos del DOM y listeners
const $contenedorProductos = document.querySelector('#contenedor-productos')

const $contenedorPromociones = document.querySelector('#contenedor-promos')

const $verTodosProductosBtn = document.getElementById('boton-carta')

const $verMasProductosBtn = document.getElementById('boton-ver-productos')

const $verMasPromosBtn = document.getElementById('ver-mas-promos')

const $verTodasPromosBtn = document.getElementById('boton-promos')

const $nav = document.querySelector('.nav-principal')

const $cabecera = document.getElementById('cabecera-principal')

const $abrirMenuBtn = document.querySelector('.abrir-menu')

const $cerrarMenuBtn = document.querySelector('.cerrar-menu')

// Mostrar menú hamburguesa
mostrarMenuHamburguesa($abrirMenuBtn, $cerrarMenuBtn, $nav)

// para ocultar y mostrar navbar al hacer scroll
esconderNavbarScroll($cabecera)

// Obtener y renderizar productos y promociones
const productos = await obtenerProductosJSON(API_PRODUCTOS_URL)

const promociones = await obtenerProductosJSON(API_PROMOCIONES_URL)

renderizarProductos(productos.pizzas.slice(0, 3), $contenedorProductos)

renderizarProductos(promociones.promociones.slice(0, 3), $contenedorPromociones)

verTodosProductos($verTodosProductosBtn)
verTodosProductos($verMasProductosBtn)

verTodasPromos($verTodasPromosBtn)
verTodasPromos($verMasPromosBtn)
