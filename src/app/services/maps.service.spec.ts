import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';
import { timestamp } from 'rxjs';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getCoordinates', () => {
    it('should save the center', () => {
      //Arrange
      //CallFake se usa para reemplazar una función por una función falsa que se ejecutará en su lugar cuando se llame a la función original
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((success) => {
        const mockGeolocationPosition = {
          coords: {
            accuracy: 21,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            latitude: 10,
            longitude: 20,
            speed: 0,
          },
          timestamp : 1620000000000
        };
        success(mockGeolocationPosition);
      });

      //Act
      service.getCurrentPosition();
      //Assert
      expect(service.center).toEqual({ lat: 10, lng: 20 });

    });
  });

});
