// we are using service2 as dependency here!
define(['scripts/srv/srv2'], function(service2) {
	return {
		a: 'Controller#1',
		dep: service2
	};
});