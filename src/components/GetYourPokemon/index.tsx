import React, { useEffect, useRef, useState} from 'react'
import { Button, Card } from 'react-bootstrap'
import { useAuth } from '../../moduls/Auth'
import { ApiGet } from '../../utils/API'
import { notifySuccess } from '../../utils/notify'
import ModalDetail from '../ModalDetail'

function GetYourPokemon() {
  const pokemon = [
    {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
        "name": "venusaur",
        "url": "https://pokeapi.co/api/v2/pokemon/3/"
    },
    {
        "name": "charmander",
        "url": "https://pokeapi.co/api/v2/pokemon/4/"
    },
    {
        "name": "charmeleon",
        "url": "https://pokeapi.co/api/v2/pokemon/5/"
    },
    {
        "name": "charizard",
        "url": "https://pokeapi.co/api/v2/pokemon/6/"
    },
    {
        "name": "squirtle",
        "url": "https://pokeapi.co/api/v2/pokemon/7/"
    },
    {
        "name": "wartortle",
        "url": "https://pokeapi.co/api/v2/pokemon/8/"
    },
    {
        "name": "blastoise",
        "url": "https://pokeapi.co/api/v2/pokemon/9/"
    },
    {
        "name": "caterpie",
        "url": "https://pokeapi.co/api/v2/pokemon/10/"
    },
    {
        "name": "metapod",
        "url": "https://pokeapi.co/api/v2/pokemon/11/"
    },
    {
        "name": "butterfree",
        "url": "https://pokeapi.co/api/v2/pokemon/12/"
    },
    {
        "name": "weedle",
        "url": "https://pokeapi.co/api/v2/pokemon/13/"
    },
    {
        "name": "kakuna",
        "url": "https://pokeapi.co/api/v2/pokemon/14/"
    },
    {
        "name": "beedrill",
        "url": "https://pokeapi.co/api/v2/pokemon/15/"
    },
    {
        "name": "pidgey",
        "url": "https://pokeapi.co/api/v2/pokemon/16/"
    },
    {
        "name": "pidgeotto",
        "url": "https://pokeapi.co/api/v2/pokemon/17/"
    },
    {
        "name": "pidgeot",
        "url": "https://pokeapi.co/api/v2/pokemon/18/"
    },
    {
        "name": "rattata",
        "url": "https://pokeapi.co/api/v2/pokemon/19/"
    },
    {
        "name": "raticate",
        "url": "https://pokeapi.co/api/v2/pokemon/20/"
    }
  ]
  const { setMyPokemon, currentUser, myPokemon, savePoke } = useAuth();  
  const interval = useRef(null) as any
  const [randomPokemon, setRandomPokemon] = useState('your pokemon here')
  const [startRandom, setStartRandom] = useState(false)
  const [count, setCount] = useState(0)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const pokemonDetail = ApiGet({fetchOnMounted:false})

  const start = ()=>{
    const pokemonID = Math.floor(Math.random() * 1000)
    pokemonDetail.fetch(`pokemon/${pokemonID}/`)

    interval.current = setInterval(()=>{
      const id = Math.floor(Math.random() * 20)
      setRandomPokemon(pokemon[id]?.name || 'pokemon')
      setCount((prev)=>prev+1)
    },100)
    setStartRandom(true)
  }

  const handleShow = () => {
    setShow(true)
    // pokemonDetail.fetch(api)
};
    
  const stop = ()=> {
    clearInterval(interval.current)
    setRandomPokemon(pokemonDetail.data.name)
    setStartRandom(false)
    setCount(0)
    handleShow()
  }

  useEffect(()=>{
    if(count === 20){
      stop()
    }
  },[count])

  const save = ()=>{
    const _newpoke = {...pokemonDetail.data, user: currentUser.email, saved_time : Date()}

    if(myPokemon){
      const _myPokemon :any = myPokemon
      _myPokemon.push(_newpoke)

      setMyPokemon(_myPokemon)
      savePoke(_myPokemon)
    }else{
      setMyPokemon([_newpoke])
      savePoke([_newpoke])
    }
    handleClose()
    setRandomPokemon('your pokemon here')
    notifySuccess('Pokemon Has Been Save')
  }

  const footer = <>
    <Button onClick={save} variant='success' className='text-white'>Save</Button>
    <Button onClick={()=>{
      handleClose()
      setRandomPokemon('your pokemon here')
    }} variant='warning' className='text-white'>Release</Button>
  </>

  return (
    <div className='text-center'>
      <ModalDetail props={{show, handleClose, pokemonDetail, footer}}/>
      <Button className='text-white mt-3' onClick={()=>startRandom ? stop() : start()}>Get Pokemon {startRandom && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>}</Button>
      {randomPokemon !== 'your pokemon here' &&
        <Card className={`col-12 mt-3 bg-success opacity-75`} as={Button} onClick={handleShow}>
            <Card.Body className='text-center fw-bold text-white w-100'>
              <h4 className='d-block'>{randomPokemon.toUpperCase()}</h4>
              {!startRandom &&
              <span className="text-muted fs-7">click me to show details</span>
            }
            </Card.Body>
        </Card>
      }
    </div> 
  )
}

export default GetYourPokemon