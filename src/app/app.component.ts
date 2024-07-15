import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsernavComponent } from './shared/widgets/usernav/usernav.component';
import { UserhomeComponent } from './pages/user/home/userhome/userhome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsernavComponent, UserhomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
