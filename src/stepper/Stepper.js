// @flow
import React, { Component } from 'react';

const MainContainerStyle = {
    display: 'flex',
    overflow: 'hidden',
    borderRadius: 10,
    border: '1px solid #e0e0e0',
    margin: 20,
}

const StepStyle = {
    padding: '5px 15px',
    backgroundColor: '#d6d6d6',
}

const PreviousStepStyle = {
    ...StepStyle,
    backgroundColor: '#fff',
}

const CurrentStepStyle = {
    ...StepStyle,
    backgroundColor: '#f9f9f9',
    borderBottom: '2px solid #396fff'
}


type Props = {
    currentStep: number,
};

// could be improved by using context
const Steps = ['step 1', 'step 2', 'step 3', 'review'];

/**
 * options breakfast, lunch & dinner are hard coded
 */
class Stepper extends Component<Props> {
    render() {
        const { currentStep } = this.props;
        return (
            <div style={MainContainerStyle}>
                {
                    Steps.map((name, idx) => {
                        let style = StepStyle;
                        if (idx < currentStep) {
                            style = PreviousStepStyle;
                        } else if (idx === currentStep) {
                            style = CurrentStepStyle;
                        }
                        return (<div key={name} style={style}>{name}</div>)
                    })
                }
            </div>
        );
    }
  }
  
  export default Stepper;