import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { ILoginOption } from '../../../core/models/user/login';
import { MainnavComponent } from '../mainnav/mainnav.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent,
    RouterModule,
    MainnavComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor() { }

  loginOptions: ILoginOption[] = [
    {
      title: 'For Bus Owners',
      subtitle: 'Streamline Fleet Management with Our Advanced Tools',
      description: 'As a bus owner, you can easily manage your fleet, track routes, and ensure that your buses are always in top condition. Our platform provides all the tools you need to streamline operations and keep your business running smoothly.',
    },
    {
      title: 'For Users',
      subtitle: 'Discover and Book Top Bus Services for Your Travels',
      description: 'Looking for reliable bus services? Our platform helps you find the best options for your travel needs. Search for routes, compare prices, and book your tickets with ease. Travel smarter and more conveniently with our user-friendly service.',
    }
  ];
}