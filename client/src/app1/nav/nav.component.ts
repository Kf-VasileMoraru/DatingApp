import {Component, OnInit} from '@angular/core';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLogedIn: boolean;

  private model: any = {};
  constructor(public accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.accountService.login(this.model);
  }

  logout(): void {
    this.isLogedIn = false;
    this.model = null;
  }
}
