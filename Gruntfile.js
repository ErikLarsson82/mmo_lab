module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    browserify: {
      client: {
        src: 'app/client.js',
        dest: 'app/client_bundle.js'
      }
    },
    watch: {
      files: 'app/game.js',
      tasks: ['browserify', 'server']
    }
  });

  grunt.registerTask('server', 'Start the MMO server', function() {
    grunt.log.writeln('Started MMO server on port 3007');
    require('./app/server.js').listen(3007);
  });

  grunt.registerTask('default', ['browserify', 'server']);
};