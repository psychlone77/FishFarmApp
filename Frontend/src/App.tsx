import './App.css'

function App() {
  function simpleGetCall() {
    fetch('https://localhost:7064/FishFarm')
      .then((response) => response.json())
      .then((data) => console.log(data))
  }
  simpleGetCall();
  return (
    <>
      
    </>
  )
}

export default App
