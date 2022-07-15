import style from './index.module.scss'
import ReactPaginate from 'react-paginate';

function Pagination({onChangePage}){
    return(
        <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => onChangePage(event.selected+1)}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    )
}

export default Pagination