import {
  nameInput,
  jobInput,
  placeInput,
  imageLinkInuput,
  avatarLinkInput,
} from "./index.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-2",
  headers: {
    authorization: "c8fa0ce8-1016-42e6-8f5d-cacf41e63af7",
    "Content-Type": "application/json",
  },
};

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  });
}

export function getMyUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  });
}

export function amendUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  });
}

export function addNewImageToServer() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: placeInput.value,
      link: imageLinkInuput.value,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  });
}

export function changeAvatar() {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLinkInput.value,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  });
}

export function deleteCardFromServer(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  });
}

export function likeCardOnServer(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  });
}

export function dislikeCardOnServer(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  });
}
