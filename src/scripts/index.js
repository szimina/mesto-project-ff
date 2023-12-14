import "../pages/index.css";
import { addCard, addCardtoStart, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal, closeOnOverlayClick } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getCards,
  getMyUserData,
  amendUserData,
  addNewImageToServer,
  changeAvatar,
} from "./api.js";

export const placesList = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;

export const popupEdit = document.querySelector(".popup_type_edit");
export const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
export const popupEditAvatar = document.querySelector(".popup_type_new-avatar");
export const popupDeleteImageConfirmation = document.querySelector(
  ".popup_type_delete-confirmation"
);

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonEditAvatar = document.querySelector(".profile__image__edit");

export const closeButtonEdit = popupEdit.querySelector(".popup__close");
const closeButtonAdd = popupAdd.querySelector(".popup__close");
const closeButtonImage = popupImage.querySelector(".popup__close");
const closeButtonEditAvatar = popupEditAvatar.querySelector(".popup__close");
const closeButtonDeleteImage =
  popupDeleteImageConfirmation.querySelector(".popup__close");
export const saveButtonEdit = popupEdit.querySelector(".popup__button");
export const saveButtonAdd = popupAdd.querySelector(".popup__button");
export const saveButtonAvatarEdit =
  popupEditAvatar.querySelector(".popup__button");
export const confirmDeleteImageButton =
  popupDeleteImageConfirmation.querySelector(".popup__button");

const popupWindowsArr = [
  popupEdit,
  popupAdd,
  popupImage,
  popupEditAvatar,
  popupDeleteImageConfirmation,
];
export const inputPopupsArr = [popupEdit, popupAdd, popupEditAvatar];
const popupCloseButtonsArr = [
  closeButtonEdit,
  closeButtonAdd,
  closeButtonImage,
  closeButtonEditAvatar,
  closeButtonDeleteImage,
];

let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
let profileImage = document.querySelector(".profile__image");
export const nameInput = popupEdit.querySelector('input[name="name"]');
export const jobInput = popupEdit.querySelector('input[name="description"]');
export const newPlaceForm = popupAdd.querySelector('form[name="new-place"]');
export const placeInput = popupAdd.querySelector('input[name="place-name"]');
export const imageLinkInuput = popupAdd.querySelector('input[name="link"]');
const newAvatarForm = popupEditAvatar.querySelector('form[name="new-avatar"]');
export const avatarLinkInput =
  popupEditAvatar.querySelector('input[name="link"]');

export const validationConfig = {
  formSelector: ".popup_is-opened",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//выгружает карточки и профиль пользователя
Promise.all([getCards(), getMyUserData()])
  .then(([responseCards, responceMyUserId]) => {
    const myUserId = responceMyUserId._id;
    profileTitle.textContent = responceMyUserId.name;
    profileDescription.textContent = responceMyUserId.about;
    profileImage.style = `background-image: url("${responceMyUserId.avatar}")`;

    responseCards.forEach((item) => {
      addCard(item, deleteCard, likeCard, zoomImage, placesList, myUserId);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export function zoomImage(event) {
  const srcData = event.target.src;
  const altData = event.target.alt;
  openModal(popupImage);
  const image = popupImage.querySelector(".popup__image");
  const imageName = popupImage.querySelector(".popup__caption");
  imageName.textContent = altData;
  image.src = srcData;
  image.alt = altData;
}

//редактирование данных профиля
buttonEdit.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
  enableValidation(popupEdit, validationConfig);
});

function whileLoadingUserData(isLoading) {
  if (isLoading) {
    saveButtonEdit.textContent = "Сохранение...";
  } else {
    saveButtonEdit.textContent = "Сохранить";
    closeModal(popupEdit);
    clearValidation(popupEdit, validationConfig);
  }
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  whileLoadingUserData(true);
  amendUserData()
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
    })
    .catch((err) => {
      console.log(err);
    })

    .finally(() => {
      whileLoadingUserData(false);
    });
}
popupEdit.addEventListener("submit", handleFormSubmitEdit);

//редактирование аватара
buttonEditAvatar.addEventListener("click", function () {
  openModal(popupEditAvatar); //
  enableValidation(popupEditAvatar, validationConfig);
});

function whileLoadingAvatar(isLoading) {
  if (isLoading) {
    saveButtonAvatarEdit.textContent = "Сохранение...";
  } else {
    saveButtonAvatarEdit.textContent = "Сохранить";
    closeModal(popupEditAvatar);
    newAvatarForm.reset();
    clearValidation(popupEditAvatar, validationConfig);
  }
}

function handleFormAvatarEdit(evt) {
  evt.preventDefault();
  whileLoadingAvatar(true);
  changeAvatar()
    .then(
      (result) =>
        (profileImage.style = `background-image: url("${result.avatar}")`)
    )
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      whileLoadingAvatar(false);
    });
}
popupEditAvatar.addEventListener("submit", handleFormAvatarEdit);

//добавление изображения
buttonAdd.addEventListener("click", function () {
  openModal(popupAdd);
  enableValidation(popupAdd, validationConfig);
});

function whileLoadingImage(isLoading) {
  if (isLoading) {
    saveButtonAdd.textContent = "Сохранение...";
  } else {
    saveButtonAdd.textContent = "Сохранить";
    closeModal(popupAdd);
    newPlaceForm.reset();
    clearValidation(popupAdd, validationConfig);
  }
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  whileLoadingImage(true);
  addNewImageToServer()
    .then((result) => {
      const userId = result.owner._id;
      addCardtoStart(
        result,
        deleteCard,
        likeCard,
        zoomImage,
        placesList,
        userId
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      whileLoadingImage(false);
    });
}
popupAdd.addEventListener("submit", handleFormSubmitAdd);

//цикл навешивания слушателя на все кнопки закрытия
popupCloseButtonsArr.forEach(function (item) {
  item.addEventListener("click", function () {
    closeModal(item.closest(".popup"));
  });
});

//цикл навешивания слушателя на все попапы
popupWindowsArr.forEach(function (item) {
  item.addEventListener("click", closeOnOverlayClick);
});
