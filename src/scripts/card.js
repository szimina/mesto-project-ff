import {
  cardTemplate,
  popupDeleteImageConfirmation,
  confirmDeleteImageButton,
} from "./index.js";
import {
  deleteCardFromServer,
  likeCardOnServer,
  dislikeCardOnServer,
} from "./api.js";
import { openModal, closeModal } from "./modal.js";

export function createCard(cardItem, onDelete, onLike, onZoom, userId) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardName = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const imagePreview = card.querySelector(".card__image");
  const likesCount = card.querySelector(".card__like-count");

  cardName.textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.id = cardItem._id;
  cardImage.alt = cardItem.name;
  likesCount.textContent = cardItem.likes.length;

  const didILikedTheCard = cardItem.likes.some((item) => {
    return item._id === userId;
  });

  if (didILikedTheCard) {
    likeButton.classList.add("card__like-button_is-active");
  }
  if (cardItem.owner._id === userId) {
    deleteButton.classList.remove("card__delete-button-hidden");
  }

  deleteButton.addEventListener("click", onDelete);
  likeButton.addEventListener("click", onLike);
  imagePreview.addEventListener("click", onZoom);

  return card;
}

export function addCard(card, onDelete, onLike, onZoom, list, userId) {
  list.append(createCard(card, onDelete, onLike, onZoom, userId));
}

export function addCardtoStart(card, onDelete, onLike, onZoom, list, userId) {
  list.prepend(createCard(card, onDelete, onLike, onZoom, userId));
}

function confirmDeleteImageButtonClickHandler(event) {
  const imageIdToRemove = event.target.closest(
    ".popup_type_delete-confirmation"
  ).id;
  console.log(imageIdToRemove);
  const cardToRemove = document.getElementById(imageIdToRemove).parentNode;
  deleteCardFromServer(imageIdToRemove);
  closeModal(popupDeleteImageConfirmation);
  cardToRemove.remove();
  confirmDeleteImageButton.removeEventListener(
    "click",
    confirmDeleteImageButtonClickHandler
  );
}

export function deleteCard(event) {
  const cardToRemove = event.target.closest(".places__item");
  let imageIdToRemove = cardToRemove.querySelector(".card__image").id;
  openModal(popupDeleteImageConfirmation);
  popupDeleteImageConfirmation.id = imageIdToRemove;
  confirmDeleteImageButton.addEventListener(
    "click",
    confirmDeleteImageButtonClickHandler
  );
}

export function likeCard(event) {
  if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_is-active");
    const imageId = event.target
      .closest(".places__item")
      .querySelector(".card__image").id;
    if (event.target.classList.contains("card__like-button_is-active")) {
      likeCardOnServer(imageId)
        .then((data) => {
          let myImage = document.getElementById(imageId);
          let likes = myImage.parentElement.querySelector(".card__like-count");
          likes.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dislikeCardOnServer(imageId)
        .then((data) => {
          let myImage = document.getElementById(imageId);
          let likes = myImage.parentElement.querySelector(".card__like-count");
          likes.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
