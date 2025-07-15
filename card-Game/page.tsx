'use client'
import React, { useEffect, useState } from 'react'

const faceConfigId = {
    '2':1,
    '3':2,
    '4':3,
    '5': 4,
    '6':5,
    '7':6,
    '8':7,
    '9':8,
    '10':9,
    'J': 10,
    'Q': 11,
    'K': 12,
    'A': 13
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  // ['K',6,2,1,4....]
const shuffledCards = shuffleArray(Object.keys(faceConfigId))
const Cards = () => {
    const [selectedCard, setSelectedCard] = useState(null)
    const [computerSelection, setComputerSection] = useState(null)
    const faceCardLabel = Object.keys(faceConfigId).find(item=>faceConfigId[item] == computerSelection)
    useEffect(()=>{
        if(selectedCard) {
            const randomNum = Math.ceil(Math.random() *13)
            setComputerSection(randomNum)
        }
    },[selectedCard])
  return (
    <div>
        {shuffledCards.map((item, index) => {
            return (
                <div onClick={()=>setSelectedCard(item)} key={index} 
                className='p-2 m-2 shadow-lg w-8 h-8 bg-slate-400 rounded-sm'>
                    <h1>{selectedCard === item && item}</h1>
                {/* show that particular item if that is selected */}
                    </div>
            )
        })}
        computer chose: {faceCardLabel || computerSelection}
        { faceConfigId[faceCardLabel|| computerSelection] >  faceConfigId[selectedCard] ? "LOST": "WON"}
         <br/>
    </div>
  )
}

export default Cards