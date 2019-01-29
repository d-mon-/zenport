// @flow
import React, { Component } from 'react';
import { dishesAsMap } from '../services/restaurantService';


type Props = {
    removeDish: (id: string) => void,
    selectedDishes:  Array<{
        id: string,
        dishId: "" | number,
        count: number,
    }>,
};

class DishesList extends Component<Props> {
    removeDishWrapper(id) {
        this.props.removeDish(id);
    }

    render() {
        const { selectedDishes, removeDish } = this.props;
        return (
            <div>
                <table>
                    <tbody>
                        { selectedDishes.map(dish => (
                            <tr key={dish.id}>
                                <td>
                                    {dishesAsMap.get(dish.dishId).name}
                                </td>
                                <td>
                                    {dish.count}
                                </td>
                                {
                                    removeDish && (
                                        <td><button onClick={this.removeDishWrapper.bind(this, dish.id)}>delete</button> </td>
                                    )
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
  }
  
  export default DishesList;