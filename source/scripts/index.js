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
  const slideCount = slides.length;
  let slideIndex = 0;

  const updateButtons = () => {
    prevButton.classList.toggle('disabled', slideIndex === 0);
    nextButton.classList.toggle('disabled', slideIndex === slideCount - 1);

    console.log('Prev disabled:', prevButton.classList.contains('disabled'));
    console.log('Next disabled:', nextButton.classList.contains('disabled'));
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

  const slide = () => {
    const imageWidth = slider.clientWidth;
    const slideOffset = -slideIndex * imageWidth;
    slider.style.transform = `translateX(${slideOffset}px)`;
    updateButtons();
  };

  window.addEventListener('load', () => {
    slide();
  });

  updateButtons();
});
