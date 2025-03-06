/* добавленеи карточки */
document.addEventListener("DOMContentLoaded", function () {
  function addProductCard({ imageUrl, title, description, price, milkType, country }) {
    const catalogList = document.querySelector(".catalog__list");
    if (!catalogList) return;

    const card = document.createElement("article");
    card.className = "catalog__list-item card";

    // Добавляем параметры в data-атрибуты
    card.dataset.milk = milkType; // "animal", "vegetable", "none"
    card.dataset.country = country; // "brazil", "ethiopia", "colombia", "costa-rica", "peru"

    card.innerHTML = `
      <a class="card__link card__link--image" href="#">
        <img class="card__image" src="${imageUrl}" width="130" height="188" alt="${title}">
      </a>
      <a class="card__link card__link--title" href="#">
        <h3 class="card__title">${title}</h3>
      </a>
      <p class="card__text">${description}</p>
      <div class="card__buy-wrapper">
        <span class="card__price">${price}₽</span>
        <button class="card__button button button--card" type="button">
          <svg class="card__button-icon" width="20" height="16">
            <use href="icons/stack.svg#basket-plus"></use>
          </svg>
          <span class="card__button-text">В корзину</span>
        </button>
      </div>
    `;

    catalogList.appendChild(card);
  }

  // Список карточек

  addProductCard({
    imageUrl: "images/products/white-1@2x.png",
    title: "Декаф Флэт Уайт",
    description: "Лёгкий без кофеина с фермерским молоком",
    price: 855,
    milkType: "amimal",
    country: "ethiopia"
    });

  addProductCard({
    imageUrl: "images/products/violet-2@2x.png",
    title: "Лавандовый Латте",
    description: "Перуанская арабика, молоко ламы и лавандовый сироп",
    price: 350,
    milkType: "amimal",
    country: "peru"
    });

  addProductCard({
    imageUrl: "images/products/black-3@2x.png",
    title: "Pitch Black",
    description: "Самый крепкий в мире кофе из Колумбии, никакого молока",
    price: 550,
    milkType: "none",
    country: "colombia"
    });

  addProductCard({
    imageUrl: "images/products/red-4@2x.png",
    title: "Брусничный Латте",
    description: "Яркий таёжный вкус с миндальным молоком",
    price: 855,
    milkType: "vegetable",
    country: "costa-rica"
    });

  addProductCard({
    imageUrl: "images/products/brown-5@2x.png",
    title: "Карамельный Эспрессо",
    description: "Крепкий кофе и сироп солёная карамель",
    price: 485,
    milkType: "none",
    country: "colombia"
    });

  addProductCard({
    imageUrl: "images/products/yellow-6@2x.png",
    title: "Медовый Капуччино",
    description: "Бодрящая арабика с медом и маточным молочком",
    price: 785,
    milkType: "amimal",
    country: "ethiopia"
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const filterForm = document.querySelector(".catalog__form.filter");

  function filterProducts() {
    const selectedMilk = document.querySelector("input[name='milk-radio']:checked").value;
    const selectedCountries = [...document.querySelectorAll("input[name='checkbox-country']:checked")].map(el => el.value);

    const minPrice = parseInt(document.querySelector(".pricerange__input-value--min").value, 10) || 0;
    const maxPrice = parseInt(document.querySelector(".pricerange__input-value--max").value, 10) || 1000;

    document.querySelectorAll(".catalog__list-item").forEach(card => {
      const cardMilk = card.dataset.milk;
      const cardCountry = card.dataset.country;
      const cardPrice = parseInt(card.querySelector(".card__price").textContent.replace("₽", ""), 10);

      const matchesMilk = selectedMilk === "not-important" || cardMilk === selectedMilk;
      const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(cardCountry);
      const matchesPrice = cardPrice >= minPrice && cardPrice <= maxPrice;

      if (matchesMilk && matchesCountry && matchesPrice) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  filterForm.addEventListener("change", filterProducts);
});
