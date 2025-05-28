// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Filter gallery items based on category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Gallery Modal Functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    // Get ALL gallery images (including new ones)
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let currentImageIndex = 0;

    // Function to open modal
    function openModal(index) {
        modal.style.display = 'block';
        modalImg.src = galleryImages[index].src;
        captionText.textContent = galleryImages[index].alt;
        currentImageIndex = index;
    }

    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Function to navigate images
    function navigate(direction) {
        currentImageIndex += direction;
        
        // Circular navigation
        if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
        if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
        
        modalImg.src = galleryImages[currentImageIndex].src;
        captionText.textContent = galleryImages[currentImageIndex].alt;
    }

    // Add click event to ALL gallery images
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    // Modal controls
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') navigate(1);
            if (e.key === 'ArrowLeft') navigate(-1);
        }
    });

    // Close when clicking outside image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Filter functionality (keep your existing filter code)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                item.style.display = (filterValue === 'all' || item.classList.contains(filterValue)) 
                    ? 'block' 
                    : 'none';
            });
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Smooth Scrolling 100% funcional
document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Método compatible con todos los navegadores
            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.getBoundingClientRect().top + startPosition - 70;
            const distance = targetPosition - startPosition;
            const duration = 800; // Milisegundos
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            // Función de easing (suavizado)
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
    });
});


document.querySelectorAll('a[href="#contact"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
        
        // Animation for hamburger icon
        const spans = this.querySelectorAll('span');
        if(navbar.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
});