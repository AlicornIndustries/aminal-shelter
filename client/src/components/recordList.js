import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// FUTURE: un-hardcode the record specs
const Record = (props) => {
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.microchipNumber}</td>
        <td>{props.record.species}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}
            >Delete
            </button>
        </td>
    </tr>
};

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // Fetch records from server
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`);

            if(!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }
        getRecords();
        return;
    }, [records.length]); // CHECK: effect only activates if number of records changes

    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter( (elem) => elem._id !== id ); // filter out the element with deleted id
        setRecords(newRecords);
    }

    // Map records to JSX Records
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // Display table with records
    return (
        <div>
            <h3>Animal List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Microchip Number</th>
                        <th>Species</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    )


}