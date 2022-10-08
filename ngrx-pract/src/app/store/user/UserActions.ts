import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/User";

//Actions

//a createAction hozza létre az eseményt, zárójelben a név a szokásos formában!
//elnevezés: entitás név (itt:[User]), majd az esemény neve
//ez kéri le az összes user-t
export const getItems = createAction('[User] get items');

//user-ek betöltése
//createAction második paraméter (props), milyen formában kérem az adatokat
//a props adja az adatokat
export const loadItems = createAction(
    '[User] load items',
    props<{items: User[]}>()
);

//hiba kezelése
export const errorItems = createAction(
    '[User] error items',
    props<{message: string}>()
);
