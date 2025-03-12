import { showSlider } from "./slider.js";
import { cards, showCards } from "./cards.js";

/* развернуть/свернуть main-nav */
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".user-nav__toggle");
  const navList = document.querySelector(".main-nav");
  const icon = toggleButton.querySelector("use");

  toggleButton.addEventListener("click", () => {
    toggleButton.classList.toggle("user-nav__toggle--open");
    toggleButton.classList.toggle("user-nav__toggle--close");
    navList.classList.toggle("main-nav--opened");

    const isOpen = navList.classList.contains("main-nav--opened");
    icon.setAttribute(
      "href",
      isOpen ? "icons/stack.svg#cross" : "icons/stack.svg#burger"
    );
  });
});

/* slider */
showSlider();

/* pricerange */
const ranges = document.querySelectorAll(".pricerange__pin");
const valueMin = document.querySelector(".pricerange__input-value--min");
const valueMax = document.querySelector(".pricerange__input-value--max");

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

  ranges[0].style.backgroundImage =
    ranges[1].style.backgroundImage = `linear-gradient(to right, #e2e2e2 0%, #e2e2e2 ${
      minVal / 10
    }%, #9070ec ${minVal / 10}%, #9070ec ${maxVal / 10}%, #e2e2e2 ${
      maxVal / 10
    }%, #e2e2e2 100%)`;
}

ranges[0].onchange = showValues;
ranges[1].onchange = showValues;

/* убрать/вернуть плейсхолдер в focus */
[valueMin, valueMax].forEach((input) => {
  input.addEventListener("focus", () => {
    input.dataset.placeholder = input.placeholder;
    input.placeholder = "";
  });
  input.addEventListener("blur", () => {
    input.placeholder = input.dataset.placeholder;
  });
});

/* стрелка селекта */
document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".sorting__list");

  select.style.backgroundImage = "url(../icons/stack.svg#arrow-down)";

  select.addEventListener("focus", () => {
    select.style.backgroundImage = "url(../icons/stack.svg#arrow-up)";
  });

  select.addEventListener("change", () => {
    select.style.backgroundImage = "url(../icons/stack.svg#arrow-down)";
  });

  select.addEventListener("blur", () => {
    select.style.backgroundImage = "url(../icons/stack.svg#arrow-down)";
  });

  select.addEventListener("mouseout", function (evt) {
    // evt.stopPropagation();
    this.blur();
  });
});

/* карта */
ymaps.ready(init);

function init() {
  // Создание карты.
  const myMap = new ymaps.Map(
    "ymap",
    {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      center: [59.968424, 30.31779],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 16,
      controls: ["zoomControl", "rulerControl"],
    },
    {
      suppressMapOpenBlock: true,
    }
  );
  console.log(myMap);
  if (myMap == null) {
    console.log("no map!");
  }
  myMap.behaviors.disable(["scrollZoom"]);

  myMap.controls.remove("routeEditor");

  // маркер на карте
  const myPlacemark = new ymaps.Placemark(
    [59.968424, 30.31779],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "../../images/map/map-pin.png",
      iconImageSize: [38, 50],
      iconImageOffset: [-35, -42],
    }
  );
  myMap.geoObjects.add(myPlacemark);
}

/*======= Catalogue ========================================================*/
showCards(cards);
