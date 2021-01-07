import React, { useState, useEffect } from 'react';
import constant from '../../../shared/constant';
import { Pagination } from 'react-bootstrap';
import './paginationStyle.css';

const CustomPagination = React.forwardRef((props, ref) => {
    const { currentPageChange, currentCount, totalNumberPage, listLength, t } = props;
    let paginationSliderLimit = constant.PAGINATION_SLIDER_LIMIT
    let startPage = constant.PAGINATION_SLIDER_START_PAGE
    const [initialPage, setInitialPage] = useState(startPage);
    const [currentPage, setCurrentPage] = useState();
    const [pageLimit, setPageLimit] = useState(paginationSliderLimit);
    const [lastPage, setLastPage] = useState(0);

    let items = [];

    if (totalNumberPage != lastPage && totalNumberPage) {
        if (totalNumberPage < constant.PAGINATION_SLIDER_LIMIT) {
            paginationSliderLimit = totalNumberPage
            setPageLimit(totalNumberPage);
        }
        else {
            paginationSliderLimit = constant.PAGINATION_SLIDER_LIMIT
            setPageLimit(constant.PAGINATION_SLIDER_LIMIT);
        }
        setLastPage(totalNumberPage)
    }

    useEffect(()=>{
        if ((currentCount > pageLimit) && pageLimit != lastPage && listLength > 0) {
            setInitialPage((parseInt((currentCount-1) / 5) * 5)+1)
            setPageLimit(pageLimit + constant.PAGINATION_SLIDER_LIMIT)
            setCurrentPage(currentCount);
        }
        else if (listLength == 0 && pageLimit != lastPage) {
            setInitialPage(startPage)
            setPageLimit(lastPage>constant.PAGINATION_SLIDER_LIMIT?constant.PAGINATION_SLIDER_LIMIT:lastPage)
        }
        else if (currentPage != currentCount && listLength > 0) {
            if (initialPage >= paginationSliderLimit) {
                setInitialPage(initialPage - paginationSliderLimit)
                setPageLimit(pageLimit - paginationSliderLimit)
                setCurrentPage(initialPage - paginationSliderLimit);
            }
            else {
                setCurrentPage(currentCount)
            }
        }
    })


    const onNext = (value) => {
        if (currentPage < lastPage) {
            if (value == 'nextE' && lastPage > pageLimit) {
                currentPageChange(pageLimit + 1);
            }
            else if (value != 'nextE') {
                currentPageChange(currentPage + 1);
            }
        }
    }

    const onPrev = (value) => {
        if (currentPage > startPage) {
            if (value == 'prevE' && initialPage > startPage) {
                currentPageChange(initialPage - paginationSliderLimit);
            }
            else if (value != 'prevE') {
                currentPageChange(currentPage - 1);
            }
        }
    }

    const onClickPage = (pageNumber) => {
        if (pageNumber <= lastPage) {
            currentPageChange(pageNumber);
        }
    }

    for (let number = initialPage; number <= pageLimit; number++) {
        items.push(
            number <= lastPage && <Pagination.Item onClick={() => onClickPage(number)} key={number} active={number == currentPage} >
                {number}
            </Pagination.Item>,
        );
    }

    return (
        totalNumberPage > 0 &&  <Pagination size="sm">
            {/* <Pagination.First /> */}
            <Pagination.First className="pagination-icon" onClick={() => onPrev('prevE')} disabled={initialPage > startPage ? false : true} />
            <Pagination.Prev className="pagination-icon" onClick={onPrev} disabled={currentPage > startPage ? false : true} />
            {items}
            <Pagination.Next className="pagination-icon" onClick={onNext} disabled={currentPage < lastPage ? false : true} />
            <Pagination.Last className="pagination-icon" onClick={() => onNext('nextE')} disabled={lastPage > pageLimit ? false : true} />
            {/* <Pagination.Last /> */}
        </Pagination>
    )
});

export default CustomPagination;