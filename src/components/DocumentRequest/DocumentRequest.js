import React, { useState } from 'react';

import './DocumentRequest.css';
import {Storage} from "@aws-amplify/storage";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

const DocumentRequest = ({requestId, fileType, user}) => {

    const [state, setState] = useState({ imageFile: null, imageName: '' , response: ''});

    const uploadFile = (state) => {
        Storage.put(requestId + "-" + fileType + ".jpeg", state.imageFile )
            .then (result => console.log(result))
            .catch(err => console.log(err));    }

    return( <tr><td>{requestId}</td><td> {fileType}</td><td>{user}</td>
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

