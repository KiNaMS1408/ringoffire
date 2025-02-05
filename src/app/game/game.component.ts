import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  picCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  constructor() { }

  ngOnInit(): void {
    this.newGame();

  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.picCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.picCardAnimation = true;
      console.log('Game is ' + this.game.playedCards);
      
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.picCardAnimation = false;
      }, 1000);
    }
  }


}
