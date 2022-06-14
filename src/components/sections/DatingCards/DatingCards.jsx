import './DatingCards.scss'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import DatingCard from 'react-tinder-card'
import axios from '../../axios'
import { IconButton } from '@mui/material'
import { Close, Favorite} from '@mui/icons-material'

const DatingCards = () => {

  const [people, setPeople] = useState([])
  const [currentIndex, setCurrentIndex] = useState()
  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)
  // used for outOfFrame closure

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/dating/cards")
      setPeople(req.data)
    }
    fetchData()
    setCurrentIndex(people.length - 1)
  }, [people.length])

  const childRefs = useMemo(
    () =>
      Array(people.length)
        .fill(0)
        .map((i) => React.createRef()),
    [people.length]
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < people.length - 1

  const canSwipe = currentIndex >= 0

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < people.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)

    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }

  return (
    <>
    <div className="datingCards">
      <div className="datingCards__container">
        {people.map((person, index) => (
          <DatingCard
            className='swipe'
            ref={childRefs[index]}
            key={person.name}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, person.name, index)}
            onCardLeftScreen={() => outOfFrame(person.name, index)}
            >
              <div className="card" style={{backgroundImage: `url(${person.imgUrl})`}}>
                <div className="name__wrapper">
                  <h3>{person.name}</h3>
                </div>
              </div>

          </DatingCard>

        ))}
      </div>
    </div>

    <div className="swipeButtons">
      <IconButton className='swipeButtons__left' onClick={() => swipe('left')}>
        <Close fontSize='large' />
      </IconButton>
      <IconButton className='swipeButtons__right' onClick={() => swipe('right') }>
        <Favorite fontSize='large' />
      </IconButton>
    </div>

    </>
  )
}

export default DatingCards