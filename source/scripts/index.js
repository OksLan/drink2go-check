/* развернуть/свернуть main-nav*/
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.user-nav__toggle');
  const navList = document.querySelector('.main-nav');
  const icon = toggleButton.querySelector('use');

  toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('user-nav__toggle--open');
    toggleButton.classList.toggle('user-nav__toggle--close');
    navList.classList.toggle('main-nav--opened');

    // Инвертируем условие
    const isOpen = navList.classList.contains('main-nav--opened');
    icon.setAttribute('href', isOpen ? 'icons/stack.svg#cross' : 'icons/stack.svg#burger');
  });
});

/* slider */
document.addEventListener('DOMContentLoaded', () => {
  const sliderWrapper = document.querySelector('.slides-wrapper');
  const slide = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.slider-button-prev');
  const nextButton = document.querySelector('.slider-button-next');
  let slideIndex = 0;

    const updateSlides = () => {
    slide.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - slideIndex) * 100}%)`;
  });

    prevButton.disabled = (slideIndex === 0);
    nextButton.disabled = (slideIndex === slide.length - 1);
  };

  prevButton.addEventListener('click', () => {
    if (slideIndex > 0) {
      slideIndex--;
      updateSlides();
    }
  });

  nextButton.addEventListener('click', () => {
    if (slideIndex < slide.length - 1) {
      slideIndex++;
      updateSlides();
    }
  });

  updateSlides();
});

