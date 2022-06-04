import React, {useState} from "react";
import { useNavigate } from "react-router-dom"; // !! NOTE: deviates from "react-router"

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        microchipNumber: "",
        species: ""
    });
    const navigate = useNavigate();

    // Update state properties
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    // Handle form submission // FUTURE: would also like to not hardcode form fields here (in case we change them elsewhere)
    async function onSubmit(e) {
        e.preventDefault(); 

        // POST request sent to the create url -> add a record to the database
        const newAnimal = { ...form };
        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAnimal)
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        // Clear form after submission
        setForm({ name: "", microchipNumber: "", species: "" });
        navigate("/");
    }

    // Display the form
    // FUTURE: better microchip number input, formats. Not actually a good idea to have the max (15 digit) here, in case system changes
    // FUTURE: replace species with a drop-down combo box or other input
    return (
        <div>
            <h3>Create New Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={ (e) => updateForm({name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="microchipNumber">Microchip Number: </label>
                    <input
                        type="number" step="1" min="0" max="999999999999999"
                        className="form-control"
                        id="microchipNumber"
                        value={form.microchipNumber}
                        onChange={ (e) => updateForm({microchipNumber: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="species">Species: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="species"
                        value={form.species}
                        onChange={ (e) => updateForm({species: e.target.value })}
                    />
                </div>
                <br />

                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
}