import React, { useState } from 'react';

import './DocumentRequest.css';
import {Storage} from "@aws-amplify/storage";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

const DocumentRequest = ({requestId, fileType}) => {

    const [state, setState] = useState({ imageFile: null, imageName: '' , response: '', uploadButtonDisabled: true});

    const fulfilDataRequest = (state) => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json',
                'Accept': 'application/json',
               },
            body: JSON.stringify({ 'requestId': requestId, "s3Link": requestId + "-" + fileType + ".jpeg" })
        };
        fetch('https://4y3ygmtxzc.execute-api.us-west-2.amazonaws.com/prod/rfirequests', requestOptions)
            .then(response => response.json())
            .catch(error => console.log(error));
    }
    const uploadFile = (state) => {
        Storage.put(requestId + "-" + fileType + ".jpeg", state.imageFile )
            .then (result =>  {
                console.log(result);
                fulfilDataRequest();
            })
            .catch(err => console.log(err));

    }

    return( <tr><td className="cell">{requestId}</td><td className="cell"> {fileType}</td>
            <td className="d-table-cell">
                <div className="d-flex align-items-center">
                    <Form.Group controlId="formFile" >

                    <Form.Control   type="file"
                        accept="image/jpeg"
                        //ref={ref => (this.upload = ref)}
                        onChange={e =>
                            setState({
                                imageFile: e.target.files[0],
                                imageName: e.target.files[0].name,
                                uploadButtonDisabled: false
                            })
                        }
                    />
                    </Form.Group>
                </div>
            </td>
            <td>
                <div className="d-flex align-items-center  ">
                    <Button variant="secondary"  onClick={uploadFile} disabled={state.uploadButtonDisabled}> Upload File </Button>
                </div>
            </td>
        </tr>
    );
}

export default DocumentRequest;

