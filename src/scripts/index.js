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

const placesList = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupEditAvatar = document.querySelector(".popup_type_new-avatar");
export const popupDeleteImageConfirmation = document.querySelector(
  ".popup_type_delete-confirmation"
);

const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__edit-button"
);
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const buttonEditAvatar = document.querySelector(".profile__image__edit");

const closeButtonEdit = popupEditProfile.querySelector(".popup__close");
const closeButtonAdd = popupAddCard.querySelector(".popup__close");
const closeButtonImage = popupImage.querySelector(".popup__close");
const closeButtonEditAvatar = popupEditAvatar.querySelector(".popup__close");
const closeButtonDeleteImage =
  popupDeleteImageConfirmation.querySelector(".popup__close");
const saveButtonEdit = popupEditProfile.querySelector(".popup__button");
const saveButtonAdd = popupAddCard.querySelector(".popup__button");
const saveButtonAvatarEdit = popupEditAvatar.querySelector(".popup__button");
export const confirmDeleteImageButton =
  popupDeleteImageConfirmation.querySelector(".popup__button");
const image = popupImage.querySelector(".popup__image");
const imageName = popupImage.querySelector(".popup__caption");

const popupWindowsArr = [
  popupEditProfile,
  popupAddCard,
  popupImage,
  popupEditAvatar,
  popupDeleteImageConfirmation,
];
const inputPopupsArr = [popupEditProfile, popupAddCard, popupEditAvatar];
const popupCloseButtonsArr = [
  closeButtonEdit,
  closeButtonAdd,
  closeButtonImage,
  closeButtonEditAvatar,
  closeButtonDeleteImage,
];

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const nameInput = popupEditProfile.querySelector('input[name="name"]');
const jobInput = popupEditProfile.querySelector('input[name="description"]');
const newPlaceForm = popupAddCard.querySelector('form[name="new-place"]');
const placeInput = popupAddCard.querySelector('input[name="place-name"]');
const imageLinkInuput = popupAddCard.querySelector('input[name="link"]');
const newAvatarForm = popupEditAvatar.querySelector('form[name="new-avatar"]');
const avatarLinkInput = popupEditAvatar.querySelector('input[name="link"]');

const validationConfig = {
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

function zoomImage(event) {
  const srcData = event.target.src;
  const altData = event.target.alt;
  openModal(popupImage);
  imageName.textContent = altData;
  image.src = srcData;
  image.alt = altData;
}

//валидация всех попапов с инпутом
inputPopupsArr.forEach((popup) => {
  enableValidation(popup, validationConfig);
});

//изменение текста кнопки, пока ждем ответ от сервера
function whileLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

//редактирование данных профиля
buttonOpenEditProfilePopup.addEventListener("click", function () {
  openModal(popupEditProfile);
  clearValidation(popupEditProfile, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  whileLoading(true, saveButtonEdit);
  amendUserData(nameInput.value, jobInput.value)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
    })
    .catch((err) => {
      console.log(err);
    })

    .finally(() => {
      whileLoading(false, saveButtonEdit);
      clearValidation(popupEditProfile, validationConfig);
      closeModal(popupEditProfile);
    });
}
popupEditProfile.addEventListener("submit", handleFormSubmitEdit);

//редактирование аватара
buttonEditAvatar.addEventListener("click", function () {
  openModal(popupEditAvatar);
  clearValidation(popupEditAvatar, validationConfig);
  newAvatarForm.reset();
});

function handleFormAvatarEdit(evt) {
  evt.preventDefault();
  whileLoading(true, saveButtonAvatarEdit);
  changeAvatar(avatarLinkInput.value)
    .then(
      (result) =>
        (profileImage.style = `background-image: url("${result.avatar}")`)
    )
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      whileLoading(false, saveButtonAvatarEdit);
      clearValidation(popupEditAvatar, validationConfig);
      closeModal(popupEditAvatar);
      newAvatarForm.reset();
    });
}
popupEditAvatar.addEventListener("submit", handleFormAvatarEdit);

//добавление изображения
buttonOpenAddCardPopup.addEventListener("click", function () {
  openModal(popupAddCard);
  clearValidation(popupAddCard, validationConfig);
  newPlaceForm.reset();
});

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  whileLoading(true, saveButtonAdd);
  addNewImageToServer(placeInput.value, imageLinkInuput.value)
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
      whileLoading(false, saveButtonAdd);
      clearValidation(popupAddCard, validationConfig);
      closeModal(popupAddCard);
      newPlaceForm.reset();
    });
}
popupAddCard.addEventListener("submit", handleFormSubmitAdd);

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
