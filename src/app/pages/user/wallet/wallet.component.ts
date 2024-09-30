import { Component } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { ProfileSideBarComponent } from '../profile-side-bar/profile-side-bar.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WalletAddMoneyModalComponent } from '../wallet-add-money-modal/wallet-add-money-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../../core/services/user/wallet.service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [UsernavComponent, ProfileSideBarComponent, FooterComponent, MatButtonModule, MatDialogModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  walletBalance: number = 0;
  transactions: any[] = [];

  constructor(private dialog: MatDialog, private walletService: WalletService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   if (params['session_id']) {
    //     this.verifySession(params['session_id']);
    //   }
    // });
    // this.loadWalletData();
    this.route.url.subscribe(segments => {
      if (segments.length > 0 && segments[0].path === 'success') {
        this.handleSuccessRedirect();
      } else {
        this.loadWalletData();
      }
    });
  }

  handleSuccessRedirect() {
    this.route.queryParams.subscribe(params => {
      if (params['session_id']) {
        this.verifySession(params['session_id']);
      } else {
        this.router.navigate(['/wallet']);
      }
    });
  }

  loadWalletData() {
    this.walletService.getWalletBalance().subscribe(
      balance => this.walletBalance = balance
    );
    this.walletService.getTransactions().subscribe(
      transactions => this.transactions = transactions
    );
  }

  openAddMoneyModal(): void {
    const dialogRef = this.dialog.open(WalletAddMoneyModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.walletService.createTopUpSession(result).subscribe(
          sessionId => {
            // Redirect to Stripe Checkout
            window.location.href = sessionId;
          },
          error => console.error('Error creating top-up session:', error)
        );
      }
    });
  }

  verifySession(sessionId: string) {
    this.walletService.verifyTopUpSession(sessionId).subscribe(
      result => {
        if (result.status === 'success') {
          this.loadWalletData();
        }
      },
      error => {
        console.error('Error verifying session:', error);
      }
    );
  }
}