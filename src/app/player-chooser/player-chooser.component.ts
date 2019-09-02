import { Component, OnInit } from '@angular/core';
import {GameService, NewGameCommand, Player, Session} from "@ycastor/kalah-client";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, SimpleSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-player-chooser',
  templateUrl: './player-chooser.component.html',
  styleUrls: ['./player-chooser.component.scss']
})
export class PlayerChooserComponent {

  playerForm: FormGroup;

  constructor(
    private readonly _gameClient: GameService,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackbar: MatSnackBar,
    private readonly _router: Router,
  ) {
    this.playerForm = _formBuilder.group({
      player1: ['', Validators.required],
      player2: ['', Validators.required],
    });
  }

  async initGame() {
    if(this.playerForm.valid){
      const firstPlayer: Player = { name: this.playerForm.controls['player1'].value };
      const secondPlayer: Player = { name: this.playerForm.controls['player2'].value };
      const command: NewGameCommand = { firstPlayer: firstPlayer, secondPlayer: secondPlayer };
      try {
        const session = await this._gameClient.newGame(command).toPromise();
        sessionStorage.setItem("sessionId", session.sessionId);
        await this._router.navigate(['game']);
      } catch (e) {
        this._snackbar.open(e.error.message, "Ok", {duration: 2000});
      }
    }
  }

}
