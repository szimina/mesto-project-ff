const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardItem) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardName = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");

  cardName.textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;

  deleteButton.addEventListener("click", deleteCard);

  return card;
}

function addCards() {
  initialCards.forEach((item) => {
    const cardItem = createCard(item);
    placesList.append(cardItem);
  });
}

function deleteCard(event) {
  const itemToRemove = event.target.closest(".places__item");
  itemToRemove.remove();
}

addCards();
