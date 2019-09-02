import { Component, OnInit } from '@angular/core';
import {Action, Board, GameService, GameState} from "@ycastor/kalah-client";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  state?: GameState;

  constructor(
    private readonly _gameService: GameService,
    private readonly _snackbar: MatSnackBar,
  ) {
    this.loadBoard()
  }

  private async loadBoard() {
    const sessionId = sessionStorage.getItem("sessionId");
    try {
      const foundSession = await this._gameService.findGameBySession(sessionId).toPromise();
      this.state = foundSession.game.state;
    } catch (e) {
      this._snackbar.open(e.error.message, "Ok", {duration: 2000});
    }
  }

  get board(): Board {
    if(this.state) {
      return this.state.board;
    }
    return {};
  }

  async move(index: number) {
    try {
      const action: Action = { player: this.state.currentPlayer, pitIndex: index };
      const currentSession = sessionStorage.getItem("sessionId");
      this.state = await this._gameService.makePlay(currentSession, action).toPromise();
    } catch (e) {
      console.log(e);
      this._snackbar.open(e.error.message, "Ok", {duration: 2000});
    }
  }
}
