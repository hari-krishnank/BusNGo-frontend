import { Component, OnInit } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { Router, RouterModule } from '@angular/router';
import { BusOwnerfooterComponent } from '../../../shared/widgets/bus-ownerfooter/bus-ownerfooter.component';
import { signupService } from '../../../core/services/busOwner/signup.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agency-details',
  standalone: true,
  imports: [OwnernavComponent, RouterModule, BusOwnerfooterComponent, FormsModule],
  templateUrl: './agency-details.component.html',
  styleUrl: './agency-details.component.css'
})
export class AgencyDetailsComponent implements OnInit {
  email: string = '';
  agencyName: string = '';
  designation: string = ''
  country: string = ''
  state: string = ''
  city: string = ''
  postalCode: string = ''
  address: string = ''


  constructor(private signUpService: signupService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.email = this.signUpService.getEmail();
    console.log(this.email);
  }


  onSubmit() {
    // if (this.password !== this.rePassword) {
    //   alert('Passwords do not match');
    //   return;
    // }

    const ownerDetails = {
      email: this.email,
      agencyName: this.agencyName,
      designation: this.designation,
      country: this.country,
      state: this.state,
      city: this.city,
      postalCode: this.postalCode,
      registeredAddress: this.address
    };

    this.http.put('http://localhost:3000/owner/update-details', ownerDetails).subscribe(
      (response) => {
        console.log('Owner details updated successfully', response);
        this.router.navigate(['/confirmation'])
      },
      (error) => {
        console.error('Error updating owner details', error);
        // Handle error (show message to user)
      }
    );
  }
}
