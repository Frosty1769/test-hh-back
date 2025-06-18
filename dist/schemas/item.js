//Базовые "интерфейсы" для запросов
//В идеале интеграция интерфейсов из TypeScript
export class Item {
  constructor(options) {
    this.id = options.id || 0;
    this.text = String(options.text || '0');
    this.isSelected = options.isSelected || false;
  }
}
export class ItemSelect {
  constructor(options) {
    this.id = options.id || undefined;
    this.isSelected = options.isSelected || false;
  }
}
export class ItemMove {
  constructor(options) {
    this.prevInd = options.prevInd || 0;
    this.newInd = options.newInd || 0;
  }
}