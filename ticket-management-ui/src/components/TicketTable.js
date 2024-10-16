import React, { useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableContainer,
    Paper,
    Typography,
    Box,
    TablePagination,
    Button,
    TableHead,
    TableRow,
    TableCell,
    CircularProgress,
} from '@mui/material';
import useTickets from '../hooks/useTickets';
import { validateForm } from '../utils/validation';
import TicketForm from './TicketForm';
import TicketFilter from './TicketFilter';
import TicketTableRow from './TicketTableRow';
import SortingHeader from './SortingHeader';

const TicketTable = () => {
    const {
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
    } = useTickets();

    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('OPEN');
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [errors, setErrors] = useState({});
    const [sortField, setSortField] = useState('ticketId');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleOpen = (ticket = null) => {
        setSelectedTicketId(ticket?.ticketId || null);
        setDescription(ticket?.description || '');
        setStatus(ticket?.status || 'OPEN');
        setOpen(true);
        setErrors({});
    };

    const handleClose = () => {
        setOpen(false);
        setDescription('');
        setStatus('OPEN');
        setSelectedTicketId(null);
        setErrors({});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm(description, status);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const ticketData = { description, status };
        try {
            if (selectedTicketId) {
                await axios.put(`${process.env.REACT_APP_API_URL}/Tickets/${selectedTicketId}`, ticketData);
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/Tickets`, ticketData);
            }
            fetchTickets(page, rowsPerPage, filterStatus);
            handleClose();
        } catch (error) {
            console.error('Error saving ticket:', error);
        }
    };

    const handleDelete = async (ticketId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/Tickets/${ticketId}`);
            fetchTickets(page, rowsPerPage, filterStatus);
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    const handleSort = (field) => {
        const isAsc = sortField === field && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortField(field);
        sortTickets(field, isAsc ? 'desc' : 'asc');
    };

    const sortTickets = (field, order) => {
        const sorted = [...tickets].sort((a, b) => {
            if (field === 'date') {
                return order === 'asc'
                    ? new Date(a[field]) - new Date(b[field])
                    : new Date(b[field]) - new Date(a[field]);
            } else {
                if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
                if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
                return 0;
            }
        });
        setTickets(sorted);
    };

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                Ticket Management
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <TicketFilter filterStatus={filterStatus} handleFilterChange={(e) => setFilterStatus(e.target.value)} />
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
            >
                Add New Ticket
            </Button>

            </Box>
            <TableContainer component={Paper}>
                <Table sx={{
                    width: '100%'
                }}>
                    <TableHead>
                        <TableRow>
                            <SortingHeader
                                field="ticketId"
                                sortField={sortField}
                                sortOrder={sortOrder}
                                handleSort={handleSort}
                                sx={{ fontWeight: 'bold', backgroundColor: '#e0f7fa' }}
                            >
                                Ticket ID
                            </SortingHeader>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0f7fa' }}>
                                Description
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0f7fa' }}>
                                Status
                            </TableCell>
                            <SortingHeader
                                field="date"
                                sortField={sortField}
                                sortOrder={sortOrder}
                                handleSort={handleSort}
                                sx={{ fontWeight: 'bold', backgroundColor: '#e0f7fa' }}
                            >
                                Date
                            </SortingHeader>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0f7fa' }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {isLoading ? (
                         <TableRow>
                         <TableCell colSpan={5} sx={{ border: 'none' }}>
                           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                             <CircularProgress />
                           </Box>
                         </TableCell>
                       </TableRow>
                        ) : (
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TicketTableRow
                                    key={ticket.ticketId}
                                    ticket={ticket}
                                    handleOpen={handleOpen}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            />
            <TicketForm
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                description={description}
                setDescription={setDescription}
                status={status}
                setStatus={setStatus}
                errors={errors}
                selectedTicketId={selectedTicketId}
            />
        </Box>
    );
};

export default TicketTable;
