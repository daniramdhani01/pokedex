import React from 'react'
import { Container, Dropdown, Nav, Navbar, NavItem, NavLink } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../moduls/Auth';

function MasterLayout() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate()
  return (
    <>
      <Navbar bg="primary" expand="lg">
        <Container>
          <Navbar.Brand onClick={()=>navigate('/home')} className='text-white'>PokedexApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='me-auto'>
              <div className="d-flex me-auto">
                <Nav.Link onClick={()=>navigate('/pokemon-library')} className='text-white'>Pokemon Library</Nav.Link>
              </div>
            </Nav>
            <Nav className='ms-auto'>
              {/* <i className="fa fa-user-circle fa-2x text-white"></i> */}
              <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}><img src={currentUser.foto_url} alt='user' width={32} height={32} className='rounded-circle border border-2 object-fit-cover'/></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>navigate('/profile')} className=''>
                    <span className='d-block'>{currentUser.name}</span>
                    <span className='d-block fs-7 text-muted'>View Profile</span>
                  </Dropdown.Item>
                  <Dropdown.Divider/>
                  <Dropdown.Item onClick={logout}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
    <Container>
      <Outlet />
    </Container>
    </>
  )
}

export default MasterLayout