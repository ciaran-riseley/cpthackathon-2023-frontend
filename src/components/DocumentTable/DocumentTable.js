import DocumentRequest from "../DocumentRequest/DocumentRequest";
import React, { useState } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

const DocumentTable = ({customerID, customerFullName, documentRequests}) => {

    return (
    <div>{customerID} {customerFullName}
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
            {documentRequests.map((req) => (
                <DocumentRequest requestId={req.requestId} fileType={req.fileType}/>))}
            </MDBTableBody>
        </MDBTable>

    </div>
    )

}

export default DocumentTable;
