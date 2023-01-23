import React from 'react'
import { Form } from 'react-bootstrap';
import { useAuth } from '../../moduls/Auth';

function Profile() {
  const { currentUser } = useAuth();
  return (
    <div className='row pt-3'>
      <div className="col-md-3 pb-3 text-center">
        <img src={currentUser.foto_url} alt='user_picture' width={'200'} className='rounded object-fit-cover'/>
      </div>
      <div className="col-md-9">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control disabled={true} value={currentUser.name}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control disabled={true} value={currentUser.email}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control disabled={true} value={currentUser.phone}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Control disabled={true} value={currentUser.gender}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control disabled={true} value={currentUser.country}/>
          </Form.Group>
      </div>
    </div>
  )
}

export default Profile