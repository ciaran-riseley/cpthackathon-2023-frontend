import React, { useState } from 'react';

import './DocumentRequest.css';
import {Storage} from "@aws-amplify/storage";
import Button from 'react-bootstrap/Button';

const DocumentRequest = ({requestId, fileType, user}) => {

    const [state, setState] = useState({ imageFile: null, imageName: '' , response: ''});

    const uploadFile = (state) => {
        Storage.put(requestId + "-" + fileType + ".jpeg", state.imageFile )
            .then (result => console.log(result))
            .catch(err => console.log(err));    }

    return( <tr><td>{requestId}</td><td> {fileType}</td><td>{user}</td>
            <td>


            <input
            type="file"
            accept="image/jpeg"
            //ref={ref => (this.upload = ref)}
            onChange={e =>
                setState({
                    imageFile: e.target.files[0],
                    imageName: e.target.files[0].name
                })
            }
        />
            {/*<input value={state.imageName} placeholder="Select file" />*/}
            <Button variant='outline-secondary' onClick={uploadFile}> Upload File </Button>

    </td></tr>
    );
}

export default DocumentRequest;

