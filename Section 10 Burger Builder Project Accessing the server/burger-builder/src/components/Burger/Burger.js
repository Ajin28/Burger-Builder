import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    let BurgerIngredients = Object.keys(props.ingredients)
        .map((ingredientKey) => {
            return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
                return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />
            })
        })
        .reduce((array, currentEl) => {
            return array.concat(currentEl)
        }, [])


    // console.log(BurgerIngredients);
    // (4) [Array(0), Array(0), Array(0), Array(0)]

    if (BurgerIngredients.length === 0) {
        BurgerIngredients = <p>Please start adding ingridients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {BurgerIngredients}
            <BurgerIngredient type='bread-bottom' />

        </div>
    );
}

export default Burger;