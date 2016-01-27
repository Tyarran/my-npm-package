module.exports = function(grunt){

    /* TPLS */
    var prepareTPL = function(dev) {
        var moduleBower = grunt.file.readJSON('./bower.json');
        var moduleName = moduleBower.name;

        console.log('## ' + moduleName);

        var moduleConfig = grunt.file.readJSON('./config.json');
        var files = moduleConfig.files.html;
        var filesToConcat = [];

        // var concatDestHTML;
        concatDestHTML = './src/static/js/templates/base.js';

        // console.log('###' + './config.json');
        // console.log('##' + files);

        files.forEach(function(file) {
            console.warn(file);

            if (typeof(file) === 'object') {
                for (var property in file) {
                    if (property === 'bower') {
                        console.log('###' + bowerDirectory + file.bower);
                        filesToConcat.push(bowerDirectory + file.bower);
                    }
                }
            } else {
                filesToConcat.push('src/templates/' + file);
            }
        });

        console.warn(filesToConcat);

        // get the current concat object from initConfig
        var concat = grunt.config.get('concat') || {};

        // create a subtask for each module, find all src files
        // and combine into a single js file per module
        // console.log('# TEMP CONCAT DEST HTML # ' + concatDestHTML);
        /* get TPL banner & footer */

        var banner = grunt.file.read('src/static/js/templates/banner.js');
        var footer = grunt.file.read('src/static/js/templates/footer.js');

        concat[moduleName + '-html'] = {
            src: filesToConcat,
            dest: concatDestHTML,
            options: {
                process: function(src, filepath, d) {
                    console.warn('Process');

                    // var tplName = filepath
                    var tplName = filepath.substring(filepath.lastIndexOf("/") + 1, filepath.lastIndexOf("."));
                    /* need to uglify src */
                    var minify = require('html-minifier').minify;
                    var result = minify(src, {
                        collapseWhitespace: true
                    });
                    console.log('adding tpl id: #' + tplName);
                    return 'MP.TemplatesLoad["#' + tplName + '"] = \'' + result.replace(/'/g, "\\'") + '\';';
                },
                banner: banner || '',
                footer: footer || ''
            }
        };

        grunt.config.set('concat', concat);
        grunt.task.run('concat');
    };

    grunt.registerTask("prepareTPL-dev", "Finds and prepares tpl for concatenation.", function() {
        prepareTPL('dev');
    });
};
