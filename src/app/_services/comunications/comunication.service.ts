import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  private closeDialogSubject = new Subject<void>(); // instancia de la clase Subject

  public closeDialog = this.closeDialogSubject.asObservable(); // se convierte en un observable


  closeDialogFunction() {
    this.closeDialogSubject.next();
  }
}
