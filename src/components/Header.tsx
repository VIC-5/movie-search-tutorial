import React from 'react';
import { HeaderProps } from '../Types';

const Header = (props : HeaderProps) => 
{
    return (
        <header className="App-header">
            <h2>{props.text}</h2>
        </header>
    );
};

export default Header;