   document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('Tiempo');
    
    if (button) {
      button.addEventListener('click', function() {
        window.location.href = 'img/Guia de fácil reciclaje.pdf';
      });
    } else {
      console.warn('No se encontró el botón con id "Tiempo"');
    }
  }); 
 
 document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('medio_ambiente');
    
    if (button) {
      button.addEventListener('click', function() {
        window.location.href = 'https://construccionverde.es/es/blog/post/materiales-reciclados-nuevas-tecnologias-y-aplicaciones-en-la-construccion';
      });
    } else {
      console.warn('No se encontró el botón con id "medio_ambiente"');
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('comunidad');
    
    if (button) {
      button.addEventListener('click', function() {
        window.location.href = 'https://www.car.gov.co/saladeprensa/car-y-comunidad-educativa-plantan-10-000-arboles-para-restauracion-de-ecosistemas-en-el-territorio';
      });
    } else {
      console.warn('No se encontró el botón con id "comunidad"');
    }
  });

   document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('oceanos');
    
    if (button) {
      button.addEventListener('click', function() {
        window.location.href = 'https://www.ambientum.com/ambientum/residuos/microplasticos-cual-es-su-impacto-en-los-oceanos.asp';
      });
    } else {
      console.warn('No se encontró el botón con id "oceanos"');
    }
  });

// JavaScript for CHAOS COMPANY Website

document.addEventListener('DOMContentLoaded', function() {
    // Video Play Button Functionality
    const playButton = document.getElementById('playButton');
    const videoIframe = document.getElementById('videoIframe');
    const videoThumbnail = document.getElementById('videoThumbnail');

    if (playButton && videoIframe && videoThumbnail) {
        playButton.addEventListener('click', function() {
            videoThumbnail.style.display = 'none';
            videoIframe.style.display = 'block';
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});
// Este script haría que la barra de navegación sea "pegajosa" (sticky)
window.onscroll = function() {stickyHeader()};

let header = document.querySelector(".natgeo-header");
let sticky = header.offsetTop;

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
// En tu CSS, necesitarías la clase .sticky:
/*
.natgeo-header.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}
*/


