import {Component, OnInit} from '@angular/core';
import {MembersService} from '../../services/members.service';
import {Member} from '../../_models/member';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  members$: Observable<Member[]>;

  constructor(public memberService: MembersService) {
  }

  ngOnInit(): void {
    this.loadMembers();
    this.members$ = this.memberService.getMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    });
  }

}
