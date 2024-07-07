import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import { useState, useEffect } from 'react';
import axios from "axios";

const Book = () => {

  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDBbooks = async () => {
      try {
        const res = await axios.get('http://localhost:8001/books');
        console.log(res.data);
        setBook(res.data.filter(data => data.category === "Free"));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getDBbooks();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="bg-zinc-400  container max-w-screen-2xl mx-auto md:px-20 px-4 ">
        <h2 className="font-mono  font-bold text-3xl">Free Books</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda tenetur necessitatibus aliquam quasi eos neque provident a dolores amet molestias Assumenda tenetur necessitatibus aliquam quasi eos neque provident a dolores amet molestias</p>
      </div>
      <div className="container max-w-screen-2xl mx-auto md:px-20 px-4 bg-zinc-400">
        <Slider {...settings}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            book.map((item) => (
              <Cards item={item} key={item._id} />
            ))
          )}
        </Slider>
      </div>
    </>
  );
}

export default Book;
