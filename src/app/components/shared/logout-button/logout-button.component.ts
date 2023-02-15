import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  constructor(private localService: LocalService) {}

  ngOnInit(): void { }

  logout() { this.localService.logout(); }

}
