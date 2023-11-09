import React, { useEffect } from 'react';
import { useState } from 'react'
import { useQuery, useMutation } from 'react-query';
import Recipes from './Components/Recipes';
import axios from 'axios';
import appCSS from "./CSS/app.module.css"
import creds from './creds';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState("");

  const client = axios.create({
    baseURL: `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${creds.API_ID}&app_key=${creds.API_KEY}`
  })

  const recipesQuery = useQuery({
    queryKey: ["RECIPES"],
    queryFn: () => client.get().then(response => setRecipes(response.data.hits)),
    enabled: false,
    onSuccess: () => setInput("")
  })

  if (recipesQuery.isLoading) {
    return (
      <React.Fragment>
        <div className={appCSS.load}>
          <span>Loading...</span>
        </div>
      </React.Fragment>
    )
  }

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    recipesQuery.refetch();
  }

  return (
    <React.Fragment>
      <div className={appCSS.app}>
        <form onSubmit={handleSubmit} className={appCSS.searchForm}>
          <input type="text" className={appCSS.searchInput} value={input} onChange={handleInput} placeholder='Lets search🍳🧑‍🍳' />
          <button type='submit' className={appCSS.searchButton}>Search</button>
        </form>
        {
          recipesQuery.isSuccess && recipes.length === 0 ? (
            <div className={appCSS.notFoundContainer}>
              <span className={appCSS.noResults}>♨️No results found♨️</span>
            </div>
          ) :
            recipes.map((el, index) => (
              <Recipes
                key={index}
                title={el.recipe.label}
                calories={el.recipe.calories}
                img={el.recipe.image}
                ingredients={el.recipe.ingredients} />
            ))
        }
      </div>
    </React.Fragment>
  )
}

export default App
