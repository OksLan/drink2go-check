const cards = [
  {
    foto: "white-1@1x",
    foto_2x: "white-1@2x",
    title: "Декаф Флэт Уайт",
    descript: "Лёгкий без кофеина с фермерским молоком",
    milk: "animal",
    country: "brazil",
    price: "855",
  },
  {
    foto: "violet-2@1x",
    foto_2x: "violet-2@2x",
    title: "Лавандовый Латте",
    descript: "Перуанская арабика, молоко ламы и лавандовый сироп",
    milk: "animal",
    country: "peru",
    price: "350",
  },
  {
    foto: "black-3@1x",
    foto_2x: "black-3@2x",
    title: "Pitch Black",
    descript: "Самый крепкий в мире кофе из Колумбии, никакого молока",
    milk: "no-milk",
    country: "columbia",
    price: "550",
  },
  {
    foto: "red-4@1x",
    foto_2x: "red-4@2x",
    title: "Брусничный Латте",
    descript: "Яркий таёжный вкус с миндальным молоком",
    milk: "vegetable",
    country: "costa-rica",
    price: "655",
  },
  {
    foto: "brown-5@1x",
    foto_2x: "brown-5@2x",
    title: "Карамельный Эспрессо",
    descript: "Крепкий кофе и сироп солёная карамель",
    milk: "no-milk",
    country: "ethiopia",
    price: "485",
  },
  {
    foto: "yellow-6@1x",
    foto_2x: "yellow-6@2x",
    title: "Медовый Капуччино",
    descript: "Бодрящая арабика с медом и маточным молочком",
    milk: "animal",
    country: "ethiopia",
    price: "725",
  },
  {
    foto: "yellow-6@1x",
    foto_2x: "yellow-6@2x",
    title: "Медовый Капуччино",
    descript: "Бодрящая арабика с медом и маточным молочком",
    milk: "animal",
    country: "ethiopia",
    price: "725",
  },
];
export { cards };

const catalog = document.querySelector(".catalog__list");
const cardTemplate = document.querySelector("#card").content; //template

let addCard = (card) => {
  const cardElement = cardTemplate
    .querySelector(".catalog__list-item")
    .cloneNode(true);
  cardElement.setAttribute("data-milk", card.milk);
  cardElement.setAttribute("data-country", card.country);
  cardElement.querySelector(
    ".card__image-webp"
  ).srcset = `images/products/${card.foto}.webp, images/products/${card.foto_2x}.webp`;
  cardElement.querySelector(
    ".card__image-png"
  ).srcset = `images/products/${card.foto}.png, images/products/${card.foto_2x}.png`;
  cardElement.querySelector(".card__image").src += `${card.foto}.png`;
  cardElement.querySelector(".card__image").srcset += `${card.foto_2x}.png`;
  cardElement.querySelector(".card__title").textContent = card.title;
  cardElement.querySelector(".card__text").textContent = card.descript;
  cardElement.querySelector(".card__price").textContent = `${card.price}₽`;
  cardElement.querySelector(".card__button").onclick = function (evt) {
    evt.preventDefault();
    const eventTarget = evt.target;
    console.log("basket", eventTarget);
  };
  catalog.append(cardElement);
};

export function showCards(cards) {
  for (const card of cards) {
    addCard(card);
  }
}

// фильтры
const filters = document.querySelector(".catalog__form");
filters.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const selectedMilk = filters["milk-radio"].value; // Выбранный тип молока
  const selectedCountries = Array.from(
    filters.querySelectorAll(".filter__box--checkbox:checked")
  ).map((country) => country.id);

  catalog.innerHTML = "";

  for (const card of cards) {
    const matchesMilk = selectedMilk === "not-important" || card.milk === selectedMilk;
    const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(card.country);

    if (matchesMilk && matchesCountry) {
      addCard(card);
    }
  }
});

// reset
const resetButton = filters.querySelector(".button--reset");

resetButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  filters.reset();

  catalog.innerHTML = "";
  showCards(cards);

  resetButton.blur();
});


