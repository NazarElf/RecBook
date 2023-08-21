import axios from 'axios';

const url = 'http://localhost:5000/recipes'

export const fetchPosts = () => axios.get(url);