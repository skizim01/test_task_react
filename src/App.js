import './App.css';
import {useEffect, useState} from "react";
import bunny from './img/Unknown.svg'
import backblaze from './img/logo-backblaze-flame-header.webp'
import scaleway from './img/scalewaycom.png'
import vultr from './img/vuktr.png'
import UserInput from "./components/UserInput";
import InfoOutput from "./components/InfoOutput";




function App() {
  const [storageValue, setStorageValue] = useState(0)
  const [transferValue, setTransferValue] = useState(0)
  const [bunnyCheck, setBunnyCheck] = useState(false)
  const [scalewayCheck, setScalewayCheck] = useState(false)

  const color = {
    backblaze: "red",
    bunny: "orange",
    scaleway: "pink",
    vultr: "blue"
  }

  const plans = [0.06, 0.03];
  const storagePrice = [0.02, 0.01]

  const calcBackblaze = () => {
    const result = storageValue * 0.005 + transferValue * 0.01;
    if (result <= 7) return 7;
    else return result;
  }

  const calcBunny = () => {
    const result = storageValue * storagePrice[+bunnyCheck] + transferValue * 0.01;
    if (result <= 10) return result;
    else return 10;
  }

  const calcScaleway = () => {
    const plan = document.getElementById("plan")
    const storage = storageValue <= 75 ? 0 : storageValue - 75;
    const transfer = transferValue <= 75 ? 0 : transferValue - 75;
    return storage * plans[+scalewayCheck] + transfer * 0.02;
  }

  const calcVultr = () => {
    const result = storageValue * 0.01 + transferValue * 0.01;
    if (result <= 5) return 5;
    else return result;
  }

  const [result, setResult] = useState({
    backblaze:calcBackblaze(),
    bunny: calcBunny(),
    scaleway:calcScaleway(),
    vultr:calcVultr()
  })

  const max = Math.max(...Object.values(result))
  const min = Math.min(...Object.values(result))

  useEffect(()=>{
    setResult({
      backblaze: calcBackblaze(),
      bunny: calcBunny(),
      scaleway: calcScaleway(),
      vultr: calcVultr()
    })

  }, [storageValue,transferValue, scalewayCheck, bunnyCheck])

  const getWidth = (value) =>{
    return `${260*value/max+10}px`
  }

  const getColor = (company) =>{
    return result[company]===min?color[company]:"gray"
  }

  return (
      <div className="container">
        <div className="userInput">
          <UserInput name={"Storage"} state={storageValue} setState={setStorageValue}/>
          <UserInput name={"Transfer"} state={transferValue} setState={setTransferValue}/>
        </div>
        <div className="infoOutput">
          <InfoOutput values={result.backblaze} img={backblaze} name={'backblaze'} colors={getColor("backblaze")}
                      width={getWidth(result.backblaze)}/>
          <InfoOutput values={result.scaleway} img={scaleway} name={'scaleway.com'}
                      switcH={['multi', 'single', scalewayCheck, setScalewayCheck]} colors={getColor("scaleway")} width={getWidth(result.scaleway)}/>
          <InfoOutput values={result.bunny} img={bunny} name={'bunny.net'}
                      switcH={['ssd', 'hdd', bunnyCheck, setBunnyCheck]} colors={getColor("bunny")} width={getWidth(result.bunny)}/>
          <InfoOutput values={result.vultr} img={vultr} name={'vultr.com'} colors={getColor("vultr")}
                      width={getWidth(result.vultr)}/>
        </div>
      </div>
  );
}

export default App;
