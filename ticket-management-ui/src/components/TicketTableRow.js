import React from 'react';
import { TableRow, TableCell, Button, Tooltip } from '@mui/material';

const TicketTableRow = ({ ticket, handleOpen, handleDelete }) => (
    <TableRow key={ticket.ticketId}>
        <TableCell>{ticket.ticketId}</TableCell>
        <TableCell>
        <Tooltip title={ticket.description} arrow>
            <span style={{
                display: 'inline-block',
                maxWidth: '200px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer',
            }}>
                {ticket.description}
            </span>
        </Tooltip>
        </TableCell>
        <TableCell>{ticket.status}</TableCell>
        <TableCell>{new Date(ticket.date).toLocaleString()}</TableCell>
        <TableCell>
            <Button variant="outlined" color="primary" onClick={() => handleOpen(ticket)}>
                Update
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(ticket.ticketId)}>
                Delete
            </Button>
        </TableCell>
    </TableRow>
);

export default TicketTableRow;
