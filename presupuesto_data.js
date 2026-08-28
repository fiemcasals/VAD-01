// ============================================================================
// ARCHIVO MAESTRO Y LÓGICA DE LA APLICACIÓN WEB
// ============================================================================

const DEFAULT_PRESUPUESTOS = {
    electronica: {
        titulo: "Electrónica",
        categorias: [
            {
                nombre: "Propulsión y Control",
                items: [
                    { cant: "x2", nombre: "Kit Motor + Driver (ODrive)", precio: 680.00, link: "https://shop.odriverobotics.com/collections/kits/products/s1-and-m8325s-start-kit" },
                    { cant: "x1", nombre: "Módulo Receptor CAN USB", precio: 37.00, link: "https://shop.odriverobotics.com/collections/accessories/products/usb-can-adapter" },
                    { cant: "x1", nombre: "Isolator para Configuración", precio: 16.00, link: "https://wwshop.odriverobotics.com/collections/accessories/products/usb-c-to-usb-a-cable-and-usb-isolator" },
                    { cant: "x3", nombre: "Cable para CAN", precio: 12.00, link: "https://shop.odriverobotics.com/products/jst-gh-can-cable?pr_prod_strat=pinned&pr_rec_id=4d22b674e&pr_rec_pid=7302885605446&pr_ref_pid=7257252823110&pr_seq=uniform" },
                    { cant: "x1", nombre: "Resistencia de frenado", precio: 19.00, link: "https://shop.odriverobotics.com/collections/accessories/products/set-of-8-brake-resistors" }
                ]
            },
            {
                nombre: "Energía",
                items: [
                    { cant: "x3", nombre: "Batería 24V 6Ah", precio: 615.00, link: "https://www.mercadolibre.com.ar/bateria-lifepo4-24v-6ah-para-autos-electricos-de-ninos/p/MLA2085011262" },
                    { cant: "x1", nombre: "Cargador Inteligente", precio: 116.00, link: "https://www.mercadolibre.com.ar/cargador-inteligente-12v-20ah-o-24v-10ah-lifepo4-acido-etc/p/MLA66737627" },
                    { cant: "x1", nombre: "Fuente DC-DC 24 a 5V", precio: 22.00, link: "https://www.mercadolibre.com.ar/reductor-convertidor-conversor-de-tension-12v24v-a--5v-20a/up/MLAU3846955273" }
                ]
            },
            {
                nombre: "Conectividad",
                items: [
                    { cant: "x2", nombre: "Empalme Rápido in:2 out 6", precio: 3.20, link: "https://www.mercadolibre.com.ar/conector-bornera-empalme-2-entradas-6-salidas/up/MLAU4045515349" },
                    { cant: "x1", nombre: "Cables y Conectores", precio: 30.00, link: "#" }
                ]
            }
        ]
    },
    mecanica: {
        titulo: "Mecánica y Chasis",
        categorias: [
            {
                nombre: "Tracción y Frenado",
                items: [
                    { cant: "x2", nombre: "Kit Rueda + Reductor Mecánico (Estimado)", precio: 150.00, link: "#" },
                    { cant: "x2", nombre: "Frenos Electromagnéticos 24V Fail-Safe", precio: 56.00, link: "https://www.aliexpress.com/w/wholesale-electromagnetic-brake-24v-fail-safe.html" }
                ]
            },
            {
                nombre: "Estructura y Soporte",
                items: [
                    { cant: "x2", nombre: "Ruedas Castor 4\" con Resorte", precio: 38.00, link: "https://www.amazon.com/dp/B08X4J9K3Z" },
                    { cant: "1 Kit", nombre: "Perfiles de Aluminio 2040/2020", precio: 95.00, link: "#" },
                    { cant: "x1", nombre: "Bandeja / Caja de Carga (60x40 cm)", precio: 22.00, link: "#" },
                    { cant: "1 Kit", nombre: "Tornillería y Soportes M5/M6", precio: 15.00, link: "#" }
                ]
            }
        ]
    },
    informatica: {
        titulo: "Software e IA",
        categorias: [
            {
                nombre: "Cómputo y Percepción Central",
                items: [
                    { cant: "x1", nombre: "Kit Cómputo Modular Orin NX 16GB", precio: 832.00, link: "https://www.mouser.com/c/?q=Jetson%20Orin%20NX%2016GB" },
                    { cant: "x1", nombre: "Stereolabs ZED 2i (IP66)", precio: 549.00, link: "https://store.stereolabs.com/products/zed-2i" }
                ]
            },
            {
                nombre: "Navegación y Localización",
                items: [
                    { cant: "x1", nombre: "Slamtec RPLIDAR S2", precio: 413.00, link: "https://www.robotshop.com/products/slamtec-rplidar-s2-low-cost-360-degree-laser-range-scanner" },
                    { cant: "x1", nombre: "u-blox NEO-M9N GNSS USB", precio: 55.00, link: "https://holybro.com/products/m9n-gps" }
                ]
            },
            {
                nombre: "Conectividad y Telemetría",
                items: [
                    { cant: "x1", nombre: "Módem 4G LTE USB", precio: 65.00, link: "https://www.waveshare.com/sim7600g-h-4g-dongle.htm" },
                    { cant: "x1", nombre: "Kit Wi-Fi 6 M.2 Intel AX210", precio: 28.00, link: "https://www.amazon.com/dp/B08NSSJNV1" }
                ]
            }
        ]
    }
};

