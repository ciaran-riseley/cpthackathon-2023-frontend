import React, { useState } from 'react';

import './DocumentRequest.css';
import {Storage} from "@aws-amplify/storage";

const DocumentRequest = ({requestId, fileType}) => {

    const [state, setState] = useState({ imageFile: null, imageName: '' , response: ''});

    const uploadFile = (state) => {
        Storage.put(requestId + "-" + fileType + ".jpeg", state.imageFile )
            .then (result => console.log(result))
            .catch(err => console.log(err));    }

    return( <tr><td>{requestId}</td><td> {fileType}</td><td>
            <div>

            <input
            type="file"
            accept="image/jpeg"
            //style={{ display: "none" }}
            //ref={ref => (this.upload = ref)}
            onChange={e =>
                setState({
                    imageFile: e.target.files[0],
                    imageName: e.target.files[0].name
                })
            }
        />
            {/*<input value={state.imageName} placeholder="Select file" />*/}
            <button onClick={uploadFile}> Upload File </button>
            </div>
    </td></tr>
    );
}

export default DocumentRequest;

