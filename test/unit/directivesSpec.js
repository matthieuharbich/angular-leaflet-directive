'use strict';

/* jasmine specs for directives go here */

describe('Directive: leaflet', function() {
    beforeEach(module('leaflet-directive'));

    it('should have loaded leaflet library inside the directive', function() {
        inject(function($rootScope, $compile) {
            var element = angular.element('<leaflet></leaflet>');
            element = $compile(element)($rootScope);
            expect(element.text()).toEqual('+-Powered by Leaflet');
        });
    });

    it('should have default parameters on the map if not specified', function() {
        inject(function($rootScope, $compile) {
            angular.extend($rootScope, {});
            var element = angular.element('<leaflet center="center" map="map"></leaflet>');
            element = $compile(element)($rootScope);
            var map = element.scope().map;
            expect(map.getZoom()).toEqual(1);
            expect(map.getCenter().lat).toEqual(0);
            expect(map.getCenter().lng).toEqual(0);
        });
    });

    it('should update the map center if changed the scope properties', function() {
        inject(function($rootScope, $compile) {
            var center = {
                lat: 0.966,
                lng: 2.02,
                zoom: 4
            }
            angular.extend($rootScope, { center: center });
            var element = angular.element('<leaflet center="center" map="map"></leaflet>');
            element = $compile(element)($rootScope);
            var map = element.scope().map;
            $rootScope.$digest();
            expect(map.getZoom()).toEqual(center.zoom);
            expect(map.getCenter().lat).toBeCloseTo(center.lat);
            expect(map.getCenter().lng).toBeCloseTo(center.lng);
        });
    });
});