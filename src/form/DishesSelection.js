// @flow
import React, { Component } from 'react';
import uuid from 'uuid'; // use short uuid to avoid rendering problem (especially in a case of empty dishId)
import { getDishesByRestaurant, dishesAsMap } from '../services/restaurantService';
import StepperButtons from '../stepper/StepperButtons';
import { FieldContainerStyle, InputContainerStyle, LabelStyle, InputStyle, PlusStyle, ErrorStyle } from './style';
import DishSelector from './DishSelector';
import DishesList from './DishesList';

type Props = {
    updateState: (partialState: $Shape<State>) => void,
    prevStep: () => void,
    nextStep: () => void,
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

type State = {
    error: string,
    filteredDishes: Array<any>, // TODO make type
};

/**
 * I choose to make the selection more interactive
 */
class RestaurantSelection extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = this.buildFilteredDishesState();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.selectedMeal !== nextProps.selectedMeal || this.props.selectedRestaurant !== nextProps.selectedRestaurant) {
            this.setState(this.buildFilteredDishesState(nextProps));
        }
    }

    buildFilteredDishesState(props = this.props) {
        return {
            error: "",
            filteredDishes: getDishesByRestaurant(props.selectedMeal, props.selectedRestaurant),
        };
    }

    updateDishes(selectedDishes) {
        const { updateState } = this.props;
        const { error } = this.state;
        updateState({selectedDishes});
        if (error) { // refresh error if count become greater than number of people
            this.validateFields(selectedDishes);
        }
    }

    addDish = (dish) => {
        const { selectedDishes } = this.props;
        this.updateDishes([...selectedDishes, dish]);
    }

    removeDish = (id) => {
        const { selectedDishes } = this.props;
        this.updateDishes(selectedDishes.filter(dish => dish.id !== id));
    }

    setError = (error) => {
        this.setState({error});
    }

    validateFields(selectedDishes = this.props.selectedDishes) {
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