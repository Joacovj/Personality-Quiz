import Header from "./components/Header.jsx";
import UserForm from "./components/UserForm.jsx";
import { UserProvider} from "./components/UserContext.jsx";
import { useState, useEffect } from "react";
import Question from "./components/Question.jsx";
import Results from "./components/Results.jsx";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";

export default function App() { 
  const questions = [
    {
      question: "If you had to pick a weapon, which would you choose?",
      options: ["Blade 🔪", "Bow 🏹", "Staff 🧙🏽‍♂️", "Shield 🛡"],
    },
    {
      question: "What's your favorite bioma?",
      options: ["Desert 🌵", "Woods 🌲", "Mountains 🌄", "Grassland 🦗"],
    },
    {
      question: "What's your most hated season?",
      options: ["Summer ☀", "Winter ❄", "Autumn 🍁", "Spring 🌼"],
    },
    {
      question: "I don't know what else to ask, so here, pick a number: ",
      options: ["6", "2", "7", "4"],
    },
  ];  

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Blade 🔪": "Fire 🔥",
    "Shield 🛡": "Water 🌊",
    "Staff 🧙🏽‍♂️": "Earth 🌄",
    "Bow 🏹": "Air ☁",

    "Desert 🌵": "Fire 🔥",
    "Woods 🌲": "Water 🌊",
    "Mountains 🌄": "Earth 🌄",
    "Grassland 🦗": "Air ☁",

    "Summer ☀": "Water 🌊",
    "Winter ❄": "Fire 🔥",
    "Autumn 🍁": "Air ☁",
    "Spring 🌼": "Earth 🌄",

    "2": "Fire 🔥",
    "7": "Water 🌊",
    "4": "Earth 🌄",
    "6": "Air ☁",    
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([])
  const [userName, setUserName] = useState("")
  const [element, setElement] = useState("")
  const [artwork, setArtwork] = useState(null)

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  async function fetchArtwork(){

    try{
      const url = "https://api.thecatapi.com/v1/images/search";
      const response = await fetch(url);

      if(!response.ok){
        throw new Error("Error fetching the kitten");
      }
      const data = await response.json();           
      setArtwork(data); 

    } catch(error){
      console.log(error.message);
    }
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork();        
      }
    },
    [currentQuestionIndex]
  );

  return (
    <div className="wrapper">    
      <Header />

      <UserProvider>      
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
              ) : (                
                <Results element={element} artwork={artwork} />
              )
            }
          />
      </Routes>
    </UserProvider>
    
    <Footer />
  </div>
  )
}


