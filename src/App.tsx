import  { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    unloadEvent();
  }, []);

  function scanReceived(params:any){
      // No data or no timestamp, scan failed.
      if(params['data'] === "" || params['time'] === ""){
          //@ts-ignore
          document.getElementById('display').innerHTML = "Failed!";
          return;
      }
      // Data and timestamp exist, barcode successful, show results
      var displayStr = "Barcode Data: " + params['data']+"<br>Time: "+params['time'];
      //@ts-ignore
      document.getElementById("display").innerHTML = displayStr;
  }

  function enableScanners(){
      console.info("-------> enabling....");
      //@ts-ignore
      EB.Barcode.enable({}, scanReceived);
      // Empty property hash, '{}' loads default values for the scanner.
  }

  function unloadEvent(){
      //@ts-ignore
      EB.Barcode.disable();
      // Disable Barcode on unload of page to free it up for other operations.
  }

  return (
    <div>
      <h1>Barcode API Test</h1>
      <div id="display">
          Barcode Data: <br />
          Time: <br />
      </div>
      <button onClick={enableScanners}>Enable Barcode Scanners</button>
    </div>
  );
}

export default App;
