import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    
}