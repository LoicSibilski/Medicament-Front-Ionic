import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssistantOuAssiste } from '../../models/assistant-ou-assiste';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  compteId : string = "60bf6cc671add870faebfc22";

  users : User[];
  assistants : AssistantOuAssiste[];
  assistes : AssistantOuAssiste[];

  constructor(
    private service : UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.findAllByCompteId(this.compteId).subscribe(
      (data:User[])=>this.users = data,
      console.error)
  }

}
