import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
// import { EditPlayerComponent } from "../player/player.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  gameOver = false;
  paramsId: any;
  gameData: any = null;
  gameId: string | null = null;


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    // ID from URL
    this.gameId = this.route.snapshot.paramMap.get('id');

    if (this.gameId) {
      this.loadGame(this.gameId);
    }

    this.newGame();
    this.route.params.subscribe((params) => {
      this.paramsId = params['id'];

      this
        .firestore
        .collection('games')
        .doc(this.paramsId)
        .valueChanges()
        .subscribe((game: any) => {
          // console.log('game update', game); // to keep track in console
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
    });
  }

  loadGame(id: string) {
    this.firestore.collection('games').doc(id).valueChanges().subscribe(game => {
      this.gameData = game;
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
      if (this.game.stack.length == 0) {
        this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
        this.game.currentCard = this.game.stack.pop() || '';
        this.game.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();
        
        setTimeout(() => {
          this.game.playedCards.push(this.game.currentCard);
          this.game.pickCardAnimation = false;
          this.saveGame();
        }, 1000);
    }
  }


  editPlayer(playerID: number) {
    console.log('edit player', playerID);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE'){
          this.game.players.splice(playerID, 1)
          this.game.player_images.splice(playerID, 1)
        } else {
          console.log('Received change', change);
          this.game.player_images[playerID] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name)
        this.game.player_images.push('./../../assets/user-circle-svgrepo-com.svg')
        this.saveGame();
      }
    });
  }

  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.paramsId)
      .update(this.game.toJson());
  }
}


