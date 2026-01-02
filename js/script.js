// ===== INICIALIZACIÓN PRINCIPAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando Jar Painting Website...');
    
    initGalleryFilter();
    initImageModal();
    initSmoothScrolling();
    initMobileMenu();
    initHeaderScroll();
    
    console.log('✅ Website inicializado correctamente');
});

// ===== FILTRO DE GALERÍA =====
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) {
        console.warn('⚠️ Elementos de galería no encontrados');
        return;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            console.log('🔍 Filtrando:', filterValue);
            
            // Filtrar items
            galleryItems.forEach((item, index) => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, index * 30);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    console.log('✓ Filtro de galería inicializado');
}

// ===== MODAL DE IMÁGENES (VERSIÓN QUE FUNCIONA) =====
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (!modal || !modalImg || !captionText) {
        console.error('❌ Elementos del modal no encontrados');
        return;
    }
    
    // Obtener TODAS las imágenes de la galería
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let currentImageIndex = 0;
    let visibleImages = [];
    
    console.log(`📷 Total de imágenes en galería: ${galleryImages.length}`);

    // Función para actualizar imágenes visibles
    function updateVisibleImages() {
        visibleImages = Array.from(galleryImages).filter(img => {
            const item = img.closest('.gallery-item');
            return item && window.getComputedStyle(item).display !== 'none';
        });
        console.log(`👁️ Imágenes visibles: ${visibleImages.length}`);
    }

    // Función para abrir modal
    function openModal(index) {
        updateVisibleImages();
        
        if (index < 0 || index >= visibleImages.length) {
            console.error('❌ Índice fuera de rango:', index);
            return;
        }
        
        currentImageIndex = index;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        modalImg.src = visibleImages[currentImageIndex].src;
        captionText.textContent = visibleImages[currentImageIndex].alt;
        
        console.log(`📸 Modal abierto - Imagen ${currentImageIndex + 1}/${visibleImages.length}`);
    }

    // Función para cerrar modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('❌ Modal cerrado');
    }

    // Función para navegar
    function navigate(direction) {
        currentImageIndex += direction;
        
        // Navegación circular
        if (currentImageIndex >= visibleImages.length) currentImageIndex = 0;
        if (currentImageIndex < 0) currentImageIndex = visibleImages.length - 1;
        
        modalImg.style.opacity = '0';
        
        setTimeout(() => {
            modalImg.src = visibleImages[currentImageIndex].src;
            captionText.textContent = visibleImages[currentImageIndex].alt;
            modalImg.style.opacity = '1';
        }, 150);
        
        console.log(`➡️ Navegando a imagen ${currentImageIndex + 1}/${visibleImages.length}`);
    }

    // Agregar click a TODAS las imágenes
    galleryImages.forEach((img, index) => {
        // Hacer el item clickeable
        const item = img.closest('.gallery-item');
        if (item) {
            item.style.cursor = 'pointer';
            
            // Evento de click
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log(`🖱️ Click en imagen ${index + 1}`);
                
                updateVisibleImages();
                const visibleIndex = visibleImages.indexOf(img);
                
                if (visibleIndex !== -1) {
                    openModal(visibleIndex);
                } else {
                    console.error('❌ Imagen no encontrada en visibles');
                }
            });
        }
    });

    // Controles del modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navigate(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navigate(1);
        });
    }

    // Navegación por teclado
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                navigate(1);
            } else if (e.key === 'ArrowLeft') {
                navigate(-1);
            }
        }
    });

    // Cerrar al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Prevenir que el click en la imagen cierre el modal
    if (modalImg) {
        modalImg.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Actualizar imágenes visibles cuando se filtra
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(updateVisibleImages, 100);
        });
    });

    // Inicializar imágenes visibles
    updateVisibleImages();
    
    console.log('✓ Modal de imágenes inicializado correctamente');
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    if (!links.length) {
        console.warn('⚠️ No se encontraron enlaces de navegación');
        return;
    }
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (!href || href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                closeMobileMenu();
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                console.log(`🔗 Navegando a: ${href}`);
            }
        });
    });
    
    console.log('✓ Smooth scrolling inicializado');
}

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const overlay = document.getElementById('menu-overlay');
    
    if (!mobileMenu || !navbar) {
        console.warn('⚠️ Elementos del menú móvil no encontrados');
        return;
    }

    function toggleMenu() {
        const isActive = navbar.classList.contains('active');
        
        mobileMenu.classList.toggle('active');
        navbar.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        
        document.body.style.overflow = isActive ? 'auto' : 'hidden';
        
        // Animar icono hamburguesa
        const spans = mobileMenu.querySelectorAll('span');
        if (!isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
        
        console.log(`📱 Menú móvil ${isActive ? 'cerrado' : 'abierto'}`);
    }

    mobileMenu.addEventListener('click', toggleMenu);
    
    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }
    
    // Cerrar al hacer clic en enlaces
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbar.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    console.log('✓ Menú móvil inicializado');
}

// Función auxiliar para cerrar menú móvil
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const overlay = document.getElementById('menu-overlay');
    
    if (navbar && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        mobileMenu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        const spans = mobileMenu.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }
}

// ===== HEADER DINÁMICO =====
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    if (!header) {
        console.warn('⚠️ Header no encontrado');
        return;
    }

    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                ticking = false;
            });
            ticking = true;
        }
    });
    
    console.log('✓ Header dinámico inicializado');
}

// ===== PREVENCIÓN DE ERRORES EN IMÁGENES =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        console.warn('⚠️ Error al cargar imagen:', this.src);
    });
});

// ===== TRANSICIÓN SUAVE PARA MODAL =====
window.addEventListener('load', function() {
    const modalImg = document.getElementById('modalImage');
    if (modalImg) {
        modalImg.style.transition = 'opacity 0.2s ease';
    }
});

// ===== LOG FINAL =====
console.log('%c✅ JAR PAINTING WEBSITE CARGADO', 'color: #FF5722; font-size: 18px; font-weight: bold;');
console.log('%c🎨 Versión: Modal Funcional ARREGLADO', 'color: #1a237e; font-size: 14px;');
console.log('%c🔧 Status: TODO OPERATIVO', 'color: #4CAF50; font-size: 14px; font-weight: bold;');
