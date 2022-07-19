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

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { activeCategory, currentSort, currentPage } = useSelector((state) => state.filter);
  const [items, setItems] = React.useState(['', '', '', '', '', '', '', '']);
  const [isLoading, setIsLoading] = React.useState(true);
  const { searchValue } = React.useContext(SearchContext);

  const fetchPizzas = () => {
    const category = activeCategory === 'Все' ? '' : '&category=' + activeCategory;
    const sortBy = currentSort.property.replace('-', '');
    const order = currentSort.property[0] === '-' ? 'desc' : 'asc';

    axios
      .get(
        `https://62cc94cda080052930ada9ff.mockapi.io/all?page=${currentPage}&limit=${8}${category}&search=${searchValue}&sortBy=${sortBy}&order=${order}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
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
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.property === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [activeCategory, currentSort, currentPage, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategory} />
        <Sort />
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
      <Pagination onChangePage={(number) => dispatch(setCurrentPage(number))} />
    </div>
  );
}

export default Home;
