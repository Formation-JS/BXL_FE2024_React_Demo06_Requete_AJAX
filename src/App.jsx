import './App.css'
import StationApp from './containers/StationApp/StationApp';

function App() {

  return (
    <>
      <h1>Demo 06</h1>
      <h2>Requete AJAX</h2>

      <StationApp />

      {/* Formulaire pour chercher le nom d'une gare */}
      {/* Dashboard de la gare rechercher */}
      {/* 
          Composant : 
           - SearchForm
           - StationRequest
             - Dahsboard
             - Loading
             - Error
          Container : 
           - StationApp
      */}

    </>
  )
}

export default App
