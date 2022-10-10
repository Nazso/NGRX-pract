import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/model/User";
import { errorItem, loadItems, loadSelectedItem, loadUpdatedItem } from './UserActions';

// Az interfész leírja, hogyan néz ki a users objektum,
// ennek User típusként megadom a selected-et (nem lesz kötelező),
// illetve az x string kulcsot is hozzáadom,
// így később bármilyen értéket fel tudok venni a state-be:

export interface State {
    //az x-re azért van itt szükség, hogy string típussal bármilyen
    //értéket fel tudjak venni, ha szükséges
    [x: string]: any;
    users: { items: User[], selected?: any, error: string };
}

export const initialState: State = {
    users: { items: [], selected: null, error: '' }
};

export const UserReducer = createReducer(
    initialState,
    on(loadItems, (state, action) => ({
        ...state,
        items: action.items
    })),
    on(loadSelectedItem, (state, action) => ({
        ...state,
        selected: action.selected
    })),
    on(loadUpdatedItem, (state, action) =>({
        ...state,
        items: ((users): User[] => {
            const i = users["items"].findIndex((item: User) => item.id === action.item.id);  
            const newItems = [...users["items"]];
            newItems[i] = action.item;
            return newItems;
        })(state)
    })),
    on(errorItem, (state, action) => ({
        ...state,
        error: action.message
    })),
);

//selector
export const selectItems = (state: State) => state.users.items;
// az Object.assign-ra azért van szükség, mert a store-ban levő objektumok immutable, azza nem módosíthatóak
//így ha változtatni akarok rajt az űrlapban, akkor hibát kapok.
//így lemásolom az objektumot és azt lehet módosítani az űrlapban.
export const selectOneItem = (state: State) => Object.assign({}, state.users.selected);
export const selectError = (state: State) => state.users.error;

// Ez az egység átalakítja és a store-ban elhelyezi az adatokat,
// illetve a szelektorok által elérhetővé teszi az adatokat a komponensek számára.
// Létrehozzuk a UserReducers.ts fájlt.



// UserReducers.ts

// Készítünk egy interfészt, hogy a state milyen adatokat tároljon:
// az elemek maguk a felhasználók, a hiba egy string.

// export interface State {
//   users: { items: User[], error: string };
// }


// A Usert importáljuk, és az interfész alapján létrehozzuk
// az initialState-et:

// export const initialState: State = {
//   users: { items: [], error: '' }
// };

// Ezután létrehozzuk a reducert: ez megkapja az initialState-et,
// hogy legyen kezdőértéke, majd figyeljük az eseményt,
// hogy mikor történik meg a „load items”,
// hogy az action el tudja tárolni az adatot a state-be.
// A hibát is lekezeljük.

// export const UserReducer = createReducer(
//   initialState,
//   on(loadItems, (state, action) => ({
//     ...state,
//     items: action.items
//   })),
//   on(errorItem, (state, action) => ({
//     ...state,
//     error: action.message
//   })),
// );


// Végül meg kell írni a szelektorokat:

// export const selectItems = (state: State) => state.users.items;
// export const selectError = (state: State) => state.users.error;

// App modul

// Beállítjuk, hogy a store modul a user reducer-től kap users adatot, illetve hogy hol definiáltuk az effekteket:

// StoreModule.forRoot({ users: UserReducer }),
// EffectsModule.forRoot([ UserEffect ]),


// Az importokat a megfelelő helyre húzzuk.

// import { UserReducer } from './store/user/UserReducers';
// import { UserEffect } from './store/user/UserEffects';

// Users komponens

// Mivel nem a szokott módon kérjük le az adatokat,
// a list$ User-t vagy User-ök tömbjét kapja meg.

// list$: Observable<User | User[]>;


// A konstruktorba injektáljuk a Store-t, az ngOnInit-ben indítsuk el az eseményt:
//   constructor(
//     private userService: UserService,
//     private config: ConfigService,
//     private store: Store<any>,
//   ) { }

// ngOnInit(): void {
//     this.store.dispatch(getItems());
//     this.list$ = this.store.pipe( select(selectItems) );
//   }

// Indítsuk újra az alkalmazást.

// ng serve



// Az ok, amiért nem jelennek meg a User-ök, az, hogy az UserEffects.ts-ben a a pipe-olt action-öknek benne kell lenniük egy createEffect függvényben, amelynek egy Action típussal visszatérő observable kell (a createEffect-et és az Action-t importáljuk be, és ne felejtsük el a return-t):

// import { Actions, ofType, createEffect } from '@ngrx/effects';
// import { Action } from '@ngrx/store';


// loadItems$ = createEffect( (): Observable<Action> => {
//     return this.actions$.pipe(
// ofType(getItems),
//       switchMap( () => this.userService.get() ),
//       switchMap( users => of({ type: '[User] load items', items: users })),
//       catchError( error => of({ type: '[User] error item', message: error })),
//     );
//   });

// A loadUpdatedItem kap egy state-et és egy action-t,
// és spreadeli a state-et. Felül kell írnunk az items-et:
// frissíteni a tömböt, amelyben benne vannak a felhasználók.
// Az index alapján megkeressük a frissített elemet,
// másolatot készítünk az immutable store-ról (spread-eljük),
// és lecseréljük a store eredeti items-ét az újra,
// amely tartalmazza az update-elt elemet:

// on(loadUpdatedItem, (state, action) => ({
//     ...state,
//     items: ((users): User[] => {
//       const i = users.items.findIndex( (item: User) => item.id === action.item.id );
//       const newItems = [...users.items];
//       newItems[i] = action.item;
//       return newItems;
//     })(state)
//   })),

// UserEffects.ts

// Figyeljünk arra, hogy az update metódus esetében
// mindenképpen kell küldenünk kérést a szerver felé:

// updateItem$ = createEffect( (): Observable<Action> => {
//     return this.actions$.pipe(
// ofType(updateItem),
//       switchMap( action => this.userService.update(action.item) ),
//       switchMap( user => of({ type: LOAD_UPDATED_ITEM, item: user })),
//       catchError( error => of({ type: ERROR_ITEM, message: error })),
//     );
//   });


// User-edit komponens

// Végül lekezeljük a mentési lépést:

// onSubmit(ngForm: NgForm): void {
// const user: User = ({...ngForm.value, id: this.userID});
// this.store.dispatch( updateItem({item: user}) );
// history.back();
// }