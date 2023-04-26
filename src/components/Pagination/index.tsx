import GoToPage from 'components/GoToPage/GoToPage';
import SizePerPage from 'components/SizePerPage/SizePerPage';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import ReactPaginate from 'react-paginate';
interface PaginationProps {
    pageNumber: number;
    pageSize: number;
    totalRow: number;
    onPageChange: (page: number) => void
    onChangePageSize: (size: number) => void
}
const Pagination = ({ pageNumber, pageSize, totalRow, onPageChange, onChangePageSize }: PaginationProps) => {
    const totalPage = Math.ceil(totalRow / pageSize)
    return (
        <div className="flex flex-col lg:flex-row gap-3 justify-between items-center w-full mt-10">
            <GoToPage onClickGoButton={(pageN) => onPageChange(+pageN)} defaultValue={pageNumber} maxValue={totalPage} />
            <div>
                {totalPage > 0 && <ReactPaginate
                    forcePage={pageNumber - 1}
                    nextLabel={<ChevronRight />} 
                    onPageChange={(value) => onPageChange(value.selected + 1)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    pageCount={totalPage}
                    previousLabel={<ChevronLeft/>}
                    pageClassName="page-item w-[30px]"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link ml-[8px]"
                    nextClassName="page-item"
                    nextLinkClassName="page-link ml-[8px]"
                    breakLabel={<MoreHorizontal/>}
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination flex gap-[5px]"
                    activeClassName="active"
                />}
            </div>
            <SizePerPage totalItem={totalRow} onChangePerPage={onChangePageSize} pageSizeDefault={pageSize} />
        </div>
    );
};

export default Pagination;