// ============================================================================
// ESTADO DE LA APLICACIÓN
// ============================================================================
let appData = JSON.parse(localStorage.getItem('appData_presupuesto')) || DEFAULT_PRESUPUESTOS;
let currentTabId = '';
let isEditMode = false;

// ============================================================================
// ESTILOS INYECTADOS PARA MODO EDICIÓN
// ============================================================================
const appStyle = document.createElement('style');
appStyle.innerHTML = `
    .floating-controls {
        position: fixed;
        bottom: 30px;
        right: 30px;
        display: flex;
        gap: 15px;
        z-index: 1000;
    }
    .action-btn {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50px;
        padding: 12px 24px;
        font-size: 1rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        font-weight: 600;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .action-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
    }
    .btn-primary {
        background: var(--accent-blue, #3b82f6);
        border-color: transparent;
    }
    .btn-primary:hover {
        background: var(--accent-blue, #3b82f6);
        filter: brightness(1.2);
    }
    .btn-danger {
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 6px 10px;
        cursor: pointer;
        font-size: 0.85rem;
    }
    .edit-input {
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.2);
        color: white;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 0.9rem;
        width: 100%;
        margin-bottom: 4px;
    }
    .edit-input:focus {
        outline: none;
        border-color: var(--accent-blue, #3b82f6);
        background: rgba(0,0,0,0.5);
    }
    .edit-item-card {
        background: rgba(255,255,255,0.05);
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 15px;
        border: 1px solid rgba(255,255,255,0.1);
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .edit-item-card label {
        display: block;
        font-size: 0.85rem;
        color: var(--text-secondary);
        margin-bottom: 6px;
        font-weight: 600;
    }
    .edit-item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        padding-bottom: 10px;
        margin-bottom: 5px;
    }
    .add-btn {
        background: rgba(255,255,255,0.05);
        color: var(--text-secondary);
        border: 1px dashed rgba(255,255,255,0.2);
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 10px;
        font-weight: 600;
        transition: all 0.2s;
    }
    .add-btn:hover {
        background: rgba(255,255,255,0.1);
        color: white;
    }
    .grid {
        grid-template-columns: 1fr !important;
    }
`;
document.head.appendChild(appStyle);

// ============================================================================
// FUNCIONES DEL APLICATIVO
// ============================================================================

window.toggleEditMode = function() {
    isEditMode = !isEditMode;
    renderizarPresupuesto(currentTabId);
}

window.updateCategory = function(catIndex, value) {
    appData[currentTabId].categorias[catIndex].nombre = value;
    saveData();
}

window.updateItem = function(catIndex, itemIndex, field, value) {
    if (field === 'precio') value = parseFloat(value) || 0;
    appData[currentTabId].categorias[catIndex].items[itemIndex][field] = value;
    saveData();
}

window.deleteItem = function(catIndex, itemIndex) {
    if(confirm('¿Eliminar este componente?')) {
        appData[currentTabId].categorias[catIndex].items.splice(itemIndex, 1);
        saveData();
        renderizarPresupuesto(currentTabId);
    }
}

window.addItem = function(catIndex) {
    appData[currentTabId].categorias[catIndex].items.push({
        cant: "x1", nombre: "Nuevo Componente", precio: 0.00, link: "#"
    });
    saveData();
    renderizarPresupuesto(currentTabId);
}

window.addCategory = function() {
    appData[currentTabId].categorias.push({
        nombre: "Nueva Categoría",
        items: []
    });
    saveData();
    renderizarPresupuesto(currentTabId);
}

window.deleteCategory = function(catIndex) {
    if(confirm('¿Seguro que quieres eliminar toda esta categoría y todos sus ítems?')) {
        appData[currentTabId].categorias.splice(catIndex, 1);
        saveData();
        renderizarPresupuesto(currentTabId);
    }
}

window.resetData = function() {
    if(confirm('¿Volver a los valores de fábrica? Perderás tus cambios no exportados.')) {
        appData = JSON.parse(JSON.stringify(DEFAULT_PRESUPUESTOS));
        saveData();
        renderizarPresupuesto(currentTabId);
    }
}

function parseQuantity(str) {
    if (!str) return 1;
    const match = str.toString().match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
}

function saveData() {
    localStorage.setItem('appData_presupuesto', JSON.stringify(appData));
    updateTotalBadge(); // Actualizar badge superior al vuelo
    // Actualizar el total global en el padre (index.html) si estamos en iframe
    if (window.parent && typeof window.parent.updateGlobalTotal === 'function') {
        window.parent.updateGlobalTotal();
    }
}

function updateTotalBadge() {
    const data = appData[currentTabId];
    if (!data) return;
    let totalGeneral = 0;
    data.categorias.forEach(cat => {
        cat.items.forEach(item => {
            totalGeneral += (item.precio * parseQuantity(item.cant));
        });
    });
    document.getElementById('total-badge').innerText = `$${totalGeneral.toFixed(2)}`;
}

