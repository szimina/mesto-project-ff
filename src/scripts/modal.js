//функция добавления класса видимости с попап и валидации
export function openModal(currentPopup) {
  currentPopup.classList.add("popup_is-opened");
  currentPopup.classList.add("popup_is-animated");
  document.addEventListener("keydown", closePopupByEsc);
}

//функция закрытия попапа, очистка формы и очистка валидации
export function closeModal(currentPopup) {
  currentPopup.classList.remove("popup_is-opened");
  currentPopup.classList.remove("popup_is-animated");
  document.removeEventListener("keydown", closePopupByEsc);
}

//Функция закрытия попапа по ESC
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_is-opened");
    closeModal(currentPopup);
  }
}

//Функция закрытия попапа по клику за пределами
export function closeOnOverlayClick({ currentTarget, target }) {
  const isClickedOnOverlay = target === currentTarget;
  if (isClickedOnOverlay) {
    closeModal(currentTarget);
  }
}
