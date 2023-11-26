//функция добавления класса видимости с попап
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
}

//функция удаления класса видимости с попап
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.remove("popup_is-animated");
  popup.removeEventListener("click", closeModal);
}

export { openModal, closeModal };
