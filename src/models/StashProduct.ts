export default class StashProduct {
  id: string;
  label: string;
  details: string;
  quantity: number;

  constructor(_label: string, _details: string, _quantity: number) {
    this.label = _label;
    this.details = _details;
    this.quantity = _quantity;
  }
}
