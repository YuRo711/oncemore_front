export class FormValidator {
  constructor(formElement, setButtonActivity) {
    this._formElement = formElement;
    this._inputFields = Array.from(formElement.querySelectorAll("input"));
    this._setButtonActivity = setButtonActivity;
  }

  _findInvalidInput() {
    return this._inputFields.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(inputElement) {
    inputElement.classList.add("modal__input_error");
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove("modal__input_error");
  }

  _validateInput(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  enableValidation() {
    this.toggleButtonState();
  }

  toggleButtonState() {
    if (this._findInvalidInput()) {
      this._setButtonActivity(false);
    } else {
      this._setButtonActivity(true);
    }
    this._inputFields.forEach((inputElement) =>
      this._validateInput(inputElement),
    );
  }
}
