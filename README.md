# body-validator
Easy to use POST request body validator.

##### Example:

```javascript
const validator = require('./validator')
const export_request = async (req, res) => {
    const userEmail = req.claims.UserName;
    const userFirstName = req.claims.FirstName;
    const payload = req.body;

    //validate payload
    const validationResult = validator.validateInput({
        'domain': {'type': 'String'},
        'metrics': {'type': 'Array'},
        'from': {'type': 'String'},
        'to': {'type': 'String'},
        'mode': {'type': 'String'}
    }, payload);
    
    if (!validationResult.isValid) {
        return res.status(400).json({
            message: `input validation error, ${validationResult.message}`
        })
    }
    //...
}
```
