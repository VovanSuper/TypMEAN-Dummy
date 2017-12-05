import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCommonModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatMenuModule,
  MatListModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule
} from '@angular/material';

import { ApiService } from './services/';



@NgModule({
  imports: [
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule
  ],
  exports: [
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService
      ]
    }
  }
 }
