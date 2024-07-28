import { Component, Input, OnInit } from '@angular/core';
import { toastInterface } from '../../interface/interface';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})

export class ToastComponent implements OnInit {
  @Input() toastData!: toastInterface;
  visible: boolean = false;

  ngOnInit() {
    this.show();
  }

  show() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, this.toastData.duration);
  }
}
