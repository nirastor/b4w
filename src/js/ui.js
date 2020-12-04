export default class ui {
  constructor(elFormContainer, elCardList, addButton, form, joe, welcomeMessage) {
    this.elFormContainer = elFormContainer;
    this.elCardList = elCardList;
    this.addButton = addButton;
    this.form = form;
    this.joe = joe;
    this.welcomeMessage = welcomeMessage;
  }

  toggleForm(formState) {
    this.elFormContainer.classList.toggle('display-none');
    this.elCardList.classList.toggle('display-none');
    this.addButton.classList.toggle('button-cancel');
    this.addButton.innerText = this.addButton.innerText === 'Добавить' ? 'Отменить' : 'Добавить';

    if (formState === 'add') {
      this.form.setStateToAdd();
    } else if (formState === 'edit') {
      this.form.setStateToEdit();
    }
  }

  showWelcomeMessage() {
    this.welcomeMessage.classList.remove('display-none');
  }

  hideWeclomeMessage() {
    this.welcomeMessage.classList.add('display-none');
  }

  drawCard(card) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.id = card.id;
    newCard.innerHTML = `
      <div class="card-content">
          <div class="card-name">${card.name}</div>
          <div class="card-type">${card.type}</div>
          <div class="color-wrapper">
            <div class="card-color-prewiev">&nbsp;</div>
            <div class="card-color">${card.color}</div>
          </div>
      </div>
      <div class="card-controls">
          <div class="card-control card-control--delete">&times;</div>
          <div class="card-control card-control--edit">&#128393;</div>
          <div class="card-control card-control--up">▲</div>
          <div class="card-control card-control--down">▼</div>
      </div>
    `;
    this.elCardList.appendChild(newCard);
    const colorPreview = newCard.querySelector('.card-color-prewiev');
    colorPreview.style.backgroundColor = card.color;
  }

  redraw(cards) {
    this.elCardList.innerHTML = '';

    if (!cards.length) {
      this.showWelcomeMessage();
      return;
    }

    cards.forEach((card) => {
      this.drawCard(card);
    });
  }
}
