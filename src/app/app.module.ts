import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextFieldModule } from '@angular/cdk/text-field';

import { AppComponent } from './app.component';
import { TextInput } from './text-input/text-input.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule, 
    TextFieldModule
  ],
  declarations: [ AppComponent, TextInput ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
