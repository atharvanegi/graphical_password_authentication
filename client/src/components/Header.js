import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useSelector } from 'react-redux';

export const Header = () => {

    const loginUser = useSelector(state => state.loginUser);
    const { userInfo } = loginUser

    return (
        <Navbar collapseOnSelect style={{ borderBottom:'1px solid lightgray' }} expand="lg" variant="light">
            <Navbar.Brand>
                <Link to={"/"} className='header_link_main d-flex' style={{ alignItems:'center' }}>
                    GPS
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle className='border-0' aria-controls="responsive-navbar-nav">
                <span>
                    <MenuOpenIcon style={{ color:'black' }}/>
                </span>
            </Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className={window && window.innerWidth>992 ? 'ml-auto mr-5' : 'ml-auto border-bottom py-1'}>
                    <Link className='header_link' to={"/"}>
                        Home
                    </Link>
                </Nav>
                <Nav className={window && window.innerWidth>992 ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' to={"/docs"}>
                        Docs
                    </Link>
                </Nav>
                <Nav className={window && window.innerWidth>992 ? 'mr-5' : 'border-bottom py-1'}>
                    <a className='header_link' href='https://github.com/aditya25022001/graphical-password-authentication' target='_blank' rel='noopener noreferrer'>
                        Source
                    </a>
                </Nav>
                <Nav className={window && window.innerWidth>992 && userInfo ? 'mr-2' : window && window.innerWidth>992 && !userInfo ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' to={'/contact'}>
                        Contact
                    </Link>
                </Nav>
                {!userInfo && <Nav className={window && window.innerWidth>992 ? 'mr-2' : 'mr-2 pt-2'}>
                    <Link to='/validate/register' className='header_link'>
                        Sign Up
                    </Link>
                </Nav>}
            </Navbar.Collapse>
        </Navbar>
    )
}