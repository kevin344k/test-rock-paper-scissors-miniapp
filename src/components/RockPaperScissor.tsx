import { useState } from "react";
import '../css/RockPaperScissor.css';
import { ConnectButton, useActiveAccount, useActiveWallet, useDisconnect } from "thirdweb/react";
import { client } from "../client";
import { inAppWallet } from "thirdweb/wallets";
import { shortenAddress } from "thirdweb/utils";

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
    const account=useActiveAccount();
    const {disconnect}=useDisconnect();
    const wallet=useActiveWallet();
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
<h1>Mini Game</h1>
{
 !account?  (
<ConnectButton client={client} wallets={[inAppWallet({
    auth:{
        options:["email"]
    }
})]}></ConnectButton>
 ):(
<>
<div style={{
    display:"flex",
    flexDirection:"row",
    height:"auto",
    width:"100%",
    gap:"0.5rem",
    alignItems:"center",
    justifyContent:"center",
    border:"1px solid #f0f0f0",
    padding:"0.5rem"
}}>
 <div style={{
    fontSize:"0.5rem",
    marginBottom:"-10px",
    marginTop:"-10px"
 }}>
{shortenAddress(account.address)}
 </div>
 <button
 onClick={()=>disconnect(wallet!)}

 style={{
    padding:"0.5rem 1rem",
    background:"#dc3545",
    color:"white",
    border:"none",
    borderRadius:"4px",
    cursor:"pointer",
    fontSize:"0.75rem",
 
 }}
 >Logout</button>
</div>
{!result?(
<div>
<h3>Choose your option:</h3>
<div>
    {
        choices.map(choice=>(
            <button key={choice} onClick={()=>handleChoice(choice)} style={{padding:"0.5rem 1rem",
                background:"#007bff",
                color:"white",
                border:"none",
                borderRadius:"4px",
                cursor:"pointer",
                fontSize:"1rem",
                marginLeft:"0.5rem",

            }}>

{
    choice=="Rock" ? "🗿" : choice=="Paper" ? "📄" : "✂️"
}



            </button>
        ))

    }
</div>
</div>
    ):(
        <div>
            <p>
                You Choice: {result.playerChoice}
            </p>
            <p>
                Computer Choice: {result.computerChoice}
            </p>
            <p style={{fontWeight:"bold",textAlign:"center",fontSize:"1.5rem"}}>
                Result: {result.gameResult}
            </p>
            <div style={{
                position:"absolute",
                bottom:"2rem",
                display:"flex",
                flexDirection:"column",
                gap:"1rem",
                alignItems:"center"
            }}>
                <button onClick={resetGame} style={{
                    padding:"0.5rem 1rem",
                    background:"#28a745",
                    color:"white",
                    border:"none",
                    borderRadius:"4px",
                    cursor:"pointer",
                  
                }}>Play Again</button>
                {
                    showPrize && !prizeClaimed && (
                        <button onClick={claimePrize} style={{
                            padding:"0.5rem 1rem",
                            background:"#ffc107",
                            color:"black",
                            border:"none",
                            borderRadius:"4px",
                            cursor:"pointer",
                        }}>Claim Prize</button>
                    )
                }
                {
                    showModal && (
                        <div style={{
                            position:"fixed",
                            top:0,
                            left:0,
                            right:0,
                            bottom:0,
                            background:"rgba(0,0,0,0.5)",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}>
                            <div style={{
                                background:"white",
                                padding:"2rem",
                                borderRadius:"8px",
                                maxWidth:"300px",
                                textAlign:"center"
                            }}>
<h2>
    Claim 1o tokens!
</h2>
<p>
    you won and can claim 10 tokens to your wallet.
</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
</>
 )
}


    </div>
 
    </div>
)


}