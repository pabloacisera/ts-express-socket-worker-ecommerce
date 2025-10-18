document.addEventListener('DOMContentLoaded', function() {
    // Estado simple
    let productosOriginales = [];
    let filtrosActivos = { orden: '', precio: '', rating: '' };

    // 1. Cargar productos
    function cargarProductos() {
        const jsonElement = document.getElementById('productosOriginales');
        if (jsonElement) {
            productosOriginales = JSON.parse(jsonElement.textContent);
            console.log('Productos cargados:', productosOriginales.length);
        }
    }

    // 2. Aplicar filtros
    function aplicarFiltros() {
        let resultado = [...productosOriginales];
        
        // Precio
        if (filtrosActivos.precio) {
            resultado = filtrarPrecio(resultado, filtrosActivos.precio);
        }
        
        // Rating
        if (filtrosActivos.rating) {
            resultado = filtrarRating(resultado, filtrosActivos.rating);
        }
        
        // Orden (siempre al final)
        if (filtrosActivos.orden) {
            resultado = ordenar(resultado, filtrosActivos.orden);
        }
        
        mostrarResultados(resultado);
        actualizarSeleccionVisual(); // Actualizar la selección visual
    }

    // 3. Funciones simples de filtrado
    function filtrarPrecio(productos, rango) {
        return productos.filter(p => {
            const precio = p.price;
            switch(rango) {
                case 'from0to99000': return precio <= 99000;
                case 'from100000to299999': return precio >= 100000 && precio <= 299999;
                case 'from300000to499999': return precio >= 300000 && precio <= 499999;
                case 'from500000to699999': return precio >= 500000 && precio <= 699999;
                case 'from700000to899999': return precio >= 700000 && precio <= 899999;
                case 'from900000to1099999': return precio >= 900000 && precio <= 1099999;
                case 'more1100000': return precio >= 1100000;
                default: return true;
            }
        });
    }

    function filtrarRating(productos, ratingMin) {
        return productos.filter(p => p.rating >= parseFloat(ratingMin));
    }

    function ordenar(productos, orden) {
        const copia = [...productos];
        switch(orden) {
            case 'mayor_precio': return copia.sort((a, b) => b.price - a.price);
            case 'menor_precio': return copia.sort((a, b) => a.price - b.price);
            case 'a-z': return copia.sort((a, b) => a.title.localeCompare(b.title));
            default: return copia;
        }
    }

    // 4. Mostrar resultados
    function mostrarResultados(productos) {
        const $lista = $('#listaProductos');
        const $contador = $('.results-count');
        
        $contador.text(`Resultados de la búsqueda: ${productos.length} productos`);
        $lista.empty();
        
        productos.forEach(p => {
            $lista.append(`
                <li class="product-item">
                    <div class="product-card">
                        <div class="image-section">
                            <img src="${p.images.thumb}" alt="${p.title}">
                        </div>
                        <div class="info-section">
                            <h3 class="product-title">${p.title}<span>- ${p.rating}★</span></h3>
                            <p class="product-price">$${p.price}</p>
                            <p class="product-description">${p.description}</p>
                        </div>
                    </div>
                </li>
            `);
        });
    }

    // 5. Actualizar selección visual de filtros
    function actualizarSeleccionVisual() {
        // Limpiar todas las selecciones
        $('.price-range p').removeClass('selected');
        $('.rating-filter p').removeClass('selected');
        
        // Aplicar selección de precio
        if (filtrosActivos.precio) {
            $(`.price-range p[data-value="${filtrosActivos.precio}"]`).addClass('selected');
        }
        
        // Aplicar selección de rating
        if (filtrosActivos.rating) {
            $(`.rating-filter p[data-value="${filtrosActivos.rating}"]`).addClass('selected');
        }
        
        // El select de orden se maneja automáticamente con el value
    }

    // 6. Event listeners simples
    function inicializarEventos() {
        // Orden
        $('#order').change(function() {
            filtrosActivos.orden = $(this).val();
            aplicarFiltros();
        });
        
        // Precio
        $('.price-range p').click(function() {
            const valor = $(this).data('value');
            
            // Toggle: si ya está seleccionado, lo quitamos
            if (filtrosActivos.precio === valor) {
                filtrosActivos.precio = '';
            } else {
                filtrosActivos.precio = valor;
            }
            
            aplicarFiltros();
        });
        
        // Rating
        $('.rating-filter p').click(function() {
            const valor = $(this).data('value');
            
            // Toggle: si ya está seleccionado, lo quitamos
            if (filtrosActivos.rating === valor) {
                filtrosActivos.rating = '';
            } else {
                filtrosActivos.rating = valor;
            }
            
            aplicarFiltros();
        });
    }

    // 7. Panel de filtros - CÓDIGO COMPLETO
    const filterPanel = document.getElementById('filterPanel');
    const toggleButton = document.getElementById('toggleFilterButton');
    const STORAGE_KEY = "filtersCollapsed";

    // Estado inicial del panel
    const savedState = localStorage.getItem(STORAGE_KEY);
    const isCollapsed = savedState === "true";
        
    // Aplicar estado inicial
    if (isCollapsed) {
        filterPanel.classList.add('collapsed');
        toggleButton.style.transform = 'rotate(180deg)';
    }

    // Evento de click para toggle
    toggleButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        filterPanel.classList.toggle('collapsed');
        const nowCollapsed = filterPanel.classList.contains('collapsed');
        
        // Rotar el ícono
        if (nowCollapsed) {
            toggleButton.style.transform = 'rotate(180deg)';
        } else {
            toggleButton.style.transform = 'rotate(0deg)';
        }
        localStorage.setItem(STORAGE_KEY, nowCollapsed);
    });

    // Cerrar panel al hacer click fuera (solo móvil)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!filterPanel.contains(e.target) && !filterPanel.classList.contains('collapsed')) {
                filterPanel.classList.add('collapsed');
                toggleButton.style.transform = 'rotate(180deg)';
                localStorage.setItem(STORAGE_KEY, "true");
            }
        }
    });

    // 8. Inicializar todo
    function inicializar() {
        cargarProductos();
        inicializarEventos();
        // Aplicar selección visual inicial
        actualizarSeleccionVisual();
    }

    inicializar();
});