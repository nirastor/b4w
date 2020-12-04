import colorjoe from 'colorjoe';
import Form from './form';
import Ui from './ui';
import Card from './card';

class App {
  constructor() {
    this.appData = [];
    this.nextId = 1;
    this.STORAGE_NAME = 'coloreditordata';
    this.editIndex = null;
    this.formOpen = false;

    this.elFormContainer = document.querySelector('.app-form-container');
    this.elForm = this.elFormContainer.querySelector('.form');
    this.elColorPickerContainer = this.elForm.querySelector('.form-color-picker');
    this.formCancelButton = this.elForm.querySelector('.form-cancel-button');

    this.joe = colorjoe.rgb(this.elColorPickerContainer, '#4350a8', [
      'currentColor',
      ['fields', {
        space: 'RGB', limit: 255, fix: 0,
      }],
      'hex',
    ]);
    this.form = new Form(this.elForm, this.joe);

    this.elCardList = document.querySelector('.app-cards-list');
    this.addButton = document.querySelector('.header-add-button');

    this.welcomeMessage = document.querySelector('.welcome-message');

    this.ui = new Ui(
      this.elFormContainer,
      this.elCardList,
      this.addButton,
      this.form,
      this.joe,
      this.welcomeMessage,
    );
  }

  init() {
    this.initListeners();
    this.load();
  }

  initListeners() {
    this.addButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.openFormForAdd();
    });

    this.formCancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.openFormForAdd();
    });

    this.elCardList.addEventListener('click', (e) => {
      e.preventDefault();
      const classList = Array.from(e.target.classList);
      if (classList.includes('card-control--edit')) {
        this.openFormForEdit(e.target);
      } else if (classList.includes('card-control--delete')) {
        this.deleteCard(e.target);
      } else if (classList.includes('card-control--up')) {
        this.moveUp(e.target);
      } else if (classList.includes('card-control--down')) {
        this.moveDown(e.target);
      }
    });

    this.elForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitForm();
    });
  }

  returnIndexByChildElem(elem) {
    const id = Number(elem.closest('.card').id);
    const index = this.appData.findIndex((c) => c.id === id);
    return index;
  }

  moveUp(card) {
    const i = this.returnIndexByChildElem(card);
    if (i) {
      [this.appData[i - 1], this.appData[i]] = [this.appData[i], this.appData[i - 1]];
      this.ui.redraw(this.appData);
    }
    this.save();
  }

  moveDown(card) {
    const i = this.returnIndexByChildElem(card);
    if (i !== this.appData.length - 1) {
      [this.appData[i + 1], this.appData[i]] = [this.appData[i], this.appData[i + 1]];
      this.ui.redraw(this.appData);
    }
    this.save();
  }

  deleteCard(card) {
    this.appData.splice(
      this.returnIndexByChildElem(card),
      1,
    );
    this.ui.redraw(this.appData);
    this.save();
  }

  openFormForAdd() {
    this.form.myReset();
    this.ui.toggleForm('add');

    if (this.formOpen === false) {
      this.ui.hideWeclomeMessage();
    } else if (this.appData.length === 0) {
      this.ui.showWelcomeMessage();
    }
    this.formOpen = !this.formOpen;
  }

  openFormForEdit(elem) {
    this.ui.toggleForm('edit');
    this.editIndex = this.returnIndexByChildElem(elem);
    this.form.setDefaultValues(this.appData[this.editIndex]);
  }

  submitForm() {
    if (this.form.state === 'add') {
      this.addCard();
    } else if (this.form.state === 'edit') {
      this.editCard();
    }
    this.form.myReset();
    this.ui.toggleForm();
  }

  editCard() {
    const formData = this.form.getValues();
    this.appData[this.editIndex].name = formData.name;
    this.appData[this.editIndex].type = formData.type;
    this.appData[this.editIndex].color = formData.color;
    // future optimization: redraw only one card here
    this.ui.redraw(this.appData);
    this.save();
  }

  addCard() {
    const formData = this.form.getValues();
    formData.id = this.nextId;
    this.nextId += 1;
    this.ui.drawCard(formData);
    this.appData.push(new Card(formData));
    this.save();
  }

  save() {
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify({
      nextid: this.nextId,
      appData: this.appData,
    }));
  }

  load() {
    const loadedString = localStorage.getItem(this.STORAGE_NAME);

    if (!loadedString) {
      return;
    }

    try {
      const loaded = JSON.parse(loadedString);
      this.nextId = loaded.nextid;
      loaded.appData.forEach((card) => {
        this.appData.push(new Card(card));
      });
      this.ui.redraw(this.appData);
    } catch (e) {
      // future: some error handler here
    }
  }
}

const app = new App();
app.init();
