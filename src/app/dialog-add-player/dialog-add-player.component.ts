import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  name: String = '';

  ngOnInit(): void {
  }
}
