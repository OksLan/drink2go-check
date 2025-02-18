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

/* pricerange */
/* убрать/вернуть плейсхолдеры в боксах в фокусе */
document.addEventListener("DOMContentLoaded", function () {
  const minInput = document.querySelector(".pricerange__input-value--min");
  const maxInput = document.querySelector(".pricerange__input-value--max");

  minInput.addEventListener("focus", function () {
      this.placeholder = "";
  });
  maxInput.addEventListener("focus", function () {
      this.placeholder = "";
  });

  minInput.addEventListener("blur", function () {
      this.placeholder = "0";
  });
  maxInput.addEventListener("blur", function () {
      this.placeholder = "900";
  });
});

/* перетягивание пинов и ввод значений в боксы */
document.addEventListener("DOMContentLoaded", function () {
  const rangeScale = document.querySelector(".pricerange__scale");
  const rangeBar = document.querySelector(".pricerange__bar");
  const minPin = document.querySelector(".pricerange__pin--min");
  const maxPin = document.querySelector(".pricerange__pin--max");
  const minInput = document.querySelector(".pricerange__input-value--min");
  const maxInput = document.querySelector(".pricerange__input-value--max");
  const resetButton = document.querySelector(".filter__button--reset");

  const minValue = 0;
  const maxValue = 1000;
  let minPosition = 0;
  let maxPosition = rangeScale.offsetWidth - maxPin.offsetWidth;

  function updatePins() {
      minPin.style.left = `${(minPosition / (rangeScale.offsetWidth - minPin.offsetWidth)) * 100}%`;
      maxPin.style.left = `${(maxPosition / (rangeScale.offsetWidth - maxPin.offsetWidth)) * 100}%`;
      rangeBar.style.left = `${(minPosition / rangeScale.offsetWidth) * 100}%`;
      rangeBar.style.width = `${((maxPosition - minPosition) / rangeScale.offsetWidth) * 100}%`;
  }

  function updateInputs() {
      minInput.value = Math.round(minValue + (minPosition / (rangeScale.offsetWidth - minPin.offsetWidth)) * (maxValue - minValue));
      maxInput.value = Math.round(minValue + (maxPosition / (rangeScale.offsetWidth - maxPin.offsetWidth)) * (maxValue - minValue));
  }

  function movePin(event, pin) {
      event.preventDefault();
      const shiftX = event.clientX - pin.getBoundingClientRect().left;

      function onMouseMove(event) {
          let newPosition = event.clientX - rangeScale.getBoundingClientRect().left - shiftX;
          newPosition = Math.max(0, Math.min(newPosition, rangeScale.offsetWidth - pin.offsetWidth));

          if (pin === minPin && newPosition < maxPosition - minPin.offsetWidth) {
              minPosition = newPosition;
          } else if (pin === maxPin) {
              maxPosition = Math.min(newPosition, rangeScale.offsetWidth - maxPin.offsetWidth);
          }

          updatePins();
          updateInputs();
      }

      function onMouseUp() {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
  }

  minPin.addEventListener("mousedown", (event) => movePin(event, minPin));
  maxPin.addEventListener("mousedown", (event) => movePin(event, maxPin));

  minInput.addEventListener("input", function () {
      let value = Math.min(Math.max(parseInt(this.value) || minValue, minValue), maxValue);
      minPosition = ((value - minValue) / (maxValue - minValue)) * (rangeScale.offsetWidth - minPin.offsetWidth);
      updatePins();
  });

  maxInput.addEventListener("input", function () {
      let value = Math.min(Math.max(parseInt(this.value) || maxValue, minValue), maxValue);
      maxPosition = ((value - minValue) / (maxValue - minValue)) * (rangeScale.offsetWidth - maxPin.offsetWidth);
      if (value === maxValue) {
          maxPosition = rangeScale.offsetWidth - maxPin.offsetWidth;
      }
      updatePins();
  });

  resetButton.addEventListener("click", function () {
      minPosition = 0;
      maxPosition = (900 / maxValue) * (rangeScale.offsetWidth - maxPin.offsetWidth);
      updatePins();
      updateInputs();
  });

  updatePins();
  updateInputs();
});

