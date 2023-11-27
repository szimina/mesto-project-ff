//функция добавления класса видимости с попап
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
  popup.addEventListener('click', closePopupByEsc)
}

//функция удаления класса видимости с попап
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.remove("popup_is-animated");
  popup.removeEventListener("click", closePopupByEsc);
}

//Функция закрытия попапа по ESC
function closePopupByEsc(evt) {
  if (evt.key === "Escape") { 
    const currentPopup = document.querySelector(".popup_is-opened");
    closeModal(currentPopup); 

  }
}

//Функция закрытия попапа по клику за пределами
function closeOnOverlayClick({ currentTarget, target }) {
  const isClickedOnOverlay = target === currentTarget;
  if (isClickedOnOverlay) {
    closeModal(currentTarget);
  }
}
export { openModal, closeModal, closeOnOverlayClick };
