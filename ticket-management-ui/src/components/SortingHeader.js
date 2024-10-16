import React from 'react';
import { TableCell } from '@mui/material';

const SortingHeader = ({ field, sortField, sortOrder, handleSort, sx, children }) => (
    <TableCell
        onClick={() => handleSort(field)}
        style={{ cursor: 'pointer' }}
        sx={sx}
    >
        {children} {sortField === field && (sortOrder === 'asc' ? '↑' : '↓')}
    </TableCell>
);

export default SortingHeader;
