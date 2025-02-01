/* в этот файл добавляет скрипты*/

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
