import { StatusBar as Status } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Importe o LinearGradient

import Square from './components/Square';

const colors = {
  purple: '#8A2BE2',
  blue: '#0000FF',
};

export default function Game() {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  function GridCell(number) {
    return (
      <Square
        number={number}
        boxInfo={{ boxes: grid, setBoxes: setGrid }}
        player={{ isPlayerX, setIsPlayerX }}
        gameWinner={winner}
        checkDraw={checkDraw}
      />
    );
  }

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function findWinner() {
    for (let i = 0; i < winPatterns.length; i++) {
      if (
        grid[winPatterns[i][0]] !== null &&
        grid[winPatterns[i][0]] === grid[winPatterns[i][1]] &&
        grid[winPatterns[i][0]] === grid[winPatterns[i][2]]
      ) {
        setWinner(grid[winPatterns[i][0]]);
        return;
      }
    }
  }

  function checkDraw() {
    if (grid.every((cell) => cell !== null) && winner === null) {
      setIsDraw(true);
    }
  }

  useEffect(() => {
    findWinner();
    checkDraw();
  }, [isPlayerX, grid, winner]);

  function resetGame() {
    setWinner(null);
    setGrid(Array(9).fill(null));
    setIsPlayerX(true);
    setIsDraw(false);
  }

  return (
    <LinearGradient // Use o LinearGradient como wrapper
      colors={[colors.purple, colors.blue]}
      style={styles.container}
    >
      <Status style="auto" backgroundColor={colors.purple} />
      <View style={styles.infoContainer}>
        {winner !== null ? (
          <Text style={[styles.primaryText, styles.winnerText]}>
            {winner} Ganhou!
          </Text>
        ) : isDraw ? (
          <Text style={[styles.primaryText, styles.drawText]}>Velha!</Text>
        ) : (
          <Text style={styles.primaryText}>Vez de: {isPlayerX ? 'X' : 'O'}</Text>
        )}
      </View>
      <View style={styles.grid}>
        <View style={styles.row}>
          {GridCell(0)}
          {GridCell(1)}
          {GridCell(2)}
        </View>
        <View style={styles.row}>
          {GridCell(3)}
          {GridCell(4)}
          {GridCell(5)}
        </View>
        <View style={styles.row}>
          {GridCell(6)}
          {GridCell(7)}
          {GridCell(8)}
        </View>
      </View>
      <Icon
        style={styles.resetIcon}
        name="reload-circle"
        size={38}
        color={colors.black}
        onPress={resetGame}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    borderWidth: 2, 
    borderRadius: 10,
    borderColor: colors.purple, 
  },
  row: {
    flexDirection: 'row',
  },
  resetIcon: {
    marginTop: 20,
    marginRight: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  primaryText: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  winnerText: {
    color: 'black',
    fontSize: 48,
  },
  drawText: {
    color: 'gray',
    fontSize: 48,
  },
});
