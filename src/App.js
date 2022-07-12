import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import React from 'react'
import PBLoader from './components/PBLoader';

function App() {
  const [items, setItems] = React.useState(['', '', '', '', '', '', '', '']);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(()=>{
    fetch('https://62cc94cda080052930ada9ff.mockapi.io/all')
    .then(res => res.json())
    .then(arr => {
      setItems(arr);
      setIsLoading(false);
    });
  },[]);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj, index) => {
              return ( isLoading ? <PBLoader /> :
                <PizzaBlock
                  key={`${obj.title.split(' ').join('').toUpperCase}_${index}`}
                  {...obj}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
