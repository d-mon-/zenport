// @flow
import React, { Component } from 'react';
import MealSelection from './form/MealSelection';
import RestaurantSelection from './form/RestaurantSelection';
import DishesSelection from './form/DishesSelection';
import Review from './form/Review';
import Stepper from './stepper/Stepper';

import type { FormState } from './types';

const MainContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

type Props = {
};

/**
 * Form manager
 * Store the state of all field from the form at each stage.
 * Furthermore, control the current view displayed (step).
 * 
 * I could have used Indformed to simplify the form process, 
 * but it's not very effective with a Stepper 
 * and it would go against the interview necessity
 */
class App extends Component<Props, FormState> {
  state = {
    step: 2,
    selectedMeal: "lunch",
    peopleCount: 1,
    selectedRestaurant: "Mc Donalds",
    selectedDishes:[],
  };

  updateState = (partialState: $Shape<FormState>) => {
    this.setState(partialState);
  }

  updateStep(step: number) {
    this.updateState({step})
  }

  prevStep = () => {
    const { step } = this.state;
    this.updateStep(step - 1);
  }

  nextStep = () => {
    const { step } = this.state;
    this.updateStep(step + 1);
  }

  submit = () => {
    console.log(this.state);
  }

  getView() {
    const { step, selectedMeal, peopleCount, selectedRestaurant, selectedDishes } = this.state;
    console.log(this.state);
    switch(step) {
      case 3:
        return (
          <Review 
            prevStep={this.prevStep}
            submit={this.submit}
            selectedMeal={selectedMeal} 
            selectedRestaurant={selectedRestaurant} 
            peopleCount={peopleCount}
            selectedDishes={selectedDishes} />
        );
      case 2:
        return (
          <DishesSelection 
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            updateState={this.updateState} 
            selectedMeal={selectedMeal} 
            selectedRestaurant={selectedRestaurant} 
            peopleCount={peopleCount}
            selectedDishes={selectedDishes} />
        );
      case 1:
        return (
          <RestaurantSelection 
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            updateState={this.updateState} 
            selectedMeal={selectedMeal} 
            selectedRestaurant={selectedRestaurant} />
        );
      case 0:
      default:
        return (
          <MealSelection 
            nextStep={this.nextStep}
            updateState={this.updateState} 
            selectedMeal={selectedMeal} 
            peopleCount={peopleCount} />
        );
    }
  }

  render() {
    const { step } = this.state;
    return (
      <div style={MainContainerStyle}>
        <Stepper currentStep={step} updateStep={this.updateStep} />
        {this.getView()}
      </div>
    );
  }
}

export default App;
