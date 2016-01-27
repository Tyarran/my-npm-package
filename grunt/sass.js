module.exports = {
    options: {
        sourcemap: "auto"
    },
    dist: {
        files: [{
            "expand": true,
            "cwd": "src/static/scss/",
            "src": ["*.scss"],
            "dest": "src/static/css/",
            "ext": ".css"
        }]
    }
};
