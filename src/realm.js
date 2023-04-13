import Realm from "realm";
import {createRealmContext} from '@realm/react';


export const getRealm = async () => {
    return await Realm.open({
        path: 'juiceApp',
        schema: [Ingrediente,Brand, Recipe],
        schemaVersion: 14
    })
}

export const Ingrediente = {
	name: "Ingrediente",
	properties: {		
		name: "string",
		brand: "Brand?"
	},
}

export const Brand = {
	name: "Brand",	
	properties: {
		name: "string"
	},
}

export const Recipe = {
	name: "Recipe",
	properties: {	
		name: "string",
		ingredientes: 'Ingrediente[]'
	},
}


export const {RealmProvider, useObject, useQuery} = createRealmContext(Brand);

