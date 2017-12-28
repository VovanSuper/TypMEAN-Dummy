import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  MatChipsModule,
  MatRadioModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MomentModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatChipsModule,
    MatRadioModule,
    FlexLayoutModule,
    MatSnackBarModule,
    NoopAnimationsModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MomentModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatChipsModule,
    MatRadioModule,
    MatSnackBarModule,
    NoopAnimationsModule,
    FlexLayoutModule
  ]
})
export class CommonDeptsModule { }
