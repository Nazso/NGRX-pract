import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from '../../service/user.service';
import { switchMap, take, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getOneItem, updateItem } from '../../store/user/UserActions';
import { selectOneItem } from '../../store/user/UserReducers';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  // user: User = new User;
  user$!: Observable<User>;
  userID!: number;
  serverError = '';

  constructor(
    private userService: UserService,
    private ar: ActivatedRoute,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    // this.ar.params.pipe(
    //   switchMap(params => this.userService.get(params['id']))
    // )
    // .pipe( take(1) )
    // .subscribe(
    //   user => {
    //     this.user = (user as User);
    //     this.user.password = '';
    //   }
    // );

    this.userID = parseInt(this.ar.snapshot.params['id'], 10);
    this.store.dispatch( getOneItem({id: this.userID }) );
    this.user$ = this.store.pipe(
      select(selectOneItem)
    );
  };

  onSubmit(ngForm: NgForm): void {
    // const putObject = Object.assign({id: this.user.id}, ngForm.value);
    // this.userService.update(putObject)
    // .toPromise().then(
    //   user => history.back(),
    //   err => {
    //     this.serverError = err.error;
    //     const to = setTimeout( () => {
    //       clearTimeout(to);
    //       this.serverError = '';
    //     }, 3000 );
    //   }
    // );
    
    //update folyamat
    //ez ugyanazt jelenti, mint az Object.assign, csak újabb írásmóddal:
    const user: User = ({...ngForm.value, id: this.userID});
    this.store.dispatch(updateItem({item: user}));
    history.back();
  }

}
