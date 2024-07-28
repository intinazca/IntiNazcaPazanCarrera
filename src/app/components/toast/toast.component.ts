import { Component, Input, OnInit } from '@angular/core';
import { toastInterface } from '../../interface/interface';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})

export class ToastComponent implements OnInit {
  @Input() toastData: toastInterface = { message: '', duration: 3000, type: 'success' };
  visible: boolean = false;

  ngOnInit() {
    this.show();
  }

  show() {
    const duration = this.toastData.duration ?? 3000; // Valor predeterminado
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, duration);
  }
}

