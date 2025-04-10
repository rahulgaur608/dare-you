import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Button } from '@/components/ui/button';
import QuestionCard from '@/components/QuestionCard';
import { getRandomQuestion, QuestionType, IntensityLevel } from '@/lib/questionService';

const StyledWrapper = styled.div<{ intensity: IntensityLevel }>`
  .min-h-screen {
    background: ${props => {
      switch (props.intensity) {
        case 'casual':
          return '#2a1a30';
        case 'medium':
          return '#321a2e';
        case 'spicy':
          return '#3a1a26';
        case 'extreme':
          return '#3f1520';
        default:
          return '#2a1a30';
      }
    }};
    color: #fff;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    margin-top: 2rem;
    width: 100%;
    max-width: 300px;
  }

  .button-truth, .button-dare {
    font-weight: bold;
    padding: 0.8rem 1.5rem;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 
      6px 6px 12px rgba(0, 0, 0, 0.25),
      -6px -6px 12px rgba(255, 255, 255, 0.1),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
  }

  .button-truth {
    background: ${props => {
      switch (props.intensity) {
        case 'casual': return 'linear-gradient(135deg, #3a2045 0%, #4e2a5a 100%)';
        case 'medium': return 'linear-gradient(135deg, #4e2045 0%, #602a58 100%)';
        case 'spicy': return 'linear-gradient(135deg, #5e2035 0%, #702a45 100%)';
        case 'extreme': return 'linear-gradient(135deg, #601525 0%, #7a1f35 100%)';
        default: return 'linear-gradient(135deg, #3a2045 0%, #4e2a5a 100%)';
      }
    }};
    color: ${props => {
      switch (props.intensity) {
        case 'casual': return '#d8a0ff';
        case 'medium': return '#e8a0ff';
        case 'spicy': return '#ff9fb5';
        case 'extreme': return '#ff8daa';
        default: return '#d8a0ff';
      }
    }};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        8px 8px 16px rgba(0, 0, 0, 0.3),
        -8px -8px 16px rgba(255, 255, 255, 0.1),
        inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 
        2px 2px 4px rgba(0, 0, 0, 0.3),
        -2px -2px 4px rgba(255, 255, 255, 0.05),
        inset 2px 2px 4px rgba(0, 0, 0, 0.2),
        inset -2px -2px 4px rgba(255, 255, 255, 0.05);
    }
  }

  .button-dare {
    background: ${props => {
      switch (props.intensity) {
        case 'casual': return 'linear-gradient(135deg, #3a2045 0%, #4e2a5a 100%)';
        case 'medium': return 'linear-gradient(135deg, #4e2045 0%, #602a58 100%)';
        case 'spicy': return 'linear-gradient(135deg, #5e2035 0%, #702a45 100%)';
        case 'extreme': return 'linear-gradient(135deg, #601525 0%, #7a1f35 100%)';
        default: return 'linear-gradient(135deg, #3a2045 0%, #4e2a5a 100%)';
      }
    }};
    color: ${props => {
      switch (props.intensity) {
        case 'casual': return '#d8a0ff';
        case 'medium': return '#e8a0ff';
        case 'spicy': return '#ff9fb5';
        case 'extreme': return '#ff8daa';
        default: return '#d8a0ff';
      }
    }};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        8px 8px 16px rgba(0, 0, 0, 0.3),
        -8px -8px 16px rgba(255, 255, 255, 0.1),
        inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 
        2px 2px 4px rgba(0, 0, 0, 0.3),
        -2px -2px 4px rgba(255, 255, 255, 0.05),
        inset 2px 2px 4px rgba(0, 0, 0, 0.2),
        inset -2px -2px 4px rgba(255, 255, 255, 0.05);
    }
  }

  .magic-text {
    animation: magicTextIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes magicTextIn {
    0% {
      opacity: 0;
      filter: blur(15px);
      transform: scale(1.2);
      text-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
    }
    100% {
      opacity: 1;
      filter: blur(0);
      transform: scale(1);
      text-shadow: 0 0 0 transparent;
    }
  }

  .magic-question-in {
    animation: magicCardIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes magicCardIn {
    0% {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
      filter: brightness(1.5) contrast(1.2);
    }
    20% {
      filter: brightness(1.3) contrast(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
      filter: brightness(1) contrast(1);
    }
  }

  @keyframes buttonShine {
    0% {
      transform: rotate(30deg) translate(-100%, -100%);
    }
    100% {
      transform: rotate(30deg) translate(100%, 100%);
    }
  }
  
  @keyframes liquid-spin {
    0% {
      transform: rotate(0deg);
      border-radius: 40%;
    }
    25% {
      border-radius: 45% 35% 40% 40%;
    }
    50% {
      transform: rotate(180deg);
      border-radius: 35% 45% 35% 45%;
    }
    75% {
      border-radius: 40% 40% 45% 35%;
    }
    100% {
      transform: rotate(360deg);
      border-radius: 40%;
    }
  }
  
  .player-indicator {
    background: ${props => {
      switch (props.intensity) {
        case 'casual': return '#3a2045';
        case 'medium': return '#4e2045';
        case 'spicy': return '#5e2035';
        case 'extreme': return '#601525';
        default: return '#3a2045';
      }
    }};
    color: ${props => {
      switch (props.intensity) {
        case 'casual': return '#d8a0ff';
        case 'medium': return '#e8a0ff';
        case 'spicy': return '#ff9fb5';
        case 'extreme': return '#ff8daa';
        default: return '#d8a0ff';
      }
    }};
    padding: 0.7rem 1.5rem;
    border-radius: 15px;
    font-size: 1.1rem;
    font-weight: bold;
    box-shadow: 
      6px 6px 12px rgba(0, 0, 0, 0.25),
      -6px -6px 12px rgba(255, 255, 255, 0.1),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .player-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${props => {
      switch (props.intensity) {
        case 'casual': return '#2a1a30';
        case 'medium': return '#321a2e';
        case 'spicy': return '#3a1a26';
        case 'extreme': return '#3f1520';
        default: return '#2a1a30';
      }
    }};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
      inset 2px 2px 4px rgba(0, 0, 0, 0.2),
      inset -2px -2px 4px rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
  }
  
  .player-avatar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => {
      switch (props.intensity) {
        case 'casual': return 'radial-gradient(circle, #d8a0ff 0%, transparent 70%)';
        case 'medium': return 'radial-gradient(circle, #e8a0ff 0%, transparent 70%)';
        case 'spicy': return 'radial-gradient(circle, #ff9fb5 0%, transparent 70%)';
        case 'extreme': return 'radial-gradient(circle, #ff8daa 0%, transparent 70%)';
        default: return 'radial-gradient(circle, #d8a0ff 0%, transparent 70%)';
      }
    }};
    opacity: 0.5;
  }
  
  .player-avatar-container {
    position: relative;
  }
  
  .crown {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    color: ${props => {
      switch (props.intensity) {
        case 'casual': return '#FFD700';
        case 'medium': return '#FFD700';
        case 'spicy': return '#FFD700';
        case 'extreme': return '#FFD700';
        default: return '#FFD700';
      }
    }};
    font-size: 14px;
    text-shadow: 0 0 3px rgba(0,0,0,0.5);
    animation: float 2s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-3px);
    }
  }
  
  .player-avatar span {
    font-size: 15px;
    color: #ffffff;
    z-index: 1;
  }
  
  @keyframes spotlight {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.05);
    }
  }
  
  .turn-text {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.8;
    }
    50% {
      opacity: 1;
    }
  }
  
  .back-button {
    background: ${props => {
      switch (props.intensity) {
        case 'casual': return '#3a2045';
        case 'medium': return '#4e2045';
        case 'spicy': return '#5e2035';
        case 'extreme': return '#601525';
        default: return '#3a2045';
      }
    }};
    color: ${props => {
      switch (props.intensity) {
        case 'casual': return '#d8a0ff';
        case 'medium': return '#e8a0ff';
        case 'spicy': return '#ff9fb5';
        case 'extreme': return '#ff8daa';
        default: return '#d8a0ff';
      }
    }};
    padding: 0.7rem;
    font-weight: bold;
    border-radius: 50%;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    box-shadow: 
      6px 6px 12px rgba(0, 0, 0, 0.25),
      -6px -6px 12px rgba(255, 255, 255, 0.1),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    border: none;
    font-size: 1.2rem;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        8px 8px 16px rgba(0, 0, 0, 0.3),
        -8px -8px 16px rgba(255, 255, 255, 0.1),
        inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 
        2px 2px 4px rgba(0, 0, 0, 0.3),
        -2px -2px 4px rgba(255, 255, 255, 0.05),
        inset 2px 2px 4px rgba(0, 0, 0, 0.2),
        inset -2px -2px 4px rgba(255, 255, 255, 0.05);
    }
  }

  .arrow-icon {
    display: block;
    width: 18px;
    height: 18px;
  }

  @keyframes pulse-icon {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  .icon-pulse {
    display: inline-block;
    animation: pulse-icon 2s infinite;
  }

  .truth-icon {
    animation-delay: 0.5s;
  }

  .dare-icon {
    animation-delay: 0s;
  }

  .magic-player-in {
    animation: magicPlayerIn 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  }
  
  @keyframes magicPlayerIn {
    0% {
      opacity: 0;
      transform: translateY(-15px) scale(0.9);
      filter: brightness(2);
      text-shadow: 0 0 20px currentColor;
    }
    50% {
      filter: brightness(1.5);
      text-shadow: 0 0 10px currentColor;
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: brightness(1);
      text-shadow: none;
    }
  }
`;

