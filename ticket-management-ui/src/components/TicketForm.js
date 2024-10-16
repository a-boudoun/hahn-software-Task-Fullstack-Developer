import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Select,
    MenuItem,
    DialogActions,
    Button,
    FormHelperText,
} from '@mui/material';

const TicketForm = ({
    open,
    handleClose,
    handleSubmit,
    description,
    setDescription,
    status,
    setStatus,
    errors,
    selectedTicketId,
}) => (
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
                sx={{ marginTop: '20px' }}
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
);

export default TicketForm;
