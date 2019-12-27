import React, { useState, useEffect, Fragment } from 'react';

//Axios
//npm install --save axios
import Axios from 'axios'

//Components
import Formulario from './Components/Formulario'
import Cancion from './Components/Cancion'
import Artista from './Components/Artista'

function App() {

  const [ artista, setArtista ] = useState('')
  const [ letra, setLetra ] = useState([])
  const [ info, setInfo ] = useState({})

  //Consultar API de letras de cancion
  const consultarAPILetra = async busqueda =>{

    const { artista, cancion } = busqueda
    
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`

    const resultado = await Axios(url)

    setArtista(artista)
    setLetra(resultado.data.lyrics)

  }

  //Consultar API de Informacion de cancion (Artista)
  const consultarAPIInfo = async () =>{

    if(artista){
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`

      const resultado = await Axios(url)

      setInfo(resultado.data.artists[0])
    }
  }

  useEffect(() =>{
    consultarAPIInfo()
  }, [artista])

  return (
    <Fragment>
      <Formulario
        consultarAPILetra={consultarAPILetra}
      />

      <div className="container">
        <div className="row mt-3">
          <div className="col-sm-12 col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Artista
              info={info}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
