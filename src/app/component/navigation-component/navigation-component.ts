import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-components/login-dialog-component/login-dialog-component';

@Component({
  selector: 'app-navigation-component',
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './navigation-component.html',
  styleUrl: './navigation-component.scss',
})
export class NavigationComponent {
  private readonly dialog = inject(MatDialog);

  constructor() {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Ricco result", result)
    });
  }
}
