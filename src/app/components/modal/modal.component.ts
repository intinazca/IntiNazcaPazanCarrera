import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
  @Input() message: string = '';
  @Output() result = new EventEmitter<boolean>();

  onCancel() {
    this.result.emit(false);
  }

  onConfirm() {
    this.result.emit(true);
  }
}
