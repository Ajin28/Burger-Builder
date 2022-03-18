import axios from "axios";

// Now by default, the instance here will also assume the default set up here(index.js) but overwrite anything which it sets up in the instance itself.
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'Auth token from instance';
// instance.interceptors.request.use(requestConfig => {
//     console.log("Request", requestConfig);
//     return requestConfig
// }, error => {
//     console.log(error);
//     return Promise.reject(error)
// })
export default instance;
