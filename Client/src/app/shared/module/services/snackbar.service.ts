import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material";

@Injectable()
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  show(title: string, msg?: string) {
    this.snackBar.open(msg, title, { duration: 2000 });
  }
}