/* pricerange */
const ranges = document.querySelectorAll(".pricerange__pin");
const valueMin = document.querySelector(".price-range__input--min");
const valueMax = document.querySelector(".price-range__input--max");

function updatePriceValues() {
  let minVal = Number(ranges[0].value);
  let maxVal = Number(ranges[1].value);

  if (minVal > maxVal) {
    [ranges[0].value, ranges[1].value] = [maxVal, minVal];
    minVal = Number(ranges[0].value);
    maxVal = Number(ranges[1].value);
  }

  valueMin.value = minVal;
  valueMax.value = maxVal;

  ranges[0].style.backgroundImage =
    ranges[1].style.backgroundImage = `linear-gradient(to right, #e2e2e2 0%, #e2e2e2 ${
      (minVal / 1000) * 100
    }%, #9070ec ${(minVal / 1000) * 100}%, #9070ec ${(maxVal / 1000) * 100}%, #e2e2e2 ${
      (maxVal / 1000) * 100
    }%, #e2e2e2 100%)`;

  filterByPrice();
}

ranges.forEach((range) => range.addEventListener("input", updatePriceValues));

/* фильтр по цене */
function filterByPrice() {
  const minPrice = Number(valueMin.value);
  const maxPrice = Number(valueMax.value);

  catalog.innerHTML = "";

  for (const card of cards) {
    if (card.price >= minPrice && card.price <= maxPrice) {
      addCard(card);
    }
  }
}

/* убрать/вернуть плейсхолдер в focus */
document.querySelectorAll(".price-range__input").forEach((input) => {
  input.addEventListener("focus", () => {
    input.dataset.placeholder = input.placeholder;
    input.placeholder = "";
    input.value = "";
  });

  input.addEventListener("blur", () => {
    if (!input.value.trim()) {
      input.placeholder = input.dataset.placeholder;
    }
  });
});

/* сортировка */
const sortingSelect = document.querySelector(".sorting__list");

sortingSelect.addEventListener("change", () => {
  const selectedOption = sortingSelect.value;
  let sortedCards = [...cards];

  switch (selectedOption) {
    case "cheap-first":
      sortedCards.sort((a, b) => a.price - b.price);
      break;
    case "expensive-first":
      sortedCards.sort((a, b) => b.price - a.price);
      break;
    case "pop-first":
      sortedCards.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      break;
    default:
      sortedCards = [...cards];
  }

  catalog.innerHTML = "";
  showCards(sortedCards);
});

/* пагинация */
document.addEventListener("DOMContentLoaded", () => {
  const cards = [...document.querySelectorAll(".catalog__list-item")];
  const pagination = document.querySelector(".catalog__pagination-list");
  const [prevBtn, nextBtn] = document.querySelectorAll(".catalog__pagination-button");
  const cardsPerPage = 6;
  let currentPage = 1;

  const showPage = (page) => {
      const start = (page - 1) * cardsPerPage;
      cards.forEach((card, i) => card.style.display = i >= start && i < start + cardsPerPage ? "block" : "none");
      updatePagination(page);
  };

  const updatePagination = (page) => {
      pagination.innerHTML = "";
      const totalPages = Math.ceil(cards.length / cardsPerPage);
      for (let i = 1; i <= totalPages; i++) {
          pagination.innerHTML += `<li class="catalog__pagination-item">
              <a href="#" class="catalog__pagination-link${i === page ? " catalog__pagination-link--current" : ""}" data-page="${i}">${i}</a>
          </li>`;
      }
      prevBtn.disabled = page === 1;
      nextBtn.disabled = page === totalPages;
  };

  pagination.addEventListener("click", (e) => {
      if (e.target.matches(".catalog__pagination-link")) {
          e.preventDefault();
          currentPage = +e.target.dataset.page;
          showPage(currentPage);
      }
  });

  prevBtn.addEventListener("click", () => currentPage > 1 && showPage(--currentPage));
  nextBtn.addEventListener("click", () => currentPage < Math.ceil(cards.length / cardsPerPage) && showPage(++currentPage));

  showPage(currentPage);
});
