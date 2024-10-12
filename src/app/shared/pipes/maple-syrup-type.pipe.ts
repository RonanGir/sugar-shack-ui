import {Pipe, PipeTransform} from '@angular/core';
import {TypeEnum} from '../models/enums/type.enum';

@Pipe({
  name: 'mapleSyrupType',
  standalone: true
})
export class MapleSyrupTypePipe implements PipeTransform {

  transform(value?: string): string {
    switch (value) {
      case TypeEnum.DARK:
        return 'Noir';
      case TypeEnum.AMBER:
        return 'Ambré';
      case TypeEnum.CLEAR:
        return 'Clair';

      default:
        return "Non référencé";
    }
  }

}
