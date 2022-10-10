import { getItems, getOneItem, loadItems, LOAD_ITEMS, ERROR_ITEM, LOAD_SELECTED_ITEM, updateItem, LOAD_UPDATED_ITEM } from './UserActions';
import{ Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/User';
import { Action, Store } from '@ngrx/store';


//Elkészítjük az effect-eket, ezek tartják a kapcsolatot a service-szel;
//az action és a service között helyezkednek el,
//és a megfelelő esemény hatására váltódnak ki.

// A UserActions mellett létrehozok egy UserEffects.ts-fájlt is.
// Szükségünk lesz az Injectable dekorátorra,
// és olyan változókra, amelyek figyelik az eseményeket.
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
    loadItems$ = createEffect( (): Observable<Action> => {
        return this.actions$.pipe(
        //meg tudom adni, hogy az action-ok közül mely típusnál fusson le az effect.
        //ha nem jó a típus, akkor nem történik semmi
        ofType(getItems),
        //csak lekéri az összes user-t a server-ről
        switchMap( () => this.userService.get()),
        //a következő sor a kívánt formára alakítja az adatot
        switchMap( users => of({ type: '[User] load items', items: users })),
        //hibakezelés.
        catchError( error => of({ type: '[User] error item', message: error }))
    );
    } );

    getOneItem$ = createEffect( (): Observable<Action> => {
        return this.actions$.pipe(
            ofType(getOneItem),
            withLatestFrom(this.store$),
            //it ki kell egészíteni a stroe-al(tömb 2. eleme)
            switchMap( ([action, store]) => {
                //itt vizsgálom, hogy az adat benne van-e a cache-ben
                const cache = store.users?.items?.find((item: { id: string | number; }) => item.id === action.id)
                //ha van cache, akkor elküldöm a cache-t observable-é alakítva(of() metódussal!!)
                //ha nincs, akkor a get kérés megy el a szerver felé
                return cache ? of(cache) : this.userService.get(action.id)}),
            switchMap( user => of({ type: LOAD_SELECTED_ITEM, selected: user })),
            catchError( error => of({ type: ERROR_ITEM, message: error }))
        )
    });

    updateItem$ = createEffect ((): Observable<Action> => {
        return this.actions$.pipe(
            ofType(updateItem),
            switchMap(action => this.userService.update(action.item)),
            switchMap(user => of({type: LOAD_UPDATED_ITEM, item: user})),
            catchError(error => of({type: ERROR_ITEM, message: error})),
        )
    })

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private store$: Store<any>,
    ) { }
}

// Ha lista felől érkezem egy felhasználóhoz, akkor az már benne lesz a store-ban,
// így nem muszáj újabb kérést indítanunk a szerver felé,
// betölthetjük a cache-ből. Természetesen,
// ha egy felhasználóhoz konkrét URL-re érkezünk,
// és nem a lista irányából, elképzelhető, hogy nincs benne a cache-ben,
// ezért szükség van a kérésre.

// Az alábbiakban ezt a működést valósítjuk meg.



// UserEffects.ts

// Injektáljuk a store-t.

// Ezután a getOneItem-ben a withLatestFrom segítségével (46. sor)
// kiegészítjük az adatot egy újabb objektummal,
// hozzáfűzzük az action-höz a store-t, így vizsgálhatjuk,
// hogy a store-ban megvan-e az adott felhasználó (find-dal kikeressük).
// Ha benne van a cache-ben, akkor onnan megkapom az adatot, ha nincs,
// elindítom a HTTP-kérést.

