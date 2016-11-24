module.exports = function(grunt) {

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
      /*  concat : {
            options : {
                separator : ';' 
            },
            dist : {
                src : ['js/*.js',],
                dest : 'dist/Tree.js'
            }
        },
        jshint : {
            files : ['	js/node.js',
						'js/Tree.js',
						'js/main.js'
					],
            options: {
				reporter: require('jshint-html-reporter'),
				reporterOutput: 'jshint-report.html'
			},
        },*/
        jasmine : {
			Tree: {
                src: [						
						'js/node.js',
						'js/Tree.js',	
						'js/main.js'							 		  
					 ], 
                options : {                    
                    outfile : 'Test/Tree/_SpecRunner.html',
                    vendor : [
								'Test/lib/jasmine-2.3.4/boot.js', 
								'Test/lib/jasmine-2.3.4/jasmine.js',																
								'js/jquery.min.js',								
								'js/node.js',
								'js/Tree.js',
								'js/main.js'
							],
                    specs : ['Test/Tree/spec/*.js']					
                } 
            },
            istanbul_Tree: {
                src : '<%= jasmine.Tree.src %>',
                options : {                    
                    outfile : 'Test/Tree/_SpecRunner.html',
                    vendor : '<%= jasmine.Tree.options.vendor %>',
                    specs : '<%= jasmine.Tree.options.specs %>',
                    keepRunner : true,
                    template : require('grunt-template-jasmine-istanbul'),
                    templateOptions : {
                        coverage : 'coverage/Tree/json/coverage.json',
                        report : [{
                            type : 'html',
                            options : {
                                dir : 'coverage/Tree/html'
                            }
                        }, {
                            type : 'text-summary'
                        }]
                    }
                }
            },
		}
    });

    

    grunt.loadNpmTasks('grunt-contrib-jasmine'); 
	//grunt.loadNpmTasks('grunt-contrib-jshint');
    
    //grunt.registerTask('default', ['jshint']);    
    grunt.registerTask('coverage_Tree', ['jasmine:istanbul_Tree']);
	
	

}; 