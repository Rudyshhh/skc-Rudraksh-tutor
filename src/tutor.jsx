import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Menu, Send, Loader2 } from 'lucide-react'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const API_KEY = "AIzaSyDHn-oScIvJPt5td5SKqz7fFYLPS2bq_mo"
const MAX_RETRIES = 100
const RETRY_DELAY = 1000

const Card = ({ title, content }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-300">{content}</p>
  </div>
)

const Button = ({ children, onClick, className, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
)

const Input = ({ value, onChange, onKeyPress, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
    placeholder={placeholder}
    className="w-full p-3 bg-gray-800 rounded-full border border-gray-700 focus:ring-2 focus:ring-teal-500 text-white"
  />
)

export default function PythonTutor() {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isQuizMode, setIsQuizMode] = useState(false)
  const chatRef = useRef(null)
  const chatContainerRef = useRef(null)

  const genAI = new GoogleGenerativeAI(API_KEY)

  const generateResponse = useCallback(async (retryCount = 0) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const prompt = `You are a Python Tutor. Your student asks: "${input}"
    Talk like a human, if input is not a quetion or a lesson.
    If its a question.
    Please explain this concept in a simple and clear way, suitable for a beginner. Break it down into easy-to-understand steps and provide multiple examples wherever applicable. 
    Include the following:
    1. A basic explanation of the concept.
    2. Real-life analogies to help the student understand better.
    3. One or more examples of how the concept is used in Python code, with an explanation of each step in the example.
    4. Any common mistakes beginners might make, and how to avoid them.
    5. If applicable, suggest resources or next steps the student can take to learn more about this topic.
    Never use * and astericks, do not use any formatting in your answers. 
    Do not use any markdown formatting in your response. 
    You can use new lines but no * or ** at all , no formatting allowed. 
    Your goal is to make the concept as approachable and understandable as possible for a new Python learner. Be friendly and patient in your response!`
    
    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      setMessages(prev => [...prev, { role: 'assistant', content: text }])
      setError(null)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => generateResponse(retryCount + 1), RETRY_DELAY)
      } else {
        setError("Failed to generate response. Please try again.")
        setLoading(false)
      }
    }
  }, [input, genAI])

  const handleSend = useCallback(() => {
    if (input.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: input }])
      setLoading(true)
      setError(null)
      generateResponse()
      setInput('')
    }
  }, [input, generateResponse])

  useEffect(() => {
    if (showChat && messages.length === 0) {
      setInput("I want to learn Python!")
      handleSend()
    }
  }, [showChat, messages.length, handleSend])

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (showChat) {
      chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [showChat])

  const handleLogout = () => {
    navigate('/');
  };

  const navigate = useNavigate();

  const startQuiz = () => {
    setIsQuizMode(true);
    setShowChat(false);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-teal-900 p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img
            className="h-14 w-14 text-yellow-400"
            src="/logo.png"
            alt="Soulace logo"
          />
          <h1 className="text-3xl font-bold random">Python Tutor</h1>
        </Link>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Learn Python with Charlie</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            title="What is Python?"
            content="Python is a programming language that is simple and fun to learn. It helps you give instructions to the computer to do things like solving math problems, drawing pictures, or even making games!"
          />
          <Card
            title="Variables"
            content="A variable is like a box where you can store information. You can put things in the box and give it a name, like 'x' or 'age', to keep track of them."
          />
          <Card
            title="Loops"
            content="A loop lets you do the same thing over and over again. For example, you can tell the computer to print 'Hello' 5 times with just one line of code!"
          />
        </div>

        {!showChat && !isQuizMode && (
          <Button onClick={() => setShowChat(true)} className="w-full max-w-md mx-auto block">
            Chat with Charlie
          </Button>
        )}

        {showChat && (
          <div ref={chatContainerRef} className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">Chat with Charlie</h3>
            <div ref={chatRef} className="h-96 overflow-y-auto mb-4 pr-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${message.role === 'user' ? 'bg-teal-600' : 'bg-gray-700'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 px-4 py-2 rounded-lg">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                </div>
              )}
            </div>
            {error && (
              <div className="bg-red-600 text-white p-4 rounded-lg mb-4">
                {error}
              </div>
            )}
            <div className="flex items-center mt-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me about Python..."
              />
              <Button onClick={handleSend} className="ml-2 px-4" disabled={loading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        )}

        {!isQuizMode && (
          <div className="text-center mt-8">
            <Link to="/PQuiz">
              <Button className="w-full max-w-md mx-auto block">
                Click here for quiz!
              </Button>
            </Link>
          </div>
        )}

        {isQuizMode && (
          <div className="text-center mt-8">
            <Button onClick={startQuiz} className="w-full max-w-md mx-auto block">
              Start Python Quiz
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
