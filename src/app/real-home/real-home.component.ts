import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-real-home',
  templateUrl: './real-home.component.html',
  styleUrls: ['./real-home.component.css']
})
export class RealHomeComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
