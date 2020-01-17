import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

import {tickets} from '../tickets';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    tickets = tickets;
    x=tickets.length;
    public now: Date = new Date();
    public  hour = this.now.getHours();
    public minutes = this.now.getMinutes();
    public seconds = this.now.getSeconds();
    public freezenow: Date = new Date();

    users: User[] = [];



    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
         setInterval(() => {
          this.now = new Date();
        
        }, 1);
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }
}