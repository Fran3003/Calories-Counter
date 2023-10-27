import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";

import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import { Button, Input } from "@rneui/themed";
import { Icon } from "@rneui/base";
import AddFoodModal from "../../components/AddFoodModal";
import useFoodStorage from "../../hooks/useFoodStorage";
import { Meal } from "../../types";
import MealItem from "../../components/MealItem";


const AddFood = () => {
    const [visible, setIsVisible] = useState<boolean>(false);
    const { onGetFodds } = useFoodStorage()
    const [foods, setFoods] = useState<Meal[]>([])
    const [search, setSearch] = useState<string>('')

    const loadFoods = async() => {
        try {
            const foodsResponse = await onGetFodds()
            setFoods(foodsResponse);
            
          } catch (error) {
              console.error(error)
          }
    }

    useEffect(() => {
        loadFoods().catch(null)
    }, [])

    const handleModalClose = async (shouldUpdate?: boolean) => {
        if (shouldUpdate) {
            Alert.alert('Comida guardada exitosamente')
            loadFoods();
        }
        setIsVisible(false)
    }

    const handleSearchPress = async () => {
        try {
            const result = await onGetFodds();
            setFoods(result.filter((item: Meal) => 
                item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
                ),
            );
        } catch (error) {
            console.error(error)
            setFoods([])
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.addFoodContainer}>
                <View style={styles.legendContainer}>
                    <Text style={styles.addFoodLegend}>Add Food</Text>
                </View>
                <View style={styles.addFoodBtnContainer}>
                    <Button 
                        icon={<Icon name="add-circle-outline" color="#fff"/>}
                        radius={"lg"} 
                        color="#4ecb71" 
                        onPress={() => setIsVisible(true)}
                    />
                </View>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <Input 
                        placeholder="apples, pie, soda..." 
                        value={search} 
                        onChangeText={(text: string) => setSearch(text)} 
                    />
                </View>
                <Button 
                    title="Search" 
                    color="#ade8af"
                    icon={<Icon name="search" color="#000" size={18}/>}
                    titleStyle={styles.searchBtnTitle}
                    radius={"lg"}
                    onPress={handleSearchPress}
                />
            </View>
            <ScrollView style={styles.content}>
                    {foods?.map(meal => (
                    <MealItem key={`my-meal-item-${meal.name}`} {...meal}/>
                    ))}
            </ScrollView>
            <AddFoodModal visible={visible} onClose={handleModalClose}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#fff',
        flex: 1,
    },
    addFoodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    }, 
    legendContainer: {
        flex: 1,
    },
    addFoodBtnContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    addFoodLegend: {
        fontSize: 20,
    },
    searchContainer: {
        flexDirection: 'row'
    },
    inputContainer: {
        flex: 1,
        marginLeft: -12,
    },
    searchBtnTitle: {
        color: '#000',
        fontSize: 14,
    },
    content: {

    },
    
})

export default AddFood;