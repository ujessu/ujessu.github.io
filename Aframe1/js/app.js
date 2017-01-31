$(document).ready(function() {
// var aframeparticle = require('aframe-particle-system-component');
////---------- CONSTANTS
	var CONSTANTS = {
		BASE_URL: "http://api.wunderground.com/api/341eced3dbad667b/geolookup/conditions/q/IA/",
		GOOGLE_URL:"https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAhAF8TYcKRz0GxKFJM3zzKWtgZ7PvWy3s",


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
			 App.googleLocation();
			});

			$("#cylinder1").click(function(){
				App.parseJson();
			 });


				// 	App.webDetect();
				// 	App.parseJson();
		},


////---------- THE ACTUAL DOING


		googleLocation: function(){

			var API_KEY = "AIzaSyAhAF8TYcKRz0GxKFJM3zzKWtgZ7PvWy3s";

			var tryAPIGeolocation = function() {
				jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key="+API_KEY, function(pos) {
					console.log('latitude', pos.location.lat);
					console.log('longitude', pos.location.lng);
					var latitude = pos.location.lat;
					var longitude = pos.location.lng;
					App.wundergroundIt(latitude, longitude);

			  })
			  .fail(function(err) {
			    alert("API Geolocation error! \n\n"+err);
			  });
			};
			tryAPIGeolocation();
		},


		webDetect: function() {
			navigator.geolocation.getCurrentPosition(function(pos) {
			console.log('latitude', pos.coords.latitude);
			console.log('longitude', pos.coords.longitude);
			var latitude = pos.coords.latitude;
			var longitude = pos.coords.longitude;
			});

			App.wundergroundIt(latitude, longitude);

},

		wundergroundIt: function(latitude, longitude){
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
},

		parseJson: function(){
			$.ajax({
				// need to get this out of cedar rapids!!
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
