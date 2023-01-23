import React, { useEffect, useState } from 'react'
import { Button, Card, } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import GetYourPokemon from '../../components/GetYourPokemon'
import ModalDetail from '../../components/ModalDetail'
import { ApiGet } from '../../utils/API'

function PokemonLibrary() {
    const pokemon = ApiGet({fetchOnMounted:true, url:'pokemon'})
    const pokemonDetail = ApiGet({fetchOnMounted:false})

    const [list, setList] = useState([]) as any
    const [isLibrary, setIsLibrary] = useState(true)
    const [next, setNext] = useState('')
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = (api:string) => {
        setShow(true)
        pokemonDetail.fetch(api)
    };

    const fetchMoreData = ()=> {
      pokemon.fetch(next)
        .then((res:any)=>{
          const a = res.next.split('=')[1]?.replace('&limit', '')
          const b = list[list.length-1].url.split('/')
          const _b = b[b.length-2]
          console.log(a,_b,list)
          if(a !== _b){
            console.log(res.next , next)
            setNext(res.next)
            setList((prev:any)=>{
              let _list = prev
              _list.push(...res?.results)
              return _list
            })}
          }
        )
    }

    
    
    useEffect(()=>{
      if(!!pokemon.data && !list[0]){
        setList(pokemon.data?.results)
        setNext(pokemon.data?.next)
      }
    },[pokemon.data?.results])

  return (
    <>
      <ModalDetail props={{show, handleClose, pokemonDetail}}/>
        <div className="mt-5 d-flex justify-content-center">
          <div className="text-center" style={{ width: "250px" }}>
            <Button className={`p-0 m-0 bg-transparent rounded-0 border-0 border-1 fw-bold ${isLibrary ? 'text-primary' :'text-muted'}`} onClick={()=>setIsLibrary(true)}>
              Pokemon Library
            </Button>
            {isLibrary && <hr className="border border-2 border-primary opacity-100 rounded text-primary bg-primary" />}
          </div>
          <div className="text-center" style={{ width: "250px" }}>
            <Button
              className={`p-0 m-0 bg-transparent rounded-0 border-0 border-1 fw-bold ${!isLibrary ? 'text-primary' :'text-muted'}`}
              onClick={()=>setIsLibrary(false)}
            >
              Get Your Pokemon
            </Button>
            {!isLibrary && <hr className="border border-2 border-primary opacity-100 rounded text-primary bg-primary" />}
          </div>
        </div>

      {isLibrary ?
        <InfiniteScroll 
        dataLength={list.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<span className='text-center w-100'><i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i></span>}
        className='overflow-hidden mt-3 row'
        
      >
              {list?.map((item:any, i:number)=> {
                  return(
                    <div className="col-md-6 mb-2 px-1" key={i}>
                      <Card className='col-12' onClick={()=>handleShow(item.url)} as={Button}>
                          <Card.Body className='text-center text-muted w-100'> <span >{item.name}</span></Card.Body>
                      </Card>
                    </div>
                  )
                  })}
      </InfiniteScroll>
    :
      <GetYourPokemon/>
        }
    </>
  )
}

export default PokemonLibrary