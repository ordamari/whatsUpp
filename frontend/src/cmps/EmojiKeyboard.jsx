import React, { useEffect, useState } from 'react';
import { emojisService } from '../services/emojisService'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PetsIcon from '@material-ui/icons/Pets';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { storageService } from '../services/storageService'


export default function EmojiKeyboard({ addEmoji }) {

  const [elContainer, setElContainer] = useState(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [elEmojisGroup, setElEmojisGroup] = useState({});
  const [currDiv, setCurrDiv] = useState(0);
  const [recent, setRecent] = useState([]);
  const emojis = emojisService.query();

  useEffect(() => {
    if (elEmojisGroup.animal &&
      elEmojisGroup.food &&
      elEmojisGroup.sport &&
      elEmojisGroup.travel &&
      elEmojisGroup.oblect &&
      elContainer) {
      if (scrollTop < elEmojisGroup.smileys.offsetTop - elContainer.offsetTop) setCurrDiv(0);
      else if (scrollTop < elEmojisGroup.animal.offsetTop - elContainer.offsetTop) setCurrDiv(1);
      else if (scrollTop < elEmojisGroup.food.offsetTop - elContainer.offsetTop) setCurrDiv(2);
      else if (scrollTop < elEmojisGroup.sport.offsetTop - elContainer.offsetTop) setCurrDiv(3);
      else if (scrollTop < elEmojisGroup.travel.offsetTop - elContainer.offsetTop) setCurrDiv(4);
      else if (scrollTop < elEmojisGroup.oblect.offsetTop - elContainer.offsetTop) setCurrDiv(5);
      else if (scrollTop < elEmojisGroup.symbols.offsetTop - elContainer.offsetTop) setCurrDiv(6);
      else setCurrDiv(7)
    }
  }, [scrollTop])

  useEffect(() => {
    const newRecent = storageService.loadFromStorage('recentEmojis');
    if (newRecent) setRecent(newRecent)
  }, [])

  function onAddEmoji(addedEmoji) {
    const idx = recent.findIndex(emoji => emoji === addedEmoji);
    if (idx === -1) {
      storageService.saveToStorage('recentEmojis', [addedEmoji, ...recent])
      setRecent(prevState => [addedEmoji, ...prevState]);
    } else {
      const newRecent = recent.filter((emoji, emojiIdx) => idx !== emojiIdx);
      storageService.saveToStorage('recentEmojis', [addedEmoji, ...newRecent])
      setRecent([addedEmoji, ...newRecent]);
    }
    addEmoji(addedEmoji)
  }

  return (
    <div className='emoji-keyboard'>
      <div className="nav flex">
        <div className={currDiv === 0 ? 'curr' : ''} onClick={() => { elContainer.scrollTo(0, elEmojisGroup.recent.offsetTop - elContainer.offsetTop) }} ><AccessTimeIcon /></div>
        <div className={currDiv === 1 ? 'curr' : ''} onClick={() => { elContainer.scrollTo(0, elEmojisGroup.smileys.offsetTop - elContainer.offsetTop) }} ><InsertEmoticonIcon /></div>
        <div className={currDiv === 2 ? 'curr' : ''} onClick={() => { elContainer.scrollTo(0, elEmojisGroup.animal.offsetTop - elContainer.offsetTop) }}><PetsIcon /></div>
        <div className={currDiv === 3 ? 'curr' : ''} onClick={() => { elContainer.scrollTo(0, elEmojisGroup.food.offsetTop - elContainer.offsetTop) }} ><LocalBarIcon /></div>
        <div className={currDiv === 4 ? 'curr' : ''} onClick={() => { elContainer.scrollTo(0, elEmojisGroup.sport.offsetTop - elContainer.offsetTop) }}><SportsSoccerIcon /></div>
        <div className={currDiv === 5 ? 'curr' : ''} onClick={() => { elContainer.scrollTo(0, elEmojisGroup.travel.offsetTop - elContainer.offsetTop) }}><DriveEtaIcon /></div>
        <div className={currDiv === 6 ? 'curr' : ''} onClick={() => { elContainer.scrollTo(0, elEmojisGroup.oblect.offsetTop - elContainer.offsetTop) }}><EmojiObjectsIcon /></div>
        <div className={currDiv === 7 ? 'curr' : ''} onClick={() => { elContainer.scrollTo(0, elEmojisGroup.symbols.offsetTop - elContainer.offsetTop) }} ><EmojiSymbolsIcon /></div>
      </div>
      <div ref={(el) => setElContainer(el)} onScroll={() => { setScrollTop(elContainer.scrollTop); }} className="container">
        <div ref={(el) => { if (el && !elEmojisGroup.recent) setElEmojisGroup(prevState => ({ ...prevState, recent: el })) }} ></div>
        <p>Recent</p>
        <div className="emojies-container">
          {recent.map((emoji, idx) => <span key={idx} onClick={() => { onAddEmoji(emoji) }}>{emoji}</span>)}
        </div>
        <div ref={(el) => { if (el && !elEmojisGroup.smileys) setElEmojisGroup(prevState => ({ ...prevState, smileys: el })) }} ></div>
        <p>{'Smileys & People'}</p>
        <div className="emojies-container">
          {emojis.smileys.map((emoji, idx) => <span key={idx} onClick={() => { onAddEmoji(emoji) }}>{emoji}</span>)}
          {emojis.bodyParts.map((emoji, idx) => <span key={idx} onClick={() => { onAddEmoji(emoji) }}>{emoji}</span>)}
          {emojis.people.map((emoji, idx) => <span key={idx} onClick={() => { onAddEmoji(emoji) }}>{emoji}</span>)}
          {emojis.accessories.map((emoji, idx) => <span key={idx} onClick={() => { onAddEmoji(emoji) }}>{emoji}</span>)}
        </div>
        <div ref={(el) => { if (el && !elEmojisGroup.animal) setElEmojisGroup(prevState => ({ ...prevState, animal: el })) }} ></div>
        <p>{'Animal & Nature'}</p>
        <div className="emojies-container">
          {emojis.animal.map((emoji, idx) => <span key={idx} onClick={() => { onAddEmoji(emoji) }}>{emoji}</span>)}
        </div>
        <div ref={(el) => { if (el && !elEmojisGroup.food) setElEmojisGroup(prevState => ({ ...prevState, food: el })) }} ></div>
        <p>{'Food & Drink'}</p>
        <div className="emojies-container">
          {emojis.food.map((emoji, idx) => <span key={idx} onClick={() => { onAddEmoji(emoji) }}>{emoji}</span>)}
        </div>
        <div ref={(el) => { if (el && !elEmojisGroup.sport) setElEmojisGroup(prevState => ({ ...prevState, sport: el })) }} ></div>
        <p>Activity</p>
        <div className="emojies-container">
          {emojis.sport.map((emoji, idx) => <span key={idx} onClick={() => { onAddEmoji(emoji) }}>{emoji}</span>)}
        </div>
        <div ref={(el) => { if (el && !elEmojisGroup.travel) setElEmojisGroup(prevState => ({ ...prevState, travel: el })) }} ></div>
        <p>{'Travel & Places'}</p>
        <div className="emojies-container">
          {emojis.travel.map((emoji, idx) => <span key={idx} onClick={() => { onAddEmoji(emoji) }}>{emoji}</span>)}
        </div>
        <div ref={(el) => { if (el && !elEmojisGroup.oblect) setElEmojisGroup(prevState => ({ ...prevState, oblect: el })) }} ></div>
        <p>Objects</p>
        <div className="emojies-container">
          {emojis.oblect.map((emoji, idx) => <span key={idx} onClick={() => { onAddEmoji(emoji) }}>{emoji}</span>)}
        </div>
        <div ref={(el) => { if (el && !elEmojisGroup.symbols) setElEmojisGroup(prevState => ({ ...prevState, symbols: el })) }} ></div>
        <p>Symbols</p>
        <div className="emojies-container">
          {emojis.symbols.map((emoji, idx) => <span key={idx} onClick={() => { onAddEmoji(emoji) }}>{emoji}</span>)}
        </div>
      </div>


    </div>
  )
}

