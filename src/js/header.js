const toggleBtn = document.querySelector('.header__toggle-btn');
const mobMenu = document.querySelector('.nav');

document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('a[href^="#"]');

  for (let link of links) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
});

toggleBtn.addEventListener('click', function () {
  this.classList.toggle('is-active');
  mobMenu.classList.toggle('is-open');
  document.documentElement.classList.toggle('no-scroll');
});

let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    header.style.transform = 'translateY(-100%)';
    header.classList.remove('scroll');
  } else {
    header.style.transform = 'translateY(0)';
    header.classList.add('scroll');
  }
  if (window.scrollY === 0) {
    header.style.transform = 'translateY(0)';
    header.classList.remove('scroll');
  }

  lastScrollY = window.scrollY;
});