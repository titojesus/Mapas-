//Angular App Module and Controller
angular.module('mapsApp', [])
  .controller('MapCtrl', function($scope,$http) {
  
   $scope.cities = [
    {
        "city" : 'Location 1',
        "desc" : 'Test',
        "lat" : 52.238983,
        "long" : -0.888509 
    },
    {
        "city" : 'Location 2',
        "desc" : 'Test',
        "lat" : 52.238168,
        "long" : -52.238168
    },
    {
        "city" : 'Location 3',
        "desc" : 'Test',
        "lat" : 40.7127837,
        "long" : -74.00594130000002 
    },
    {
        "city" : 'Location 4',
        "desc" : 'Test',
        "lat" : 19.4340199,
        "long" : -99.1956012 
    },
    {
        "city" : 'Location 5',
        "desc" : 'Test',
        "lat" : 19.173773,
        "long" : -96.13422409999998 
    }
];
  
  $scope.agregarDireccion = function(){
    $scope.cities.push({
      city: $scope.city,
      desc: $scope.desc,
      lat: $scope.lat,
      long: $scope.long
    });
    
    $scope.city = ''
    $scope.desc = ''
    $scope.lat = ''
    $scope.long = ''
    
    
    $scope.initialise();
    
  }
  
  $scope.removeMarker = function(index){
    $scope.cities.splice(index, 1);
    $scope.initialise();
    
  }

    // Map Settings //
$scope.initialise = function() {
        var myLatlng = new google.maps.LatLng(52.238983, -0.888509);
        var mapOptions = {
            center: myLatlng,
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      // Geo Location /
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                animation: google.maps.Animation.DROP,
                title: "My Location"
            });
        });
        $scope.map = map;
      console.log($scope.map,'this scope map');
        // Additional Markers //
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();
        var createMarker = function (info){
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(info.lat, info.long),
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                title: info.city
            });
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            $scope.markers.push(marker);
        }  
        for (i = 0; i < $scope.cities.length; i++){
            createMarker($scope.cities[i]);
        }

    };
    google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise()); 

/*metodo que permite convertirlo y descargarlo el archivo en un JSON*/
    $scope.saveJSON = function () {
			$scope.descargar = '';  /*contiene un contenerdor en blanco para llenarlo*/
		/*la variable descargar contiene una funcion AngularJS que permite descargar el archivo en JSON */	
        $scope.descargar = angular.toJson($scope.cities);  
        $scope.nombre;  /*variable que contiene el nombre del archivo*/
		/*en esta variable se convierten los archivos en utf-8*/
        var blob = new Blob([$scope.descargar], { type:"application/json;charset=utf-8;" }); 			
		/*esta variable genera un link del archivo*/	
        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href',window.URL.createObjectURL(blob));
         /*el archivo descargado se genera con el nombre dado por el usuario*/          
        downloadLink.attr('download', $scope.nombre+'.json');
			downloadLink[0].click();
		};
    
  });