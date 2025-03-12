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
    country: "colombia",
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
  // console.log("submit!");
  // console.log(filters["min-value"].value);
  // console.log(filters["max-value"].value);
  // console.log(filters["milk-radio"].value);

  const countries = Array.from(
    filters.querySelectorAll(".filter__box--checkbox:checked")
  );
  const c = countries.map((country) => country.id);
  // console.log(c);

  catalog.innerHTML = "";

  for (const card of cards) {
    //   console.log(c.includes(card.country), card.country);
    if (card.milk === filters["milk-radio"].value && c.includes(card.country)) {
      addCard(card);
    }
  }
});
