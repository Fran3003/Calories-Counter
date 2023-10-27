import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';


const TodayCalories = () => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <CircularProgress value={10} />
            </View>
            <View style={styles.rigthContainer}>

            </View>
            <Text>Calories</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    leftContainer: {

    },
    rigthContainer: {

    },
}) 

export default TodayCalories;