(function() {
  "use strict"; // Start of use strict

  var scrollToTop = document.querySelector('.scroll-to-top');
  
  if (scrollToTop) {
    
    // Scroll to top button appear
    window.addEventListener('scroll', function() {
      var scrollDistance = window.pageYOffset;

      if (scrollDistance > 100) {
        scrollToTop.style.display = 'block';
      } else {
        scrollToTop.style.display = 'none';
      }
    });
  }

  var mainNav = document.querySelector('#mainNav');

  if (mainNav) {

    var navbarCollapse = mainNav.querySelector('.navbar-collapse');
    
    if (navbarCollapse) {
      
      var collapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      
      var navbarItems = navbarCollapse.querySelectorAll('a');
      
      // Closes responsive menu when a scroll trigger link is clicked
      for (var item of navbarItems) {
        item.addEventListener('click', function (event) {
          collapse.hide();
        });
      }
    }

    // Collapse Navbar
    var collapseNavbar = function() {

      var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (scrollTop > 100) {
        mainNav.classList.add("navbar-shrink");
      } else {
        mainNav.classList.remove("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    collapseNavbar();
    // Collapse the navbar when page is scrolled
    document.addEventListener("scroll", collapseNavbar);
  }

})(); // End of use strict


document.addEventListener('DOMContentLoaded', () => {
  // 1) Si tus colores están definidos como CSS Vars en :root
  const css = getComputedStyle(document.documentElement);
  const danger  = css.getPropertyValue('--bs-danger').trim();
  const warning = css.getPropertyValue('--bs-warning').trim();
  const success = css.getPropertyValue('--bs-success').trim();

  // 2) O bien si ya los tienes como variables JS, omite el bloque anterior.

  document.querySelectorAll('.nota').forEach(td => {
    const nota = parseFloat(td.textContent) || 0;
    const pct  = Math.min(Math.max(nota, 0), 100);

    // 3) Elige el color según el % usando tus variables
    const color = pct >= 80 
      ? success 
      : pct >= 60 
        ? warning 
        : danger;

    // 4) Construye un degradado color→blanco
    const grad = `linear-gradient(
      to right,
      ${color}    0%,
      ${color}   ${pct}%,
      #fff       ${pct}%,
      #fff      100%
    )`.replace(/\s+/g,' ');

    // 5) Aplica todo con !important para sobreescribir Bootstrap
    td.style.setProperty('background', grad,       'important');
    td.style.setProperty('padding',    '0.75rem',  'important');
  });
});
