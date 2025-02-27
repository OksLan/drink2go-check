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
const ranges = document.querySelectorAll('.pricerange__pin');
const valueMin = document.querySelector('.pricerange__input-value--min');
const valueMax = document.querySelector('.pricerange__input-value--max');

function showValues() {
  let minVal = Number(ranges[0].value);
  let maxVal = Number(ranges[1].value);

  //avoids slider overlap
  if (minVal > maxVal) {
    ranges[0].value = maxVal;
    ranges[1].value = minVal;
    minVal = Number(ranges[0].value);
    maxVal = Number(ranges[1].value);
  }

  valueMin.value = minVal;
  valueMax.value = maxVal;

ranges[0].style.backgroundImage = ranges[1].style.backgroundImage =
`linear-gradient(to right, #e2e2e2 0%, #e2e2e2 ${minVal / 10}%, #9070ec ${minVal / 10}%, #9070ec ${maxVal / 10}%, #e2e2e2 ${maxVal / 10}%, #e2e2e2 100%)`;
}

ranges[0].onchange = showValues;
ranges[1].onchange = showValues;


/* стрелка селекта */
document.addEventListener("DOMContentLoaded", function () {
  const select = document.querySelector(".sorting__list");

  select.style.backgroundImage = "url('../icons/stack.svg#arrow-down')";

  select.addEventListener("focus", function () {
    select.style.backgroundImage = "url('../icons/stack.svg#arrow-up')";
  });

  select.addEventListener("change", function () {
    select.style.backgroundImage = "url('../icons/stack.svg#arrow-down')";
  });

  select.addEventListener("blur", function () {
    select.style.backgroundImage = "url('../icons/stack.svg#arrow-down')";
  });
});

/* карта */
ymaps.ready(init);

function init() {
  // Создание карты.
  const myMap = new ymaps.Map("ymap", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    center: [59.968424, 30.317790],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 16,
    controls: ['zoomControl', 'rulerControl']
  }, {
    suppressMapOpenBlock: true
  });

  myMap.behaviors
    .disable(['scrollZoom']);

  myMap.controls.remove('routeEditor');

  const myPlacemark = new ymaps.Placemark([59.968424, 30.317790], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../../icons/map-pin.svg',
    // iconImageHref: '/maps/d../../jsapi/doc/2.1/examples/_icons/map-pin.svg',
    iconImageSize: [38, 50],
    iconImageOffset: [-3, -42]
  });
  myMap.geoObjects.add(myPlacemark);
}
