function renderizarProductos(arregloProductos, $refContenedor) {
  let html = ''
  arregloProductos.forEach((producto) => {
    const plantilla = `
        <article>
            <img
                src="${producto.imagen.src}"
                alt="${producto.imagen.alt}"
            />
            <span>${producto.nombre}</span>
            <p>$${producto.precio}</p>
        </article>
        `
    html += plantilla
  })

  $refContenedor.innerHTML = html
}

function filtrarProductos(todosLosProductos) {
  // 1. Obtener valores actuales
  const filtroCategoria = document.getElementById('filtrado-productos').value
  const textoBusqueda = document
    .getElementById('busqueda-producto')
    .value.toLowerCase()
    .trim()

  // 2. Aplicar filtros
  let productosFiltrados = todosLosProductos

  // Filtrar por categoría (si se seleccionó una)
  if (filtroCategoria && filtroCategoria !== '') {
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.categoria === filtroCategoria,
    )
  }

  // Filtrar por texto de búsqueda (si se escribió algo)
  if (textoBusqueda) {
    productosFiltrados = productosFiltrados.filter((producto) =>
      producto.nombre.toLowerCase().includes(textoBusqueda),
    )
  }

  // 3. Devolver el array filtrado
  return productosFiltrados
}

function obtenerProductosJSON(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data[0]
    })

    .catch((error) => {
      console.error('Error al cargar el archivo JSON:', error)
      return []
    })
}

function esconderNavbarScroll(navbar) {
  let lastScrollTop = 0
  window.addEventListener(
    'scroll',
    () => {
      let currentScroll =
        window.pageYOffset || document.documentElement.scrollTop

      if (currentScroll > lastScrollTop) {
        navbar.classList.add('hidden')
      } else {
        navbar.classList.remove('hidden')
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
    },
    false,
  )
}

function mostrarMenuHamburguesa($abrirMenuBtn, $cerrarMenuBtn, $nav) {
  $abrirMenuBtn.addEventListener('click', () => {
    $nav.classList.add('visible')
  })

  $cerrarMenuBtn.addEventListener('click', () => {
    $nav.classList.remove('visible')
  })

  document.addEventListener('click', (event) => {
    //verificar si el menú está abierto
    if ($nav.classList.contains('visible')) {
      const clicDentroDelNav = $nav.contains(event.target)
      const clicEnBotonAbrir = $abrirMenuBtn.contains(event.target)

      //si el clic no fue dentro del nav ni en el botón de abrir, se cierra el menú
      if (!clicDentroDelNav && !clicEnBotonAbrir) {
        $nav.classList.remove('visible')
      }
    }
  })
}

function verTodosProductos($verTodosProductosBtn) {
  $verTodosProductosBtn.addEventListener('click', () => {
    window.location.href = '/carta.html#carta'
  })
}

function verTodasPromos($verTodasPromosBtn) {
  $verTodasPromosBtn.addEventListener('click', () => {
    window.location.href = '/carta.html#promos'
  })
}

function esperarQueCargueRecursos() {
  const hash = window.location.hash // Obtener el hash de la URL

  if (hash) {
    // Evitar el scroll automático al id promos
    window.scrollTo(0, 0)

    window.addEventListener('load', function () {
      // para asegurarnos de saltar al h2 luego de que TODOS los recursos carguen.

      // Retraso para que el usuario "vea" el inicio de la página
      setTimeout(function () {
        const elementoDestino = document.querySelector(hash)

        if (elementoDestino) {
          elementoDestino.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }, 700) // 500ms de retraso
    })
  }
}

export {
  renderizarProductos,
  filtrarProductos,
  obtenerProductosJSON,
  esconderNavbarScroll,
  mostrarMenuHamburguesa,
  verTodosProductos,
  verTodasPromos,
  esperarQueCargueRecursos,
}
