import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { amountField } from '../../../shared/configs/user/walletAddMoney.config';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-wallet-add-money-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, FormsModule, MatFormFieldModule, FormComponent],
  templateUrl: './wallet-add-money-modal.component.html',
  styleUrl: './wallet-add-money-modal.component.css'
})
export class WalletAddMoneyModalComponent implements OnInit {
  walletAddMoneyForm!: FormGroup;
  amountField: FormField[] = amountField

  constructor(
    public dialogRef: MatDialogRef<WalletAddMoneyModalComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.walletAddMoneyForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    if (this.walletAddMoneyForm.valid) {
      this.dialogRef.close(this.walletAddMoneyForm.value.amount);
      console.log(this.walletAddMoneyForm.value.amount);
      
    }
  }
}
