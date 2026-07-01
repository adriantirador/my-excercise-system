import { useState, useEffect } from "react";
import styles from "./TicTacToe.module.scss";

type PlayerWin = {
    player: string,
    count: number
}

export default function TicTacToe() {
    const defaultValue = Array(9).fill(null)
    const box_count = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [playerTurnList, setPlayerTurnList] = useState<any[]>(defaultValue)
    const [isFirstPlayer, setIsFirstPlayer] = useState<boolean>(true)
    const [winCount, setWinCount] = useState<PlayerWin>({ player: "", count: 0 })

    const winning_combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const handleReset = function () {
        setPlayerTurnList(defaultValue);
        setIsFirstPlayer(true);
    }

    const handlePlayerTurn = function (idx: number) {
        if (playerTurnList[idx]) return;

        setPlayerTurnList(prev => {
            const next = [...prev];
            next[idx] = isFirstPlayer ? "X" : "O"
            return next;
        })

        setIsFirstPlayer(prev => !prev)
    }

    const handleWinPlayer = () => {
        const isDraw = playerTurnList.every(item => !!item)
        for (const [a, b, c] of winning_combinations) {
            if (
                playerTurnList[a] &&
                playerTurnList[a] === playerTurnList[b] &&
                playerTurnList[a] === playerTurnList[c]
            ) {
                return playerTurnList[a]
            }
        }

        if (isDraw) {
            const timeout = window.setTimeout(() => {
                alert(`Draw Match!`)
            }, 300)

            return () => window.clearTimeout(timeout);
        }

        return null
    };

    useEffect(() => {
        const winningPlayer = handleWinPlayer()

        if (typeof winningPlayer !== "string") return

        const timeout = window.setTimeout(() => {
            setWinCount((prev) => {
                const isSamePlayerWin = prev.player === winningPlayer;

                return {
                    player: winningPlayer,
                    count: isSamePlayerWin ? prev.count + 1 : 1,
                };
            });

            if (winCount.count === 2) {
                alert("Tatlo panalo ka na, pero hindi mo pa rin siya mapanalo.");

                setWinCount({player: "", count: 0})
            } else {
                alert(`Player ${winningPlayer} wins!`)
            }

            handleReset()
        }, 300)

        return () => window.clearTimeout(timeout)
    }, [playerTurnList])

    return (
        <section className={styles.ticTacToe} aria-label="Tic Tac Toe page">
            <div className={styles.container}>
                {box_count.map((_, idx) => (
                    <button key={idx} onClick={() => handlePlayerTurn(idx)} disabled={!!playerTurnList[idx]}> {playerTurnList[idx]}</button>
                ))}
            </div>
            <button onClick={handleReset}>
                Play Again
            </button>
        </section>
    )
}
