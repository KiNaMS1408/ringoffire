import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {
[x: string]: any;
  allProfilePictures = [
    './../../assets/user-circle-svgrepo-com.svg', 
    './../../assets/female-user-circle-svgrepo-com.svg' , 
    './../../assets/user-plus-svgrepo-com.svg',
    './../../assets/raccoon.jpg'
  ]

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}
}
