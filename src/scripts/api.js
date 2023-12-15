const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-2",
  headers: {
    authorization: "c8fa0ce8-1016-42e6-8f5d-cacf41e63af7",
    "Content-Type": "application/json",
  },
};

//Функция проверки статуса и возвращения ответа
function checkResponseStatus(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((response) => checkResponseStatus(response));
}

export function getMyUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((response) => checkResponseStatus(response));
}

export function amendUserData(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((response) => checkResponseStatus(response));
}

export function addNewImageToServer(place, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: place,
      link: link,
    }),
  }).then((response) => checkResponseStatus(response));
}

export function changeAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((response) => checkResponseStatus(response));
}

export function deleteCardFromServer(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => checkResponseStatus(response));
}

export function likeCardOnServer(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then((response) => checkResponseStatus(response));
}

export function dislikeCardOnServer(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => checkResponseStatus(response));
}
