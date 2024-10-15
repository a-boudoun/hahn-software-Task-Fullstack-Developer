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
} from '@mui/material';

const TicketTable = () => {
    const [tickets, setTickets] = useState([]);
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('OPEN');
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tickets`);
        setTickets(response.data.tickets);
    };

    const handleOpen = (ticket) => {
        setSelectedTicketId(ticket?.ticketId || null);
        setDescription(ticket?.description || '');
        setStatus(ticket?.status || 'OPEN');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDescription('');
        setStatus('OPEN');
        setSelectedTicketId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedTicketId) {
            // Update existing ticket
            await axios.put(`${process.env.REACT_APP_API_URL}/Tickets/${selectedTicketId}`, {
                description,
                status,
            });
        } else {
            // Create new ticket
            await axios.post(`${process.env.REACT_APP_API_URL}/Tickets`, {
                description,
                status,
            });
        }
        fetchTickets();
        handleClose();
    };

    const handleDelete = async (ticketId) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/Tickets/${ticketId}`);
        fetchTickets();
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Ticket Management
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
                Add New Ticket
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticket ID</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TableRow key={ticket.ticketId}>
                                <TableCell>{ticket.ticketId}</TableCell>
                                <TableCell>{ticket.description}</TableCell>
                                <TableCell>{ticket.status}</TableCell>
                                <TableCell>{new Date(ticket.date).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleOpen(ticket)}>
                                        Update
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDelete(ticket.ticketId)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedTicketId ? 'Update Ticket' : 'Add New Ticket'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the ticket description and status.
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
                    />
                    <TextField
                        margin="dense"
                        label="Status"
                        select
                        fullWidth
                        variant="outlined"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="OPEN">OPEN</option>
                        <option value="CLOSED">CLOSED</option>
                    </TextField>
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
        </div>
    );
};

export default TicketTable;
