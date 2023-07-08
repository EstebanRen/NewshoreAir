import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-message',
  templateUrl: './pop-up-message.component.html',
  styleUrls: ['./pop-up-message.component.css']
})
export class PopUpMessageComponent {
  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  protected dialogRef: MatDialogRef<PopUpMessageComponent>,) { }
  
  close(){
    this.dialogRef.close(true);
  }
}
