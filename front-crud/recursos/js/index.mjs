// Configuración de la operación activa
let currentOp = 'insert';

const opConfig = {
  insert: {
    title: 'Ingresar nuevo producto',
    btnLabel: 'Confirmar inserción',
    btnClass: '',
    indicatorColor: '#1a1a1a',
    showFields: ['row-nombre', 'row-precio', 'row-imagen'],
    idLabel: 'Id Producto',
    idRequired: true,
    footerHint: '* Campos requeridos',
  },
  update: {
    title: 'Modificar producto existente',
    btnLabel: 'Guardar cambios',
    btnClass: 'op-update',
    indicatorColor: '#1a5c7a',
    showFields: ['row-id', 'row-nombre', 'row-precio', 'row-imagen'],
    idLabel: 'Id Producto a modificar',
    idRequired: true,
    footerHint: '* Completá solo los campos a cambiar',
  },
  read: {
    title: 'Consultar producto',
    btnLabel: 'Buscar',
    btnClass: 'op-read',
    indicatorColor: '#1a7a4a',
    showFields: ['row-id'],
    idLabel: 'Id Producto',
    idRequired: true,
    footerHint: 'Ingresá el ID del producto a consultar',
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
};

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
  const allRows = ['row-id', 'row-nombre', 'row-precio', 'row-categoria', 'row-imagen'];
  allRows.forEach(rowId => {
    const row = document.getElementById(rowId);
    if (row) row.style.display = cfg.showFields.includes(rowId) ? 'grid' : 'none';
  });

  // Cambiar etiqueta del ID
  const idLabel = document.querySelector('#row-id label');
  if (idLabel) {
    idLabel.innerHTML = cfg.idLabel + (cfg.idRequired ? ' <span class="required">*</span>' : '');
  }

  // Mostrar advertencia solo si es eliminación
  dom.deleteWarning.classList.toggle('visible', op === 'delete');

  // Limpiar formulario
  clearForm();
};

// Limpiar todos los campos
function clearForm() {
  document.getElementById('idProducto').value = '';
  document.getElementById('nombreProducto').value = '';
  document.getElementById('precioProducto').value = '';
  const categoriaSelect = document.getElementById('categoriaProducto');
  if (categoriaSelect) categoriaSelect.selectedIndex = 0;
  if (dom.imagenProducto) dom.imagenProducto.value = '';
  resetUploadArea();
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

// Envío del formulario (aquí conectarás con tu API real)
function handleSubmit() {
  const cfg = opConfig[currentOp];
  const idVal = document.getElementById('idProducto').value.trim();

  if (!idVal) {
    showFeedback('Por favor ingresá el ID del producto.', false);
    return;
  }

  if (currentOp === 'insert') {
    const nombre = document.getElementById('nombreProducto').value.trim();
    const precio = document.getElementById('precioProducto').value.trim();
    const cat = document.getElementById('categoriaProducto').value;
    if (!nombre || !precio || !cat) {
      showFeedback('Completá todos los campos requeridos.', false);
      return;
    }
  }

  // Simulación de respuestas (reemplazar por fetch real)
  const mockMessages = {
    insert: `Producto #${idVal} insertado correctamente.`,
    update: `Producto #${idVal} actualizado correctamente.`,
    read: `Consultando producto #${idVal}... (simulado)`,
    delete: `Producto #${idVal} eliminado correctamente.`,
  };

  // Aquí iría la llamada a tu backend
  // Ejemplo: 
  // if (currentOp === 'insert') fetch('/api/productos', { method: 'POST', body: formData })
  // if (currentOp === 'read')   fetch(`/api/productos/${idVal}`)
  // etc.

  showFeedback(mockMessages[currentOp], true);
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
});