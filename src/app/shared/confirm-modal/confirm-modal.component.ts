import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass']
})
export class ConfirmModalComponent implements OnInit {
  @Input() title = 'Επιβεβαίωση διαγραφής';
  @Input() message = ' Είστε σίγουρος για την διαγραφή?';
  @Input() cancelButton = 'Άκυρο';
  @Input() deleteButton = 'Διαγραφή';

  @Output() modalAction: EventEmitter<any> = new EventEmitter<any>();
  result: { data: any, f: Function };
  isOpen = false;
  constructor() {
    this.result = {
      data: '',
      f: null
    };
  }

  ngOnInit() {
  }

  open(d: any, fuc?: Function) {
    this.result.data = d;
    this.result.f = fuc;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  confirm() {
    this.modalAction.emit(this.result);
    this.isOpen = false;
  }

}
