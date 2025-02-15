/* развернуть/свернуть main-nav*/
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.user-nav__toggle');
  const navList = document.querySelector('.main-nav');
  const icon = toggleButton.querySelector('use');

  toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('user-nav__toggle--open');
    toggleButton.classList.toggle('user-nav__toggle--close');
    navList.classList.toggle('main-nav--opened');

    const isOpen = navList.classList.contains('main-nav--opened');
    icon.setAttribute('href', isOpen ? 'icons/stack.svg#cross' : 'icons/stack.svg#burger');
  });
});

/* slider */
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slides-wrapper');
  const prevButton = document.querySelector('.slider-button-prev');
  const nextButton = document.querySelector('.slider-button-next');
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const paginationBullets = Array.from(document.querySelectorAll('.slider__pagination-bullet'));
  const slideCount = slides.length;
  let slideIndex = 0;

  const updateButtons = () => {
    prevButton.disabled = slideIndex === 0;
    nextButton.disabled = slideIndex === slideCount - 1;

    prevButton.classList.toggle('disabled', slideIndex === 0);
    nextButton.classList.toggle('disabled', slideIndex === slideCount - 1);
  };

  const updatePagination = () => {
    paginationBullets.forEach((bullet, index) => {
      bullet.classList.toggle('slider__pagination-bullet--active', index === slideIndex);
    });
  };

  prevButton.addEventListener('click', () => {
    if (slideIndex > 0) {
      slideIndex--;
      slide();
    }
  });

  nextButton.addEventListener('click', () => {
    if (slideIndex < slideCount - 1) {
      slideIndex++;
      slide();
    }
  });

  paginationBullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
      slideIndex = index;
      slide();
    });
  });

  const slide = () => {
    const imageWidth = slider.clientWidth;
    const slideOffset = -slideIndex * imageWidth;
    slider.style.transform = `translateX(${slideOffset}px)`;
    updateButtons();
    updatePagination();
  };

  window.addEventListener('load', slide);
  updateButtons();
  updatePagination();
});
