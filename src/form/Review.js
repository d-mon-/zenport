// @flow
import React, { Component } from 'react';
import StepperButtons from '../stepper/StepperButtons';
import DishesList from './DishesList';
import { TableKeyStyle } from './style';

type Props = {
    prevStep: () => void,
    submit: () => void,   
    selectedMeal: "breakfast" | "lunch" | "dinner",
    peopleCount: number,
    selectedMeal: string,
    selectedRestaurant: string,
    selectedDishes: Array<{
        id: string,
        dishId: "" | number,
        count: number,
    }>,
};

/**
 * options breakfast, lunch & dinner are hard coded
 */
class Review extends Component<Props> {
    
    render() {
        const { selectedDishes, selectedMeal, selectedRestaurant, peopleCount, prevStep, submit } = this.props;
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td style={TableKeyStyle}>Meal:</td>
                            <td>{selectedMeal}</td>
                        </tr>
                        <tr>
                            <td style={TableKeyStyle}>No of people:</td>
                            <td>{peopleCount}</td>
                        </tr>
                        <tr>
                            <td style={TableKeyStyle}>Restaurant:</td>
                            <td>{selectedRestaurant}</td>
                        </tr>
                        <tr>
                            <td style={TableKeyStyle}>Dishes:</td>
                            <td>
                                <DishesList selectedDishes={selectedDishes} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <StepperButtons isValid submit prevStep={prevStep} nextStep={submit} />
            </div>
        );
    }
  }
  
  export default Review;