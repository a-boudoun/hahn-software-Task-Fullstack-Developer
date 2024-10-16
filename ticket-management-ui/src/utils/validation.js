export const validateForm = (description, status) => {
    const errors = {};
    if (!description) errors.description = 'Description is required';
    if (!status) errors.status = 'Status is required';
    return errors;
};
