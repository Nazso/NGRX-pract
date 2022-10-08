import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  navigation = this.config.navigation;
  loginStatus = false;
  userSub?: Subscription;
  user: User | null = null;

  constructor(
    private config: ConfigService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.auth.currentUserSubject.subscribe(
      user => this.user = user
    );
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onLogout() {
    this.auth.logout();
  }

}
