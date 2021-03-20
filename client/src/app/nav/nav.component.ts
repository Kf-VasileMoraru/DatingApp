import {Component, OnInit} from '@angular/core';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  isLogedIn: boolean;

  constructor(public accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.accountService.login(this.model).subscribe(x => {
        this.isLogedIn = true;
      },
      error => {
        console.log(error);
      });
  }
}
