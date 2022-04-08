import { Component, ViewChild, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/userService';
import { User, UserSchema } from 'src/app/shared/interfaces/user';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public usersData?: User[];
  public dataSource? = new MatTableDataSource();
  public dataSchema?: any = UserSchema;
  displayedColumns: string[] = Object.keys(UserSchema);

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService
      .getAllUsers()
      .subscribe((data) => (this.dataSource = data));
  }

  public removeSelectedRows() {}
  public addRow() {}

  public editRow(row: any, id: any, name: any, level: any, email: any) {
    console.log(name, level, email);
    this.userService
      .updateUser(id, 'null', 'no!', name, level, email)
      .subscribe({
        next: (res) => {},
        error: (error) => {
          alert('Modification(s) impossible(s) pour le moment');
        },
        complete: () => {
          this.openSnack('Utilisateur modifié');
        },
      });
  }
  public removeRow(id: any) {
    console.log(id);
    if (
      confirm(
        'Etes-vous certain(e) de vouloir supprimer cet utilisateur(trice) ?'
      )
    ) {
      this.userService.delUser(id).subscribe({
        next: () => {},
        error: () => {
          alert('Suppression impossible pour le moment');
        },
        complete: () => {
          this.openSnack('Utilisateur supprimé');
          this.ngOnInit();
        },
      });
    } else {
      return;
    }
  }

  public resetPassword(id: any, name: any, level: any, email: any) {
    let newPassword = prompt('Nouveau mot de passe');
    if (newPassword != null) {
      this.userService
        .updateUser(id, 'null', newPassword, name, level, email)
        .subscribe({
          next: (res) => {},
          error: (error) => {
            console.log(error.error);
          },
          complete: () => {
            this.openSnack('Mot de passe modifié');
          },
        });
    } else {
      return;
    }
  }

  openSnack(message: any) {
    const ref = this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
