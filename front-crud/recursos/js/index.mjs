// Configuración de la operación activa
let currentOp = 'insert';

const API_BASE = '/api/v1/productos'

const opConfig = {
  insert: {
    title: 'Ingresar nuevo producto',
    btnLabel: 'Confirmar inserción',
    btnClass: '',
    indicatorColor: '#1a1a1a',
    showFields: ['row-nombre', 'row-precio', 'row-categoria', 'row-imagen'],
    idLabel: 'Id Producto',
    idRequired: true,
    footerHint: '* Campos requeridos',
  },
  update: {
    title: 'Modificar producto existente',
    btnLabel: 'Guardar cambios',
    btnClass: 'op-update',
    indicatorColor: '#1a5c7a',
    showFields: ['row-categoria', 'row-producto'],
    idLabel: 'Id Producto a modificar',
    idRequired: false,
    footerHint: 'Seleccioná categoría y producto para cargar los datos',
  },
  read: {
    title: 'Consultar producto',
    btnLabel: 'Buscar',
    btnClass: 'op-read',
    indicatorColor: '#1a7a4a',
    showFields: ['row-categoria', 'row-producto'],
    idLabel: 'Id Producto',
    idRequired: false,
    footerHint: 'Seleccioná categoría y producto para buscar',
  },
  delete: {
    title: 'Eliminar producto',
    btnLabel: 'Eliminar producto',
    btnClass: 'op-delete',
    indicatorColor: '#c0392b',
    showFields: ['row-id'],
    idLabel: 'Id Producto a eliminar',
    idRequired: true,
    footerHint: 'Se eliminará permanentemente',
  },
};

// Elementos del DOM
const dom = {
  panelTitle: document.getElementById('panelTitle'),
  opIndicator: document.getElementById('opIndicator'),
  btnConfirm: document.getElementById('btnConfirm'),
  footerHint: document.getElementById('footerHint'),
  deleteWarning: document.getElementById('deleteWarning'),
  feedback: document.getElementById('feedback'),
  uploadArea: document.getElementById('uploadArea'),
  imgPreview: document.getElementById('imgPreview'),
  uploadLabel: document.getElementById('uploadLabel'),
  imagenProducto: document.getElementById('imagenProducto'),
  productoSelect: document.getElementById('productoSelect'),
  readResult: document.getElementById('readResult'),
};

// Guardar orden original de campos para restaurar cuando no estamos en 'read'
let _originalOrder = null;
function saveOriginalOrder() {
  if (_originalOrder) return;
  const container = document.querySelector('.form-body');
  if (!container) return;
  _originalOrder = Array.from(container.children).map(n => n.id || null);
}

function restoreOriginalOrder() {
  if (!_originalOrder) return;
  const container = document.querySelector('.form-body');
  if (!container) return;
  _originalOrder.forEach(id => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) container.appendChild(el);
  });
}

function reorderForRead() {
  const container = document.querySelector('.form-body');
  if (!container) return;
  // desired order: categoria, producto, precio, id
  const desired = ['row-categoria','row-producto','row-precio','row-id'];
  // insert each desired element at the top in reverse so final order is correct
  for (let i = desired.length - 1; i >= 0; i--) {
    const el = document.getElementById(desired[i]);
    if (el) container.insertBefore(el, container.firstChild);
  }
}

