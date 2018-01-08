import React from 'react';
import UserDetails from './UserDetails';
import 'whatwg-fetch'; // fetch api polyfill

class UserList extends React.Component {
	
	constructor() {
	    super();

	    this.state = {
			loadingUser: false,
	        selectedUser: {},
	        userCache: {}
	    }
	}

	_fetchUserDetails (id) {
		fetch(`http://localhost:3000/api/user/${id}`)
			.then((resp) => resp.json())
			.then(this._setSelectedUser.bind(this))
			.catch(error => {
				throw error; // in real-life scenario would do something more useful...
			});
	}

	_displayUserDetails (id) {
		if (this.state.selectedUser.id === id) { // details already displayed
			return;
		}
		this.setState({loadingUser: true, selectedUser: {id}});
		// if cache already contains user details, serve from here
		if (this.state.userCache[id]) {
			// add slight delay to maintain transition effect
			setTimeout(this._setSelectedUser.bind(this, this.state.userCache[id]), 450);
		} else {
			this._fetchUserDetails(id);
		}
	}

	_setSelectedUser (user) {
		this.setState({
			selectedUser: user,
			loadingUser: false,
		});

		// Add user to cache object
		if (!this.state.userCache[user.id]) {
			this.setState(prevState => ({
    			userCache: {
        			...prevState.userCache,
        			[user.id]: user
    			}
			}));
		}
	}

	_hideUserDetails () {
		this.setState({
			selectedUser: {}
		});
	}

	render() {

		let user, stylesClass, rows = [];

		const users = this.props.users,
			selectedUserId = this.state.selectedUser.id;

		for (let i = 0; i < users.length; i += 1) {

			user = users[i];
			stylesClass = selectedUserId !== i + 1 ? 'table-cell' : 'hidden';

        	rows.push(
        		!this.props.loadingUsers && 
        		<tr key={i} onClick={this._displayUserDetails.bind(this, user.id)} className={selectedUserId === i + 1 ? 'extended' : 'collapsed'}>
		        	<td className={stylesClass}>{user.name}</td>
	        		<td className={stylesClass}>{user.username}</td>
	        		<td className={stylesClass}>{user.email}</td>
	        		<td className={stylesClass}>{user.phone}</td>
	        		<td className={stylesClass}>{user.company && user.company.name}</td>
	        		<td colSpan="5" className={selectedUserId === i + 1 ? 'table-cell' : 'hidden'}>
	        			{selectedUserId && !this.state.loadingUser && 
	        				<UserDetails 
	        					user={this.state.selectedUser}
	        					hideUserDetails={this._hideUserDetails.bind(this)}
	        				/>
	        			}
	        			{this.state.loadingUser && <div className="loading-component">{this.props.loader}</div>}
	        		</td>
	        	</tr>
		    );
        };

		return (
			<table className="user-list">
				<thead>
					<tr>
						<th>User</th>
						<th>Username</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Company</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}

export default UserList;