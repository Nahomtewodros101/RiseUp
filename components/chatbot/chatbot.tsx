"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import {
  ChatbotService,
  type ChatMessage,
  type ChatOption,
} from "@/lib/chatbot";
import { useRouter } from "next/navigation";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbot = ChatbotService.getInstance();
  const router = useRouter();

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatbot-messages");
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map(
        (msg: ChatMessage) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })
      );
      setMessages(parsedMessages);
    } else {
      const welcomeMessage: ChatMessage = {
        id: "1",
        text: "Hi there! 👋 I'm Qemem Assistant. How can I help you today?",
        isBot: true,
        timestamp: new Date(),
        type: "options",
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatbot-messages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (text: string, isBot: boolean, type?: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      type: (type as ChatMessage["type"]) || "text",
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;

    addMessage(messageText, false);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = chatbot.generateResponse(messageText);
      addMessage(response.text, true, response.type);
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionClick = (option: ChatOption) => {
    addMessage(option.text, false);
    setIsTyping(true);

    setTimeout(() => {
      const response = chatbot.getResponseByAction(option.action);
      addMessage(response.text, true, response.type);

      const redirectUrl = chatbot.handleAction(option.action);
      if (redirectUrl) {
        setTimeout(() => {
          router.push(redirectUrl);
          setIsOpen(false);
        }, 1500);
      }

      setIsTyping(false);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chatbot-messages");
    const welcomeMessage: ChatMessage = {
      id: "1",
      text: "Hi there! 👋 I'm Qemem Assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
      type: "options",
    };
    setMessages([welcomeMessage]);
  };

  const renderMessage = (message: ChatMessage) => {
    const isGreeting = message.text.includes("Hi there! 👋");
    const hasOptions = isGreeting || message.type === "options";
    console.log(hasOptions);
    const timestamp =
      message.timestamp instanceof Date
        ? message.timestamp
        : new Date(message.timestamp);

    return (
      <div
        key={message.id}
        className={`flex ${
          message.isBot ? "justify-start" : "justify-end"
        } mb-4`}
      >
        <div
          className={`flex items-start space-x-2 max-w-[80%] ${
            message.isBot ? "" : "flex-row-reverse space-x-reverse"
          }`}
        >
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.isBot
                ? "bg-blue-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {message.isBot ? <Bot size={16} /> : <User size={16} />}
          </div>
          <div
            className={`rounded-lg p-3 break-words overflow-wrap-anywhere ${
              message.isBot
                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                : "bg-blue-500 text-white"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words overflow-wrap-anywhere">
              {message.text}
            </p>
            <p className="text-xs opacity-70 mt-1">
              {timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderOptions = () => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.isBot || lastMessage.type !== "options") return null;

    const response = lastMessage.text.includes("Hi there! 👋")
      ? chatbot.getResponseByAction("greeting")
      : chatbot.generateResponse(lastMessage.text);

    if (!response.options) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-4 px-4">
        {response.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleOptionClick(option)}
            className="text-xs hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
          >
            {option.text}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-20 h-20 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-700 hover:scale-110 active:scale-95 ${
            !isOpen ? "animate-bounce" : ""
          }`}
          size="icon"
        >
          {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
        </Button>
        {!isOpen && messages.length > 1 && (
          <Badge className="absolute -top-3 -left-3 bg-red-500 text-white text-sm w-8 h-8 flex items-center justify-center rounded-full">
            {messages.filter((m) => m.isBot).length}
          </Badge>
        )}
      </div>

      {isOpen && (
        <div className="fixed bottom-28 right-6 w-96 h-[500px] z-40 animate-in slide-in-from-bottom-5">
          <Card className="h-full flex flex-col shadow-2xl border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">Qemem </CardTitle>
                    <p className="text-xs text-muted-foreground">Online now</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-xs"
                >
                  Clear
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[calc(100%-140px)]">
                {messages.map(renderMessage)}

                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {renderOptions()}

              <div className="border-t p-4 bg-white dark:bg-gray-900">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
