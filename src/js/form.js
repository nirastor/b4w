export default class Form {
  constructor(elForm) {
    this.elForm = elForm;
    this.elName = elForm.querySelector('.form-input-name');
    this.elType = elForm.querySelector('.form-input-type');
    this.elColor = elForm.querySelector('.form-input-color');
    this.elButton = elForm.querySelector('.form-submit-button');
    this.state = null;
  }

  getValues() {
    return {
      name: this.elName.value,
      type: this.elType.value,
      color: this.elColor.value,
    };
  }

  setButtonText(text) {
    this.elButton.innerText = text;
  }

  setStateToAdd() {
    this.state = 'add';
    this.redrawForm();
  }

  setStateToEdit() {
    this.state = 'edit';
    this.redrawForm();
  }

  redrawForm() {
    if (this.state === 'add') {
      this.elButton.innerText = 'Добавить';
    } else if (this.state === 'edit') {
      this.elButton.innerText = 'Сохранить';
    }
  }

  setDefaultValues(card) {
    this.elName.value = card.name;
    this.elType.value = card.type;
    this.elColor.value = card.color;
  }
}
