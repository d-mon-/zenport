// @flow
import React, { Component } from 'react';
import { dishesAsMap } from '../services/restaurantService';

import type { SelectedDishType } from '../types';

type Props = {
    removeDish?: (id: string) => void,
    selectedDishes: Array<SelectedDishType>,
}

class DishesList extends Component<Props> {
    removeDishWrapper(id: string) {
        const { removeDish } = this.props;
        if (removeDish) {
            removeDish(id);
        }
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