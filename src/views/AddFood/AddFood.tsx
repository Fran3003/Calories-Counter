import { View, Text, StyleSheet } from "react-native";

import React, { useState } from 'react';
import Header from "../../components/Header/Header";
import { Button, Input } from "@rneui/themed";
import { Icon } from "@rneui/base";
import AddFoodModal from "../../components/AddFoodModal";

const AddFood = () => {
    const [visible, setIsVisible] = useState<boolean>(false);

    const handleModalClose = () => {
        setIsVisible(false)
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
                    <Input placeholder="apples, pie, soda..."/>
                </View>
                <Button 
                title="Search" 
                color="#ade8af"
                icon={<Icon name="search" color="#000" size={18}/>}
                titleStyle={styles.searchBtnTitle}
                radius={"lg"}
                />
            </View>
            <AddFoodModal visible={visible} onClose={handleModalClose}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
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
    
})

export default AddFood;