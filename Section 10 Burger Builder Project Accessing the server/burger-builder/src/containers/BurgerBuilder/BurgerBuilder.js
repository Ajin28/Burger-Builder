import React, { Component } from 'react';
import Aux from '../../hoc/_Aux/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {

        axios('/ingredients.json')
            .then((res) => {
                this.setState({
                    ingredients: res.data,
                });
            }).catch(err => {
                this.setState({
                    error: true
                })
            })
    }

    addIngredientHandler = (type) => {
        this.setState((prevState) => {
            return {
                ingredients: {
                    ...prevState.ingredients,
                    [type]: prevState.ingredients[type] + 1,
                },
                totalPrice:
                    prevState.totalPrice +
                    INGREDIENT_PRICES[type],
            };
        }, this.updatePurchaseState);
    };

    removeIngredientHandler = (type) => {
        this.setState((prevState) => {
            if (prevState.ingredients[type] <= 0) {
                return;
            }
            return {
                ingredients: {
                    ...prevState.ingredients,
                    [type]: prevState.ingredients[type] - 1,
                },
                totalPrice:
                    prevState.totalPrice -
                    INGREDIENT_PRICES[type],
            };
        }, this.updatePurchaseState);
    };

    updatePurchaseState() {
        const returnBoolean = Object.values(
            this.state.ingredients
        ).some(
            (ingredientValue) => ingredientValue > 0
        );
        this.setState({ purchasable: returnBoolean });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.setState({
            loading: true,
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ameesha Jain',
                address: {
                    street: 'Sarafa Ward',
                    zipCode: '482002',
                    country: 'India',
                },
                email: 'dummy@gmail.com',
            },
            deliveryMethod: 'fastest',
        };

        axios
            .post('/orders.json', order)
            .then((res) => {
                this.setState({
                    loading: false,
                    purchasing: false,
                });

            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    purchasing: false,
                });

            });
    };


    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger
                        ingredients={this.state.ingredients}
                    />
                    <BuildControls
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={
                            this.removeIngredientHandler
                        }
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    price={this.state.totalPrice.toFixed(2)}
                    purchaseContinued={
                        this.purchaseContinueHandler
                    }
                    purchaseCanceled={this.purchaseCancelHandler}
                    ingredients={this.state.ingredients}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal
                    modalClosed={this.purchaseCancelHandler}
                    show={this.state.purchasing}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(
    BurgerBuilder,
    axios
);

