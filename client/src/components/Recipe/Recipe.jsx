import React from 'react';

const Recipe = (prop) => {

    const listOfIngridients = prop.ingridients.map(ing => {
        return <li>{ing.name}</li>
    })

    console.log(prop.ingridients)

    return (
        <div>
            <h1>Recipe of {prop.name}</h1>
            <img src={prop.picture}/>
            <ul>
                {listOfIngridients}
            </ul>
            <p>{prop.order}</p>
        </div>
    )
}

export default Recipe;