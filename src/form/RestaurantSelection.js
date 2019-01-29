// @flow
import React, { Component } from 'react';
import { getRestaurants } from '../services/restaurantService';
import StepperButtons from '../stepper/StepperButtons';
import { FieldContainerStyle, LabelStyle, InputStyle } from './style';

type Props = {
    updateState: (partialState: $Shape<State>) => void,
    prevStep: () => void,
    nextStep: () => void,
    selectedMeal: "breakfast" | "lunch" | "dinner",
    selectedRestaurant: string,
};

class RestaurantSelection extends Component<Props> {
    handleRestaurantChange = (e) => {
        this.props.updateState({
            selectedRestaurant: e.target.value,
            selectedDishes:[],
        });
    }

    isFieldValid = () => {
        const { selectedRestaurant } = this.props;
        return selectedRestaurant !== "";
    }
    
    render() {
        const { selectedMeal, selectedRestaurant, prevStep, nextStep } = this.props;
        return (
            <div>
                <div style={FieldContainerStyle}>
                    <div style={LabelStyle}>
                        <label htmlFor="restaurant-select">please select a restaurant</label>
                    </div>
                    <select 
                        id="restaurant-select" 
                        style={InputStyle}
                        value={selectedRestaurant} 
                        onChange={this.handleRestaurantChange}>
                        <option disabled value="">---</option>
                        {
                            getRestaurants(selectedMeal).map(restaurant => (
                            <option key={restaurant} value={restaurant} >{restaurant}</option>  
                            ))
                        }
                    </select>
                </div>
                <StepperButtons isValid={this.isFieldValid()} prevStep={prevStep} nextStep={nextStep} />
            </div>
        );
    }
  }
  
  export default RestaurantSelection;