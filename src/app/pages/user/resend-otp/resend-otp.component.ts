import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-resend-otp',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './resend-otp.component.html',
  styleUrl: './resend-otp.component.css'
})
export class ResendOtpComponent implements OnInit, OnDestroy {
  @Input() cooldownTime: number = 60;
  @Output() resend = new EventEmitter<void>();

  canResend: boolean = true;
  remainingTime: number = 0;
  private timerSubscription?: Subscription;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }

  resendOtp() {
    this.resend.emit();
    this.startTimer();
  }

  private startTimer() {
    this.canResend = false;
    this.remainingTime = this.cooldownTime;

    this.timerSubscription = interval(1000)
      .pipe(take(this.cooldownTime))
      .subscribe(() => {
        this.remainingTime--;
        if (this.remainingTime === 0) {
          this.canResend = true;
        }
      });
  }
}