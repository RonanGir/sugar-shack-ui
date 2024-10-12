import {Pipe, PipeTransform} from '@angular/core';
import {TransactionEnum} from '../models/enums/transaction.enum';

@Pipe({
  name: 'orderStatus',
  standalone: true
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case TransactionEnum.OPENED:
        return 'En préparation';
      case TransactionEnum.CLOSED:
        return 'Livrée';
      case TransactionEnum.PENDING:
        return 'En cours de livraison';

      default:
        return "Demandez nous svp";
    }

  }

}
