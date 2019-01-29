// @flow
import React, { Component } from 'react';
import StepperButtons from '../stepper/StepperButtons';
import { FieldContainerStyle, InputContainerStyle, LabelStyle, InputStyle } from './style';

type Props = {
    updateState: (partialState: $Shape<State>) => void,
    nextStep: () => void,
    selectedMeal: "breakfast" | "lunch" | "dinner",
    peopleCount: number,
};

/**
 * options breakfast, lunch & dinner are hard coded
 */
class MealSelection extends Component<Props> {
    handleMealChange = (e) => {
        this.props.updateState({
            selectedMeal: e.target.value,
            selectedRestaurant: "",
            selectedDishes:[],
        });
    }

    handlePeopleCountChange = (e) => {
        const peopleCount = parseInt(e.target.value);
        this.props.updateState({peopleCount: Math.max(1, Math.min(10, peopleCount))});
    }

    areFieldsValid() {
        const { peopleCount } = this.props;
        return peopleCount >= 1 && peopleCount <= 10;
    }
    
    render() {
        const { selectedMeal, peopleCount, nextStep } = this.props;
        return (
            <div>
                <div style={FieldContainerStyle}>
                    <div style={InputContainerStyle}>
                        <div style={LabelStyle}>
                            <label htmlFor="meal-select">Please select a meal</label>
                        </div>
                        <select 
                            id="meal-select" 
                            style={InputStyle} 
                            value={selectedMeal} 
                            onChange={this.handleMealChange}>
                            <option value="breakfast">breakfast</option>
                            <option value="lunch">lunch</option>
                            <option value="dinner">dinner</option>
                        </select>
                    </div>
                    <div>
                        <div style={LabelStyle}>
                            <label htmlFor="people-count">Please enter the number of people</label>
                        </div>
                        <input 
                            id="people-count" 
                            type="number" 
                            min="1" 
                            max="10"
                            style={InputStyle} 
                            value={peopleCount} 
                            onChange={this.handlePeopleCountChange} />
                    </div>
                </div>
                <StepperButtons isValid={this.areFieldsValid()} nextStep={nextStep} />
            </div>
        );
    }
  }
  
  export default MealSelection;