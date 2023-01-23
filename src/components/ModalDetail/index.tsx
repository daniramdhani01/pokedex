import React from 'react'
import { Modal } from 'react-bootstrap'

function ModalDetail({props}:any) {
    const {show, handleClose, pokemonDetail, footer = false} = props
  return (
    
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {pokemonDetail.isLoading ? <i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i> :
          <div className='row'>

            <div className="col-md-4 col-6 mb-3 text-center">
              <img src={pokemonDetail.data?.sprites?.front_default} alt='pokemon' className='bg-secondary rounded'/>
            </div>

            <div className="col-md-8 col-6 mb-3 overflow-auto">
              <span className="text-muted d-block mb-2">#{pokemonDetail.data?.id}</span>
              <span className="text-primary fw-bold mb-3"><h4>{pokemonDetail.data?.name.toUpperCase()}</h4></span>
              <div className="text-primary fs-7">
                <span className="text-secondary fw-bold">Base Exp :{' '}</span>
                <span className="text-muted">{pokemonDetail.data?.base_experience}</span>
              </div>
              <div className="text-primary fs-7">
                <span className="text-secondary fw-bold">Wight :{' '}</span>
                <span className="text-muted">{pokemonDetail.data?.weight}</span>
              </div>
              <div className="text-primary fs-7">
                <span className="text-secondary fw-bold">Height :{' '}</span>
                <span className="text-muted">{pokemonDetail.data?.height}</span>
              </div>
            </div>

            <div className="col-6 bg-grey">
              <span className="d-block text-primary fw-bold">Stats</span>
              {pokemonDetail.data?.stats?.map((item:any, i:number)=>{
                return (
                  <div key={i}>
                  <span className="">{item.stat.name} :{' '}</span>
                  <span className="">{item.base_stat}</span>
                  </div>
                  )
              })}
              
              <span className="d-block text-primary fw-bold">Types</span>
              {pokemonDetail.data?.types?.map((item:any, i:number)=>{
                return (
                  <div key={i}>
                    <span className="">{item.type.name}</span>
                  </div>
                  )
              })}

              <span className="d-block text-primary fw-bold">Abilities</span>
              {pokemonDetail.data?.abilities?.map((item:any, i:number)=>{
                return (
                  <div key={i}>
                    <span className="">{item.ability.name}</span>
                  </div>
                  )
              })}
            </div>
            <div className="col-6 h-50 overflow-auto bg-grey" style={{maxHeight:370}}>
              <span className="d-block text-primary fw-bold">Moves</span>
              {pokemonDetail.data?.moves?.map((item:any, i:number)=>{
                return (
                    <span className="d-block" key={i}>{item.move.name}</span>
                  )
              })}
            </div>
          </div>
        }
        </Modal.Body>
        {footer &&
            <Modal.Footer>
                {footer}
            </Modal.Footer>
        }
      </Modal>
  )
}

export default ModalDetail