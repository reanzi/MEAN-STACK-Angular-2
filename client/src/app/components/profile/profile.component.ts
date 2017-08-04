import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = '';
  email = '';

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // Once component loads, get user's data to display on profile
    this.authenticationService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
    });
  }

}
