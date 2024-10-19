import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { ProfileSideBarComponent } from '../profile-side-bar/profile-side-bar.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CoTravellersModalComponent } from '../co-travellers-modal/co-travellers-modal.component';
import { CoTravellerService } from '../../../core/services/user/co-traveller.service';
import { CoTravellersCardComponent } from '../co-travellers-card/co-travellers-card.component';
import { CustomPaginatorComponent } from '../../../shared/reusableComponents/custom-paginator/custom-paginator.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-co-travellers',
  standalone: true,
  imports: [UsernavComponent, ProfileSideBarComponent, FooterComponent, CommonModule, MatButtonModule, MatPaginatorModule, MatDialogModule, CoTravellersCardComponent, CustomPaginatorComponent],
  templateUrl: './co-travellers.component.html',
  styleUrl: './co-travellers.component.css'
})
export class CoTravellersComponent implements OnInit {
  private dialog = inject(MatDialog);
  private coTravellerService = inject(CoTravellerService);
  coTravellers: any[] = [];
  pageSize = 5;
  pageIndex = 0;
  totalBookings = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadCoTravellers();
  }

  loadCoTravellers() {
    this.coTravellerService.getAllCoTravellers().subscribe(
      (travellers) => {
        this.coTravellers = travellers;
      },
      (error) => {
        console.error('Error fetching co-travellers:', error);
      }
    );
  }

  openDialog(traveller?: any): void {
    const dialogRef = this.dialog.open(CoTravellersModalComponent, {
      width: '700px',
      data: traveller
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCoTravellers();
      }
    });
  }

  editCoTraveller(traveller: any) {
    this.openDialog(traveller);
  }

  deleteCoTraveller(travellerId: string) {
    this.coTravellerService.deleteCoTraveller(travellerId).subscribe(
      () => {
        this.loadCoTravellers();
      },
      (error) => {
        console.error('Error deleting co-traveller:', error);
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCoTravellers()
  }
}