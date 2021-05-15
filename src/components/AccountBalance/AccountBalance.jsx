//Don't forget the vulnerabilities in the NPM packages

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AccountBalance.css';

import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0 1.5rem 5rem;
`;

export default class AccountBalance extends Component {

    render() {
        const buttonText = this.props.showBalance ? 'Hide Balance' : 'Show Balance';
        let balanceAmount = null;

        if(this.props.showBalance){
            balanceAmount = <>${this.props.amount}</>;
        } else {
            balanceAmount = null;
        }

        // const balanceAmount = this.props.showBalance ? '$'+this.props.amount : '';
        return (
            <Section>
                {balanceAmount}
                <button onClick={this.props.handleHide}>{buttonText}</button>
            </Section>
        );
    }
}


AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired,
}