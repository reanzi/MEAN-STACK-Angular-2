import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  onLogoutClick() {
    this.authenticationService.logout();
    this.flashMessagesService.show('You are logged out', { cssClass: 'alert alert-info'});
    this.router.navigate(['/']);
  }
  ngOnInit() {
  }

}
