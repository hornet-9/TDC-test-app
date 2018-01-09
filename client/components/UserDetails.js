import React from 'react';

class UserDetails extends React.Component {

	render() {

		const user = this.props.user,
			address = user.address,
			googleMapsLink = address && address.geo 
			? `https://google.com/maps/?q=${address.geo.lat},${address.geo.lng}`
			: null;

		return (
			<table className="user-details" cellPadding="0">
				<tbody>
					<tr><th>Name</th><td>{user.name}<span className="collapse" onClick={this.props.hideUserDetails}>&times;</span></td></tr>
					<tr><th>Username</th><td>{user.username}</td></tr>
					<tr><th>Email</th><td><a href={"mailto:" + user.email}>{user.email}</a></td></tr>
					<tr><th>Street</th><td>{address && address.street}</td></tr>
					<tr><th>Suite</th><td>{address && address.suite}</td></tr>
					<tr><th>City</th><td>{address && address.city}</td></tr>
					<tr><th>Zipcode</th><td>{address && address.zipcode}</td></tr>
					<tr><th>Location</th><td>{googleMapsLink && <a href={googleMapsLink} target="_blank" rel="noreferrer noopener">Open Google Maps</a>}</td></tr>
					<tr><th>Phone</th><td>{user.phone}</td></tr>
					<tr><th>Website</th><td><a href={"http://" + user.website} target="_blank">{user.website}</a></td></tr>
					<tr><th>Company Name</th><td>{user.company && user.company.name}</td></tr>
					<tr><th>Company Catchphrase</th><td>{user.company && user.company.catchPhrase}</td></tr>
					<tr><th>Company BS</th><td>{user.company && user.company.bs}</td></tr>
				</tbody>
			</table>
		);
	}
}

export default UserDetails;