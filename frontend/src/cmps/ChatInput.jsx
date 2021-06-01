import React, { useEffect, useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import TextareaAutosize from 'react-textarea-autosize';


export default function ChatInput({
    onSendMsg,
    toggleIsEmojiKeyboardOpen,
    isEmojiKeyboardOpen,
    setIsEmojiKeyboardOpen,
    setElInput,
    newMsgInfo,
    setNewMsgInfo }) {

        console.log(newMsgInfo.replace(/\s+/g, ' ').trim());

    return (
        <form className="chat-input">
            <button
                className="emoji"
                type='button'
                onClick={toggleIsEmojiKeyboardOpen}
            >
                {isEmojiKeyboardOpen ? <KeyboardIcon /> : <InsertEmoticonIcon />}
            </button>
            <TextareaAutosize
            onFocus={() => { setIsEmojiKeyboardOpen(false) }}
            ref={(el) => { setElInput(el) }}
            type="text" value={newMsgInfo}
            onChange={({ target }) => { setNewMsgInfo(target.value) }}
            placeholder="Type a message"
            maxRows={6}
            />
            <button
                className="send"
                onClick={(ev) => { onSendMsg(ev) }}
            >
                <SendIcon />
            </button>
        </form>
    )
}