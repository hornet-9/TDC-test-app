import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import App from './App';
import users from '../../users.json';
import Adapter from 'enzyme-adapter-react-16';

global.fetch = jest.fn().mockImplementation(() => new Promise((resolve, reject) => { }));

configure({ adapter: new Adapter() });

describe('On first page load', () => {

	test('renders without crashing', () => {
		const div = document.createElement('div');
		render(<App />, div);
	});
    test('the loading component should be visible by default', () => {
        const wrapper = shallow(<App />);
		expect(wrapper.find('.loading-component')).toHaveLength(1);
    });
    test('the loading component should not be visible if the loading state is false', () => {
        const wrapper = shallow(<App />);
        wrapper.setState({loadingUsers: false}, () => {
			wrapper.update();
			expect(wrapper.find('.loading-component')).toHaveLength(0);
        });
    });
	test('state is set with results of API call', () => {
		class AppTest extends App {
            componentDidMount() { 
				App.prototype._setUsers.call(this, users);
            }
        }
        const wrapper = shallow(<AppTest />);
        expect(wrapper.instance().state.users).toEqual(users);
	});
	test('when users in state, table rendered with row for every user', () => {
        const wrapper = mount(<App />);
        wrapper.setState({loadingUsers: false, users}, () => {
			wrapper.update();
			const userRows = wrapper.find('tbody tr');
			expect(userRows).toHaveLength(users.length);
        });
	});
	test('correct user data rendered in table', () => {
		const wrapper = mount(<App />);
		const user = [{name: 'John Smith',
						username: 'test123',
						email: 'abc@123.com',
						phone: '555 123',
						company: {name: 'test-comp'}}];
        wrapper.setState({loadingUsers: false, users: user}, () => {
			wrapper.update();
			const tableCells = wrapper.find('tbody tr td');
			expect(tableCells.at(0).text()).toEqual(user[0].name);
			expect(tableCells.at(1).text()).toEqual(user[0].username);
			expect(tableCells.at(2).text()).toEqual(user[0].email);
			expect(tableCells.at(3).text()).toEqual(user[0].phone);
			expect(tableCells.at(4).text()).toEqual(user[0].company.name);
        });
    });
});