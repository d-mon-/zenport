// @flow
import React, { Component } from 'react';
import uuid from 'uuid'; // use short uuid to avoid rendering problem (especially in a case of empty dishId)
import { getDishesByRestaurant, dishesAsMap } from '../services/restaurantService';
import StepperButtons from '../stepper/StepperButtons';
import { FieldContainerStyle, InputContainerStyle, LabelStyle, InputStyle, PlusStyle, ErrorStyle } from './style';
import DishSelector from './DishSelector';
import DishesList from './DishesList';

import type { FormState, SelectedDishType, MealType } from '../types';

type Props = {
    updateState: (partialState: $Shape<FormState>) => void,
    prevStep: () => void,
    nextStep: () => void,
    selectedMeal: MealType,
    peopleCount: number,
    selectedMeal: string,
    selectedRestaurant: string,
    selectedDishes: Array<SelectedDishType>,
};

type State = {
    error: string,
    filteredDishes: Array<any>, // TODO make type
};

/**
 * I choose to make the selection more interactive
 */
class RestaurantSelection extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = this.buildFilteredDishesState();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.selectedMeal !== nextProps.selectedMeal || this.props.selectedRestaurant !== nextProps.selectedRestaurant) {
            this.setState(this.buildFilteredDishesState(nextProps));
        }
    }

    buildFilteredDishesState(props: Props = this.props) {
        return {
            error: "",
            filteredDishes: getDishesByRestaurant(props.selectedMeal, props.selectedRestaurant),
        };
    }

    updateDishes(selectedDishes: Array<SelectedDishType>) {
        const { updateState } = this.props;
        const { error } = this.state;
        updateState({selectedDishes});
        if (error) { // refresh error if count become greater than number of people
            this.validateFields(selectedDishes);
        }
    }

    addDish = (dish: SelectedDishType) => {
        const { selectedDishes } = this.props;
        this.updateDishes([...selectedDishes, dish]);
    }

    removeDish = (id: string) => {
        const { selectedDishes } = this.props;
        this.updateDishes(selectedDishes.filter(dish => dish.id !== id));
    }

    setError = (error: string) => {
        this.setState({error});
    }

    validateFields(selectedDishes: Array<SelectedDishType> = this.props.selectedDishes) {
        const { peopleCount } = this.props;

        if (selectedDishes.length === 0) {
            this.setError('You must add at least one serving');
            return false;
        }

        const sumOfDishes = selectedDishes.reduce((result, next) => result + next.count, 0);
        if (sumOfDishes < peopleCount) {
            this.setError(`You must select more servings (${sumOfDishes}/${peopleCount})`);
            return false;
        }

        this.setError('');
        return true;
    }

    /**
     * wrapper around nextStep to trigger the validation before going to the next view (<Review/>)
     */
    nextStepWrapper = () => {
        if (this.validateFields()) {
            this.props.nextStep();
        }
    }

    render() {
        const { selectedDishes, prevStep } = this.props;
        const { filteredDishes, error } = this.state;
if (selectedDishes && selectedDishes[0]) {console.log(dishesAsMap.get(selectedDishes[0].dishId), selectedDishes[0].dishId, dishesAsMap);}
        
        return (
            <div>
                <DishesList selectedDishes={selectedDishes} removeDish={this.removeDish} />
                { selectedDishes.length < filteredDishes.length && 
                    <DishSelector 
                        selectedDishes={selectedDishes} 
                        filteredDishes={filteredDishes} 
                        addDish={this.addDish} 
                        setError={this.setError} />
                }
                { error && 
                    <div style={ErrorStyle}>{error}</div> 
                }
                <StepperButtons isValid prevStep={prevStep} nextStep={this.nextStepWrapper} />
            </div>
        );
    }
  }
  
  export default RestaurantSelection;