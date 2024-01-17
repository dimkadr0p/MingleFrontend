import React, { useState, useEffect, useRef } from 'react';
import BurgerMenu from './BurgerMenu';
import Dialogs from './Dialogs';


function AuthorizedPage() {

    return (
        <div> 
            <BurgerMenu />
            <Dialogs />
        </div>

    );
}

export default AuthorizedPage;