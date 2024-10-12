
const baseUrl = "https://playground.4geeks.com/contact"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [
			],
		},
		actions: {

			createContactList: async () => {
				const response = await fetch(baseUrl + "/agendas/santiago")
				try {
					if (!response.ok) {
						const addAgenda = await fetch(baseUrl + "/agendas/santiago", {
							method: 'POST',
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ slug: "santiago" })
						})
						const data = await addAgenda.json()
						console.log(data)
						setStore({ contacts: data.contacts })

					}
				} catch (error) {
					console.error("Error", error)
					return false
				}

			},

			getContactList: async () => {
				try {
					const response = await fetch(baseUrl + "/agendas/santiago")
					if (!response.ok) {
						console.error(response.statusText)
						return false
					}
					const dataApiContacts = await response.json()
					setStore({ contacts: dataApiContacts.contacts })
					return true
				} catch (error) {
					console.error("Error", error)
					return false
				}

			},

			createNewContact: async (newUserObj) => {
				const store = getStore()
				try {
					const response = await fetch(baseUrl + "/agendas/santiago/contacts", {
						method: 'POST',
						body: JSON.stringify(newUserObj),
						headers: { "Content-Type": "application/json" }
					})
					if (!response.ok) {
						console.error(response.statusText)
						return false
					}
					const dataNewUser = await response.json()
					console.log(dataNewUser)
					setStore({ contacts: store.contacts.concat(dataNewUser) })
					return true
				} catch (error) {
					console.error("Error", error)
					return false
				}

			},

			updateContact: async (id, data) => {
				try {
					const response = await fetch(baseUrl + "/agendas/santiago/contacts/" + id, {
						method: 'PUT',
						body: JSON.stringify(data),
						headers: { "Content-Type": "application/json" }
					})
					if (!response.ok) {
						console.error(response.statusText)
						return false
					}
					const dataApiUpdateContacts = await response.json()

					const newList = [...getStore().contacts]
					const index = newList.findIndex(item => item.id == id)
					newList[index] = dataApiUpdateContacts
					setStore({ contacts: newList })
					return true
				} catch (error) {
					console.error("Error", error)
					return false
				}
			},

			deleteContact: async (id) => {
				try {
					const response = await fetch(baseUrl + "/agendas/santiago/contacts/" + id, {
						method: 'DELETE'
					})
					if (!response.ok) {
						const errorData = await response.json()
						console.error("Error:", response.statusText, errorData)
						return false
					}
					//const data = await response.json()
					const updatedList = getStore().contacts.filter(contact => contact.id !== id)
					setStore({ contacts: updatedList })
					return true

				} catch (error) {
					console.error("Error", error)
					return false
				}
			}
		}
	};
};

export default getState;
