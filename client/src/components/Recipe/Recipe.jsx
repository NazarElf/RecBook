import React from 'react';

const Recipe = ({ingridients, picture, name, order}) => {

    const listOfIngridients = ingridients.map((ing, i) => {
        return <li key={i}>{ing.name}</li>
    })

    return (
        <div>
            <h1>Recipe of {name}</h1>
            <div className='blured-image' style={{backgroundImage: `url(${picture})`}} src={picture}/>
            <ul>
                {listOfIngridients}
            </ul>
            <p>{order}</p>
        </div>
    )
}

export default Recipe;