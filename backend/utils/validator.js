function validateEmail(email) {
    // simple RFC-like check (not exhaustive)
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(email);
}


module.exports = { validateEmail };