import React, { useEffect, useState, useCallback } from 'react';

interface GameModalProps {
    onClose: () => void;
}

type Player = 'X' | 'O';
type SquareValue = Player | null;
type Board = SquareValue[];
type RPSOption = 'rock' | 'paper' | 'scissors';

// --- Helper Function for Tic-Tac-Toe ---
const calculateWinner = (squares: Board): { winner: Player; line: number[] } | null => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a] as Player, line: lines[i] };
        }
    }
    return null;
};


// --- Tic-Tac-Toe Component (Player vs Alex) ---
const TicTacToe = () => {
    const [board, setBoard] = useState<Board>(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
    const [gameResult, setGameResult] = useState<{ winner: Player | 'Draw'; line?: number[] } | null>(null);

    const handlePlayerMove = (i: number) => {
        if (!isPlayerTurn || board[i] || gameResult) return;

        const newBoard = board.slice();
        newBoard[i] = 'X';
        setBoard(newBoard);
        setIsPlayerTurn(false);
    };

    const makeCpuMove = useCallback((currentBoard: Board) => {
        // Find best move for CPU
        const findBestMove = (board: Board): number => {
            // 1. Check if CPU can win in the next move
            for (let i = 0; i < 9; i++) {
                if (!board[i]) {
                    const tempBoard = [...board];
                    tempBoard[i] = 'O';
                    if (calculateWinner(tempBoard)?.winner === 'O') return i;
                }
            }
            // 2. Check if Player can win in the next move, and block them
            for (let i = 0; i < 9; i++) {
                if (!board[i]) {
                    const tempBoard = [...board];
                    tempBoard[i] = 'X';
                    if (calculateWinner(tempBoard)?.winner === 'X') return i;
                }
            }
            // 3. Take the center if available
            if (!board[4]) return 4;

            // 4. Take a random corner
            const corners = [0, 2, 6, 8].filter(i => !board[i]);
            if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

            // 5. Take any remaining empty square
            const emptySquares = board.map((sq, idx) => sq === null ? idx : -1).filter(idx => idx !== -1);
            return emptySquares[Math.floor(Math.random() * emptySquares.length)];
        };

        const bestMove = findBestMove(currentBoard);
        const newBoard = currentBoard.slice();
        newBoard[bestMove] = 'O';
        
        setTimeout(() => {
            setBoard(newBoard);
            setIsPlayerTurn(true);
        }, 500); // Alex's "thinking" time
        
    }, []);

    useEffect(() => {
        const winnerInfo = calculateWinner(board);
        if (winnerInfo) {
            setGameResult({ winner: winnerInfo.winner, line: winnerInfo.line });
            return;
        }

        const isDraw = board.every(square => square !== null);
        if (isDraw) {
            setGameResult({ winner: 'Draw' });
            return;
        }

        if (!isPlayerTurn && !gameResult) {
            makeCpuMove(board);
        }

    }, [board, isPlayerTurn, gameResult, makeCpuMove]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsPlayerTurn(true);
        setGameResult(null);
    };

    let status;
    if (gameResult) {
        if (gameResult.winner === 'X') status = "You Win!";
        else if (gameResult.winner === 'O') status = "Alex Wins!";
        else status = "It's a Draw!";
    } else {
        status = isPlayerTurn ? 'Your Turn (X)' : 'Alex is thinking...';
    }

    const renderSquare = (i: number) => {
        const isWinningSquare = gameResult?.line?.includes(i);
        return (
            <button 
                className={`w-16 h-16 flex items-center justify-center text-3xl font-bold rounded-md transition-all duration-200
                    ${board[i] === 'X' ? 'text-blue-500' : 'text-yellow-500'}
                    ${isWinningSquare ? 'bg-green-300 dark:bg-green-700 scale-110' : 'bg-gray-100 dark:bg-gray-700'}
                    ${!board[i] && isPlayerTurn && !gameResult ? 'hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer' : 'cursor-not-allowed'}
                `}
                onClick={() => handlePlayerMove(i)}
                aria-label={`Square ${i + 1}, value ${board[i] || 'empty'}`}
                disabled={!isPlayerTurn || !!board[i] || !!gameResult}
            >
                {board[i]}
            </button>
        );
    };

    return (
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold mb-4 text-dark dark:text-white">Tic-Tac-Toe</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
                {Array(9).fill(null).map((_, i) => renderSquare(i))}
            </div>
            <div className="flex items-center justify-between min-h-[40px]">
                <p className="font-semibold text-lg text-dark dark:text-gray-300">{status}</p>
                 {gameResult && (
                    <button onClick={resetGame} className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full text-sm transition-transform duration-200 hover:scale-105">
                        Play Again
                    </button>
                 )}
            </div>
        </div>
    );
};


// --- Rock Paper Scissors Component ---
const RockPaperScissors = () => {
    const options: RPSOption[] = ['rock', 'paper', 'scissors'];
    const [playerChoice, setPlayerChoice] = useState<RPSOption | null>(null);
    const [computerChoice, setComputerChoice] = useState<RPSOption | null>(null);
    const [result, setResult] = useState<string>('');
    const [scores, setScores] = useState({ player: 0, alex: 0 });

    const getEmoji = (option: RPSOption) => {
        if (option === 'rock') return '✊';
        if (option === 'paper') return '✋';
        return '✌️';
    };

    const handlePlay = (choice: RPSOption) => {
        const computerChoice = options[Math.floor(Math.random() * options.length)];
        setPlayerChoice(choice);
        setComputerChoice(computerChoice);

        if (choice === computerChoice) {
            setResult("It's a tie!");
        } else if (
            (choice === 'rock' && computerChoice === 'scissors') ||
            (choice === 'scissors' && computerChoice === 'paper') ||
            (choice === 'paper' && computerChoice === 'rock')
        ) {
            setResult('You win!');
            setScores(s => ({ ...s, player: s.player + 1 }));
        } else {
            setResult('You lose!');
            setScores(s => ({ ...s, alex: s.alex + 1 }));
        }
    };

    const resetRound = () => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult('');
    };

    return (
         <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold mb-2 text-dark dark:text-white">Rock Paper Scissors</h3>
                <div className="flex justify-center gap-8 text-sm text-dark dark:text-gray-300 mb-2">
                    <span>Your Score: {scores.player}</span>
                    <span>Alex's Score: {scores.alex}</span>
                </div>
            </div>
            <div className="flex justify-center items-center space-x-8 my-4 h-20">
                {playerChoice && computerChoice ? (
                    <>
                        <div className="text-center">
                            <span className="text-5xl">{getEmoji(playerChoice)}</span>
                            <p className="font-semibold mt-1 text-dark dark:text-gray-300">You</p>
                        </div>
                        <p className="text-2xl font-bold text-dark dark:text-white">vs</p>
                         <div className="text-center">
                            <span className="text-5xl">{getEmoji(computerChoice)}</span>
                            <p className="font-semibold mt-1 text-dark dark:text-gray-300">Alex</p>
                        </div>
                    </>
                ) : <p className="text-gray-500 dark:text-gray-400">Make your move!</p>}
            </div>
            
            {!playerChoice ? (
                <div className="flex justify-center space-x-4">
                    {options.map(option => (
                        <button 
                            key={option} 
                            onClick={() => handlePlay(option)} 
                            className="w-20 h-20 text-4xl bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:bg-primary/20"
                            aria-label={`Choose ${option}`}
                        >
                            {getEmoji(option)}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-between min-h-[40px]">
                    <p className={`font-semibold text-lg ${result === 'You win!' ? 'text-green-500' : result === 'You lose!' ? 'text-red-500' : 'text-dark dark:text-gray-300'}`}>{result}</p>
                    <button onClick={resetRound} className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full text-sm transition-transform duration-200 hover:scale-105">
                        Next Round
                    </button>
                </div>
            )}
        </div>
    )
};


// --- Main Game Modal ---
const GameModal: React.FC<GameModalProps> = ({ onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => onClose(), 400); // Match animation duration
    };

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
           window.removeEventListener('keydown', handleEsc);
           document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div 
            className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4 ${isClosing ? 'animate-fade-out-quick' : 'animate-fade-in-quick'}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-modal-title"
            onClick={handleClose}
        >
            <div 
                className={`bg-secondary dark:bg-medium rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 p-6 md:p-8 ${isClosing ? 'animate-slide-out-down' : 'animate-slide-in-up'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 id="game-modal-title" className="text-3xl font-black text-dark dark:text-white tracking-wide">
                        Fun Zone
                    </h2>
                     <button 
                        onClick={handleClose}
                        className="text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1 transition-colors duration-300"
                        aria-label="Close games"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <TicTacToe />
                    <RockPaperScissors />
                </div>
            </div>
        </div>
    );
};

export default GameModal;