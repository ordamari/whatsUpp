import React from 'react';
import whatsappImg from '../assets/imgs/whatssapp.jpg'

export default function ChatInfoNoChat() {
    return (
        <div className="no-chat">
            <img src={whatsappImg} alt="" />
            <h2>Welcome to whatsUpp</h2>
            <p>enjoy and invite your friends to chat with whatsUpp</p>
        </div>
    )
}