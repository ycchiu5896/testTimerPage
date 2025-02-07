
export default function PlayerTurn({startGame, inGame, switchPlayer}: {startGame: () => void, inGame: boolean, switchPlayer: () => void}) {
    return(
        <div>
            {!inGame ? (
                <button onClick={startGame}>Start Game</button>
            ): (
                <button onClick={switchPlayer}>End Turn</button>
            )
            } 
        </div>
    )
}