// @flow
import React, { Component } from 'react';
import uuid from 'uuid'; // use short uuid to avoid rendering problem (especially in a case of empty dishId)
import { FieldContainerStyle, InputContainerStyle, LabelStyle, InputStyle, PlusStyle, ErrorStyle } from './style';


type Props = {
    addDish: ({dishId: number, count: number, id: string}) => void,
    filteredDishes: Array<any>,
    setError: (error: string) => void,
    selectedDishes: Array<{
        id: string,
        dishId: "" | number,
        count: number,
    }>,
};

type State = {
    dishId: "" | number,
    count: "" | number,
}

class DishSelector extends Component<Props, State> {
    state = {
        dishId: '',
        count: 1,
    }

    handleDishChange = (e) => {
        this.setState({dishId: parseInt(e.target.value)});
    }

    handlePeopleCountChange = (e) => {
        const value = parseInt(e.target.value);
        const count = isNaN(value) ? '' : Math.max(1, value);
        this.setState({count});
    }

    validateFields() {
        const { setError } = this.props;
        const { dishId, count } = this.state;
        if (dishId === '') {
            setError('You must choose a dish first');
            return false;
        }   
        if (!(count>=1)) {
            setError('You must set a valid number');
            return false;
        }
        return true;
    }

    addDish = () => {
        const { addDish } = this.props;
        const { dishId, count } = this.state;
        
        if (this.validateFields()) {
            addDish({
                dishId,
                count,
                id: uuid.v4(),
            });
            this.setState({
                dishId: "",
                count: 1,
            })
        }
    }

    render() {
        const { filteredDishes, selectedDishes } = this.props;
        const { dishId, count } = this.state;

        const selectedDishesId = selectedDishes.filter(next => next.dishId).reduce((result, next) => {
            result.add(next.dishId); 
            return result;
        }, new Set());

        return (
            <div>
                <div style={{display: 'flex'}}>
                    <div style={FieldContainerStyle}>
                        <label>Please select a dish</label>
                        <select value={dishId} style={InputStyle} onChange={this.handleDishChange}>
                            <option disabled value="">---</option>
                            {
                                filteredDishes
                                    .filter(dish => !selectedDishesId.has(dish.id))
                                    .map(dish => (<option key={dish.id} value={dish.id}>{dish.name}</option>))
                            }
                        </select>
                    </div>
                    <div style={FieldContainerStyle}>
                        <label>Please enter no of serving</label>
                        <input 
                            type="number" 
                            min="1"
                            style={InputStyle} 
                            value={count} 
                            onChange={this.handlePeopleCountChange}  />
                    </div>
                </div>
                <button style={PlusStyle} onClick={this.addDish}>+</button> 
            </div>
        );
    }
  }
  
  export default DishSelector;