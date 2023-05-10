import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { chatInit, sendMsg, chatHistory } from '../network/chat';
import { useAuth } from "../auth/auth";
import { useIsFocused } from '@react-navigation/native'


export default function Chat(props) {
  const auth = useAuth();
  const isFocused = useIsFocused()

  let { adsId, adsOwner, chatData } = props.route.params
  const [messages, setMessages] = useState([]);
  const [chatDetails, setChatDetails] = useState({})

  const processMsgData = (data) => {
    const { messages = [] } = data
    const formatMsg = messages.map((ele, idx) => {
      return {
        _id: idx,
        text: ele.msg,
        createdAt: ele.createdAt,
        user: {
          _id: ele.userId == auth.user._id ? 1 : 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      }
    })
    setMessages(formatMsg.reverse());
  }

  const refreshChat = () => {
    if(chatDetails?._id){
      chatHistory(chatDetails._id)
        .then(resA => {
          processMsgData(resA.data);
        }).catch(err => console.log(err));
    } else if(chatData?._id) {
      chatHistory(chatData._id)
        .then(resA => {
          processMsgData(resA.data);
        }).catch(err => console.log(err));
    }else {
      hydrateChat();
    }
  }

  const hydrateChat = () => {
    if (chatData) {
      console.log(chatData);
      setChatDetails(chatData);
      processMsgData(chatData);
    } else {
      chatInit(adsId, adsOwner)
        .then(resA => {
          setChatDetails(resA.data);
          processMsgData(resA.data);
        }).catch(err => console.log(err));
    }
  }

  useEffect(() => {
    hydrateChat();
  }, [])

  useEffect(() => {
    const lTimer = setInterval(() => refreshChat(), 5000);

    return () => {
      console.log("unmount");
      clearInterval(lTimer);
    }
  }, [isFocused])

  const onSend = (messages = []) => {
    console.log(chatDetails._id)
    sendMsg(chatDetails._id, messages[messages.length - 1].text);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}