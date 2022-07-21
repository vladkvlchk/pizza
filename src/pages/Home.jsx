import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { sortList } from '../components/Sort';
import PBLoader from '../components/PBLoader';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMounted = React.useRef(false);
  const { activeCategory, currentSort, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);
  const { searchValue } = React.useContext(SearchContext);

  const getPizzas = async () => {
    const category = activeCategory === 'Все' ? '' : '&category=' + activeCategory;
    const sortBy = currentSort.property.replace('-', '');
    const order = currentSort.property[0] === '-' ? 'desc' : 'asc';

    dispatch(fetchPizzas({ category, sortBy, order, currentPage, searchValue }));

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategory,
        currentPage,
        sortProperty: currentSort.property,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [activeCategory, currentSort, currentPage, searchValue]);

  React.useEffect(() => {
    const params = qs.parse(window.location.search.substring(1));
    const sort = sortList.find((obj) => obj.property === params.sortProperty);
    dispatch(setFilters({ ...params, sort }));
  }, []);

  React.useEffect(() => {
    getPizzas();
  }, [activeCategory, currentSort, currentPage, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items[0] &&
          items.map((obj, index) => {
            return status === 'loading' ? (
              <PBLoader key={index} />
            ) : (
              <PizzaBlock key={`${obj.title.split(' ').join('').toUpperCase}_${index}`} {...obj} />
            );
          })}
      </div>
      <Pagination onChangePage={(number) => dispatch(setCurrentPage(number))} />
    </div>
  );
}

export default Home;
