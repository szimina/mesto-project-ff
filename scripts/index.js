const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardItem, onDelete) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardName = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");

  cardName.textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;

  deleteButton.addEventListener("click", onDelete);

  return card;
}

function addCard (card, onDelete, list) {
  list.append(createCard(card, onDelete));
} 

function deleteCard(event) {
  const itemToRemove = event.target.closest(".places__item");
  itemToRemove.remove();
}

initialCards.forEach((item) => {
  addCard(item, deleteCard, placesList);
});
