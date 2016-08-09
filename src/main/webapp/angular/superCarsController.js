/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('mainController', function($scope) {
    
})

app.controller('manufacturerController', function ($scope, $http) {
    $http.get("../public/manufacturer")
            .then(function(response) {
                $scope.manufacturers = response.data;
    });
});

app.controller('carsController', function($scope, $http, $routeParams) {
    $scope.manufacturerId = $routeParams.manufacturerId;
    $http.get("../public/car/manufacturer/" + $scope.manufacturerId)
            .then(function(response) {
                $scope.cars = response.data;
    })
    $http.get("../public/manufacturer/" + $scope.manufacturerId)
            .then(function(response) {
                $scope.manufacturer = response.data;
    });
});

app.controller('carController', function($scope, $http, $routeParams) {
    $scope.carId = $routeParams.carId;
    $http.get("../public/car/" + $scope.carId)
            .then(function(response) {
                $scope.car = response.data;
    });
    $http.post("../public/enquiry/" + $scope.carId)
            .then(function(response) {
                $scope.enquiries = response.data;
    });
});

app.controller('searchController', function($scope, $http) {
    if ($scope.searchTerm !== null) {
        $http.post("../public/car/" + $scope.searchTerm)
                .then(function(response) {
                    $scope.cars = response.data;
        });
    };
    $scope.search = function() {
        $http.post("../public/car/" + $scope.searchTerm)
                .then(function(response) {
                    $scope.cars = response.data;
        });
    };
});

app.controller('sellController', function($scope, $http) {
    $http.get("../public/manufacturer")
            .then(function(response) {
                $scope.manufacturers = response.data;
    });
    $scope.saveCar = function() {
        var carJSON = {};
        carJSON["name"] = $scope.name;
        carJSON["model"] = $scope.model;
        carJSON["manufacturer"] = $scope.manufacturer;
        carJSON["colour"] = $scope.colour;
        carJSON["year"] = $scope.year;
        carJSON["price"] = $scope.price;
        carJSON["summary"] = $scope.summary;
        carJSON["description"] = $scope.description;
        carJSON["wheelSize"] = 0;
        carJSON["tyreSize"] = 0;
        carJSON["photo"] = "0";
        carJSON["manual"] = false;
        $http.put("../public/car", carJSON);
    };
});

app.controller('enquireController', function($scope, $http, $routeParams) {
    $scope.carId = $routeParams.carId
   $http.get("../public/car/" + $scope.carId)
           .then(function(response) {
               $scope.car = response.data;
   });
   $scope.saveEnquiry = function() {
       enquiryJSON = {};
       enquiryJSON["name"] = $scope.name;
       enquiryJSON["email"] = $scope.email;
       enquiryJSON["comment"] = $scope.comment;
       enquiryJSON["carId"] = $scope.car.carId;
       $http.put("../public/enquiry", enquiryJSON);
   };
});