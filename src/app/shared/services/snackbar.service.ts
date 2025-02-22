import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, action: string = 'Fermer', config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, {...config});
  }

  showError(message: string, config?: MatSnackBarConfig) {
    this.snackBar.open(message, 'Fermer', {...config});
  }
}
