//Don't forget the vulnerabilities in the NPM packages

import React from 'react';
import PropTypes from 'prop-types';
import './AccountBalance.css';

import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0 1.5rem 5rem;
`;

export default function AccountBalance(props) {


    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    let balanceAmount = null;

    if(props.showBalance){
        balanceAmount = <>${props.amount}</>;
    } else {
        balanceAmount = null;
    }

    // const balanceAmount = this.props.showBalance ? '$'+this.props.amount : '';
    return (
        <Section>
            {balanceAmount}
            <button onClick={props.handleHide}>{buttonText}</button>
        </Section>
    );

}


AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired,
}