// Función para cambiar la operación
window.setOperation = function(op) {
  currentOp = op;
  const cfg = opConfig[op];

  // Actualizar botones activos
  document.querySelectorAll('.op-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.op-btn.${op}`).classList.add('active');

  // Actualizar UI
  dom.panelTitle.textContent = cfg.title;
  dom.opIndicator.style.background = cfg.indicatorColor;
  dom.btnConfirm.textContent = cfg.btnLabel;
  dom.btnConfirm.className = `btn-confirm ${cfg.btnClass}`;
  dom.footerHint.textContent = cfg.footerHint;

  // Mostrar/ocultar filas del formulario
  const allRows = ['row-id', 'row-nombre', 'row-precio', 'row-categoria', 'row-producto', 'row-imagen'];
  allRows.forEach(rowId => {
    const row = document.getElementById(rowId);
    if (row) row.style.display = cfg.showFields.includes(rowId) ? 'grid' : 'none';
  });

  // Reordenar campos cuando estamos en modo 'read'
  saveOriginalOrder();
  if (op === 'read') {
    reorderForRead();
    const idIn = document.getElementById('idProducto');
    const precioIn = document.getElementById('precioProducto');
    if (idIn) idIn.disabled = true;
    if (precioIn) precioIn.disabled = true;
    hideUpdateFields();
    clearReadResult();
  } else if (op === 'update') {
    restoreOriginalOrder();
    reorderForUpdate();
    const idIn = document.getElementById('idProducto');
    const precioIn = document.getElementById('precioProducto');
    if (idIn) idIn.disabled = false;
    if (precioIn) precioIn.disabled = false;
    hideUpdateFields();
    const rowProd = document.getElementById('row-producto');
    if (rowProd) rowProd.style.display = 'grid';
  } else {
    restoreOriginalOrder();
    const idIn = document.getElementById('idProducto');
    const precioIn = document.getElementById('precioProducto');
    if (idIn) idIn.disabled = false;
    if (precioIn) precioIn.disabled = false;
  }

  // Cambiar etiqueta del ID
  const idLabel = document.querySelector('#row-id label');
  if (idLabel) {
    idLabel.innerHTML = cfg.idLabel + (cfg.idRequired ? ' <span class="required">*</span>' : '');
  }

  // Mostrar advertencia solo si es eliminación
  dom.deleteWarning.classList.toggle('visible', op === 'delete');

  // Limpiar el feedback anterior
  clearFeedback();

  // Limpiar formulario
  clearForm();
};

function clearFeedback() {
  dom.feedback.textContent = '';
  dom.feedback.classList.remove('visible');
}

// Limpiar todos los campos
function clearForm() {
  document.getElementById('idProducto').value = '';
  document.getElementById('nombreProducto').value = '';
  document.getElementById('precioProducto').value = '';
  const categoriaSelect = document.getElementById('categoriaProducto');
  if (categoriaSelect) categoriaSelect.selectedIndex = 0;
  if (dom.productoSelect) {
    dom.productoSelect.innerHTML = '<option value="" disabled selected>Seleccionar producto...</option>';
    dom.productoSelect.selectedIndex = 0;
  }
  if (dom.imagenProducto) dom.imagenProducto.value = '';
  resetUploadArea();
  clearReadResult();
}

// Resetear el área de subida de imagen
function resetUploadArea() {
  dom.uploadArea.classList.remove('has-file');
  dom.imgPreview.classList.remove('visible');
  dom.imgPreview.src = '';
  dom.uploadLabel.textContent = 'Seleccionar imagen';
}

// Manejar cambio de archivo
function handleFileChange(fileInput) {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      dom.imgPreview.src = e.target.result;
      dom.imgPreview.classList.add('visible');
      dom.uploadArea.classList.add('has-file');
      dom.uploadLabel.textContent = file.name;
    };
    reader.readAsDataURL(file);
  } else {
    resetUploadArea();
  }
}

// Mostrar mensaje de feedback
function showFeedback(msg, success) {
  dom.feedback.textContent = (success ? '✓ ' : '✕ ') + msg;
  dom.feedback.style.background = success ? '#f0faf5' : '#fff5f5';
  dom.feedback.style.borderColor = success ? '#b2e0c8' : '#fcc';
  dom.feedback.style.color = success ? 'var(--success)' : 'var(--danger)';
  dom.feedback.classList.add('visible');
}

// Formatea un producto para mostrar en el feedback
function formatProduct(prod) {
  if (!prod) return '';
  const id = prod.id ?? prod.ID ?? '';
  const nombre = prod.nombre ?? prod.nombre_producto ?? '';
  const precio = prod.precio !== undefined ? Number(prod.precio) : '';
  const categoria = prod.categoria ?? '';
  return `${id ? '#' + id + ' - ' : ''}${nombre} — $${precio}${categoria ? ' (' + categoria + ')' : ''}`;
}

