export default class ui {
  constructor(elFormContainer, elCardList, addButton, form) {
    this.elFormContainer = elFormContainer;
    this.elCardList = elCardList;
    this.addButton = addButton;
    this.form = form;
  }

  toggleForm(formState) {
    this.elFormContainer.classList.toggle('display-none');
    this.elCardList.classList.toggle('display-none');
    this.addButton.classList.toggle('header-add-button--delete');
    this.addButton.innerText = this.addButton.innerText === 'Добавить' ? 'Отменить' : 'Добавить';

    if (formState === 'add') {
      this.form.setStateToAdd();
    } else if (formState === 'edit') {
      this.form.setStateToEdit();
    }
  }

  drawCard(card) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.id = card.id;
    newCard.innerHTML = `
      <div class="card-content">
          <div class="card-name">${card.name}</div>
          <div class="card-type">${card.type}</div>
          <div class="card-color">${card.color}</div>
      </div>
      <div class="card-controls">
          <div class="card-control card-control--delete">&times;</div>
          <div class="card-control card-control--edit">&#128393;</div>
          <div class="card-control card-control--up">▲</div>
          <div class="card-control card-control--down">▼</div>
      </div>
    `;
    this.elCardList.appendChild(newCard);
  }

  redraw(cards) {
    this.elCardList.innerHTML = '';
    cards.forEach((card) => {
      this.drawCard(card);
    });
  }
}
