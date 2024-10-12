import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-change-quantity',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButton,
    MatIcon,
    MatInput
  ],
  templateUrl: './change-quantity.component.html',
  styleUrl: './change-quantity.component.scss'
})
export class ChangeQuantityComponent {

  @Input() icon = 'update'

  @Input({required: true})
  set productId(id: number) {
    this._productId = id;
  }

  @Input({required: true})
  set quantity(actualQty: number) {
    this._quantity = actualQty ? actualQty : 0;
    this.quantityForm.controls.quantity.setValue(actualQty);
  }

  @Output()
  quantityEmitter = new EventEmitter<{ newQty: number, productId: number }>();

  _quantity: number = 0;
  quantityForm = new FormBuilder().nonNullable.group({quantity: this._quantity});
  _productId: number | undefined;

  constructor() {
  }

  onSubmit(): void {
    const newQty = this.quantityForm.controls.quantity.value;
    if (this._productId) {
      this.quantityForm.controls.quantity.setValue(newQty + this._quantity);
      this.quantityEmitter.next({newQty, productId: this._productId});
    }
  }

  protected readonly String = String;
}
