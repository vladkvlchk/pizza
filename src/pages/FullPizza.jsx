import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function FullPizza() {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`https://62cc94cda080052930ada9ff.mockapi.io/all/${id}`);
      setPizza(data);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [id]);

  if (!pizza){
    return 'loading'
  }
  return (
    <div className="container">
      <div className="fullPizza">
        <img src={pizza.imageUrl} height={'500px'} alt="[photo of pizza]" />
        <h1>{pizza.title}</h1>
        <p>about pizza</p>
        <h4>{pizza.price} ₴</h4>
      </div>
    </div>
  );
}

export default FullPizza;
