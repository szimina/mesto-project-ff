const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

function addCard(cardItem) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = cardItem.name;
  cardElement.querySelector(".card__image").src = cardItem.link;
  cardElement.querySelector(".card__image").alt = cardItem.name;

  placesList.append(cardElement);

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCardElement(cardElement);
  });
}

for (let i = 0; i < initialCards.length; i = i + 1) {
  cardItem = initialCards[i];
  addCard(cardItem);
}

function deleteCardElement(elem) {
  elem.remove();
}
