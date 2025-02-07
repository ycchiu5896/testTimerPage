import { useState, useEffect, useCallback } from 'react';
import PlayerTurn from './PlayerTurn';
import Timer from './Timer';
import '../App.css';

interface PlayerTime {
    white: number;
    black: number;
}

export default function TimerPage({onStateChange}: {onStateChange: (winner: 'white' | 'black' | null) => void}) {

    const TURNDURATION = {hours: 0, minutes: 0, seconds: 5}

    const [playerTime, setPlayerTime] = useState<PlayerTime>({
        white: convertToSeconds(TURNDURATION),
        black: convertToSeconds(TURNDURATION),
    });

    const [playerTurn, setPlayerTurn] = useState<'white' | 'black'>('white');

    const [inGame, setInGame] = useState(false);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setPlayerTime((prev) => {
                if (!inGame) {
                    return prev;
                }
                const newTime = subtractTime(prev, playerTurn);
                if (newTime[playerTurn] <= 0) {
                    onStateChange(playerTurn);
                    resetGame();
                    return resetTimers();
                }
                return newTime;
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [playerTurn, inGame]);

    const subtractTime = useCallback((time: PlayerTime, player: 'white' | 'black'): PlayerTime => {
        return {
            ...time,
            [player]: time[player] - 1000,
        };
    }, []);

    const resetTimers = useCallback((): PlayerTime => {
        return {
            white: convertToSeconds(TURNDURATION),
            black: convertToSeconds(TURNDURATION),
        };
    }, []);

    function resetGame() {
        setPlayerTime(resetTimers());
        setInGame(false);
        setPlayerTurn('white');
    }

    function switchPlayer() {
        setPlayerTurn((prev) => prev === 'white' ? 'black' : 'white');
    }

    function startGame() {
        setInGame(true);
    }

    function convertToSeconds (time: {hours:number, minutes:number, seconds:number}) {
        return (time.hours * 3600 + time.minutes * 60 + time.seconds) * 1000;
    }

    return (
        <div className='timer-page'>
            {
                Object.entries(playerTime).map(([player, time], index) => (
                    <div className={`${player}-container`} key={`${player}-${index}`}> 
                        <Timer player={player} time={time}/>
                        {playerTurn === player && <PlayerTurn startGame={startGame} inGame={inGame} switchPlayer={switchPlayer}/>}
                    </div>
                ))
            }
        </div>
    )
}