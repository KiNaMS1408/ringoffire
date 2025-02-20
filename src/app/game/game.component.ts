import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;
  gameOver = false;

  constructor(private route: ActivatedRoute ,private firestore: AngularFirestore , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params);
      
    })
    this
      .firestore
      .collection('games')
      .valueChanges()
      .subscribe((game) => {
        console.log('game update', game);
        
      })
  }

  newGame() {
    this.game = new Game();
    // this.firestore
    //   .collection('games')
    //   .add(this.game.toJson())
  }


  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else 
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;
      console.log('Curret Game Card is 34 ', this.currentCard);
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
  
        this.pickCardAnimation = false;
      }, 1000);
    }
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name:string) => {
      if (name && name.length > 0) {
      this.game.players.push(name)
      console.log('Game is 50 ', name  );
      }
    });
  }

}


