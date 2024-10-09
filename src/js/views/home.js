import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan, faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()
	const { elementId } = useParams();

	const deleteUser = async (id) => {
		const deletion = await actions.deleteContact(id)
		if (deletion) {
			console.log("success!, user deleted")
		} else {
			alert("No se pudo eliminar el contacto")
		}
	}

	useEffect(() => {
		actions.getContactList()
	}, [store.contacts])

	return (
		< div className="container mt-5" >
			<ul className="list-group">
				{store.contacts.map((item, index) =>
					<li
						key={item.id}
						className="list-group-item d-flex justify-content-between"
					>
						<div className="d-flex">
							<div>
								<img className="me-3 rounded-circle" src={`https://picsum.photos/100/100?random=${index}`} />
							</div>
							<div className="flex-column">
								<div className="h4">{item.name}</div>
								<div className="text-black-50"><FontAwesomeIcon icon={faLocationDot} /> {item.address}</div>
								<div className="text-black-50"><FontAwesomeIcon icon={faPhone} /> {item.phone}</div>
								<div className="text-black-50"><FontAwesomeIcon icon={faEnvelope} /> {item.email}</div>
							</div>
						</div>
						<div>
							<Link to={"/contact/" + item.id}>
								<button className="btn btn-small">
									<FontAwesomeIcon icon={faPencil} />
								</button>
							</Link>
							<button className="btn btn-small" onClick={() => deleteUser(item.id)}>
								<FontAwesomeIcon icon={faTrashCan} />
							</button>
						</div>
					</li>
				)}
			</ul>
		</div >
	)
};
