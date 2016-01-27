module.exports = {
    css: {
        files: ["src/static/scss/**/*.scss"],
        tasks: ["sass", "concat:css"],
        options: {
            livereload: true,
        }
    }
};
