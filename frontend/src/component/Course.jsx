import Cards from "./Cards";
import { useState, useEffect } from 'react';
import axios from "axios";

const Course = () => {
  const [book, setBook] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getDBbooks = async () => {
      try {
        const res = await axios.get('http://localhost:8001/books');
        console.log(res.data);
        setBook(res.data);
        setLoading(false); 
      } catch (error) {
        console.log(error);
        setLoading(false); 
      }
    };
    getDBbooks();
  }, []);

  return (
    <div className="bg-zinc-400 container max-w-screen-2xl mx-auto md:px-20 px-4">
      <div className="items-center justify-center ">
        <h2 className="md:text-4xl text-2xl font-semibold text-center font-mono">
          We welcome you here for <span className="text-zinc-600">learning!..</span>
        </h2>
        <p className="mt-4 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, a. Totam veniam sint neque sit. Ex, odio deserunt placeat eius aliquam a, quibusdam assumenda doloribus, culpa ut animi. Mollitia eaque animi obcaecati quos nam voluptas laborum velit aut corporis voluptatibus repellendus ex optio, accusamus sunt officiis repellat eius minus enim!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div>Loading...</div> 
        ) : (
          book.map((item) => (
            <Cards item={item} key={item._id} /> 
          ))
        )}
      </div>
    </div>
  );
};

export default Course;
