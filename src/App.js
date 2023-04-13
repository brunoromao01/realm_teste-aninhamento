import React from 'react'
import { View, Button } from 'react-native'
import { createRealmContext } from '@realm/react';
import { RealmProvider } from '../src/realm';
import { getRealm } from '../src/realm'


export default props => {

    async function registerNewBrand() {
        const realm = await getRealm()
        try {
            realm.write(() => {
                const created = realm.create("Brand", {
                    name: 'Coopavel'
                })
                console.log(created)
            })

        } catch (err) {
            console.log('ERRO: ' + err)
        }
    }

    async function registerNewIngredient() {
        const realm = await getRealm()
        try {
            realm.write(() => {
                const created = realm.create('Ingrediente', {
                    name: 'Farinha',
                    brand: {
                        name: 'Coamo'
                    }
                })
                console.log(created)
                console.log('criado novo ingrediente')
            })
        } catch (err) {
            console.log('ERRO: ' + err)
        }
    }

    async function registerNewRecipe() {
        const realm = await getRealm()
        try {
            realm.write(() => {
                const primeiraMarca = realm.objects('Brand')
                const primeiroIngrediente = realm.objects('Ingrediente')
                const created = realm.create("Recipe", {
                    name: 'bolo de chocolate',
                    ingredientes: [
                        {
                            name: 'chocolate',
                            brand: {
                                name: 'nestle'
                            }
                        }, primeiroIngrediente[0],
                        {
                            name: 'margarina',
                            brand: {

                                name: 'Doriana'
                            }
                        },
                        {
                            name: 'Leite',
                            brand: {

                                name: 'Batavo'
                            }
                        }
                    ]
                })
                console.log(created)
            })
        } catch (err) {
            console.log('ERRO: ' + err)
        }
    }

    
    async function updateIngredients() {
        const realm = await getRealm()
        realm.write(() => {
            const ingredientes = realm.objects('Ingrediente')
            ingredientes[0].brand = {
                name: 'Dona maria'
            }
        })
    }

    async function updateBrands() {
        const realm = await getRealm()
        realm.write(() => {
            const brands = realm.objects('Brand')
            brands[3].name = 'Qualy'
        })
        console.log('marca atualizada')
    }

    async function showBrands() {
        const realm = await getRealm()
        const marcas = realm.objects('Brand')
        console.log('==============Marcas=============')
        {
            marcas.map(marca => {
                console.log('name')
                console.log(marca.name)
                console.log('-----------------------')
            })
        }
    }

    async function showIngredients() {
        console.log('inicio showIngredients')
        const realm = await getRealm()
        const essences = realm.objects('Ingrediente')
        console.log('==============Ingredientes=============')
        {
            essences.length >= 1 ?
                essences.map(essence => {
                    console.log('name')
                    console.log(essence.name)
                    console.log('marca')
                    console.log(essence.brand)
                }) : console.log('vazio')
        }
    }

    async function showRecipe() {
        const realm = await getRealm()
        const receitas = realm.objects('Recipe')
        console.log('==============Receita=============')
        {
            receitas.map(receita => {
                console.log(receita.name)
                console.log('-----------------------------------')
                receita.ingredientes.map(Ingrediente => {
                    console.log(Ingrediente.name)
                    console.log(Ingrediente.brand.name)
                })
            })
        }
    }

    async function deleteAll() {
        const realm = await getRealm()
        try {
            realm.write(() => {
                realm.deleteAll()
            })
            console.log('delete all')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <RealmProvider>
            <View style={{flex: 1,justifyContent: 'center',paddingHorizontal: 15}}>
                <View style={{ height: 10 }} />

                <Button
                    onPress={registerNewBrand}
                    title='Inserir nova marca'
                />

                <View style={{ height: 10 }} />

                <Button
                    onPress={registerNewIngredient}
                    title='Inserir novo ingrediente'
                />

                <View style={{ height: 10 }}></View>

                <Button
                    onPress={registerNewRecipe}
                    title='Inserir nova Receita'
                />

                <View style={{ height: 50 }}></View>

                <View style={{ height: 10 }}></View>

                <Button
                    onPress={() => updateIngredients()}
                    title='atualizar ingrediente'
                />

                <View style={{ height: 10 }}></View>
                
                <Button
                    onPress={() => updateBrands()}
                    title='atualizar marca'
                />

                <View style={{ height: 50 }}></View>

                <Button
                    onPress={() => showBrands()}
                    title='todas as marcas'
                />

                <View style={{ height: 10 }}></View>

                <Button
                    onPress={() => showIngredients()}
                    title='todas os ingredientes'
                />

                <View style={{ height: 10 }}></View>
                
                <Button
                    onPress={() => showRecipe()}
                    title='todas as receitas'
                />

                <View style={{ height: 50 }}></View>

                <Button
                    onPress={() => deleteAll()}
                    title='Delete'
                />

            </View>
        </RealmProvider>

    )
}
