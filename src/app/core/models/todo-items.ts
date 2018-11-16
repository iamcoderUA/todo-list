export class TodoItemsModel {
  id: number = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  title = '';
  complete = false;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
