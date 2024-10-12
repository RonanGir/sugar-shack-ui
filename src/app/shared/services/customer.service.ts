import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerSubject$ = new Subject<number>();

  constructor() {
  }

  setConnectedCustomer(): Observable<number> {
    return of(1);
  }

  getCurrentCustomer(): Observable<number> {
    return of(1);
  }

  setCurrentCustomer(id: number): void {
    this.customerSubject$.next(id);
  }

}
