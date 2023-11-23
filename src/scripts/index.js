import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

const closeButtonEdit = popupEdit.querySelector(".popup__close");
const closeButtonAdd = popupAdd.querySelector(".popup__close");
const closeButtonImage = popupImage.querySelector(".popup__close");

let popupWindowsArr = [popupEdit, popupAdd, popupImage];
let popupCloseButtonsArr = [closeButtonEdit, closeButtonAdd, closeButtonImage];

let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
let nameInput = popupEdit.querySelector('input[name="name"]');
let jobInput = popupEdit.querySelector('input[name="description"]');
let placeInput = popupAdd.querySelector('input[name="place-name"]');
let imageLinkInuput = popupAdd.querySelector('input[name="link"]');

function createCard(cardItem, onDelete, onLike, onZoom) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardName = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const imagePreview = card.querySelector(".card__image");

  cardName.textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;

  deleteButton.addEventListener("click", onDelete);
  likeButton.addEventListener("click", onLike);
  imagePreview.addEventListener("click", onZoom);

  return card;
}

function addCard(card, onDelete, onLike, onZoom, list) {
  list.append(createCard(card, onDelete, onLike, onZoom));
}

function addCardtoStart(card, onDelete, onLike, onZoom, list) {
  list.prepend(createCard(card, onDelete, onLike, onZoom));
}

function deleteCard(event) {
  const itemToRemove = event.target.closest(".places__item");
  itemToRemove.remove();
}

function likeCard(event) {
  if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_is-active");
  }
}

function zoomImage(event) {
  let srcData = event.target.src;
  let altData = event.target.alt;
  openClosePopup(popupImage);
  let imagePopup = document.querySelector(".popup_is-opened");
  let image = imagePopup.querySelector(".popup__image");
  let imageName = imagePopup.querySelector(".popup__caption");
  imageName.textContent = altData;
  image.src = srcData;
  image.alt = altData;
}

initialCards.forEach(function (item) {
  addCard(item, deleteCard, likeCard, zoomImage, placesList);
});

//функция добавления/удаления класса видимости с попап
function openClosePopup(popup) {
  popup.classList.toggle("popup_is-opened");
  popup.classList.toggle("popup_is-animated");
}

buttonEdit.addEventListener("click", function () {
  openClosePopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

buttonAdd.addEventListener("click", function () {
  openClosePopup(popupAdd);
});

//цикл навешивания слушателя на все кнопки закрытия
popupCloseButtonsArr.forEach(function (item) {
  item.addEventListener("click", function () {
    openClosePopup(item.closest(".popup"));
  });
});

//закрытие попапа по Esc
document.addEventListener("keydown", function (evt) {
  let currentPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape" && currentPopup) {
    openClosePopup(currentPopup);
  }
});

//Функция закрытия попапа по клику за пределами
function closeOnOverlayClick({ currentTarget, target }) {
  const popupElement = currentTarget;
  const isClickedOnOverlay = target === popupElement;
  let currentPopup = document.querySelector(".popup_is-opened");
  if (isClickedOnOverlay) {
    openClosePopup(currentPopup);
  }
}

//цикл навешивания слушателя на все попапы
popupWindowsArr.forEach(function (item) {
  item.addEventListener("click", closeOnOverlayClick);
});

// Обработчик «отправки» формы автора
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  openClosePopup(popupEdit);
}
popupEdit.addEventListener("submit", handleFormSubmitEdit);

// Обработчик «отправки» формы Новое место
function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  let placeName = placeInput.value;
  let placeLink = imageLinkInuput.value;
  addCardtoStart(
    { name: placeName, link: placeLink },
    deleteCard,
    likeCard,
    zoomImage,
    placesList
  );
  openClosePopup(popupAdd);
  placeInput.value = "";
  imageLinkInuput.value = "";
}
popupAdd.addEventListener("submit", handleFormSubmitAdd);
