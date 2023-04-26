import { useCallback, useEffect, useState } from 'react'

const usePagination = (initState: Array<number> = [10, 1, 0]) => {
    const [pageSize, setPageSize] = useState(initState[0] > 0 ? initState[0] : 10)
    const [pageNumber, setPageNumber] = useState(initState[1] > 0 ? initState[1] : 1)
    const [totalPage, setTotalPage] = useState(initState[2] || 0)
    const [totalRow, setTotalRow] = useState<number>(0);

    useEffect(() => {
        changeTotalPage(totalRow);
    }, [pageSize])

    const changePageNumber = useCallback((pageNumber: number) => {
        if (pageNumber <= 0 || totalPage === 0) return;
        const pageN = pageNumber > totalPage ? totalPage : pageNumber
        setPageNumber(pageN)
    }, [totalPage]);

    const changePageSize = useCallback((pageSize: number, pageNumber?: number) => {
        setPageSize(pageSize)
        pageNumber && changePageNumber(pageNumber)
    }, []);

    const changeTotalPage = useCallback((totalRow: number) => {
        if (!totalRow) return
        setTotalRow(totalRow);
        const totalPageCal = Math.ceil(totalRow / pageSize)
        setTotalPage(totalPageCal)
        if (pageNumber > totalPageCal && pageNumber > 1 && totalRow > 0) {
            setPageNumber(totalPageCal)
        }
    }, [pageSize]);

    return {
        pageSize, pageNumber, totalPage, totalRow,
        changePageNumber, changeTotalPage, changePageSize
    }
}

export default usePagination;
