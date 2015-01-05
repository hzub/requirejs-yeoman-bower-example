# r.js + yeoman + bower dependencies example

## Whaddisit?

Following repository provides example for proper mashing up of:
- require.js optimizer "r.js"
- yeoman application structure and standard `grunt build` usage
- bower dependencies

## Whadshuditdo?

Two main points are:
- to make development easy using `grunt serve`
- to make production deployment easy using standard `grunt build`

## Example file structure

Inside the `app` folder, you can find the following files:

- `index.html` (entry point)
- `scripts/`
	- `main.js` (main script entry point)
	- `ctrl/`
		- `ctrl1.js` (example controller)
	- `srv/`
		- `srv1.js` (example service)
		- `srv2.js` (example service, dependency of `ctrl1`)

## Dependencies

- Local `requirejs` to provide asynchronous module loading
- Global `requirejs` to provide `r.js` command
- `grunt-contrib-requirejs` to have above two incorporated in grunt build process

For example purposes, it also uses
- `qwest` library as bower dependency
- `jquery` loaded from external CDN

## How it works

In the project, there are four points of magic:

### grunt-contrib-requirejs configuration (gruntfile.js, line #332)

        requirejs: {
            dist: {
                options: {
                    baseUrl: "<%= config.app %>",
                    mainConfigFile: "<%= config.app %>/scripts/main.js",
                    name: "scripts/main",
                    out: "<%= config.dist %>/scripts/main.js"
                }
            }
        }

It does switch main directory to `app` and introduces a little vulnerability usage - mainConfigFile is the same file as main entry point for scripts.

### copying requirejs to its directory (gruntfile.js, line #280)

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/requirejs/',
                    src: 'require.js',
                    dest: '<%= config.dist %>/scripts/'
                }
                (...)

It simply copies require.js to its directory in `dist` or `app` directory - we can't rely on it as bower dependency due to decision of `usemin` contributors (see https://github.com/yeoman/grunt-usemin/issues/112).

### mixing it up in build process (gruntfile.js, line #327)

		grunt.registerTask('build', [
	        'clean:dist',
	        'useminPrepare',
	        'concurrent:dist',
	        'autoprefixer',
	        'concat',
	        'cssmin',
	        'requirejs:dist',
	        'copy:dist',
	        'usemin',
	        'htmlmin'
	    ]);

Notice the `requirejs:dist` task.

### r.js configuration (main.js, line #1)

		requirejs.config({
			baseUrl: "/",
		    paths: {
		    	// local files
		    	controller1: 'scripts/ctrl/ctrl1',
		    	service1: 'scripts/srv/srv1',

		    	// bower dependency
		        qwest: '../bower_components/qwest/qwest.min',

		        // external lib residing on CDN
		        jquery: 'http://code.jquery.com/jquery-1.11.2.min'
		    }
		});

Here it switches baseUrl to `/`. From `grunt serve` point of view, it switches to main connect server directory - henceforth, scripts are loaded from proper directory. To `grunt build`, however, it is overwritten by gruntfile configuration - so r.js in build mode uses its own path.

## Disclaimer

This repository is only an example for painless usage - author takes no responsibility for usage.