import React, { Component } from 'react';
import Game from './game';
import { Table } from 'semantic-ui-react'

class GameList extends Component {
  // https://stackoverflow.com/a/49866237
  cumulativeSum = ([head, ...tail]) =>
  tail.reduce((acc, x, index) => {
    acc.push(acc[index] + x);
    return acc
  }, [head])
  
  gameToResultPoints(game) {
    const soloGameWon = game.winner.length === 1;
    const soloGameLost = game.winner.length === 3;

    const ResultPoints = {0:0, 1:0, 2:0, 3:0};
    Object.keys(ResultPoints).forEach(w => {
      if (game.winner.includes(Number(w))) {
        if (soloGameWon) {
          ResultPoints[w] += 3 * game.points;
        } else {
          ResultPoints[w] +=game.points;
        } 
      } else {
        if (soloGameLost) {
          ResultPoints[w] -= 3 * game.points;
        } else {
          ResultPoints[w] -= game.points;
        }
      }
    });
    return ResultPoints;
  }
  
  gameListToPointList(gameList) {
    const pointList = [];
    gameList.forEach((game, gameIDX) => {
      const ResultPoints = this.gameToResultPoints(game);
      pointList.push({
        gameID: game.gameID,
        points: game.points,
        0: gameIDX === 0 ? ResultPoints[0] : ResultPoints[0] + pointList[pointList.length-1][0],
        1: gameIDX === 0 ? ResultPoints[1] : ResultPoints[1] + pointList[pointList.length-1][1],
        2: gameIDX === 0 ? ResultPoints[2] : ResultPoints[2] + pointList[pointList.length-1][2],
        3: gameIDX === 0 ? ResultPoints[3] : ResultPoints[3] + pointList[pointList.length-1][3],
      })
    });
    return pointList;
  }
  
  render() {
    const PointList = this.gameListToPointList(this.props.games);
    
    return (
      <Table.Body>
        {PointList.map((game, gameIDX) => (
          <Game
          key={gameIDX}
          idx={gameIDX}
          id={game.gameID}
          game={game}/>
        ))}
      </Table.Body>
    )
  }
}

export default GameList;
