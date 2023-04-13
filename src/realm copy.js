import Realm from "realm";
import {createRealmContext} from '@realm/react';


export const getRealm = async () => {
    return await Realm.open({
        path: 'juiceApp',
        schema: [Ingrediente,Brand, Recipe],
        schemaVersion: 12
    })
}

export const Ingrediente = {
	name: "Ingrediente",
	primaryKey: "_id",
	properties: {
		_id: "string",
		name: "string",
		brand: "Brand?"
	},
}

export const Brand = {
	name: "Brand",
	primaryKey: "_id",
	properties: {
		_id: "string",
		name: "string"
	},
}

export const Recipe = {
	name: "Recipe",
	primaryKey: "_id",
	properties: {
		_id: "string",
		name: "string",
		ingredientes: 'Ingrediente[]'
	},
}


export const {RealmProvider, useObject, useQuery} = createRealmContext(Brand);

