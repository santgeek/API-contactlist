import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const User = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    /*useEffect(() => {
        createNewContact()
    }, [])*/

    const newUserObj = {
        "name": fullName,
        "phone": phone,
        "email": email,
        "address": address,
    }

    const addUser = async () => {
        if (fullName && email && phone && address) {
            const result = await actions.createNewContact(newUserObj)
            if (result) {
                navigate("/")
            } else {
                alert("No se pudo agregar el contacto")
            }
        }
    }

    return (
        <div>
            <form className="container">
                <div className="mb-3">
                    <label className="form-label fw-bold">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={e => setFullName(e.target.value)}
                        value={fullName}
                        placeholder="Enter full name" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter email" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={e => setPhone(e.target.value)}
                        value={phone}
                        placeholder="Enter phone" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={e => setAddress(e.target.value)}
                        value={address}
                        placeholder="Enter address" />
                </div>
                <div className="d-grid">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => addUser()}
                    >Save
                    </button>
                </div>
                <Link to="/">
                    <span>or get back to contacts</span>
                </Link>
            </form>
        </div>
    )


}