import "../pages/index.css";
import { initialCards } from "./cards.js";
import {
  addCard,
  addCardtoStart,
  deleteCard,
  likeCard,
} from "./card.js";
import { openModal, closeModal, closeOnOverlayClick } from "./modal.js";

const placesList = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

const closeButtonEdit = popupEdit.querySelector(".popup__close");
const closeButtonAdd = popupAdd.querySelector(".popup__close");
const closeButtonImage = popupImage.querySelector(".popup__close");

const popupWindowsArr = [popupEdit, popupAdd, popupImage];
const popupCloseButtonsArr = [
  closeButtonEdit,
  closeButtonAdd,
  closeButtonImage,
];

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = popupEdit.querySelector('input[name="name"]');
const jobInput = popupEdit.querySelector('input[name="description"]');
const newPlaceForm = popupAdd.querySelector('form[name="new-place"]');
const placeInput = popupAdd.querySelector('input[name="place-name"]');
const imageLinkInuput = popupAdd.querySelector('input[name="link"]');

function zoomImage(event) {
  const srcData = event.target.src;
  const altData = event.target.alt;
  openModal(popupImage);
  const image = popupImage.querySelector(".popup__image");
  const imageName = popupImage.querySelector(".popup__caption");
  imageName.textContent = altData;
  image.src = srcData;
  image.alt = altData;
}

initialCards.forEach(function (item) {
  addCard(item, deleteCard, likeCard, zoomImage, placesList);
});

buttonEdit.addEventListener("click", function () {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

buttonAdd.addEventListener("click", function () {
  openModal(popupAdd);
});

//цикл навешивания слушателя на все кнопки закрытия
popupCloseButtonsArr.forEach(function (item) {
  item.addEventListener("click", function () {
    closeModal(item.closest(".popup"));
  });
});

// //закрытие попапа по Esc
// document.addEventListener("keydown", function (evt) {
//   const currentPopup = document.querySelector(".popup_is-opened");
//   if (evt.key === "Escape" && currentPopup) {
//     closeModal(currentPopup);
//   }
// });



//цикл навешивания слушателя на все попапы
popupWindowsArr.forEach(function (item) {
  item.addEventListener("click", closeOnOverlayClick);
});

// Обработчик «отправки» формы автора
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}
popupEdit.addEventListener("submit", handleFormSubmitEdit);

// Обработчик «отправки» формы Новое место
function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const placeName = placeInput.value;
  const placeLink = imageLinkInuput.value;
  addCardtoStart(
    { name: placeName, link: placeLink },
    deleteCard,
    likeCard,
    zoomImage,
    placesList
  );
  closeModal(popupAdd);
  newPlaceForm.reset();
}
popupAdd.addEventListener("submit", handleFormSubmitAdd);
