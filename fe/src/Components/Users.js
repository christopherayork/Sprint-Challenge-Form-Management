import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import APIContext from './APIContext';

const MealDiv = styled.div`
  width: 15%;
`;

const MealContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const api_get = 'http://localhost:5000/api/restricted/data';

const Meal = props => {

  return (
      <MealDiv>
        <h2>{props.meal.name}</h2>
        <span>{props.meal.course}</span><br />
        <span><i>{props.meal.technique}</i></span>
        <h4>Ingredients</h4>
        <ol>
          {Array.isArray(props.meal.ingredients) ? props.meal.ingredients.map(i => <li>{i}</li>) : null}
        </ol>
      </MealDiv>
  );
};


const UsersList = () => {
  const [meals, setMeals] = useState([]);
  const [lastUpdate] = useContext(APIContext);

  useEffect(() => {
    axios.get(api_get)
        .then(res => {
          console.log(res.data);
          setMeals(res.data);
        })
        .catch(err => {
          console.error(err);
        });
  }, [lastUpdate]);

  return (
      <MealContainer>
      {meals.map(meal => <Meal key={meal.name} meal={meal} />)}
      </MealContainer>
  );
};

export default UsersList;