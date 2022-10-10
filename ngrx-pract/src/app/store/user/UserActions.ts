import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/User";

//Constant names for actions:
// Az eseményneveket egyszerűsítjük, kiemeljük őket konstansokba,
// és exportáljuk őket, hogy mindenhol elérhessük őket:

export const GET_ITEMS = '[User] get items';
export const GET_ONE_ITEM = '[User] get item';
export const LOAD_ITEMS = '[User] load items';
export const LOAD_SELECTED_ITEM = '[User] load selected';
export const UPDATE_ITEM = '[User] update item';
export const LOAD_UPDATED_ITEM = '[User] load updated';
export const ADD_ITEM = '[User] add updated';
export const LOAD_ADDED_ITEM = '[User] load added';
export const DELETE_ITEM = '[User] delete item';
export const REMOVE_ITEM = '[User] remove added';

export const FLUSH_ERROR = '[User] error flush';
export const ERROR_ITEM = '[User] error item';

//Actions

//a createAction hozza létre az eseményt, zárójelben a név a szokásos formában!
//elnevezés: entitás név (itt:[User]), majd az esemény neve
//ez kéri le az összes user-t
// export const getItems = createAction('[User] get items');

export const getItems = createAction(GET_ITEMS);
export const getOneItem = createAction(
    GET_ONE_ITEM,
    props<{id: string | number}>()
);

//user-ek betöltése
//createAction második paraméter (props), milyen formában kérem az adatokat
//a props adja az adatokat
export const loadItems = createAction(
    LOAD_ITEMS,
    props<{items: User[]}>()
);

export const loadSelectedItem = createAction(
    LOAD_SELECTED_ITEM,
    props<{selected: User}>()
);

export const updateItem = createAction(
    UPDATE_ITEM,
    props<{item: User}>()
);

export const loadUpdatedItem = createAction(
    LOAD_UPDATED_ITEM,
    props<{item: User}>()
);

export const addItem = createAction(
    ADD_ITEM,
    props<{item: User}>()
);

export const loadAddedItem = createAction(
    LOAD_ADDED_ITEM,
    props<{item: User}>()
);

export const deleteItem = createAction(
    DELETE_ITEM,
    props<{item: User}>()
);

export const removeDeletedItem = createAction(
    REMOVE_ITEM,
    props<{item: User}>()
);

//hiba kezelése
export const errorItem = createAction(
    ERROR_ITEM,
    props<{error: any}>()
);

export const errorFlush = createAction(FLUSH_ERROR);


// UserActions.ts

// Először létrehozzuk a szükséges action-öket:

// export const ADD_ITEM = '[User] add item';
// export const LOAD_ADDED_ITEM = '[User] load added';
// export const addItem = createAction(
//   ADD_ITEM,
//   props<{item: User}>()
// );
// export const loadAddedItem = createAction(
//   LOAD_ADDED_ITEM,
//   props<{item: User}>()
// );

// UserReducers.ts

// Be kell töltenünk az új felhasználót az adatbázisba,
// ehhez pedig megírjuk az eseményfigyelőt:

// on(loadAddedItem, (state, action) => ({
//     ...state,
//     items: (state.items as User[]).concat(action.item)
//   })),
// Ahogyan a kódból látható, mivel a state immutable,
// két tömböt fűzünk össze.



// UserEffects.ts

// Az effects-ben megírt metódus hasonló az update-hez,
// de az action.item-et adjuk át a create-nek.
// Mivel a json-server-auth tokent és nem user-t ad vissza,
// le kell kérnem a usert az e-mail-cím alapján.
// A lastAction az utolsó action lesz, amely tartalmazza
// a szükséges adatokat, így megkapjuk az e-mail-címet is.



// addItem$ = createEffect( (): Observable<Action> => {
//     let lastAction = null;
//     return this.actions$.pipe(
//       ofType(addItem),
//       tap( action => lastAction = action ),
//       switchMap( action => this.userService.create(action.item) ),
//       switchMap( () => this.userService.query(`email=${lastAction.item.email}`) ),
//       switchMap( user => of({ type: LOAD_ADDED_ITEM, item: user })),
//       catchError( error => of({ type: ERROR_ITEM, message: error })),
//     );
//   });

// User service

// Megírjuk a hiányzó create és delete metódust.

// create(user: User): Observable<User> {
//     const url = `${this.config.apiUrl}${this.entity}`;
//     return this.http.post<User>(url, user);
//   }


//   delete(user: User): Observable<User> {
//     const url = `${this.config.apiUrl}${this.entity}/${user.id}`;
//     return this.http.delete<User>(url);
//   }


// User komponens

// A .ts-ben létrehozunk egy user-t, amelyet felparaméterezünk:

// create(): void {
//     const user = new User();
//     user.first_name = 'New';
//     user.last_name = 'User';
//     user.email = 'test@test.org';
//     user.password = 'test';
// this.store.dispatch( addItem({item: user}) );
//   }


// Végül a .html-ben létrehozunk egy gombot,
// amellyel fel tudjuk venni az új felhasználót:

// <div class="row">
//   <div class="col-12">
//     <button (click)="create()" class="btn btn-lg btn-block btn-success mb-3">
//       Add New User
//     </button>
//   </div>
// </div>