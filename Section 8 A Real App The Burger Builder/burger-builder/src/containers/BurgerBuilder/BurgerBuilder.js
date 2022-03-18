import React, { Component } from "react";
import Aux from '../../hoc/_Aux/Auxilary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Model/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    // Here since we reply on prevState it is better to use funtional setState to ensure our state is not batched/override
    addIngredientHandler = type => {
        this.setState((prevState) => {
            return {
                ingredients: {
                    ...prevState.ingredients,
                    [type]: prevState.ingredients[type] + 1
                },
                totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
            }
        }, this.updatePurchaseState)

    };

    removeIngredientHandler = (type) => {
        this.setState((prevState) => {
            if (prevState.ingredients[type] <= 0) {
                return;
            }
            return {
                ingredients: {
                    ...prevState.ingredients,
                    [type]: prevState.ingredients[type] - 1
                },
                totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
            }
        }, this.updatePurchaseState)


    }

    updatePurchaseState() {
        const returnBoolean = Object.values(
            this.state.ingredients
        ).some(
            ingredientValue => ingredientValue > 0

        );
        this.setState({ purchasable: returnBoolean });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        alert('You continued')
    }


    /*
    The some() method executes the function once for each element present in the array:
    
    - If it finds an array element where the function returns a true value, some() returns true (and does not check the remaining values)
    - Otherwise it returns false
    */

   
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // console.log(this.state);

        // console.log("Disabled", disabledInfo);
        // {salad: true, bacon: true, cheese: true, meat: true}

        return (
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    <OrderSummary price={this.state.totalPrice.toFixed(2)} purchaseContinued={this.purchaseContinueHandler} purchaseCanceled={this.purchaseCancelHandler} ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ordered={this.purchaseHandler} purchasable={this.state.purchasable} price={this.state.totalPrice} disabled={disabledInfo} ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} />
            </Aux>
        );
    }

}

export default BurgerBuilder;


 /*
    // Old Practise
     addIngredientHandler = (type) => {
         const oldCount = this.state.ingredients[type];
         const updatedCount = oldCount + 1;
         const updatedIngredients = {
             ...this.state.ingredients
         }
         updatedIngredients[type] = updatedCount;
         const priceAddition = INGREDIENT_PRICES[type];
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice + priceAddition;
         this.setState({
             ingredients: updatedIngredients,
             totalPrice: newPrice
         })
         this.updatePurchaseState(updatedIngredients)
 
     }
 
     removeIngredientHandler = (type) => {
         const oldCount = this.state.ingredients[type];
         if (oldCount <= 0) {
             return;
 
         }
         const updatedCount = oldCount - 1;
         const updatedIngredients = {
             ...this.state.ingredients
         }
         updatedIngredients[type] = updatedCount;
         const priceDeduction = INGREDIENT_PRICES[type];
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice - priceDeduction;
         this.setState({
             ingredients: updatedIngredients,
             totalPrice: newPrice
         })
         this.updatePurchaseState(updatedIngredients)
     }


      updatePurchaseState(ingredients) {
      

        const sum = Object.keys(ingredients)
            .map((ingredientKey) => {
                return ingredients[ingredientKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)

        this.setState({
            purchasable: sum > 0
        })
    }
 */
