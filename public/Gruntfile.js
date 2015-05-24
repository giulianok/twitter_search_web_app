'use strict';
module.exports = function (grunt) {

    var npmDependencies = require('./package.json').devDependencies;
    var hasSass = npmDependencies['grunt-contrib-sass'] !== undefined;

    grunt.initConfig({
        // Dirs
        dirs: {
            bower: 'bower_components',
            libs: 'js/libs',
            js: 'assets/js',
            css: 'assets/css',
            images: 'assets/img'
        },
        // Watches for changes and runs tasks
        watch: {
            sass: {
                files: ['scss/**/*.scss'],
                tasks: (hasSass) ? ['sass:dev', 'autoprefixer'] : null
            },
            js: {
                files: ['app/**/*.js', '<%= dirs.js %>/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            php: {
                files: ['**/*.php'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['**/*.html'],
                options: {
                    livereload: true
                }
            },
            css : {
				files : ['<%= dirs.css %>/**/*.css'],
				options : {
					livereload : true
				}
			}
        },
        // JsHint your javascript
        jshint: {
            all: ['<%= dirs.js %>/*.js', '!<%= dirs.js %>/modernizr.js', '!<%= dirs.js %>/*.min.js', '!<%= dirs.bower %>/**/*.js'],
            options: {
                browser: true,
                curly: false,
                eqeqeq: false,
                eqnull: true,
                expr: true,
                immed: true,
                newcap: true,
                noarg: true,
                smarttabs: true,
                sub: true,
                undef: false
            }
        },
        // Dev and production build for sass
        sass: {
            production: {
                files: [
                    {
                        src: ['**/*.scss', '!**/_*.scss'],
                        cwd: 'scss',
                        dest: '<%= dirs.css %>',
                        ext: '.css',
                        expand: true
                    }
                ],
                options: {
                    style: 'compressed'
                }
            },
            dev: {
                files: [
                    {
                        src: ['**/*.scss', '!**/_*.scss'],
                        cwd: 'scss',
                        dest: '<%= dirs.css %>',
                        ext: '.css',
                        expand: true
                    }
                ],
                options: {
                    style: 'expanded'
                }
            }
        },
        // Autoprefixer setup
        autoprefixer: {
            options: {
                browsers: ['> 5%','last 2 versions', 'ie 8', 'ie 9'],
                map: {
                    inline: false
                }
            },
            files: {
                src: '<%= dirs.css %>/*.css'
            }
        },
        // Wiredep
        wiredep: {
            task: {
                src: [
                    '*.html'
                ]
            }
        },
        // Image min
        imagemin: {
            production: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.images %>',
                        src: '**/*.{png,jpg,jpeg}',
                        dest: '<%= dirs.images %>'
                    }
                ]
            }
        },
        // SVG min
        svgmin: {
            production: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.images %>',
                        src: '**/*.svg',
                        dest: '<%= dirs.images %>'
                    }
                ]
            }
        }
    });

    // Default task
    grunt.registerTask('default', ['watch']);

    // nodewebkit
    grunt.registerTask('nw', ['nodewebkit']);

    // Build task
    grunt.registerTask('build', function () {
        var arr = ['jshint'];

        if (hasSass) {
            arr.push('sass:production');
        }

        arr.push('imagemin:production', 'svgmin:production', 'requirejs:production');

        grunt.task.run(arr);
    });

    // Template Setup Task
    grunt.registerTask('setup', function () {
        var arr = [];

        if (hasSass) {
            arr.push['sass:dev'];
        }

        grunt.task.run(arr);
    });

    // Load up tasks
    if (hasSass) {
        grunt.loadNpmTasks('grunt-contrib-sass');
    }

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
};
