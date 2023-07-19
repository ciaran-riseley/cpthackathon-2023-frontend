import DocumentRequest from "../DocumentRequest/DocumentRequest";
import React, { useState } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

const DocumentTable = ({documentPayload}) => {

    if (documentPayload==null) {
        return (<div></div>)
    }
    return (
    <div>
        <MDBTable align='middle'>
            <MDBTableHead>
            <tr>
                <th scope='col'>Request ID</th>
                <th scope='col' >File type</th>
                <th scope='col'>User</th>
                <th scope='col' ></th>
            </tr>
                </MDBTableHead>
            <MDBTableBody>
            {documentPayload.data.map((req) => (
                <DocumentRequest requestId={req.request.requestId} fileType={req.request.fileType} user={req.request.userName}/>))}
            </MDBTableBody>
        </MDBTable>

    </div>
    )

}

export default DocumentTable;
