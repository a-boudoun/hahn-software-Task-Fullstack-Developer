import { useState, useEffect } from 'react';
import axios from 'axios';

const useTickets = (initialPage = 0, initialRowsPerPage = 10, initialFilterStatus = '') => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
    const [totalCount, setTotalCount] = useState(0);
    const [filterStatus, setFilterStatus] = useState(initialFilterStatus);

    useEffect(() => {
        fetchTickets(page, rowsPerPage, filterStatus);
    }, [page, rowsPerPage, filterStatus]);

    const fetchTickets = async (page, rowsPerPage, status) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/tickets`, {
                params: {
                    page: page + 1,
                    pageSize: rowsPerPage,
                    status: status || undefined,
                },
            });
            setTickets(response.data.tickets);
            setTotalCount(response.data.totalCount);
        } catch (error) {
            console.log({error});
            setError(error.message);
        }
        setIsLoading(false)
    };

    return {
        tickets,
        setTickets,
        totalCount,
        page,
        rowsPerPage,
        filterStatus,
        setPage,
        setRowsPerPage,
        setFilterStatus,
        fetchTickets,
        isLoading,
        error
    };
};

export default useTickets;
