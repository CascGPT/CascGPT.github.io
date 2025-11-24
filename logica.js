/* ------------------------------
   CARRITO DE COMPRAS
------------------------------ */

let carrito = [];

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio: Number(precio) });
  actualizarCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
 }
 function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio: Number(precio), cantidad: 1 });
  actualizarCarrito();
}

function actualizarCarrito() {
    const contBoton = document.getElementById("contenedor-boton-compra");
    contBoton.innerHTML = '';

    if (carrito.length > 0) {
        // Calcular el total del carrito
        let totalCarrito = 0;
        carrito.forEach(item => {
totalCarrito += item.precio * item.cantidad;
        });

        contBoton.innerHTML = `
            <button class="btn-gradiente-vibrante spei" onclick="abrirTransferenciaSPEI(${totalCarrito})">
                <i class="bi bi-bank"></i>
                <span>Transferencia SPEI</span>
            </button>
            <button class="btn-gradiente-vibrante tarjeta" onclick="abrirPagoFalso()">
                <i class="bi bi-credit-card-fill"></i>
                <span>Agregar tarjeta de crédito o débito</span>
            </button>
            <button class="btn-gradiente-vibrante codigo" onclick="abrirPagoFalso2()">
                <i class="bi bi-gift-fill"></i>
                <span>Canjear código</span>
            </button>
        `;
    }
    
    const lista = document.getElementById('lista-carrito');
    const total = document.getElementById('total');

    lista.innerHTML = '';
    let totalCompra = 0;
  // Carrito vacío
  if (carrito.length === 0) {
    lista.innerHTML = `
      <div class="carrito-vacio">
        <i class="bi bi-cart-x"></i>
        <p>Tu carrito está vacío</p>
      </div>
    `;
    total.textContent = "Total: $0 MXN";

    document.getElementById("wallet_container").innerHTML = "";
    return;
  }

  // Carrito con productos
  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio} MXN
      <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">
        <i class="bi bi-trash"></i>
      </button>
    `;
    lista.appendChild(li);
    totalCompra += item.precio;
  });

  total.textContent = `Total: $${totalCompra.toFixed(2)} MXN`;
  renderizarMercadoPago(totalCompra);
  
}



// ============================================
// FUNCIONES PARA EL MODAL SPEI
// ============================================

function abrirTransferenciaSPEI(montoTotal) {
    // Crear el modal
    const modalHTML = `
        <div id="modal-spei" class="modal-spei-overlay">
            <div class="modal-spei-container">
                <button class="modal-spei-close" onclick="cerrarModalSPEI()">
                    <i class="bi bi-x-lg"></i>
                </button>
                
                <div class="modal-spei-header">
                    <div class="modal-spei-icono">
                        <i class="bi bi-currency-dollar"></i>
                    </div>
                    <h2>¡Estás a un paso!</h2>
                    <p class="modal-spei-titulo">Paga $${montoTotal.toFixed(2)} en Transferencia SPEI para finalizar tu compra</p>
                </div>

                <div class="modal-spei-contenido">
                    <!-- CLABE -->
                    <div class="modal-spei-seccion">
                        <h3>Copia y pega esta CLABE en tu banca en línea</h3>
                        <label>CLABE</label>
                        <div class="modal-spei-campo">
                            <input type="text" id="clabe-input" value="6381 8000 0139 0183 49" readonly>
                            <button onclick="copiarTextoSPEI('clabe-input', this)" class="btn-copiar">
                                Copiar
                            </button>
                        </div>
                    </div>

                    <!-- MONTO -->
                    <div class="modal-spei-seccion">
                        <label>Monto exacto</label>
                        <div class="modal-spei-campo">
                            <input type="text" id="monto-input" value="$${montoTotal.toFixed(2)}" readonly>
                            <button onclick="copiarTextoSPEI('monto-input', this)" class="btn-copiar">
                                Copiar
                            </button>
                        </div>
                        <p class="modal-spei-nota">
                            Ingresa el monto con centavos exactos, para evitar que tu pago se rechace.
                        </p>
                    </div>

                    <!-- DATOS DE TRANSFERENCIA -->
                    <div class="modal-spei-seccion">
                        <h3>Transfiere con estos datos</h3>
                        <div class="modal-spei-datos">
                            <div class="dato-fila">
                                <span class="dato-label">Nombre del coolaborador</span>
                                <span class="dato-valor">ANGEL ALEXIS BRAGA MENDOZA</span>
                            </div>
                            <div class="dato-fila">
                                <span class="dato-label">Banco destinatario</span>
                                <span class="dato-valor">Nu México</span>
                            </div>
                            <div class="dato-fila">
                                <span class="dato-label">Cuenta (depósitos en efectivo)</span>
                                <span class="dato-valor">5101 2518 8447 9578</span>
                            </div>
                        </div>
                    </div>

                    <!-- NOTAS FINALES -->
                    <div class="modal-spei-footer">
                        <p><strong>Pagas y se acredita al instante.</strong></p>
                        <p>Te confirmaremos la fecha de entrega cuando se acredite el pago.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Agregar el modal al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function cerrarModalSPEI() {
    const modal = document.getElementById('modal-spei');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

function copiarTextoSPEI(inputId, boton) {
    const input = document.getElementById(inputId);
    
    // Método compatible con todos los navegadores
    input.select();
    input.setSelectionRange(0, 99999); // Para móviles
    
    // Intentar copiar
    try {
        navigator.clipboard.writeText(input.value).then(() => {
            // Feedback visual
            const textoOriginal = boton.textContent;
            boton.textContent = '✓ Copiado';
            boton.style.background = '#FF0000';
            boton.style.color = 'white';
            boton.style.borderColor = '#FF0000';
            
            setTimeout(() => {
                boton.textContent = textoOriginal;
                boton.style.background = '';
                boton.style.color = '';
                boton.style.borderColor = '';
            }, 2000);
        }).catch(() => {
            // Fallback si falla el clipboard API
            document.execCommand('copy');
            boton.textContent = '✓ Copiado';
        });
    } catch (err) {
        // Fallback antiguo
        document.execCommand('copy');
        alert('Texto copiado al portapapeles');
    }
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-spei-overlay')) {
        cerrarModalSPEI();
    }
});











