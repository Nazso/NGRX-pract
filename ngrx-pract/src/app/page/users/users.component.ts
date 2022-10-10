import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';
import { getItems } from '../../store/user/UserActions';
import { selectItems } from '../../store/user/UserReducers';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // list$: Observable<any | any[]> = this.userService.get();
  list$!: Observable<any | any[]>;
  cols: any[] = this.config.userColumns;

  constructor(
    private userService: UserService,
    private config: ConfigService,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    //innét indul a folyamat, lekéri az adatokat(dispatch),
    //pipe-al feliratkozik az adatokra
    this.store.dispatch(getItems());
    this.list$ = this.store.pipe( select(selectItems) );
  }

  update(user: User): void {
    this.userService.update(user).toPromise().then(
      userResponse => console.log(userResponse),
      err => console.error(err)
    );
  }

}
