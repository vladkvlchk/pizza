import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories, PizzaBlock, Skeleton, Pagination, Sort } from '../components';
import { sortList } from '../components/Sort';
import { setCurrentPage, setFilters } from '../redux/slices/filter/slice';
import { selectFilter } from '../redux/slices/filter/selectors';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';
import { selectPizza } from '../redux/slices/pizza/selectors';
import { UseAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = UseAppDispatch();

  const isMounted = React.useRef(false);
  const { activeCategory, currentSort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const getPizzas = async () => {
    const category: string = activeCategory === 'All' ? '' : '&category=' + activeCategory;
    const sortBy: string = currentSort.property.replace('-', '');
    const order: string = currentSort.property[0] === '-' ? 'desc' : 'asc';

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
    dispatch(
      setFilters({
        ...params,
        sort,
        searchValue: '',
        activeCategory: '',
        currentPage: 0,
        currentSort: {
          name: '',
          property: '',
        },
      }),
    );
  }, []);

  React.useEffect(() => {
    getPizzas();
  }, [activeCategory, currentSort, currentPage, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{activeCategory} pizzas</h2>
      <div className="content__items">
        {items[0] &&
          items.map((obj: any, index: number) => {
            return status === 'loading' ? (
              <Skeleton key={index} />
            ) : (
              <PizzaBlock key={`${obj.title}_${index}`} {...obj} />
            );
          })}
      </div>
      <Pagination onChangePage={(page: number) => dispatch(setCurrentPage(page))} />
    </div>
  );
};

export default Home;
