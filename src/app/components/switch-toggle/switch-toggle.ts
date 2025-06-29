import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch-toggle',
  imports: [
    CommonModule,
  ],
  templateUrl: './switch-toggle.html',
  styleUrl: './switch-toggle.scss'
})
export class SwitchToggle {
  @Input() checked: boolean = false;
  @Input() labelOn: string = 'On';
  @Input() labelOff: string = 'Off';


  @Output() toggled = new EventEmitter<boolean>();

  toggle() {
    this.checked = !this.checked;
    this.toggled.emit(this.checked);
  }
}
