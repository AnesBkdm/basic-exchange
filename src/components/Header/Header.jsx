import React, { Component } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';

const Img = styled.img`
    height: 8rem;
    pointer-events: none;
`;

const Headerr = styled.header`
    background-color: #282c34;
    min-height: 10vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const H1 = styled.h1`
    font-size: 4rem;
`;

export default class Header extends Component {
    render() {
        return (
            <Headerr>
                <Img src={logo} alt='react logo'/>
                    <H1>
                        Coin Exchange
                    </H1>
            </Headerr>
        )
    }
}
