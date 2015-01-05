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

require(['controller1', 'service1', 'qwest', 'jquery'], function(controller1, service1, qwest, jquery) {
    console.log('Controller1 - local:', controller1);
    console.log('Service1 - local:', service1);
    console.log('QWest - from bower:', qwest);
    console.log('JQuery - from external CDN:', jquery);
});
