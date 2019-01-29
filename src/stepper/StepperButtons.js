// @flow
import React, { Component } from 'react';

const ButtonStyle = {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    border: '1px solid #e0e0e0',
    cursor: 'pointer',
    outline: 'none', // TODO manual outline require when button is active, hover or focus + aria
};

const ButtonStyleDisabled = {
    ...ButtonStyle,
    backgroundColor: '#d6d6d6',
    cursor: 'not-allowed',
}

const MainContainerStyle = {
    margin: 20,
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 400,
}

type Props = {
    prevStep?: () => void,
    nextStep: () => void,
    submit?: boolean,
    isValid: boolean,
};

/**
 * Footer of the form to step forward or backward
 * "previous button" is replaced by a div to keep the same flex disposition in the window
 */
function StepperButtons(props:Props) {
    const {prevStep, nextStep, submit, isValid} = props;
    return (
        <div style={MainContainerStyle}>
            { prevStep ? <button title="previous step" style={ButtonStyle} onClick={prevStep}>back</button> : <div/>}
            <button 
                title="next step" 
                style={isValid ? ButtonStyle : ButtonStyleDisabled} 
                disabled={!isValid} 
                onClick={isValid ? nextStep : undefined}>
                {submit ? "submit" : "next"}
            </button>
        </div>
    );
  }
  
  export default StepperButtons;