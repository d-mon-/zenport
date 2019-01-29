import React from 'react';
import DishSelector from '../DishSelector';
import { shallow } from 'enzyme';
import sinon from 'sinon';

it('should set an Error', () => {
    const onSetErrorSpy = sinon.spy();
    const wrapper = shallow(<DishSelector selectedDishes={[]} filteredDishes={[]} setError={onSetErrorSpy} />);
    const button = wrapper.find('button'); // plus button
    
    button.simulate('click');
    expect(onSetErrorSpy.calledOnce).toBe(true);
    expect(onSetErrorSpy.getCall(0).args).toEqual(["You must choose a dish first"]);
});