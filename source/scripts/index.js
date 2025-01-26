/* в этот файл добавляет скрипты*/

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.user-nav__toggle');
  const navList = document.querySelector('.main-nav');

  toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('user-nav__toggle--open');
    toggleButton.classList.toggle('user-nav__toggle--close');
    navList.classList.toggle('main-nav--opened');
  });
});
