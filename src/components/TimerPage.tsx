import { useState, useEffect, useCallback } from 'react';
import PlayerTurn from './PlayerTurn';
import DisplayTimer from './DisplayTimer';
import '../App.css';

interface PlayerTimeLeft {
    white: number;
    black: number;
}

interface TurnDuration {
    hours: number;
    minutes: number;
    seconds: number;
}

const TURN_DURATION: TurnDuration = {hours: 0, minutes: 1, seconds: 5};

export default function TimerPage({onStateChange}: {onStateChange: (winner: 'white' | 'black' | null) => void}) {

    const SECONDS_GAME_END = 0;

    const [PlayerTimeLeft, setPlayerTimeLeft] = useState<PlayerTimeLeft>({
        white: convertToSeconds(TURN_DURATION),
        black: convertToSeconds(TURN_DURATION),
    });

    const [playerTurn, setPlayerTurn] = useState<'white' | 'black'>('white');

    const [inGame, setInGame] = useState(false);
    
    const subtractTime = useCallback((time: PlayerTimeLeft, player: 'white' | 'black'): PlayerTimeLeft => {
        return {
            ...time,
            [player]: time[player] - 1000,
        };
    }, []);

    const resetTimers = useCallback((): PlayerTimeLeft => {
        return {
            white: convertToSeconds(TURN_DURATION),
            black: convertToSeconds(TURN_DURATION),
        };
    }, []);

    const resetGame = useCallback(() => {
        setPlayerTimeLeft(resetTimers());
        setInGame(false);
        setPlayerTurn('white');
    }, [resetTimers]);

    function switchPlayer() {
        setPlayerTurn((prev) => prev === 'white' ? 'black' : 'white');
    }

    function startGame() {
        setInGame(true);
    }

    function convertToSeconds (time: TurnDuration): number {
        return (time.hours * 3600 + time.minutes * 60 + time.seconds) * 1000;
    }

    //decrement time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setPlayerTimeLeft((prev) => {
                if (!inGame) {
                    return prev;
                }
                const newTime = subtractTime(prev, playerTurn);
                return newTime;
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [playerTurn, inGame, subtractTime]);

    //check if there is a winner
    useEffect(() => {
        if (PlayerTimeLeft[playerTurn] <= SECONDS_GAME_END) {
            onStateChange(playerTurn === 'white' ? 'black' : 'white');
            resetGame();
        }
    }, [PlayerTimeLeft, playerTurn, onStateChange, resetGame]);

    return (
        <div className='parent-container'>
            <div className='timer-page'>
                {
                    Object.entries(PlayerTimeLeft).map(([player, time], index) => (
                        <div className={`${player}-container`} key={`${player}-${index}`}> 
                            <DisplayTimer player={player} time={time}/>
                            {playerTurn === player && <PlayerTurn startGame={startGame} inGame={inGame} switchPlayer={switchPlayer}/>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}