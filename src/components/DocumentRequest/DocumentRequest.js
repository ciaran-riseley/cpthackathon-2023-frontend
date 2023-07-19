import React, { useState } from 'react';

import './DocumentRequest.css';
import {Storage} from "@aws-amplify/storage";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

const DocumentRequest = ({requestId, fileType}) => {

    const [state, setState] = useState({ imageFile: null, imageName: '' , response: ''});

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

    return( <tr><td>{requestId}</td><td> {fileType}</td>
            <td>
<div class="flex">

                <Form.Group controlId="formFile" className="mb-3">

                    <Form.Control   type="file"
            accept="image/jpeg"
            //ref={ref => (this.upload = ref)}
            onChange={e =>
                setState({
                    imageFile: e.target.files[0],
                    imageName: e.target.files[0].name
                })
            }
        />
                </Form.Group>
</div></td>
                <td><div>
            {/*<input value={state.imageName} placeholder="Select file" />*/}
            <Button classname="mb-3" variant="secondary"  onClick={uploadFile}> Upload File </Button>
</div>
    </td></tr>
    );
}

export default DocumentRequest;

