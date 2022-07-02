import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        name: '',
        microchipNumber: '',
        species: '',
        records: []
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            //const id = params.id.toString(); // TODO: Do we need to do this? Issues with implicit use as string?
            const response = await fetch(`http://localhost:5000/record/${params.id})}`)

            if(!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if(!record) {
                window.alert(`Record with id ${params.id} not found`);
                navigate("/");
                return;
            }

            setForm(record);
        }

        fetchData();
        return;
    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        })
    }

    // Submit the form -> get data from form into editedAnimal -> POST to database
    async function onSubmit(e) {
        e.preventDefault();
        const editedAnimal = {
            name: form.name,
            microchipNumber: form.microchipNumber,
            species: form.species
        };

        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedAnimal),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        navigate("/");
    }

    // Display input form
    return (
        <div>
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        className="formControl"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="microchipNumber">Microchip Number: </label>
                    <input
                        type="text"
                        className="formControl"
                        id="microchipNumber"
                        value={form.microchipNumber}
                        onChange={(e) => updateForm({ microchipNumber: e.target.value })}
                    />
                </div>
                {/* FUTURE: define this dynamically based on format of record? Probably overkill, but I don't like hardcoding all this. */}
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="speciesOptions"
                            id="speciesCat"
                            value="Cat"
                            checked={form.level === "Cat"}
                            onChange={(e) => updateForm({ species: e.target.value })}
                        />
                        <label htmlFor="speciesCat" className="form-check-label">Cat</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="speciesOptions"
                            id="speciesDog"
                            value="Dog"
                            checked={form.level === "Dog"}
                            onChange={(e) => updateForm({ species: e.target.value })}
                        />
                        <label htmlFor="speciesDog" className="form-check-label">Dog</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="speciesOptions"
                            id="speciesDragon"
                            value="Dragon"
                            checked={form.level === "Dragon"}
                            onChange={(e) => updateForm({ species: e.target.value })}
                        />
                        <label htmlFor="speciesDragon" className="form-check-label">Dragon</label>
                    </div>
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
    );
}