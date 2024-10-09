import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const { elementId } = useParams();
	const [currentContact, setCurrentContact] = useState({
		name: "",
		phone: "",
		email: "",
		address: ""
	})

	const updateUser = async () => {
		if (currentContact.name || currentContact.email || currentContact.phone || currentContact.address) {
			const result = await actions.updateContact(elementId, currentContact)
			if (result) {
				navigate("/")
			} else {
				alert("No se pudo actualizar el contacto")
			}
		}
	}

	useEffect(() => {
		if (store.contacts) {
			if (store.contacts.length > 0 && elementId) {
				let contact = store.contacts.find(item => item.id == elementId)
				setCurrentContact(contact)
			}
		}

	}, [elementId, store.contacts])

	return (
		<div className="jumbotron">
			{/*<h1 className="display-4 ms-5">Contacto: {currentContact.name}</h1>*/}
			{/* <p>{JSON.stringify(currentContact)}</p> */}

			<form className="container">
				<div className="mb-3">
					<label className="form-label fw-bold">Full Name</label>
					<input
						type="text"
						className="form-control"
						onChange={e => setCurrentContact({ name: e.target.value })}
						value={currentContact.name}
						placeholder="Enter full name" />
				</div>
				<div className="mb-3">
					<label className="form-label fw-bold">Email</label>
					<input
						type="email"
						className="form-control"
						onChange={e => setCurrentContact({ email: e.target.value })}
						value={currentContact.email}
						placeholder="Enter email" />
				</div>
				<div className="mb-3">
					<label className="form-label fw-bold">Phone</label>
					<input
						type="text"
						className="form-control"
						onChange={e => setCurrentContact({ phone: e.target.value })}
						value={currentContact.phone}
						placeholder="Enter phone" />
				</div>
				<div className="mb-3">
					<label className="form-label fw-bold">Address</label>
					<input
						type="text"
						className="form-control"
						onChange={e => setCurrentContact({ address: e.target.value })}
						value={currentContact.address}
						placeholder="Enter address" />
				</div>
				<div className="d-grid">
					<button
						className="btn btn-primary"
						type="button"
						onClick={() => updateUser()}
					>Save
					</button>
				</div>
				<Link to="/">
					<span>or get back to contacts</span>
				</Link>
			</form>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
