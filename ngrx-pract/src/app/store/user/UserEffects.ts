import { getItems, loadItems } from './UserActions';
import{ Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

//Elkészítjük az effect-eket, ezek tartják a kapcsolatot a service-szel;
//az action és a service között helyezkednek el,
//és a megfelelő esemény hatására váltódnak ki.

@Injectable()
export class UserEffect {
    //A loadItems$ (this.actions$) egy Observable-t ad vissza, amelyet továbbpipe-olok.
    //Az ofType-pal meg tudom adni, hogy melyik típusúnál fusson le:
    //ha nem jó a típus, nem fut le. Esetünkben a getItems a típus,
    //ezért importáljuk is. A switchMap segítségével meghívjuk a get-et,
    //lekérjük a felhasználókat, és a load items items néven megkapja a felhasználók tömbjét.
    //Ha hiba történt, azt lekezeljük.

    //ez a UserAction-hoz kapcsolódik, akkor fut le az effect,
    //ha az a loadItems lefut
    loadItems$ = this.actions$.pipe(
        //meg tudom adni, hogy az action-ok közül mely típusnál fusson le az effect.
        //ha nem jó a típus, akkor nem történik semmi
        ofType(getItems),
        //csak lekéri az összes user-t a server-ről
        switchMap( () => this.userService.get()),
        switchMap( users => of({ type: '[user] load items', items: users }),
        //hibakezelés.
        catchError( error => of({ type: '[User] error item', message: error }))
    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) {}
}

