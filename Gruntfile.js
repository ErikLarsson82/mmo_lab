module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    browserify: {
      client: {
        src: 'client.js',
        dest: 'client_bundle.js'
      }
    },
    watch: {
      files: 'game.js',
      tasks: ['browserify', 'server']
    }
  });

  grunt.registerTask('server', 'Start the MMO server', function() {
    grunt.log.writeln('Started MMO server on port 3007');
    require('./server.js').listen(3007);
  });

  grunt.registerTask('default', ['browserify', 'server']);
};