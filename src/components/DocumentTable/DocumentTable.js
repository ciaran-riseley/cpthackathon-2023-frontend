import DocumentRequest from "../DocumentRequest/DocumentRequest";
import './DocumentTable.css';
import React, { useState } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

const DocumentTable = ({customerID, customerFullName, documentRequests, idToken}) => {

    return (<div>
        <div className="heading">{customerID} {customerFullName}</div>
    <div>
        <MDBTable className="table align-middle mb-0 bg-white">
            <MDBTableHead className="bg-light">
            <tr>
                <th scope='col'>Request ID</th>
                <th scope='col' >File type</th>
                <th scope='col' ></th>
                <th scope='col' ></th>
            </tr>
                </MDBTableHead>
            <MDBTableBody>
            {documentRequests.map((req, key) => (
                <DocumentRequest key={key} requestId={req.requestId} fileType={req.fileType} idToken={idToken}/>))}
            </MDBTableBody>
        </MDBTable>

    </div>
        </div>
    )

}

export default DocumentTable;