function clearReadResult() {
  if (!dom.readResult) return;
  dom.readResult.innerHTML = '';
  dom.readResult.style.display = 'none';
}

function showReadResult(prod) {
  if (!dom.readResult) return;
  if (!prod) {
    clearReadResult();
    return;
  }

  // const imageHtml = prod.imagen ? `<div class="read-result-image" style="margin-top:0.75rem;"><img src="${prod.imagen}" alt="Imagen de ${prod.nombre}" style="max-width:100%; height:auto; display:block; border-radius:10px;" /></div>` : '';
  // dom.readResult.innerHTML = `
  //   <div class="read-result-content">
  //     <p><strong>Id de producto:</strong> ${prod.id ?? ''}</p>
  //     <p><strong>Nombre:</strong> ${prod.nombre ?? ''}</p>
  //     <p><strong>Precio:</strong> $${prod.precio ?? ''}</p>
  //     <p><strong>Categoría:</strong> ${prod.categoria ?? ''}</p>
  //   </div>
  //   ${imageHtml}
  // `;
  // dom.readResult.style.display = 'block';
}

function reorderForUpdate() {
  const container = document.querySelector('.form-body');
  if (!container) return;
  const desired = ['row-categoria', 'row-producto', 'row-nombre', 'row-precio', 'row-imagen'];
  for (let i = desired.length - 1; i >= 0; i--) {
    const el = document.getElementById(desired[i]);
    if (el) container.insertBefore(el, container.firstChild);
  }
}

function hideUpdateFields() {
  const updateFields = ['row-nombre', 'row-precio', 'row-imagen'];
  updateFields.forEach(id => {
    const row = document.getElementById(id);
    if (row) row.style.display = 'none';
  });
}

function showUpdateFields(producto) {
  const nombreRow = document.getElementById('row-nombre');
  const precioRow = document.getElementById('row-precio');
  const imagenRow = document.getElementById('row-imagen');

  if (nombreRow) nombreRow.style.display = 'grid';
  if (precioRow) precioRow.style.display = 'grid';
  if (imagenRow) imagenRow.style.display = 'grid';
  reorderForUpdate();

  if (producto) {
    document.getElementById('nombreProducto').value = producto.nombre || '';
    document.getElementById('precioProducto').value = producto.precio ?? '';
    document.getElementById('categoriaProducto').value = producto.categoria || document.getElementById('categoriaProducto').value;
    resetUploadArea();
  }
}

// Cargar productos de una categoría y poblar el combobox
async function cargarProductosPorCategoria(categoria) {
  if (!categoria || !dom.productoSelect) return;

  if (currentOp === 'insert') {
    const row = document.getElementById('row-producto');
    if (row) row.style.display = 'none';
    dom.productoSelect.innerHTML = '<option value="" disabled selected>Seleccionar producto...</option>';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/categoria/${encodeURIComponent(categoria)}`);
    if (!res.ok) throw new Error('Error al obtener productos');
    const lista = await res.json();
    dom.productoSelect.innerHTML = '<option value="" disabled selected>Seleccionar producto...</option>';
    lista.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.nombre;
      dom.productoSelect.appendChild(opt);
    });
    const row = document.getElementById('row-producto');
    if (row) row.style.display = 'grid';
  } catch (err) {
    showFeedback(err.message, false);
  }
}

// Cuando se selecciona un producto, rellenar el campo de ID y cargar los datos en modificar
async function handleProductoSelectChange() {
  if (!dom.productoSelect) return;
  const val = dom.productoSelect.value;
  const idInput = document.getElementById('idProducto');
  if (idInput) idInput.value = val || '';

  if (currentOp === 'update') {
    if (!val) {
      hideUpdateFields();
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/${encodeURIComponent(val)}`);
      if (!res.ok) throw new Error('No se pudo cargar el producto');
      const producto = await res.json();
      showUpdateFields(producto);
    } catch (err) {
      showFeedback(err.message, false);
    }
    return;
  }

  if (currentOp === 'read') {
    clearReadResult();
  }
}

