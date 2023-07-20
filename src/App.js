import React, { useState, useEffect} from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Auth from '@aws-amplify/auth';
import { Storage } from '@aws-amplify/storage';
import DocumentTable from './components/DocumentTable/DocumentTable.js';



Amplify.configure({
  Auth: {
      identityPoolId: "us-west-2:07c62477-4f96-4438-86b9-30ebbea9a1fe",
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  },
    Storage: {
      bucket: "2023-cpt-hackathon-dropbear-rfi",
        region: awsExports.REGION,
        identityPoolId: "us-west-2:07c62477-4f96-4438-86b9-30ebbea9a1fe"
    }
});


const NOTSIGNIN = 'Welcome to secure document upload';
const SIGNEDIN = 'You have logged in successfully';
const SIGNEDOUT = 'You have logged out successfully';
const WAITINGFOROTP = 'Enter one-time password';
const VERIFYEMAIL = 'Verifying email';

function App() {
  const [message, setMessage] = useState('Welcome to Demo');
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [documentRequests, setDocumentRequests] = useState([]);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    verifyAuth();
    console.log("ID token: " + idToken + " has changed");
    getPayload();
  }, [idToken]);
  const getPayload = () => {


      fetch("https://4y3ygmtxzc.execute-api.us-west-2.amazonaws.com/prod/rfirequests",
          {
              method: "GET",
              mode:'cors',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + idToken
              }
          }
      )
          .then(response => {
              return response.json();
          })
          .then(data => {
              setDocumentRequests(data);
          })
          .catch(error => console.log(error));
  }

;
  const verifyAuth = () => {
    Auth.currentAuthenticatedUser()
        .then((user) => {
          setUser(user);
          setMessage(SIGNEDIN);
          setSession(null);
        })
        .catch((err) => {
          console.error(err);
          setMessage(NOTSIGNIN);
        });
  };
  const signOut = () => {
    if (user) {
      Auth.signOut();
      setUser(null);
      setOtp('');
      setMessage(SIGNEDOUT);
    } else {
      setMessage(NOTSIGNIN);
    }
  };
  const signIn = (state) => {
    setMessage(VERIFYEMAIL);
    Auth.signIn(email)
        .then((result) => {
          setSession(result);
          setMessage(WAITINGFOROTP);
        })
        .catch((e) => {
        if (e.code === 'UsernameExistsException') {
            setMessage(WAITINGFOROTP);
            signIn();
          } else {
            console.log(e.code);
            console.error(e);
          }
        });
  };

  const verifyOtp = (user) => {
    Auth.sendCustomChallengeAnswer(session, otp)
        .then(user => {
            console.log("User: " + JSON.stringify(user));
            if (user.signInUserSession != null) {
                //console.log("Response from custom challenge: " + response)
                setUser(user);
                setMessage(SIGNEDIN + " " + user.username);
                setSession(null);
                console.log("user pool clientId: " +  user.pool.clientId );
                let idTokenField = "CognitoIdentityServiceProvider." + user.pool.clientId + "." + user.username + ".idToken";
                let idTokenValue = user['pool']['storage'][idTokenField];
                setIdToken(idTokenValue);
            } else {
                setMessage("Incorrect login details");
            }

        })
        .catch((err) => {
          setMessage(err.message);
          setOtp('');
          console.log(err);
        });
  };
  return (
      <div className='App'>
          <header className='App-header'>
              <p>{message}</p>
              {!user && !session && (
                <div><InputGroup className='mb-3'>
                    <FormControl
                        placeholder='Email address'
                        onChange={(event) => setEmail(event.target.value)}
                    />

                        <Button variant='outline-secondary'
                                onClick={signIn}>
                            Get OTP
                        </Button>

                </InputGroup></div>
              )}
              {!user && session && (
                  <div>
                      <InputGroup className='mb-3'>
                          <FormControl
                              placeholder='Your one-time password'
                              onChange={(event) => setOtp(event.target.value)}
                              value={otp}
                          />
                              <Button variant='outline-secondary'
                                      onClick={verifyOtp}>
                                  Confirm
                              </Button>
                      </InputGroup>
                  </div>
              )}
              {user && (
                  documentRequests.map((req, key) => {
                          return <DocumentTable
                              key={key}
                              customerID={req.customerId}
                              customerFullName={req.customerFullName}
                              documentRequests={req.documentRequests}
                              idToken={idToken}
                          />
                  }
                  )
              )}
          </header>
      </div>
  );
}
export default App;
