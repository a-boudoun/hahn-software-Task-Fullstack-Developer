import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    Box,
    TablePagination,
    Tooltip,
    FormHelperText, 
} from '@mui/material';

const TicketTable = () => {
    const [tickets, setTickets] = useState([]);
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('OPEN');
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [errors, setErrors] = useState({}); // State for form validation errors

    useEffect(() => {
        fetchTickets(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const fetchTickets = async (page = 0, rowsPerPage = 10) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tickets`, {
            params: {
                page: page + 1,
                pageSize: rowsPerPage
            }
        });
        setTickets(response.data.tickets);
        setTotalCount(response.data.totalCount);
    };

    const handleOpen = (ticket) => {
        setSelectedTicketId(ticket?.ticketId || null);
        setDescription(ticket?.description || '');
        setStatus(ticket?.status || 'OPEN');
        setOpen(true);
        setErrors({}); // Clear errors when opening the form
    };

    const handleClose = () => {
        setOpen(false);
        setDescription('');
        setStatus('OPEN');
        setSelectedTicketId(null);
        setErrors({}); // Clear errors when closing the form
    };

    const validateForm = () => {
        const newErrors = {};
        if (!description) {
            newErrors.description = 'Description is required';
        }
        if (!status) {
            newErrors.status = 'Status is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return; // If validation fails, do not proceed
        }
        if (selectedTicketId) {
            await axios.put(`${process.env.REACT_APP_API_URL}/Tickets/${selectedTicketId}`, {
                description,
                status,
            });
        } else {
            await axios.post(`${process.env.REACT_APP_API_URL}/Tickets`, {
                description,
                status,
            });
        }
        fetchTickets(page, rowsPerPage);
        handleClose();
    };

    const handleDelete = async (ticketId) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/Tickets/${ticketId}`);
        fetchTickets(page, rowsPerPage);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                Ticket Management
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: '20px', borderRadius: '8px', overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell style={{ fontWeight: 'bold' }}>Ticket ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TableRow key={ticket.ticketId}>
                                <TableCell>{ticket.ticketId}</TableCell>
                                <TableCell>
                                    <Tooltip title={ticket.description} placement="top" arrow>
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                maxWidth: '200px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {ticket.description}
                                        </span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{ticket.status}</TableCell>
                                <TableCell>{new Date(ticket.date).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpen(ticket)}
                                        sx={{ marginRight: '8px' }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(ticket.ticketId)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(null)}
                    sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
                >
                    Add New Ticket
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedTicketId ? 'Update Ticket' : 'Add New Ticket'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the ticket description and select the status.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                    />
                    <Select
                        fullWidth
                        variant="outlined"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ marginTop: '20px' }}
                        error={Boolean(errors.status)}
                    >
                        <MenuItem value="OPEN">OPEN</MenuItem>
                        <MenuItem value="CLOSED">CLOSED</MenuItem>
                    </Select>
                    {errors.status && <FormHelperText error>{errors.status}</FormHelperText>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {selectedTicketId ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TicketTable;
