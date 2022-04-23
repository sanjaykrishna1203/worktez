/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map, Observable } from 'rxjs';
import { Contributors } from 'src/app/Interface/ContributorsInterface';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})
export class ContributorsComponent implements OnInit {
  ComponentName: string = "Contributors"

  contributorsData: Contributors[]

  constructor(private navbarHandler: NavbarHandlerService, private functions: AngularFireFunctions, public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.ComponentName)

    this.getContributors();
  }

  getContributors() {
    const callable = this.functions.httpsCallable("contributors/getContributorsData");
    callable({}).pipe(
      map(actions => {
        return actions as Contributors[];
    })).subscribe({
      next: (data) => {
        this.contributorsData=data;
        console.log("Saved Contributors Data")
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.info('Getting Contributors data successful')
    });
  }

  openAddMember() {
    this.popupHandlerService.addNewContributorEnabled = true;
  }

  addNewContirbutor( completed: boolean ) {
    this.popupHandlerService.addNewContributorEnabled = false;
  }
}
