import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";
import Messages from "./components/Messages";
import Input from "./components/Input";

import API from "./ChatbotAPI";

import "./styles.css";
import Header from "./components/Header";
const axios = require('axios');
function Chatbot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // async function loadWelcomeMessage() {
    //   setMessages([
    //     <BotMessage
    //       key="0"
    //       fetchMessage={async () => await API.GetChatbotResponse("hi")}
    //     />
    //   ]);
    // }
    // loadWelcomeMessage();
  }, []);

  const send = async text => {
    axios
    .post(`https://reactintegrationsource.herokuapp.com/talktochatbot`, {
      text: text,
    })
    .then((response) => {
      console.log("response", response.data.text);
      const newMessages = messages.concat(
        <UserMessage key={messages.length + 1} text={text} />,
        <BotMessage
          key={messages.length + 2}
          fetchMessage={async () => await API.GetChatbotResponse(response.data.text)}
        />
      );
      // setMessages((prev) => {
      //   return [{ sender: "bot", text: response.data.text }, ...prev];
      // });
      // e.target.reset();
      // setText("");
      setMessages(newMessages);
    })
    .catch((error) => {
      console.log("error: ", error);

      // setMessages((prev) => {
      //   return [
      //     { sender: "bot", text: "dummy response from chatbot" },
      //     ...prev,
      //   ];
      // });
      // e.target.reset();
      // setText("");
    });
   
    
  };

  return (
    <div className="chatbot">
      <Header />
      <Messages messages={messages} />
      <Input onSend={send} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Chatbot />, rootElement);
