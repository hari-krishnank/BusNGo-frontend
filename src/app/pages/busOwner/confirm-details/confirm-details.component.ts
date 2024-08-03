import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { Router, RouterModule } from '@angular/router';
import { BusOwnerfooterComponent } from '../../../shared/widgets/bus-ownerfooter/bus-ownerfooter.component';
import { signupService } from '../../../core/services/busOwner/signup/signup.service';

@Component({
  selector: 'app-confirm-details',
  standalone: true,
  imports: [OwnernavComponent, RouterModule, BusOwnerfooterComponent],
  templateUrl: './confirm-details.component.html',
  styleUrl: './confirm-details.component.css'
})
export class ConfirmDetailsComponent {
  ownerDetails: any;

  constructor(private signupService: signupService, private router: Router) {}

  ngOnInit() {
    this.fetchOwnerDetails();
  }

  fetchOwnerDetails() {
    this.signupService.getOwnerDetails().subscribe(
      (data) => {
        this.ownerDetails = data;
      },
      (error) => {
        console.error('Error fetching owner details:', error);
      }
    );
  }

  confirmAndSubmit() {
    this.signupService.confirmOwnerDetails(this.ownerDetails.email).subscribe(
      (response) => {
        console.log('Owner confirmed and saved to verified collection successfully:', response);
        this.signupService.removeEmail()
        this.router.navigate(['/ownerLogin']); 
      },
      (error) => {
        console.error('Error confirming owner details:', error);
      }
    );
  }
  
}
