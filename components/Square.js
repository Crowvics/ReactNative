import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Square({ number, boxInfo, player, gameWinner, checkDraw }) {

    const { isPlayerX, setIsPlayerX } = player;
    const { boxes, setBoxes } = boxInfo;
    const playerSymbol = isPlayerX ? 'X' : 'O';

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (boxes[number] === null && gameWinner === null) {
                    setBoxes((prevBoxInfo) => {
                        prevBoxInfo[number] = playerSymbol;
                        return [...prevBoxInfo];
                    });
                    setIsPlayerX((prevState) => !prevState);
                }
                checkDraw();
            }}
        >
            {boxes[number] !== null ? 
            <View style={styles.squareView}>
                {boxes[number] === 'X' ? 
                <Entypo name="cross" size={105} color="black" />
                :
                <Entypo name="circle" size={68} color="black" />
            } 
            </View>
            : <View style={styles.squareView}></View>
            }
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    squareView: {
        minWidth: 110,
        minHeight: 110,
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    }
})