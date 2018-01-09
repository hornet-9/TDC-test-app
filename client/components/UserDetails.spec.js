import React from 'react';
import { configure, shallow } from 'enzyme';
import UserDetails from './UserDetails';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('On render', () => {
	test('Google Maps link renders correctly', () => {

		const user = {  
			"address":{  
				"geo":{  
					"lat":"-43.9509",
					"lng":"-34.4618"
				}
			}
		};
		const wrapper = shallow(<UserDetails user={user}/>);
		expect(
			wrapper.contains(<a href="https://google.com/maps/?q=-43.9509,-34.4618" target="_blank" rel="noreferrer noopener">Open Google Maps</a>)
			).toBe(true);
	});
});