// ============================================================================
// MOTOR DE RENDERIZADO VISUAL
// ============================================================================

window.renderizarPresupuesto = function(idCategoria) {
    currentTabId = idCategoria;
    const data = appData[idCategoria];
    if (!data) return;

    let htmlGrid = "";
    let totalGeneral = 0;

    data.categorias.forEach((cat, catIndex) => {
        let itemsHtml = "";
        let subtotal = 0;

        cat.items.forEach((item, itemIndex) => {
            let itemTotal = item.precio * parseQuantity(item.cant);
            subtotal += itemTotal;
            
            if (isEditMode) {
                itemsHtml += `
                    <div class="edit-item-card">
                        <div class="edit-item-header">
                            <span style="color: var(--text-secondary); font-size: 0.9rem; font-weight: 600;">Ítem #${itemIndex + 1}</span>
                            <button class="btn-danger" onclick="deleteItem(${catIndex}, ${itemIndex})" title="Eliminar componente">🗑 Eliminar Ítem</button>
                        </div>
                        
                        <div>
                            <label>Cantidad (Ej: x2, 1 Kit)</label>
                            <input type="text" class="edit-input" value="${item.cant}" onchange="updateItem(${catIndex}, ${itemIndex}, 'cant', this.value)">
                        </div>
                        <div>
                            <label>Nombre del Componente</label>
                            <input type="text" class="edit-input" value="${item.nombre}" onchange="updateItem(${catIndex}, ${itemIndex}, 'nombre', this.value)">
                        </div>
                        <div>
                            <label>Precio Unitario ($)</label>
                            <input type="number" step="0.1" class="edit-input" value="${item.precio}" onchange="updateItem(${catIndex}, ${itemIndex}, 'precio', this.value)">
                        </div>
                        <div>
                            <label>Link / URL de Compra</label>
                            <input type="text" class="edit-input" value="${item.link}" onchange="updateItem(${catIndex}, ${itemIndex}, 'link', this.value)">
                        </div>
                    </div>
                `;
            } else {
                itemsHtml += `
                    <li class="item">
                        <div class="item-name"><span class="item-qty">${item.cant}</span> <a href="${item.link}" target="_blank">${item.nombre} ↗</a></div>
                        <div class="item-price">$${item.precio.toFixed(2)}</div>
                    </li>
                `;
            }
        });

        totalGeneral += subtotal;

        let catHeader = isEditMode 
            ? `<div style="display:flex; align-items:center; gap: 10px; flex:1;">
                 <input type="text" class="edit-input" style="font-size:1.2rem; font-weight:bold; margin:0;" value="${cat.nombre}" onchange="updateCategory(${catIndex}, this.value)">
                 <button class="btn-danger" style="padding: 6px 12px;" onclick="deleteCategory(${catIndex})" title="Eliminar Grupo">🗑 Grupo</button>
               </div>`
            : `<div class="category-title">${cat.nombre}</div>`;

        let addButton = isEditMode ? `<button class="add-btn" onclick="addItem(${catIndex})">+ Agregar Componente</button>` : '';

        htmlGrid += `
            <div class="category-card" style="animation-delay: ${0.1 * (catIndex + 1)}s; opacity: 0; animation: fadeIn 0.6s ease-out forwards ${isEditMode ? '0s' : (0.3 + (catIndex * 0.15)) + 's'};">
                <div class="category-header">
                    ${catHeader}
                    <div class="category-subtotal">$${subtotal.toFixed(2)}</div>
                </div>
                <ul class="item-list" style="list-style:none;">
                    ${itemsHtml}
                </ul>
                ${addButton}
            </div>
        `;
    });

    let globalAddCategoryBtn = isEditMode 
        ? `<div style="text-align: center; margin-top: 20px; grid-column: 1 / -1;">
             <button class="add-btn" style="width: auto; padding: 12px 30px; font-size: 1.1rem; border-color: var(--accent-blue);" onclick="addCategory()">+ Agregar Nueva Categoría</button>
           </div>` 
        : '';

    document.getElementById('grid-container').innerHTML = htmlGrid + globalAddCategoryBtn;
    document.getElementById('total-badge').innerText = `$${totalGeneral.toFixed(2)}`;
    document.getElementById('titulo-span').innerText = data.titulo;

    renderizarControlesFlotantes();
}

function renderizarControlesFlotantes() {
    let controls = document.getElementById('floating-controls');
    if (!controls) {
        controls = document.createElement('div');
        controls.id = 'floating-controls';
        controls.className = 'floating-controls';
        document.body.appendChild(controls);
    }
    
    controls.innerHTML = `
        <button class="action-btn" onclick="resetData()" title="Resetear datos"><span style="font-size:1.2rem">🔄</span></button>
        <button class="action-btn ${isEditMode ? 'btn-primary' : ''}" onclick="toggleEditMode()">
            ${isEditMode ? '💾 Finalizar Edición' : '✏️ Editar Valores'}
        </button>
    `;
}
