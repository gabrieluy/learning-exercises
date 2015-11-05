'use strict';

var LIVERELOAD_PORT = 35730;
var SERVER_PORT = 5000;

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            options: {
                livereload: LIVERELOAD_PORT
            },
            styles: {
                files: ['styles/**/*.css'],
                tasks: ['cssmin']
            },
            scripts: {
                tasks: ['browserify', 'jshint', 'casper:dev'],
                // tasks: ['browserify', 'jshint'],
                files: ['scripts/**/*.js', 'tests/**/*.js']
            },
            templates: {
                tasks: ['browserify', 'casper:dev'],
                // tasks: ['browserify'],
                files: ['**/*.html']
            }
        },
        connect: {
            options: {
                port: SERVER_PORT
            },
            dev: {
                options: {
                    livereload: LIVERELOAD_PORT,
                    keepalive: true
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'build/main.css': [
                        'node_modules/foundation-sites/css/normalize.min.css',
                        'node_modules/foundation-sites/css/foundation.min.css',
                        'styles/main.css'
                    ]
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            files: ['scripts/**/*.js', 'tests/**/*.js']
        },
        casper: {
            test : {
                options : {
                    test : true
                },
                files : {
                    'log/casper-results.xml' : ['tests/e2e/**/*.js']
                }
            },
            dev: {
                options : {
                    test : true,
                    'fail-fast': true
                },
                files : {
                    'log/casper-results.xml' : ['tests/e2e/**/*.js']
                }
            }
        },
        concurrent: {
            dev: {
                tasks: [
                    'connect:dev',
                    'watch'
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        browserify: {
            dev: {
                files: {
                    'build/main.js': ['scripts/main.js']
                },
                options: {
                    transform: ['node-underscorify'],
                    bundleOptions: {
                        debug: true
                    }
                }
            },
            dist: {
                options: {
                    transform: ['node-underscorify']
                },
                files: {
                    'build/main.js': ['scripts/main.js']
                }
            }
        }
    });

    grunt.registerTask('dev', ['browserify:dev', 'jshint', 'concurrent:dev']);
    grunt.registerTask('dev-build-all', ['browserify:dev', 'jshint', 'cssmin', 'concurrent:dev']);
    grunt.registerTask('build', ['browserify:dist', 'jshint', 'cssmin']);
    grunt.registerTask('test', ['casper:test']);
    grunt.registerTask('default', ['dev-build-all']);
};