// Envío del formulario (conexión real a la API)
async function handleSubmit() {
  const idVal = document.getElementById('idProducto').value.trim();
  const nombre = document.getElementById('nombreProducto').value.trim();
  const precio = document.getElementById('precioProducto').value.trim();
  const categoria = document.getElementById('categoriaProducto').value;
  const formData = new FormData();

  if (nombre) formData.append('nombre', nombre);
  if (precio) formData.append('precio', precio);
  if (categoria) formData.append('categoria', categoria);
  if (dom.imagenProducto && dom.imagenProducto.files[0]) formData.append('archivo', dom.imagenProducto.files[0]);

  try {
    let response;

    if (currentOp === 'insert') {
      if (!nombre || !precio || !categoria) {
        showFeedback('Completá todos los campos requeridos.', false);
        return;
      }
      response = await fetch(API_BASE, { method: 'POST', body: formData });
    }

    if (currentOp === 'update') {
      if (!idVal) {
        showFeedback('Seleccioná un producto para actualizar.', false);
        return;
      }
      if (!nombre && !precio && !categoria && (!dom.imagenProducto || !dom.imagenProducto.files[0])) {
        showFeedback('Ingresá al menos un campo para actualizar.', false);
        return;
      }
      response = await fetch(`${API_BASE}/${idVal}`, { method: 'PUT', body: formData });
    }

    if (currentOp === 'read') {
      if (!idVal) {
        showFeedback('Seleccioná un producto antes de buscar.', false);
        return;
      }
      response = await fetch(`${API_BASE}/${idVal}`);
    }

    if (currentOp === 'delete') {
      if (!idVal) {
        showFeedback('Ingresá el ID del producto.', false);
        return;
      }
      response = await fetch(`${API_BASE}/${idVal}`, { method: 'DELETE' });
    }

    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.mensaje || 'Error en la operación');
    }

    if (currentOp === 'read') {
      document.getElementById('nombreProducto').value = body.nombre || '';
      document.getElementById('precioProducto').value = body.precio || '';
      document.getElementById('categoriaProducto').value = body.categoria || '';
      showReadResult(body);
      showFeedback(formatProduct(body), true);
      return;
    }

    const message = body.mensaje || (body.producto ? formatProduct(body.producto) : 'Operación realizada correctamente.');
    showFeedback(message, true);
    clearForm();
  } catch (error) {
    showFeedback(error.message, false);
  }
}

// Inicializar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Configurar operación por defecto
  setOperation('insert');

  // Asignar eventos a los botones de operación
  const opBtns = document.querySelectorAll('.op-btn');
  opBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const op = btn.getAttribute('data-op');
      if (op) setOperation(op);
    });
  });

  // Evento del botón confirmar
  dom.btnConfirm.addEventListener('click', handleSubmit);

  // Evento para el campo de archivo
  const fileInput = document.getElementById('imagenProducto');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => handleFileChange(e.target));
  }

  // Click en el área de upload para disparar el input file
  dom.uploadArea.addEventListener('click', (e) => {
    // Evitar que se dispare si el click fue sobre el input file (ya lo hace solo)
    if (e.target !== fileInput) {
      fileInput.click();
    }
  });

  // Evento para cambio de categoría: cargar productos
  const categoriaSel = document.getElementById('categoriaProducto');
  if (categoriaSel) {
    categoriaSel.addEventListener('change', (e) => {
      const cat = e.target.value;
      if (currentOp === 'insert') {
        const row = document.getElementById('row-producto');
        if (row) row.style.display = 'none';
        if (dom.productoSelect) dom.productoSelect.innerHTML = '<option value="" disabled selected>Seleccionar producto...</option>';
        clearReadResult();
      } else {
        cargarProductosPorCategoria(cat);
      }
    });
  }

  // Evento para selección de producto: llenar ID y precio
  if (dom.productoSelect) {
    dom.productoSelect.addEventListener('change', handleProductoSelectChange);
  }
});