/* ------------------------------
   MERCADO PAGO (SPEI, OXXO, TARJETAS, WALLET)
------------------------------ */

const mp = new MercadoPago("TEST-CHANGE-ME", { locale: "es-MX" });

function renderizarMercadoPago(totalMXN) {
  const cont = document.getElementById("wallet_container");
  cont.innerHTML = "";

  if (totalMXN <= 0) return;

  // Crear preferencia en tu backend
  fetch("https://TU-SERVIDOR.com/create_preference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: [
        {
          title: "Compra en Casc GPT",
          quantity: 1,
          currency_id: "MXN",
          unit_price: totalMXN
        }
      ]
    })
  })
    .then(res => res.json())
    .then(data => {
      // Renderizar todas las opciones de pago
      mp.bricks().create("wallet", "wallet_container", {
        initialization: {
          preferenceId: data.preferenceId
        },
        customization: {
          texts: {
            valueProp: "security_details"
          }
        }
      });
    })
    .catch(err => console.error("Error creando preferencia MP:", err));
}

/* ------------------------------
   ESTILO DEL BOTÓN ELIMINAR
------------------------------ */

const estiloEliminar = document.createElement("style");
estiloEliminar.innerHTML = `
  .btn-eliminar {
    background: transparent;
    border: none;
    color: #ff3b3b;
    font-size: 1.2rem;
    cursor: pointer;
    transition: 0.2s;
  }
  .btn-eliminar:hover {
    color: #ff0000;
    transform: scale(1.2);
  }
`;
document.head.appendChild(estiloEliminar);






































