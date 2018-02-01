import React from 'react';

class UserDetails extends React.Component {

	render() {

		let index=0;

		const user = this.props.user,
			address = user.address,
			googleMapsLink = address && address.geo 
			? `https://google.com/maps/?q=${address.geo.lat},${address.geo.lng}`
			: null,
			
			tableContents = [
				['Name', (<div>{user.name}<span className="collapse" onClick={this.props.hideUserDetails}>&times;</span></div>)],
				['Username', user.username],
				['Email', (<a href={"mailto:" + user.email}>{user.email}</a>)],
				['Street', address && address.street],
				['Suite', address && address.suite],
				['City', address && address.city],
				['Zipcode', address && address.zipcode],
				['Location', googleMapsLink && (<a href={googleMapsLink} target="_blank" rel="noreferrer noopener">Open Google Maps</a>)],
				['Phone', user.phone],
				['Website', (<a href={"http://" + user.website} target="_blank">{user.website}</a>)],
				['Company Name', user.company && user.company.name],
				['Company Catchphrase', user.company && user.company.catchPhrase],
				['Company BS', user.company && user.company.bs]
			].map(value => <tr key={index++}><th>{value[0]}</th><td>{value[1]}</td></tr>);

		return (
			<table className="user-details" cellPadding="0">
				<tbody>
					{tableContents}
				</tbody>
			</table>
		);
	}
}

export default UserDetails;