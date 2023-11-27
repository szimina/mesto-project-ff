import { cardTemplate } from "./index.js";

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

export {
  createCard,
  addCard,
  addCardtoStart,
  deleteCard,
  likeCard,
};
