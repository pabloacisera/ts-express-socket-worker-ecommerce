/**
 * Inicializa un carrusel de productos (VANILLA JS - SIN JQUERY)
 * @param {string} carouselSelector - Selector del contenedor del carrusel
 * @param {object} options - Opciones de configuración
 */
function initProductCarousel(carouselSelector, options = {}) {
    const defaults = {
        itemsToShow: 'auto', // Cambiado a 'auto' para calcular dinámicamente
        scrollAmount: 1,
        animationSpeed: 300,
        gap: 16
    };

    const settings = { ...defaults, ...options };
    const carousel = document.querySelector(carouselSelector);

    if (!carousel) {
        console.error('Carrusel no encontrado:', carouselSelector);
        return null;
    }

    const displayContent = carousel.querySelector('.display-content');
    const items = displayContent.querySelectorAll('.product-item');
    const backward = carousel.querySelector('.backward');
    const forward = carousel.querySelector('.forward');

    let currentIndex = 0;
    const totalItems = items.length;

    // Calcular cuántos items se pueden mostrar
    const getVisibleItems = () => {
        if (settings.itemsToShow !== 'auto') {
            return settings.itemsToShow;
        }

        const containerWidth = displayContent.offsetWidth;
        const itemWidth = items.length > 0 ? items[0].offsetWidth : 0;
        const gap = settings.gap;

        if (itemWidth === 0) return 1;

        // Calcular cuántos items caben (redondeado hacia abajo)
        const visibleItems = Math.floor(containerWidth / (itemWidth + gap));
        return Math.max(1, visibleItems);
    };

    // Calcular ancho del item con margen
    const getItemWidth = () => {
        if (items.length > 0) {
            const itemStyle = window.getComputedStyle(items[0]);
            const itemWidth = items[0].offsetWidth;
            const marginRight = parseInt(itemStyle.marginRight) || 0;
            return itemWidth + marginRight + settings.gap;
        }
        return 0;
    };

    // Actualizar estado de botones
    function updateButtons() {
        const visibleItems = getVisibleItems();
        const maxIndex = Math.max(0, totalItems - visibleItems);

        console.log('Visible items:', visibleItems, 'Total:', totalItems, 'MaxIndex:', maxIndex, 'Current:', currentIndex);

        // Backward button
        if (currentIndex <= 0) {
            backward.style.opacity = '0.3';
            backward.style.cursor = 'not-allowed';
            backward.style.pointerEvents = 'none';
        } else {
            backward.style.opacity = '1';
            backward.style.cursor = 'pointer';
            backward.style.pointerEvents = 'auto';
        }

        // Forward button
        if (currentIndex >= maxIndex) {
            forward.style.opacity = '0.3';
            forward.style.cursor = 'not-allowed';
            forward.style.pointerEvents = 'none';
        } else {
            forward.style.opacity = '1';
            forward.style.cursor = 'pointer';
            forward.style.pointerEvents = 'auto';
        }
    }

    // Función de animación suave
    function smoothScroll(element, target, duration) {
        const start = element.scrollLeft;
        const change = target - start;
        const startTime = performance.now();

        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-in-out)
            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            element.scrollLeft = start + (change * easeProgress);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                updateButtons();
            }
        }

        requestAnimationFrame(animateScroll);
    }

    // Desplazar carrusel
    function slide(direction) {
        const visibleItems = getVisibleItems();
        const maxIndex = Math.max(0, totalItems - visibleItems);
        const itemWidth = getItemWidth();

        if (direction === 'next') {
            currentIndex = Math.min(currentIndex + settings.scrollAmount, maxIndex);
        } else {
            currentIndex = Math.max(currentIndex - settings.scrollAmount, 0);
        }

        const scrollPosition = currentIndex * itemWidth;
        console.log('Sliding to index:', currentIndex, 'Scroll position:', scrollPosition);
        smoothScroll(displayContent, scrollPosition, settings.animationSpeed);
    }

    // Event listeners
    forward.addEventListener('click', () => {
        console.log('Forward clicked');
        slide('next');
    });

    backward.addEventListener('click', () => {
        console.log('Backward clicked');
        slide('prev');
    });

    // Actualizar al cambiar tamaño de ventana
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateButtons();
        }, 250);
    });

    // Inicializar
    updateButtons();

    // API pública
    return {
        next: () => slide('next'),
        prev: () => slide('prev'),
        goTo: (index) => {
            const visibleItems = getVisibleItems();
            const maxIndex = Math.max(0, totalItems - visibleItems);
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            const itemWidth = getItemWidth();
            const scrollPosition = currentIndex * itemWidth;
            smoothScroll(displayContent, scrollPosition, settings.animationSpeed);
        },
        getCurrentIndex: () => currentIndex,
        refresh: () => updateButtons(),
        destroy: () => {
            forward.removeEventListener('click', slide);
            backward.removeEventListener('click', slide);
        }
    };
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
} else {
    initCarousels();
}

function initCarousels() {
    console.log('Inicializando carruseles...');

    const mainCarousel = initProductCarousel('.carousel-ofertas', {
        itemsToShow: 'auto', // Detecta automáticamente cuántos caben
        scrollAmount: 1,
        animationSpeed: 300,
        gap: 16
    });

    if (mainCarousel) {
        console.log('Carrusel inicializado correctamente');
        window.mainCarousel = mainCarousel;
    } else {
        console.error('Error al inicializar el carrusel');
    }
}
