import React from 'react';
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader';
import UserList from './UserList';
import 'whatwg-fetch'; // fetch api polyfill

class App extends React.Component {

	constructor() {
		super();

		this.state = {
			loadingUsers: true,
			loadingUser: false,
			users: [],
			selectedUserId: 0,
			selectedUser: {},
			userCache: {}
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/api/users')
			.then((resp) => resp.json())
			.then(this._setUsers.bind(this))
			.catch(error => {
				throw error; // in real-life scenario would do something more useful...
			});
	}

	_setUsers (data) {
		this.setState({
			users: data,
			loadingUsers: false
		});
	}

	render() {

		const loader = <OverlayLoader 
						color={'rgb(60, 184, 77)'}
						loader="BeatLoader"
						text="Just a minute..."
						active={true} >
					</OverlayLoader>;

		return ( // SURPLUS DIVS
			<div>
				{this.state.loadingUsers && <div className="loading-component">{loader}</div>}
				{!this.state.loadingUsers &&
					<div>
						<h2>User List</h2>
						<div className="user-list-container">
							{this.state.users.length && 
								<UserList 
									users={this.state.users}
									loadingUsers={this.state.loadingUsers}
									loader={loader}
								/>
							}</div>
					</div>
				}
			</div>
		);
	}
}

export default App;