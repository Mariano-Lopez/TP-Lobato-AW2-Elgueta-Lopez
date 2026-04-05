import {mostrarMenuHamburguesa, esconderNavbarScroll} from '../funciones.js'

const $nav = document.querySelector('.nav-principal')

const $abrirMenuBtn = document.querySelector('.abrir-menu')

const $cerrarMenuBtn = document.querySelector('.cerrar-menu')

const $cabecera = document.getElementById('cabecera-principal')

// Mostrar menú hamburguesa
mostrarMenuHamburguesa($abrirMenuBtn, $cerrarMenuBtn, $nav)

// para ocultar y mostrar navbar al hacer scroll
esconderNavbarScroll($cabecera)
