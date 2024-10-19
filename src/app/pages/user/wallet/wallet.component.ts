import { Component, ViewChild } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { ProfileSideBarComponent } from '../profile-side-bar/profile-side-bar.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WalletAddMoneyModalComponent } from '../wallet-add-money-modal/wallet-add-money-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../../core/services/user/wallet.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, UsernavComponent, ProfileSideBarComponent, FooterComponent, MatButtonModule, MatDialogModule, MatPaginatorModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  walletBalance: number = 0;
  transactions: any[] = [];
  pagedTransactions: any[] = [];
  pageSize: number = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private walletService: WalletService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
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
      transactions => {
        this.transactions = transactions;
        this.updatePagedTransactions();
      }
    );
  }

  updatePagedTransactions() {
    const startIndex = this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0;
    this.pagedTransactions = this.transactions.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.updatePagedTransactions();
  }

  openAddMoneyModal(): void {
    const dialogRef = this.dialog.open(WalletAddMoneyModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.walletService.createTopUpSession(result).subscribe(
          sessionId => {
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