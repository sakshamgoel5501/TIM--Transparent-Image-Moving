import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchPosts = () => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      axios
         .get('http://localhost:3000/posts/username=heyyy/')
         .then((response) => {
            setPosts(response.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);
};

export default fetchPosts;