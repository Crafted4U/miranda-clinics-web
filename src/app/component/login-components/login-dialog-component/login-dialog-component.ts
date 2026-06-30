import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-dialog-component',
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './login-dialog-component.html',
  styleUrl: './login-dialog-component.scss',
})
export class LoginDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<LoginDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  public close(result: boolean) {
    this.dialogRef.close(result);
  }
}
