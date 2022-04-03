import { Component, ViewChild, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/userService';
import { User, UserSchema } from 'src/app/shared/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { MatTable, MatTableDataSource } from '@angular/material/table';

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
  // displayedColumns: string[] = [
  //   'id',
  //   'name',
  //   'email',
  //   'level',
  //   'Delete',
  //   'change PWD',
  // ];

  constructor(
    private userService: UserService,
    private httpClient: HttpClient
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
      .subscribe(() => (row.isEdit = false));
  }
  public removeRow(id: any) {
    console.log(id);
    if (
      confirm(
        'Etes-vous certain(e) de vouloir supprimer cet utilisateur(trice) ?'
      )
    ) {
      this.userService.delUser(id).subscribe({
        next: (res) => {},
        error: (error) => {
          console.log(error.error);
        },
        complete: () => {
          this.ngOnInit();
        },
      });
    } else {
      return;
    }
  }
}
