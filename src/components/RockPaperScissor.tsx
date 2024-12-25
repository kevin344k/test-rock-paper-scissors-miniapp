import { useState } from "react";
import '.css/RockPaperScissor.css';

type Choice= 'Rock' | 'Paper' | 'Scissor';
type Result= 'Win' | 'Lose' | 'Tie';


const choices:Choice[]=['Rock','Paper','Scissor'];
const getComputerChoice=():Choice=>choices[Math.floor(Math.random()*choices.length)]

const determineWinner=(playerChoice:Choice,computerChoice:Choice):Result=>{
    if (playerChoice === computerChoice) return 'Tie';
        
    if ((playerChoice === 'Rock' && computerChoice === 'Scissor') ||
        (playerChoice === 'Paper' && computerChoice === 'Rock') ||
        (playerChoice === 'Scissor' && computerChoice === 'Paper')) {
        return 'Win';
        
    }
    return 'Lose';
};
interface GameResult{
    playerChoice:Choice;
    computerChoice:Choice;
    gameResult:Result;
}



export default function RockPaperScissor() {

    const [result,setResult]=useState<GameResult | null>(null);
    const [showPrize,setShowPrize]=useState<boolean>(false);
    const [showModal,setShowModal]=useState<boolean>(false);
    const [prizeClaimed,setPrizeClaimed]=useState<boolean>(false);





const handleChoice=(playerChoice:Choice)=>{
    const computerChoice=getComputerChoice();
    const gameResult=determineWinner(playerChoice,computerChoice);
    setResult({playerChoice,computerChoice,gameResult});
    setShowPrize(gameResult==='Win');


    }

const resetGame=()=>{
    setResult(null);
    setShowPrize(false);
    setPrizeClaimed(false);
}

const claimePrize=()=>{
    setShowModal(true)
}

return(
    <div className="container-game">
    <div className="game">

    </div>
    </div>
)


}