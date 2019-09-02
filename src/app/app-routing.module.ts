import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayerChooserComponent} from "./player-chooser/player-chooser.component";
import {BoardComponent} from "./board/board.component";

const routes: Routes = [
  {path : '', component: PlayerChooserComponent,  pathMatch: 'full'},
  {path : 'game', component: BoardComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
