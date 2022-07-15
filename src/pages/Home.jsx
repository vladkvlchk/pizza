import React from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import PBLoader from '../components/PBLoader';
import Pagination from '../components/Pagination';
import {SearchContext} from '../App';

function Home() {
  const [items, setItems] = React.useState(['', '', '', '', '', '', '', '']);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState('Все');
  const [currentSort, setCurrentSort] = React.useState({
    name: 'популярности (DESC)',
    property: 'rating',
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const {searchValue} = React.useContext(SearchContext);

  React.useEffect(() => {
    const category = activeCategory === 'Все' ? '' : '&category=' + activeCategory;
    const sortBy = currentSort.property.replace('-', '');
    const order = currentSort.property[0] === '-' ? 'desc' : 'asc';

    fetch(
      `https://62cc94cda080052930ada9ff.mockapi.io/all?page=${currentPage}&limit=${8}${category}&search=${searchValue}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, currentSort, currentPage, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={activeCategory}
          onChangeCategory={(newValue) => setActiveCategory(newValue)}
        />
        <Sort value={currentSort} onChangeSort={(newValue) => setCurrentSort(newValue)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.map((obj, index) => {
          return isLoading ? (
            <PBLoader key={index} />
          ) : (
            <PizzaBlock key={`${obj.title.split(' ').join('').toUpperCase}_${index}`} {...obj} />
          );
        })}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
