import DocumentRequest from "../DocumentRequest/DocumentRequest";
import React, { useState } from 'react';

const DocumentTable = ({documentPayload}) => {

    if (documentPayload==null) {
        return (<div></div>)
    }
    return (
    <div>
        <table>
            <tr>
                <td>Request ID</td>
                <td>File type</td>
            </tr>
            {documentPayload.data.map((req) => (
                <DocumentRequest requestId={req.request.requestId} fileType={req.request.fileType}/>))}
        </table>

    </div>
    )

}

export default DocumentTable;
