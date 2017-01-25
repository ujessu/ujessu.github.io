$(document).ready(function() {

////---------- CONSTANTS
	var CONSTANTS = {
		API_KEY: "",
		BASE_URL: "http://api.wunderground.com/api/341eced3dbad667b/geolookup/conditions/q/IA/",

//arrays of weather icons displayed on wunderground and what i will display. structured so i can move them around, make more display options later
		showCloud: ["cloudy", "mostlycloudy", "partlycloudy", "cloudy"],
		showGray: ["fog", "hazy", "unknown"], //fix unknown later
		showRain: ["chancerain", "chancesleet", "chancetstorms", "sleet", "rain", "tstorms"],
		showSnow: ["chanceflurries", "chancesnow", "flurries", "snow"],
		showSun: ["clear", "mostlysunny", "partlysunny", "sunny"],

		skyIs: ""
	};



////components

	AFRAME.registerComponent('do-something', {
	  init: function () {
	    var sceneEl = this.el;
	  }
	});

////---------- APP
	var App = {
		init: function() {

			App.bindEvents();
		},


////---------- BIND EVENTS
		bindEvents: function() {
		 $("#box1").click(function(){
			 	App.webDetect();
				// 	App.parseJson();
			});
		},


////---------- THE ACTUAL DOING

		webDetect: function() {

			navigator.geolocation.getCurrentPosition(function(pos) {
			console.log('latitude', pos.coords.latitude);
			console.log('longitude', pos.coords.longitude);
			var latitude = pos.coords.latitude;
			var longitude = pos.coords.longitude;

			$.ajax({
			url : "http://api.wunderground.com/api/341eced3dbad667b/geolookup/conditions/q/" + latitude + "," + longitude +".json",
			dataType : "jsonp",
			success : function(parsed_json) {
							var location = parsed_json.location.city;
							var icon = parsed_json.current_observation.icon;
							console.log("icon is" + icon);
							App.showWhat(location, icon);
					}
			});

	});

},

		parseJson: function(){
			$.ajax({
  		url : "http://api.wunderground.com/api/341eced3dbad667b/geolookup/conditions/q/IA/Cedar_Rapids.json",
		  dataType : "jsonp",
			success : function(parsed_json) {
						  var location = parsed_json.location.city;
						  // var temp_f = parsed_json.current_observation.temp_f;
							var icon = parsed_json.current_observation.icon;
							console.log("icon is" + icon);
							App.showWhat(location, icon);
		  		}
  		});
		},

		showWhat: function(location, icon){
					if (CONSTANTS.showCloud.indexOf(icon) >= 0) {
						skyIs = "#showCloud";
					} else if (CONSTANTS.showGray.indexOf(icon) >= 0) {
						skyIs = "#showCloud";
					} else if (CONSTANTS.showRain.indexOf(icon) >= 0) {
						skyIs = "#showCloud";
					} else if (CONSTANTS.showSnow.indexOf(icon) >= 0) {
						skyIs = "#showDark";
					} else if (CONSTANTS.showSun.indexOf(icon) >= 0) {
						skyIs = "#showSun";
					} else {
					alert("I dunno. You should call a friend in " + location + " to find out!");
					}

					$('#sky').attr('src',skyIs);
					console.log("Current weather in " + location + " is " + icon + " so I am setting the sky to " + skyIs);
		}

};

///----------App init
	App.init();
});
