import React from 'react';
import styled from 'styled-components';

interface QuestionCardProps {
  children: React.ReactNode;
  type: 'truth' | 'dare';
  intensity: 'casual' | 'medium' | 'spicy' | 'extreme';
  onClick?: () => void;
}

const QuestionCard = ({ children, type, intensity, onClick }: QuestionCardProps) => {
  const getCardColors = () => {
    if (type === 'truth') {
      switch (intensity) {
        case 'casual':
          return { bg: '#2c4870', light: '#3a5c8c', boxShadow: 'rgba(42, 72, 112, 0.5)' };
        case 'medium':
          return { bg: '#482c70', light: '#5c3a8c', boxShadow: 'rgba(72, 44, 112, 0.5)' };
        case 'spicy':
          return { bg: '#703c2c', light: '#8c4e3a', boxShadow: 'rgba(112, 60, 44, 0.5)' };
        case 'extreme':
          return { bg: '#702c4c', light: '#8c3a60', boxShadow: 'rgba(112, 44, 76, 0.5)' };
        default:
          return { bg: '#2c4870', light: '#3a5c8c', boxShadow: 'rgba(42, 72, 112, 0.5)' };
      }
    } else {
      switch (intensity) {
        case 'casual':
          return { bg: '#2c5c60', light: '#3a7478', boxShadow: 'rgba(44, 92, 96, 0.5)' };
        case 'medium':
          return { bg: '#602c54', light: '#783a6c', boxShadow: 'rgba(96, 44, 84, 0.5)' };
        case 'spicy':
          return { bg: '#703828', light: '#8c4a34', boxShadow: 'rgba(112, 56, 40, 0.5)' };
        case 'extreme':
          return { bg: '#4a2860', light: '#603478', boxShadow: 'rgba(74, 40, 96, 0.5)' };
        default:
          return { bg: '#2c5c60', light: '#3a7478', boxShadow: 'rgba(44, 92, 96, 0.5)' };
      }
    }
  };

  const colors = getCardColors();

  return (
    <StyledWrapper 
      bgColor={colors.bg} 
      lightColor={colors.light} 
      boxShadowColor={colors.boxShadow}
      onClick={onClick}
    >
      <div className="card">
        <div className="overlay" />
        <div className="circle">
          <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="23 29 78 60" height="60px" width="78px">
            <defs />
            <g transform="translate(23.000000, 29.500000)" fillRule="evenodd" fill="none" strokeWidth={1} stroke="none" id="icon">
              <rect rx="4.70247832" height="21.8788565" width="9.40495664" y="26.0333433" x="67.8357511" fill={colors.bg} id="Rectangle-3" />
              <rect rx="4.70247832" height="10.962961" width="9.40495664" y="38.776399" x="67.8357511" fill="#4a3a66" id="Rectangle-3" />
              <polygon points="57.3086772 0 67.1649301 26.3776902 14.4413177 45.0699507 4.58506484 18.6922605" fill="#4a3a66" id="Rectangle-2">
              </polygon>
              <path fill={colors.bg} id="Rectangle" d="M0,19.6104296 C0,16.2921718 2.68622235,13.6021923 5.99495032,13.6021923 L67.6438591,13.6021923 C70.9547788,13.6021923 73.6388095,16.2865506 73.6388095,19.6104296 L73.6388095,52.6639057 C73.6388095,55.9821635 70.9525871,58.672143 67.6438591,58.672143 L5.99495032,58.672143 C2.68403068,58.672143 0,55.9877847 0,52.6639057 L0,19.6104296 Z" />
              <path fill="#d0cce0" id="Fill-12" d="M47.5173769,27.0835169 C45.0052827,24.5377699 40.9347162,24.5377699 38.422622,27.0835169 L36.9065677,28.6198808 L35.3905134,27.0835169 C32.8799903,24.5377699 28.8078527,24.5377699 26.2957585,27.0835169 C23.7852354,29.6292639 23.7852354,33.7559532 26.2957585,36.3001081 L36.9065677,47.0530632 L47.5173769,36.3001081 C50.029471,33.7559532 50.029471,29.6292639 47.5173769,27.0835169" />
              <rect height="12.863158" width="15.6082259" y="26.1162588" x="58.0305835" fill={colors.bg} id="Rectangle-4" />
              <ellipse ry="2.23319575" rx="2.20116007" cy="33.0919007" cx="65.8346965" fill="#d0cce0" id="Oval">
              </ellipse>
            </g>
          </svg>
        </div>
        <p className="card-title">{type.toUpperCase()}</p>
        <p className="card-content">{children}</p>
      </div>
    </StyledWrapper>
  );
}

