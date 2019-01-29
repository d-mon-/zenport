import React from 'react';
import MealSelection from '../MealSelection';
import { shallow } from 'enzyme';
import sinon from 'sinon';

it('should select a breakfast meal', () => {
    const onUpdateStateSpy = sinon.spy();
    const wrapper = shallow(<MealSelection selectedMeal="lunch" peopleCount={1} updateState={onUpdateStateSpy} />);
    
    const select = wrapper.find('#meal-select');
    expect(select).toHaveProp({value: 'lunch'});
    select.simulate('change',{currentTarget: { value : 'breakfast'}});
    expect(onUpdateStateSpy.calledOnce).toBe(true);
    expect(onUpdateStateSpy.getCall(0).args).toEqual([{
        selectedMeal: "breakfast",
        selectedRestaurant: "",
        selectedDishes:[],
    }]);
});

it('should update number of people between 1 and 10', () => {
    const onUpdateStateSpy = sinon.spy();
    const wrapper = shallow(<MealSelection selectedMeal="lunch" peopleCount={1} updateState={onUpdateStateSpy} />);
    
    const input = wrapper.find('#people-count');
    expect(input).toHaveProp({value: 1});
    input.simulate('change',{currentTarget: { value : 0}});
    expect(onUpdateStateSpy.calledOnce).toBe(true);
    expect(onUpdateStateSpy.getCall(0).args).toEqual([{
        peopleCount: 1,
    }]);

    input.simulate('change',{currentTarget: { value : 11}});
    expect(onUpdateStateSpy.calledTwice).toBe(true);
    expect(onUpdateStateSpy.getCall(1).args).toEqual([{
        peopleCount: 10,
    }]);
});

