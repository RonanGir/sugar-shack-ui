import {Injectable} from '@angular/core';
import {BackendErrorModel} from '@shared-models/backend-error.model';
import {SnackbarService} from '@shared-services/snackbar.service';

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
