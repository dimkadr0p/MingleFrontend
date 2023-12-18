import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { Transition } from '@headlessui/react';
import React, { useState, useEffect, useRef } from 'react';
import BurgerMenu from './BurgerMenu';


function AuthorizedPage() {
  
    return (
       <BurgerMenu/>
    );
}

export default AuthorizedPage;