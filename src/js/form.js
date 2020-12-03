export default class Form {
  constructor(elForm, joe) {
    this.elForm = elForm;
    this.elName = elForm.querySelector('.form-input-name');
    this.elType = elForm.querySelector('.form-input-type');
    this.elColor = elForm.querySelector('.form-input-color');
    this.elButton = elForm.querySelector('.form-submit-button');
    this.state = null;
    this.joe = joe;
  }

  getValues() {
    return {
      name: this.elName.value,
      type: this.elType.value,
      // color: this.elColor.value,
      color: this.joe.get().hex(),
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

  setJoeColor(color) {
    this.joe.set(color);
  }

  setDefaultValues(card) {
    this.elName.value = card.name;
    this.elType.value = card.type;
    this.setJoeColor(card.color);
  }

  myReset() {
    this.elName.value = '';
    this.elType.value = '';
    this.setJoeColor('#4350a8');
  }
}
