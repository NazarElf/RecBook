import { combineReducers } from "redux";
import recipes from './recipes';
import ingridients from "./ingridients";

export default combineReducers({ recipes, ingridients })