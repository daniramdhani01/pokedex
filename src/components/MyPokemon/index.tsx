import React, { useEffect, useState } from 'react'
import { Button, Card, } from 'react-bootstrap'
import ModalDetail from '../ModalDetail'
import { useAuth } from '../../moduls/Auth'

function MyPokemon() {
    const {currentUser, myPokemon, setMyPokemon, savePoke} = useAuth()
    const [list, setList] = useState([]) as any
    const [selPoke, setSelPoke] = useState({}) as any
    const [pokemonDetail, setPokemonDetail] = useState({}) as any
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = (data:any) => {
        setSelPoke(data)
        setPokemonDetail({isLoading:false,data})
        setShow(true)  
    };

    useEffect(()=>{
      if(myPokemon){
        const _list = myPokemon?.filter((item:any)=>item.user === currentUser.email)
        setList(_list)
      }
    },[myPokemon])

    console.log(list)

    const footer =
      <>
        <Button onClick={()=>{
          handleClose()
          const _poke :any = myPokemon?.filter((item:any)=>item !== selPoke)
          savePoke(_poke)
          setMyPokemon(_poke)
        }} variant='warning' className='text-white'>Release</Button>
      </>
  return (
    <>
      <ModalDetail props={{show, handleClose, pokemonDetail, footer}}/>
      
        <div className="mt-5 d-flex justify-content-center">
          <div className="text-center" style={{ width: "250px" }}>
            <Button className={`p-0 m-0 bg-transparent rounded-0 border-0 border-1 fw-bold text-primary`}>
              My Pokemon
            </Button>
            <hr className="border border-2 border-primary opacity-100 rounded text-primary bg-primary" />
          </div>
        </div>

      <div className='overflow-hidden mt-3 row text-center'>
        {list.length > 0 ?
          list?.map((item:any, i:number)=> {
              return(
                <div className="col-md-6 mb-2 px-1" key={i}>
                  <Card className='col-12' onClick={()=>handleShow(item)} as={Button}>
                      <Card.Body className='text-center text-muted w-100'> <span >{item.name}</span></Card.Body>
                  </Card>
                </div>
              )
              })
              :
          <span className="mb-5 text-muted">You dont have pokemon</span>
        }
      </div>
    </>
  )
}

export default MyPokemon