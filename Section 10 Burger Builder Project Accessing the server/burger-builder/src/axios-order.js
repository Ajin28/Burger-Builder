import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burgerbuilder-d5787-default-rtdb.firebaseio.com'

});

export default instance;