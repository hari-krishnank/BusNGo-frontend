import { Component, OnInit } from '@angular/core';
import { AdminSideNavComponent } from '../admin-side-nav/admin-side-nav.component';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bus-owners-list',
  standalone: true,
  imports: [AdminSideNavComponent, CommonModule],
  templateUrl: './bus-owners-list.component.html',
  styleUrl: './bus-owners-list.component.css'
})
export class BusOwnersListComponent implements OnInit {

  verifiedOwners: any[] = [];

  constructor(private adminService: AdminLoginService) { }

  ngOnInit() {
    this.loadVerifiedOwners();
  }

  loadVerifiedOwners() {
    this.adminService.getVerifiedOwners().subscribe(
      (owners) => {
        console.log('Received owners:', owners);
        this.verifiedOwners = owners;
      },
      (error) => {
        console.error('Error fetching verified owners:', error);
      }
    );
  }


  toggleBlockStatus(owner: any) {
    const newStatus = !owner.is_blocked;
    this.adminService.updateOwnerBlockStatus(owner._id, newStatus).subscribe(
      () => {
        owner.is_blocked = newStatus;
      },
      (error) => {
        console.error('Error updating block status:', error);
      }
    );
  }

}
