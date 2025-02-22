import {Injectable} from '@angular/core';
import {SnackbarService} from './snackbar.service';
import {BackendErrorModel} from '../models/backend-error.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBarService: SnackbarService) { }

  handleError(error: BackendErrorModel) {
    console.error(error.technicalMessage);
    this.snackBarService.showError(error.userMessage);
  }
}
