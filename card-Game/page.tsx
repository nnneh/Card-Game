'use client'
import React, { useEffect, useState } from 'react'
import { RotateCcw, Trophy, Target } from 'lucide-react'

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
    const [shuffledCards, setShuffledCards] = useState(shuffleArray(Object.keys(faceConfigId)))
    const [gameHistory, setGameHistory] = useState([])

    const faceCardLabel = Object.keys(faceConfigId).find(item => faceConfigId[item] === computerSelection)

    const getCardColor = (card) => {
        if (['A', 'K', 'Q', 'J'].includes(card)) return 'text-purple-600'
        if (['10', '9', '8', '7'].includes(card)) return 'text-blue-600'
        return 'text-gray-600'
    }

    const getCardBg = (card) => {
        if (['A', 'K', 'Q', 'J'].includes(card)) return 'bg-gradient-to-br from-purple-100 to-purple-200'
        if (['10', '9', '8', '7'].includes(card)) return 'bg-gradient-to-br from-blue-100 to-blue-200'
        return 'bg-gradient-to-br from-gray-100 to-gray-200'
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
        if (gameResult === 'WON') return 'text-green-600'
        if (gameResult === 'LOST') return 'text-red-600'
        return 'text-yellow-600'
    }

    const getResultIcon = () => {
        if (gameResult === 'WON') return <Trophy className="w-6 h-6 text-green-600" />
        if (gameResult === 'LOST') return <Target className="w-6 h-6 text-red-600" />
        return <div className="w-6 h-6 bg-yellow-500 rounded-full" />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Card Battle</h1>
                    <p className="text-gray-600">Choose your card and battle the computer!</p>
                </div>

                {/* Score Board */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-green-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-600">{score.wins}</div>
                            <div className="text-sm text-green-600">Wins</div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-yellow-600">{score.draws}</div>
                            <div className="text-sm text-yellow-600">Draws</div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-red-600">{score.losses}</div>
                            <div className="text-sm text-red-600">Losses</div>
                        </div>
                    </div>
                </div>

                {/* Game Area */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Your Card</h2>
                    
                    {/* Player Cards */}
                    <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-2 mb-6">
                        {shuffledCards.map((card, index) => (
                            <div
                                key={index}
                                onClick={() => handleCardClick(card)}
                                className={`
                                    relative cursor-pointer transition-all duration-300 transform hover:scale-105 
                                    ${getCardBg(card)} 
                                    ${selectedCard === card ? 'ring-4 ring-blue-500 scale-105' : ''}
                                    ${isAnimating && !selectedCard ? 'animate-pulse' : ''}
                                    rounded-lg shadow-md hover:shadow-lg p-3 h-16 flex items-center justify-center
                                    ${selectedCard && selectedCard !== card ? 'opacity-50' : ''}
                                `}
                            >
                                <span className={`text-lg font-bold ${getCardColor(card)}`}>
                                    {card}
                                </span>
                                {selectedCard === card && (
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Battle Results */}
                    {selectedCard && (
                        <div className="border-t pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                {/* Player Card */}
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Card</h3>
                                    <div className={`
                                        ${getCardBg(selectedCard)} 
                                        rounded-lg shadow-lg p-4 h-20 flex items-center justify-center mx-auto w-16
                                    `}>
                                        <span className={`text-2xl font-bold ${getCardColor(selectedCard)}`}>
                                            {selectedCard}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">Value: {faceConfigId[selectedCard]}</p>
                                </div>

                                {/* VS and Result */}
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-400 mb-2">VS</div>
                                    {gameResult && (
                                        <div className="flex items-center justify-center gap-2">
                                            {getResultIcon()}
                                            <span className={`text-xl font-bold ${getResultColor()}`}>
                                                {gameResult}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Computer Card */}
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Computer Card</h3>
                                    <div className={`
                                        ${isAnimating ? 'animate-spin' : ''} 
                                        ${computerSelection ? getCardBg(faceCardLabel || computerSelection.toString()) : 'bg-gray-200'}
                                        rounded-lg shadow-lg p-4 h-20 flex items-center justify-center mx-auto w-16
                                    `}>
                                        {isAnimating ? (
                                            <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <span className={`text-2xl font-bold ${computerSelection ? getCardColor(faceCardLabel || computerSelection.toString()) : 'text-gray-400'}`}>
                                                {faceCardLabel || computerSelection || '?'}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Value: {computerSelection || '?'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {gameResult && (
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={playAgain}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Play Again
                            </button>
                            <button
                                onClick={resetGame}
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset Game
                            </button>
                        </div>
                    )}
                </div>

                {/* Game History */}
                {gameHistory.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Games</h3>
                        <div className="space-y-2">
                            {gameHistory.map((game, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                                    <div className="flex items-center gap-4">
                                        <span className="font-medium">You: {game.player}</span>
                                        <span className="text-gray-400">vs</span>
                                        <span className="font-medium">Computer: {game.computer}</span>
                                    </div>
                                    <span className={`
                                        px-3 py-1 rounded-full text-sm font-medium
                                        ${game.result === 'WON' ? 'bg-green-100 text-green-700' : 
                                          game.result === 'LOST' ? 'bg-red-100 text-red-700' : 
                                          'bg-yellow-100 text-yellow-700'}
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