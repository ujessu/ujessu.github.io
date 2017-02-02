$(document).ready(function() {
// var aframeparticle = require('aframe-particle-system-component');
////---------- CONSTANTS
	var CONSTANTS = {
		API_KEY: "709b6234721f968e57dd7cc4e61a1469",
		BASE_URL: "http://api.openweathermap.org/data/2.5/weather",
		GOOGLE_URL:"https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAhAF8TYcKRz0GxKFJM3zzKWtgZ7PvWy3s",



//arrays of weather icons displayed on OPENWEATHERMAP and what i will display. structured so i can move them around, make more display options later
		showCloud: ["02d", "02n", "03d", "03n", "04d", "04n"],
		showGray: ["50d", "50n"],
		showRain: ["09d", "09n", "10d", "10n", "11d", "11n"],
		showSnow: ["13d", "13n"],
		showSun: ["01d", "01n"],

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

//sydney http://openweathermap.org/help/city_list.txt
			$("#cylinder1").click(function(){
				App.openWeathermap(-35.283459, 149.128067);
			 });


				// 	App.webDetect();
				// 	App.parseJson();
		},


////---------- THE ACTUAL DOING

//find out where user is based on browser

		googleLocation: function(){
			var API_KEY = "AIzaSyAhAF8TYcKRz0GxKFJM3zzKWtgZ7PvWy3s";
			var tryAPIGeolocation = function() {
				jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key="+API_KEY, function(pos) {
					console.log('latitude', pos.location.lat);
					console.log('longitude', pos.location.lng);
					var latitude = pos.location.lat;
					var longitude = pos.location.lng;
					App.openWeathermap(latitude, longitude);
			  })
			  .fail(function(err) {
			    alert("API Geolocation error! \n\n"+err);
			  });
			};
			tryAPIGeolocation();
		},

// //this is the old web detect function. doesn't work b/c of some sort of deprecation
// 		webDetect: function() {
// 			navigator.geolocation.getCurrentPosition(function(pos) {
// 			console.log('latitude', pos.coords.latitude);
// 			console.log('longitude', pos.coords.longitude);
// 			var latitude = pos.coords.latitude;
// 			var longitude = pos.coords.longitude;
// 			});
//
// 			App.wundergroundIt(latitude, longitude);
//
// },
//

		openWeathermap: function(latitude, longitude){
			var baseURL =
					"http://api.openweathermap.org/data/2.5/weather";
			var API_KEY = "709b6234721f968e57dd7cc4e61a1469";
			var request = $.ajax(baseURL, {
					data: {
							lat: latitude,
							lon: longitude,
							appid: API_KEY
					},
					dataType: "json"
			});

			request.done(function(response) {
					var location = response.name;
					var icon = response.weather[0].icon;
					App.showWhat(location, icon);
				});


		},


		showWhat: function(location, icon){
					if (CONSTANTS.showCloud.indexOf(icon) >= 0) {
						App.makeCloud(location, icon);
					} else if (CONSTANTS.showGray.indexOf(icon) >= 0) {
						App.makeGray(location, icon);
					} else if (CONSTANTS.showRain.indexOf(icon) >= 0) {
						App.makeRain(location, icon);
					} else if (CONSTANTS.showSnow.indexOf(icon) >= 0) {
						App.makeSnow(location, icon);
					} else if (CONSTANTS.showSun.indexOf(icon) >= 0) {
						App.makeSun(location, icon);
					} else {
					alert("I dunno. You should call a friend in " + location + " to find out!");
					}

		},

		//
		// <!-- <a-entity position="0 2.25 -15" particle-system="preset: snow"></a-entity> -->
		// 			<!-- <a-entity position="0 2.25 -15" particle-system="preset: rain"></a-entity> -->
		// <!-- <a-entity position="0 2.25 -15" particle-system="color: #EF0000,#44CC00"></a-entity> -->

		makeCloud: function(location, icon){
				$('#sky').attr('color','#d1e0e0');
				$('#precip').attr('particle-system','preset: rain');
				console.log("Current weather in " + location + " is " + icon + " so I need to load some clouds!!!");
		},

		makeGray: function(location, icon){
				$('#sky').attr('color','#aaaeaf');
				$('#precip').attr('particle-system','');
				console.log("Current weather in " + location + " is " + icon + " so I am making the sky gray");
		},

		makeRain: function(location, icon){
				$('#sky').attr('color','#487a89');
				$('#precip').attr('position', '0 2.25 -15');
				$('#precip').attr('particle-system','preset: rain');
				console.log("Current weather in " + location + " is " + icon + " so I need to load rain");
		},

		makeSnow: function(location, icon){
				$('#sky').attr('color','#d1e0e0');
				$('#precip').attr('position', '0 2.25 -15');
				$('#precip').attr('particle-system','preset: snow');
				console.log("Current weather in " + location + " is " + icon + " so I need to load snow");
		},

		makeSun: function(location, icon){
				$('#sky').attr('color','#89e3ff');
				$('#precip').attr('particle-system','');
				console.log("Current weather in " + location + " is " + icon + " so I am making the sky blue");
		}



};


///----------App init
	App.init();
});
