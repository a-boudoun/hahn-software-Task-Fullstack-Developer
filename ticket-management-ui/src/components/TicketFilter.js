import React from 'react';
import { Select, MenuItem } from '@mui/material';

const TicketFilter = ({ filterStatus, handleFilterChange }) => (
    <Select
        value={filterStatus}
        onChange={handleFilterChange}
        displayEmpty
        sx={{ width: '200px' }}
    >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="OPEN">OPEN</MenuItem>
        <MenuItem value="CLOSED">CLOSED</MenuItem>
    </Select>
);

export default TicketFilter;
