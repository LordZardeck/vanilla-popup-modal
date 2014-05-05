module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    var modernizrOutput = 'build/modernizr.js',
        uglifyFiles = {
            'build/vanilla-popup-modal.js': [
                'build/modernizr.js',
                'bower_components/get-size/get-size.js',
                'src/**/*.js'
            ]

        };

    var gruntConfig = {
        libraryName: 'vpm',
        modernizr: {
            dist: {
                'outputFile': modernizrOutput,
                'devFile': 'bower_components/modernizr/modernizr.js',
                'uglify': false,
                'extra': {
                    'cssclasses': false,
                    'shiv': false,
                    'printshiv': false,
                    'load': false,
                    'mq': false
                },
                "extensibility" : {
                    "addtest" : false,
                    "prefixed" : false,
                    "teststyles" : false,
                    "testprops" : false,
                    "testallprops" : false,
                    "hasevents" : false,
                    "prefixes" : false,
                    "domprefixes" : false
                }
            }
        },
        uglify: {
            dev: {
                options: {
                    sourceMap: false,
                    mangle: false,
                    beautify: true,
                    compress: false
                },
                files: uglifyFiles
            },
            prod: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    inSourceMap: "build/vanilla-popup-modal.js.map",
                    sourceMapName: "build/vanilla-popup-modal.min.js.map",
                    mangle: true,
                    beautify: false,
                    compress: true
                },
                files: uglifyFiles
            }
        }
    };

    grunt.initConfig(gruntConfig);

    grunt.registerTask('cleanBuild', function() {
        grunt.file.delete(modernizrOutput);
    })

    grunt.registerTask('build:dev', ['modernizr:dist', 'uglify:dev', 'cleanBuild']);
}