import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// defaults object  is used to set up defaults which are true for all requests which are being sent. 
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
axios.defaults.headers.common['Authorization'] = 'Auth token'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// used for example in adding authorization header
axios.interceptors.request.use(requestConfig => {
    console.log("Request", requestConfig);
    return requestConfig
}, error => {
    console.log(error);
    return Promise.reject(error)
})


// You learned how to add an interceptor, getting rid of one is also easy. Simply store the reference to the interceptor in a variable and call eject  with that reference as an argument, to remove
// var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);

axios.interceptors.response.use(responseConfig => {
    console.log("Response ", responseConfig);
    return responseConfig
}, error => {
    console.log(error);
    return Promise.reject(error)
})
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
