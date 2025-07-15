'use client'
import React, { useEffect, useState } from 'react'
import { RotateCcw, Trophy, Target, Zap } from 'lucide-react'

const faceConfigId = {
    '2': 1,
    '3': 2,
    '4': 3,
    '5': 4,
    '6': 5,
    '7': 6,
    '8': 7,
    '9': 8,
    '10': 9,
    'J': 10,
    'Q': 11,
    'K': 12,
    'A': 13
}

function shuffleArray(array) {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

const Cards = () => {
    const [selectedCard, setSelectedCard] = useState(null)
    const [computerSelection, setComputerSelection] = useState(null)
    const [gameResult, setGameResult] = useState(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 })
    const [gameHistory, setGameHistory] = useState([])
    const [isClient, setIsClient] = useState(false)
    const [shuffledCards, setShuffledCards] = useState(Object.keys(faceConfigId)) // Initial state without shuffle

    const faceCardLabel = Object.keys(faceConfigId).find(item => faceConfigId[item] === computerSelection)

    // Fix hydration issue by only shuffling on client
    useEffect(() => {
        setIsClient(true)
        setShuffledCards(shuffleArray(Object.keys(faceConfigId)))
    }, [])

    const getCardColor = (card) => {
        if (['A', 'K', 'Q', 'J'].includes(card)) return 'text-purple-700'
        if (['10', '9', '8', '7'].includes(card)) return 'text-blue-700'
        return 'text-gray-700'
    }

    const getCardBg = (card) => {
        if (['A', 'K', 'Q', 'J'].includes(card)) return 'bg-gradient-to-br from-purple-200 to-purple-300 border-purple-300'
        if (['10', '9', '8', '7'].includes(card)) return 'bg-gradient-to-br from-blue-200 to-blue-300 border-blue-300'
        return 'bg-gradient-to-br from-gray-200 to-gray-300 border-gray-300'
    }

    const getCardHover = (card) => {
        if (['A', 'K', 'Q', 'J'].includes(card)) return 'hover:from-purple-300 hover:to-purple-400'
        if (['10', '9', '8', '7'].includes(card)) return 'hover:from-blue-300 hover:to-blue-400'
        return 'hover:from-gray-300 hover:to-gray-400'
    }

    const handleCardClick = (card) => {
        if (isAnimating || selectedCard) return
        
        setSelectedCard(card)
        setIsAnimating(true)
        
        // Simulate computer thinking time
        setTimeout(() => {
            const randomNum = Math.ceil(Math.random() * 13)
            setComputerSelection(randomNum)
            setIsAnimating(false)
        }, 1000)
    }

    const resetGame = () => {
        setSelectedCard(null)
        setComputerSelection(null)
        setGameResult(null)
        setShuffledCards(shuffleArray(Object.keys(faceConfigId)))
        setGameHistory([])
    }

    const playAgain = () => {
        setSelectedCard(null)
        setComputerSelection(null)
        setGameResult(null)
    }

    useEffect(() => {
        if (selectedCard && computerSelection) {
            const playerValue = faceConfigId[selectedCard]
            const computerValue = computerSelection
            
            let result
            if (playerValue > computerValue) {
                result = 'WON'
                setScore(prev => ({ ...prev, wins: prev.wins + 1 }))
            } else if (playerValue < computerValue) {
                result = 'LOST'
                setScore(prev => ({ ...prev, losses: prev.losses + 1 }))
            } else {
                result = 'DRAW'
                setScore(prev => ({ ...prev, draws: prev.draws + 1 }))
            }
            
            setGameResult(result)
            setGameHistory(prev => [...prev, {
                player: selectedCard,
                computer: faceCardLabel || computerSelection,
                result
            }].slice(-5)) // Keep only last 5 games
        }
    }, [selectedCard, computerSelection, faceCardLabel])

    const getResultColor = () => {
        if (gameResult === 'WON') return 'text-green-700'
        if (gameResult === 'LOST') return 'text-red-700'
        return 'text-yellow-700'
    }

    const getResultIcon = () => {
        if (gameResult === 'WON') return <Trophy className="w-7 h-7 text-green-600" />
        if (gameResult === 'LOST') return <Target className="w-7 h-7 text-red-600" />
        return <Zap className="w-7 h-7 text-yellow-600" />
    }

    // Don't render until client-side to prevent hydration mismatch
    if (!isClient) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-800 mb-3 drop-shadow-sm">Card Battle</h1>
                    <p className="text-xl text-gray-700 font-medium">Choose your card and battle the computer!</p>
                </div>

                {/* Score Board */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
                    <div className="grid grid-cols-3 gap-6 text-center">
                        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 border-2 border-green-300 shadow-lg">
                            <div className="text-3xl font-bold text-green-800">{score.wins}</div>
                            <div className="text-lg font-semibold text-green-700">Wins</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-6 border-2 border-yellow-300 shadow-lg">
                            <div className="text-3xl font-bold text-yellow-800">{score.draws}</div>
                            <div className="text-lg font-semibold text-yellow-700">Draws</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-6 border-2 border-red-300 shadow-lg">
                            <div className="text-3xl font-bold text-red-800">{score.losses}</div>
                            <div className="text-lg font-semibold text-red-700">Losses</div>
                        </div>
                    </div>
                </div>

                {/* Game Area */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Card</h2>
                    
                    {/* Player Cards */}
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-3 mb-8">
                        {shuffledCards.map((card, index) => (
                            <div
                                key={index}
                                onClick={() => handleCardClick(card)}
                                className={`
                                    relative cursor-pointer transition-all duration-300 transform hover:scale-110 
                                    ${getCardBg(card)} ${getCardHover(card)}
                                    ${selectedCard === card ? 'ring-4 ring-blue-500 scale-110 shadow-2xl' : 'shadow-lg'}
                                    ${isAnimating && !selectedCard ? 'animate-pulse' : ''}
                                    rounded-xl border-2 hover:shadow-xl p-4 h-20 flex items-center justify-center
                                    ${selectedCard && selectedCard !== card ? 'opacity-50' : ''}
                                `}
                            >
                                <span className={`text-2xl font-bold ${getCardColor(card)} drop-shadow-sm`}>
                                    {card}
                                </span>
                                {selectedCard === card && (
                                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white text-sm font-bold">✓</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Battle Results */}
                    {selectedCard && (
                        <div className="border-t-2 border-gray-200 pt-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                                {/* Player Card */}
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Your Card</h3>
                                    <div className={`
                                        ${getCardBg(selectedCard)} 
                                        rounded-xl shadow-2xl p-6 h-24 flex items-center justify-center mx-auto w-20 border-2
                                    `}>
                                        <span className={`text-3xl font-bold ${getCardColor(selectedCard)} drop-shadow-sm`}>
                                            {selectedCard}
                                        </span>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-700 mt-3">Value: {faceConfigId[selectedCard]}</p>
                                </div>

                                {/* VS and Result */}
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gray-500 mb-4">VS</div>
                                    {gameResult && (
                                        <div className="flex flex-col items-center gap-3">
                                            {getResultIcon()}
                                            <span className={`text-2xl font-bold ${getResultColor()} drop-shadow-sm`}>
                                                {gameResult}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Computer Card */}
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Computer Card</h3>
                                    <div className={`
                                        ${isAnimating ? 'animate-spin' : ''} 
                                        ${computerSelection ? getCardBg(faceCardLabel || computerSelection.toString()) : 'bg-gradient-to-br from-gray-300 to-gray-400 border-gray-400'}
                                        rounded-xl shadow-2xl p-6 h-24 flex items-center justify-center mx-auto w-20 border-2
                                    `}>
                                        {isAnimating ? (
                                            <div className="w-8 h-8 border-3 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <span className={`text-3xl font-bold ${computerSelection ? getCardColor(faceCardLabel || computerSelection.toString()) : 'text-gray-600'} drop-shadow-sm`}>
                                                {faceCardLabel || computerSelection || '?'}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-lg font-semibold text-gray-700 mt-3">
                                        Value: {computerSelection || '?'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {gameResult && (
                        <div className="flex justify-center gap-6 mt-8">
                            <button
                                onClick={playAgain}
                                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Play Again
                            </button>
                            <button
                                onClick={resetGame}
                                className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-lg font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Reset Game
                            </button>
                        </div>
                    )}
                </div>

                {/* Game History */}
                {gameHistory.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Recent Games</h3>
                        <div className="space-y-4">
                            {gameHistory.map((game, index) => (
                                <div key={index} className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 shadow-md border border-gray-200">
                                    <div className="flex items-center gap-6">
                                        <span className="text-lg font-bold text-gray-800">You: <span className="text-blue-600">{game.player}</span></span>
                                        <span className="text-gray-500 font-medium">vs</span>
                                        <span className="text-lg font-bold text-gray-800">Computer: <span className="text-purple-600">{game.computer}</span></span>
                                    </div>
                                    <span className={`
                                        px-4 py-2 rounded-full text-sm font-bold shadow-md
                                        ${game.result === 'WON' ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-800 border border-green-300' : 
                                          game.result === 'LOST' ? 'bg-gradient-to-r from-red-200 to-red-300 text-red-800 border border-red-300' : 
                                          'bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-800 border border-yellow-300'}
                                    `}>
                                        {game.result}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cards