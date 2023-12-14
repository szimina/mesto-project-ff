//отображает текст ошибки поля ввода
function showInputError(
  popupWindow,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  const errorElement = popupWindow.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

//скрывает текст ошибки поля ввода
function hideInputError(
  popupWindow,
  inputElement,
  inputErrorClass,
  errorClass
) {
  const errorElement = popupWindow.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

//проверяет список полей инпута на валидность. возвращает true, если одно из полей списка невалидно
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//активирует и дезактивирует кнопку при невалидном инпуте
function toggleButton(
  popupWindow,
  submitButtonSelector,
  inputSelector,
  inactiveButtonClass
) {
  const buttonElement = popupWindow.querySelector(submitButtonSelector);
  const popupInputList = Array.from(
    popupWindow.querySelectorAll(inputSelector)
  );
  if (hasInvalidInput(popupInputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

//функия установки сообщения об ошибке и его отображения
function isValid(popupWindow, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      popupWindow,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(popupWindow, inputElement, inputErrorClass, errorClass);
  }
}

//очистка ошибок валидации
export function clearValidation(popupWindow, validationConfig) {
  const popupInputs = popupWindow.querySelectorAll(
    validationConfig.inputSelector
  );
  const buttonElement = popupWindow.querySelector(
    validationConfig.submitButtonSelector
  );

  popupInputs.forEach((inputElement) => {
    hideInputError(
      popupWindow,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
    inputElement.setCustomValidity("");
  });

  buttonElement.disabled = false;
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

export function enableValidation(popupWindow, validationConfig) {
  popupWindow.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  toggleButton(
    popupWindow,
    validationConfig.submitButtonSelector,
    validationConfig.inputSelector,
    validationConfig.inactiveButtonClass
  );

  const popupInputs = popupWindow.querySelectorAll(
    validationConfig.inputSelector
  );

  popupInputs.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(
        popupWindow,
        inputElement,
        validationConfig.inputErrorClass,
        validationConfig.errorClass
      );
      toggleButton(
        popupWindow,
        validationConfig.submitButtonSelector,
        validationConfig.inputSelector,
        validationConfig.inactiveButtonClass
      );
    });
  });
}
