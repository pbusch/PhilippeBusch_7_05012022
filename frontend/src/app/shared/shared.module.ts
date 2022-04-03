import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitPipe } from '../components/posts/comments/firstChar.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [SplitPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    MatTooltipModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
  ],
  exports: [
    CommonModule,
    SplitPipe,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    MatTooltipModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
  ],
})
export class SharedModule {}
