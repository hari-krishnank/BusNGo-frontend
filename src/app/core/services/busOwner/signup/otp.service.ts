import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../../../shared/reusableComponents/modal/modal.component';
import { OwnerService } from './owner.service';
import { MessageService } from '../../../../shared/services/message.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormField } from '../../../models/user/form-fields.interface';

@Injectable({
    providedIn: 'root'
})
export class OtpService {
    private otpDialogRef: MatDialogRef<ModalComponent> | null = null;

    constructor(private ownerService: OwnerService, private messageService: MessageService, private dialog: MatDialog, private formBuilder: FormBuilder) { }

    sendOtp(email: string): Observable<string> {
        return new Observable(observer => {
            this.ownerService.sendOtp(email).subscribe({
                next: (successMessage: string) => {
                    this.ownerService.setEmail(email);
                    observer.next(successMessage);
                    observer.complete();
                    this.messageService.showSuccessMessage(successMessage);
                },
                error: (errorMessage: string) => {
                    console.error('Error sending OTP', errorMessage);
                    this.messageService.showErrorMessage(errorMessage);
                    observer.error(errorMessage);
                }
            });
        });
    }

    verifyOtp(email: string, otp: number): Observable<boolean> {
        return new Observable(observer => {
            this.ownerService.verifyOtp(email, otp).subscribe({
                next: (isValid) => {
                    if (isValid) {
                        this.messageService.showSuccessMessage('OTP verified successfully');
                        observer.next(true);
                    } else {
                        this.messageService.showErrorMessage('Invalid OTP');
                        observer.next(false);
                    }
                    observer.complete();
                },
                error: (error) => {
                    console.error(error);
                    this.messageService.showErrorMessage(error);
                    observer.error(error);
                }
            });
        });
    }

    resendOtp(email: string): Observable<void> {
        return new Observable(observer => {
            this.ownerService.resendOtp(email).subscribe({
                next: (response) => {
                    this.messageService.showSuccessMessage('OTP resent successfully');
                    observer.next();
                    observer.complete();
                },
                error: (error) => {
                    this.messageService.showErrorMessage('Failed to resend OTP. Please try again.');
                    observer.error(error);
                }
            });
        });
    }

    openOtpModal(email: string, otpFields: FormField[]): Observable<{ otp: string }> {
        return new Observable(observer => {
            const otpForm = this.formBuilder.group({
                otp: ['', otpFields[0].validators]
            });

            this.otpDialogRef = this.dialog.open(ModalComponent, {
                data: {
                    title: 'Enter OTP',
                    fields: otpFields,
                    submitButtonText: 'Verify OTP',
                    form: otpForm,
                    showResendOtp: true,
                    resendCooldown: 60,
                    preventCloseOnSubmit: true
                },
                width: '400px',
                disableClose: true
            });

            this.otpDialogRef.componentInstance.formSubmitted.subscribe((result: { otp: string }) => {
                if (result) {
                    observer.next(result);
                }
            });

            this.otpDialogRef.componentInstance.resendOtp.subscribe(() => {
                this.resendOtp(email).subscribe();
            });

            this.otpDialogRef.afterClosed().subscribe(() => {
                observer.complete();
            });
        });
    }

    closeOtpModal() {
        if (this.otpDialogRef) {
            this.otpDialogRef.close();
        }
    }
}