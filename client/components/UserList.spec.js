import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount, render } from 'enzyme';
import UserList from './UserList';
import users from '../../users.json';
import Adapter from 'enzyme-adapter-react-16';

global.fetch = jest.fn().mockImplementation(() => new Promise((resolve, reject) => { }));

configure({ adapter: new Adapter() });

describe('On row click', () => {
	test('get user details API called', () => {
		const spy = jest.spyOn(UserList.prototype, '_fetchUserDetails');
	    const wrapper = shallow(<UserList loadingUsers={false} users={users}/>);
		wrapper.find('tbody tr').first().simulate('click');
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});
	test('if user details previously fetched, get data from cache instead of calling api again', () => {
		const spy = jest.spyOn(UserList.prototype, '_fetchUserDetails');
	    const wrapper = shallow(<UserList loadingUsers={false} users={users}/>);
		const row = wrapper.find('tbody tr').first();
		row.simulate('click');
		const selectedUser = users[0];
		wrapper.instance()._setSelectedUser(selectedUser);
		expect(wrapper.instance().state.userCache[selectedUser.id]).toBeDefined();
		row.simulate('click');
		expect(spy).toHaveBeenCalledTimes(1); // i.e. not called on second click
		spy.mockRestore();
	});
	test('loading user component visible, loading state true', () => {
	    const wrapper = mount(<UserList loadingUsers={false} users={users}/>);
	    const selectedUser = users[0];
		wrapper.find('tbody tr').first().simulate('click');
		wrapper.update();
		expect(wrapper.find('.table-cell .loading-component')).toHaveLength(1);
		expect(wrapper.instance().state.loadingUser).toBe(true);
	});
	test('User is set in state with results of API call', () => {
	    const wrapper = shallow(<UserList loadingUsers={false} users={users}/>);
	    const selectedUser = users[0];
    	wrapper.instance()._setSelectedUser(selectedUser);
        expect(wrapper.instance().state.selectedUser).toEqual(selectedUser);
	});
	test('when selected user in state, nested details table rendered', () => {
        const wrapper = mount(<UserList loadingUsers={false} users={users}/>);
	    const selectedUser = users[0];
		expect(wrapper.find('.table-cell .user-details')).toHaveLength(0);
		wrapper.instance()._setSelectedUser(selectedUser);
		wrapper.update();
		expect(wrapper.find('.table-cell .user-details')).toHaveLength(1);
		expect(wrapper.find('.table-cell .collapse')).toHaveLength(1);
	});	
	test('no nested table should be visible while user details loading', () => {
	    const wrapper = mount(<UserList loadingUsers={false} users={users}/>);
	    const selectedUser = users[0];
		wrapper.instance()._setSelectedUser(selectedUser);
		wrapper.update();
		expect(wrapper.find('.table-cell .user-details')).toHaveLength(1);
		wrapper.setState({loadingUser: true}, () => {
			wrapper.update();
			expect(wrapper.find('.table-cell .user-details')).toHaveLength(0);
    	});
	});
});

describe('On clicking X', () => {
	test('row collapses', () => {
	    const wrapper = mount(<UserList loadingUsers={false} users={users}/>);
	    const selectedUser = users[0];
		wrapper.instance()._setSelectedUser(selectedUser);
		wrapper.update();
		wrapper.find('.table-cell .collapse').first().simulate('click');
		wrapper.update();
    	expect(wrapper.instance().state.selectedUser.id).toBeUndefined();
	});
});
