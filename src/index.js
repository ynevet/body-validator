const isValidValue = (value, type) => {
    switch (type) {
        case 'String':
            return value && typeof value === 'string' && value.length > 0;
        case 'Array':
            return value && Array.isArray(value) && value.length > 0;
    }
}

function validateInput(schema, payload) {
    const validateResult = {};

    if (!payload) {
        validateResult.isValid = false;
        validateResult.message = 'payload is missing';
        return validateResult;
    }

    const missingFields = [];
    const addIfMissing = (fieldKey, fieldValue, fieldType) => {
        !isValidValue(fieldValue, fieldType) && missingFields.push(fieldKey);
    };

    Object.entries(schema).forEach(([fieldName, fieldValue]) => {
        addIfMissing(fieldName, payload[fieldName], fieldValue.type);
    });

    validateResult.isValid = !(missingFields.length > 0);
    validateResult.message = (missingFields.length > 0) ? `required fields are missing or empty: ${missingFields.join()}` : '';

    return validateResult;
}

module.exports = {
    validateInput
}
