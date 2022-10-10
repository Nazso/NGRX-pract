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

//hiba kezelése
export const errorItem = createAction(
    ERROR_ITEM,
    props<{message: string}>()
);
