import React from 'react';
import style from './index.module.scss'
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  onChangePage : (page: number) => void,
}

const Pagination : React.FC<PaginationProps> = ({onChangePage}) => {
    return(
        <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => onChangePage(event.selected+1)}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
      />
    )
}

export default Pagination