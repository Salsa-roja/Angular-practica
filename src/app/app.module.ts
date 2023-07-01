import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { Globals } from './globals';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CrudComponent } from './crud/crud.component';
import { AuthComponent } from './auth/auth.component';
import { CrudFormComponent } from './crud-form/crud-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    AuthComponent,
    CrudFormComponent 
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  providers: [    Globals,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
