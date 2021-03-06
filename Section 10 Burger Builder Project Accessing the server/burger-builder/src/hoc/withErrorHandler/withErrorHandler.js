import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Model/Modal'
import Aux from '../_Aux/Auxilary'

/*
const withErrorHandler = (WrappedComponent, axios) => {
    const WithErrorHandler = props => {
        const [error, setError] = useState(null);
        const requestInterceptor = axios.interceptors.request.use(
            req => {
                setError(null);
                return req;
            },
        );
        const responseInterceptor = axios.interceptors.response.use(
            res => res,
            error => {
                setError(error);
                console.log('WithErrorHandler: ', error);
                return Promise.reject(error);
            }
        );
        console.log("Interceptors are", requestInterceptor, responseInterceptor);

        useEffect(
            () => {
                // console.log("Interceptors inside useEffect", requestInterceptor, responseInterceptor);

                return () => {
                    console.log("Interceptors cleaned up", requestInterceptor, responseInterceptor);
                    axios.interceptors.request.eject(requestInterceptor);
                    axios.interceptors.response.eject(responseInterceptor);
                };
            }, [responseInterceptor, requestInterceptor]
        );

        return <>
            <Modal
                show={error !== null}
                modalClosed={() => setError(null)}
            >
                {error !== null ? error.message : null}
            </Modal>
            <WrappedComponent {...props} />
        </>
    };
    return WithErrorHandler;
};
export default withErrorHandler;

*/
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })

                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({
                    error: err
                })
            })
        }

        componentWillUnmount() {
            console.log('Interceptors removed', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            console.log("Interceptors set", this.reqInterceptor, this.resInterceptor);
            return (
                <Aux>
                    <Modal
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}

                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>

            )
        }

    }
}

export default withErrorHandler;
