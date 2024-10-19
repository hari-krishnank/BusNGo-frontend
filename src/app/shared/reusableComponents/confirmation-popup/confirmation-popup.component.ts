import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirmation-popup',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './confirmation-popup.component.html',
  styleUrl: './confirmation-popup.component.css'
})
export class ConfirmationPopupComponent {
  @Input() isOpen: boolean = false;
  @Input() message: string = 'Are you sure you want to cancel this ticket? This action cannot be undone.';
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  @ViewChild('popupElement') popupElement!: ElementRef;

  position = { bottom: 0, left: 0 };

  updatePosition(buttonElement: HTMLElement) {
    const buttonRect = buttonElement.getBoundingClientRect();
    const popupRect = this.popupElement.nativeElement.getBoundingClientRect();

    this.position = {
      bottom: window.innerHeight - buttonRect.top + 10,
      left: buttonRect.left - (popupRect.width / 2) + (buttonRect.width / 2)
    };
  }
}