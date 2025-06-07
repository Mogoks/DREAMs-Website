document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navUl = document.querySelector('#navbar ul');
  const navLinks = document.querySelectorAll('nav ul li a');

  // Toggle mobile menu
  menuToggle.addEventListener('click', function () {
      navUl.classList.toggle('active');
  });

  // Change navbar transparency on scroll
  window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // Highlight the active page in navigation menu
  navLinks.forEach(link => {
      if (link.href === window.location.href) {
          link.classList.add('active');
      }
  });
});