interface StyledWrapperProps {
  bgColor: string;
  lightColor: string;
  boxShadowColor: string;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  .card {
    --bg-color: ${props => props.bgColor};
    --bg-color-light: ${props => props.lightColor};
    --text-color-hover: #fff;
    --box-shadow-color: ${props => props.boxShadowColor};
  }

  .card {
    width: 280px;
    height: 370px;
    background: var(--bg-color);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 
      8px 8px 16px rgba(0, 0, 0, 0.3),
      -8px -8px 16px rgba(255, 255, 255, 0.05),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease-out;
    text-decoration: none;
    cursor: pointer;
    border: none;
    position: relative;
  }

  .card::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    animation: shinyEffect 3s infinite;
    pointer-events: none;
    z-index: 1001;
  }

  @keyframes shinyEffect {
    0% {
      transform: rotate(30deg) translate(-100%, -100%);
    }
    100% {
      transform: rotate(30deg) translate(100%, 100%);
    }
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 
      10px 10px 20px rgba(0, 0, 0, 0.35),
      -10px -10px 20px rgba(255, 255, 255, 0.05),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
  }

  .card:active {
    transform: scale(0.98);
    box-shadow: 
      5px 5px 10px rgba(0, 0, 0, 0.3),
      -5px -5px 10px rgba(255, 255, 255, 0.03),
      inset 2px 2px 4px rgba(0, 0, 0, 0.2),
      inset -2px -2px 4px rgba(255, 255, 255, 0.03);
  }

  .card:hover .overlay {
    transform: scale(4) translateZ(0);
  }

  .card:hover .circle {
    border-color: var(--bg-color-light);
    background: var(--bg-color);
  }

  .card:hover .circle:after {
    background: var(--bg-color-light);
  }

  .card:hover p {
    color: var(--text-color-hover);
  }

  .card-title {
    font-size: 26px;
    font-weight: bold;
    color: #ffffff;
    margin-top: 20px;
    z-index: 1000;
    transition: color 0.3s ease-out;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    animation: titleAppear 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes titleAppear {
    0% {
      opacity: 0;
      transform: scale(0.9) translateY(-10px);
      letter-spacing: 8px;
      text-shadow: 0 0 20px var(--bg-color), 0 0 40px var(--bg-color);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
      letter-spacing: normal;
      text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    }
  }

  .card-content {
    font-size: 18px;
    color: #e0e0e0;
    margin-top: 15px;
    padding: 0 20px;
    text-align: center;
    z-index: 1000;
    transition: color 0.3s ease-out;
    max-height: 150px;
    overflow-y: auto;
    line-height: 1.4;
    animation: textAppear 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes textAppear {
    0% {
      opacity: 0;
      transform: scale(0.8) translateY(10px);
      text-shadow: 0 0 20px var(--light-color), 0 0 40px var(--light-color);
      filter: blur(8px);
    }
    50% {
      opacity: 0.8;
      text-shadow: 0 0 10px var(--light-color), 0 0 20px var(--light-color);
      filter: blur(4px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
      text-shadow: 0 0 0 transparent;
      filter: blur(0);
    }
  }

  .circle {
    width: 131px;
    height: 131px;
    border-radius: 50%;
    background: #1a1a1a;
    border: 2px solid var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease-out;
  }

  .circle:after {
    content: "";
    width: 118px;
    height: 118px;
    display: block;
    position: absolute;
    background: var(--bg-color);
    border-radius: 50%;
    top: 7px;
    left: 7px;
    transition: opacity 0.3s ease-out;
  }

  .circle svg {
    z-index: 10000;
    transform: translateZ(0);
  }

  .overlay {
    border-radius: 50%;
    height: 80px;
    width: 80px;
    background: var(--light-color);
    box-shadow: 
      inset 2px 2px 4px rgba(255, 255, 255, 0.2),
      inset -2px -2px 4px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: -30px;
    left: 140px;
    transform: scale(1);
    transition: transform 0.4s ease-out;
    z-index: 0;
  }
`;

export default QuestionCard; 