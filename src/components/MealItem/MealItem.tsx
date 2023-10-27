import React, {FC} from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { Meal } from '../../types';
import { Button, Icon } from '@rneui/themed';
import useFoodStorage from '../../hooks/useFoodStorage';

type MealItemProps = Meal & {
    isAbleToAdd?: boolean;
    onCompleteAddRemove?: () => void;
    itemPosition?: number;
}

const MealItem: FC<MealItemProps> = ({
    calories, 
    portion, 
    name, 
    isAbleToAdd, 
    onCompleteAddRemove,
    itemPosition,
}) => {
    const { onSaveTodayFood, onDeleteTodayFood } = useFoodStorage()

    const handleIconPress = async () => {
        try {
            if (isAbleToAdd) {
                await onSaveTodayFood({calories, name, portion})
            Alert.alert('comida agregada al dia')
            } else {
                await onDeleteTodayFood(itemPosition ?? -1)
                Alert.alert('comida eliminada')
            }
            onCompleteAddRemove?.()
            
        } catch (error) {
            console.log(error);
            
            Alert.alert('comida no agregada al dia')
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.portion}>{portion}</Text>
            </View>
            <View style={styles.rigthContainer}>
                <Button 
                icon={<Icon name={isAbleToAdd ? 'add-circle-outline' : 'close'}/>} 
                type='clear' 
                style={styles.iconBtn}
                onPress={handleIconPress} 
                />
                <Text style={styles.calories}>{calories} kcal</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ade8af',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    rigthContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
    },
    portion: {
        fontSize: 13,
        color: '#808080',
        fontWeight: '500',
    },
    calories: {
        fontSize: 18,
    },
    iconBtn: {
        marginBottom: -8,
    },
})

export default MealItem;