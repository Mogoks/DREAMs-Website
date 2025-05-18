document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const navUl = document.querySelector('#navbar ul');
  
  menuToggle.addEventListener('click', function () {
    navUl.classList.toggle('active');
  });
});
