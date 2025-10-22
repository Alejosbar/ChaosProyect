document.addEventListener('DOMContentLoaded', function() {
    // Variables de estado
    let scrolled = false;
    let activeSection = 'home';
    const scrollOffset = 90; // Offset para la barra de navegación fija
    
    // Referencias a elementos del DOM
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Manejar el evento scroll
    window.addEventListener('scroll', handleScroll);
    
    function handleScroll() {
        // Actualizar el estado de scrolled
        if (window.scrollY > 50) {
            if (!scrolled) {
                scrolled = true;
                navbar.classList.add('scrolled');
            }
        } else {
            if (scrolled) {
                scrolled = false;
                navbar.classList.remove('scrolled');
            }
        }
        
        // Determinar la sección activa
        const sections = ['home', 'identification', 'education', 'about'];
        const scrollPosition = window.scrollY + scrollOffset;
        
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const offsetTop = element.offsetTop;
                const offsetBottom = offsetTop + element.offsetHeight;
                
                if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                    if (activeSection !== section) {
                        activeSection = section;
                        updateActiveNavLink(section);
                    }
                    break;
                }
            }
        }
    }
    
    // Actualizar el enlace de navegación activo
    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Configurar el desplazamiento suave para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - scrollOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Configurar el desplazamiento suave para los enlaces del pie de página
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - scrollOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
});