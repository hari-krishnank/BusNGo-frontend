import { Component, OnInit } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { Router, RouterModule } from '@angular/router';
import { BusOwnerfooterComponent } from '../../../shared/widgets/bus-ownerfooter/bus-ownerfooter.component';
import { signupService } from '../../../core/services/busOwner/signup/signup.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-owner-details',
  standalone: true,
  imports: [OwnernavComponent, RouterModule, BusOwnerfooterComponent, FormsModule],
  templateUrl: './owner-details.component.html',
  styleUrl: './owner-details.component.css'
})
export class OwnerDetailsComponent implements OnInit {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  mobile: string = '';
  password: string = '';
  rePassword: string = '';

  constructor(private signUpService: signupService, private http: HttpClient, private router:Router) { }

  ngOnInit() {
    this.email = this.signUpService.getEmail();
    console.log(this.email);
  }

  onSubmit() {
    if (this.password !== this.rePassword) {
      alert('Passwords do not match');
      return;
    }

    const ownerDetails = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      mobile: this.mobile,
      password: this.password
    };

    this.http.put('http://localhost:3000/owner/update-details', ownerDetails).subscribe(
      (response) => {
        console.log('Owner details updated successfully', response);
        this.router.navigate(['/agencyDetails'])
      },
      (error) => {
        console.error('Error updating owner details', error);
        // Handle error (show message to user)
      }
    );
  }

}
