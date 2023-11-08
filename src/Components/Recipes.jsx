import React from 'react'
import recipesCSS from "../CSS/recipes.module.css"

const Recipes = ({ title, calories, img, ingredients }) => {
    return (
        <React.Fragment>
            <div className={recipesCSS.mainContainer}>
                <div className={recipesCSS.container}>
                    <h1 className={recipesCSS.title}>{title}</h1>
                    <img src={img} alt={title} />
                    <h3 className={recipesCSS.calories}>{calories.toFixed(2)} Kcal</h3>
                    <ol className={recipesCSS.ingredients}>
                        {ingredients.map((el, index) => (
                            <li key={index}>{el.text}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Recipes