const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [question, setQuestion] = useState<string>('');
  const [questionType, setQuestionType] = useState<QuestionType>('truth');
  const [playerTurn, setPlayerTurn] = useState<number>(1);
  const [animatePlayer, setAnimatePlayer] = useState<boolean>(true);
  
  // Get state from location or use defaults
  const intensity = (location.state?.intensity || 'casual') as IntensityLevel;
  const playerCount = location.state?.playerCount || 2;
  
  useEffect(() => {
    newQuestion('truth');
  }, []);
  
  const newQuestion = (type: QuestionType) => {
    setQuestionType(type);
    setQuestion(getRandomQuestion(type, intensity));
  };
  
  const nextPlayer = () => {
    setAnimatePlayer(false);
    // Small delay before changing player to allow animation to reset
    setTimeout(() => {
      setPlayerTurn(current => current < playerCount ? current + 1 : 1);
      setAnimatePlayer(true);
    }, 50);
  };
  
  const handleNextQuestion = (type: QuestionType) => {
    newQuestion(type);
    nextPlayer();
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  const getTurnMessage = () => {
    const messages = {
      casual: [
        "It's Your Turn!",
        "Your Move!",
        "Time to Play!",
        "Ready?",
      ],
      medium: [
        "Your Turn, Be Bold!",
        "Time to Shine!",
        "Show Us What You Got!",
        "The Stage is Yours!",
      ],
      spicy: [
        "Feeling Brave?",
        "Your Moment of Truth!",
        "Dare if You Dare!",
        "This Could Get Interesting...",
      ],
      extreme: [
        "Brace Yourself!",
        "No Holding Back Now!",
        "Go Big or Go Home!",
        "Make it Legendary!",
      ]
    };
    
    // Get the messages for current intensity
    const intensityMessages = messages[intensity] || messages.casual;
    
    // Choose a message based on player turn to make it somewhat consistent
    const messageIndex = (playerTurn - 1) % intensityMessages.length;
    return intensityMessages[messageIndex];
  };

  return (
    <StyledWrapper intensity={intensity}>
      <div className="min-h-screen flex flex-col items-center justify-center relative px-4 py-8">
        {/* Background blobs with 3D effect */}
        <div className="blob-bg top-0 left-0 opacity-70 blur-xl" />
        <div className="blob-bg bottom-0 right-0 opacity-70 blur-xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container max-w-4xl z-10"
        >
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="back-button"
              aria-label="Back to home"
            >
              <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Button>
            {animatePlayer ? (
              <div className="font-bold player-indicator magic-player-in">
                <div className="player-avatar-container">
                  <div className="crown">👑</div>
                  <div className="player-avatar">
                    <span>{playerTurn}</span>
                  </div>
                </div>
                <span className="turn-text">{getTurnMessage()}</span>
              </div>
            ) : (
              <div className="font-bold player-indicator" style={{ opacity: 0 }}>
                <div className="player-avatar-container">
                  <div className="crown">👑</div>
                  <div className="player-avatar">
                    <span>{playerTurn}</span>
                  </div>
                </div>
                <span className="turn-text">{getTurnMessage()}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center justify-center">
        <motion.div
              key={question}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 15 
              }}
              className="magic-question-in"
            >
              <QuestionCard 
                type={questionType}
                intensity={intensity}
              >
                {question}
              </QuestionCard>
        </motion.div>
            
            <div className="button-container">
              <Button 
                className="button-truth"
                onClick={() => handleNextQuestion('truth')}
              >
                <span className="magic-text">Truth</span>
              </Button>
              <Button 
                className="button-dare"
                onClick={() => handleNextQuestion('dare')}
              >
                <span className="magic-text">Dare</span>
              </Button>
            </div>
            </div>
          </motion.div>
      </div>
    </StyledWrapper>
  );
};

export default Game;

