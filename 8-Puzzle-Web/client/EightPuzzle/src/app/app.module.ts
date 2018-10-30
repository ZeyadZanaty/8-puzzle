import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PuzzleComponent } from './puzzle/puzzle.component';

import {InputMaskModule} from 'primeng/inputmask';
import {SliderModule} from 'primeng/slider';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import { TileComponent } from './tile/tile.component';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent,
    PuzzleComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    InputMaskModule,
    SliderModule,
    SelectButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    TabViewModule,
    BlockUIModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
