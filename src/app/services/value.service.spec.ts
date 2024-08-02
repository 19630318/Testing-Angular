import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  //El beforeEach se ejecuta antes de cada test
  beforeEach(() => {
    //El TestBed.configureTestingModule se usa para configurar un modulo de Angular para realizar pruebas unitarias o de integración de un servicio o componente
    TestBed.configureTestingModule({
      providers: [ ValueService ]
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    //AAA
    it('should return my value', () => {
      expect(service.getValue()).toEqual('my value');
    });
  });

  describe('Test for setValue', () => {
    it('should set value', () => {
      service.setValue('new value');
      expect(service.getValue()).toEqual('new value');
    });
  });

  describe('Test for getPromiseValue', () => {
    it('should return promise value', async () => {
      const value = await service.getPromiseValue();
      expect(value).toEqual('promise value');
    });
  });

  describe('Test for getObservableValue', () => {
    //El done se usa para indicar que el test ha terminado en una linea en especifico
    it('should return observable value', (done: DoneFn) => {
      service.getObservableValue().subscribe(value => {
        expect(value).toEqual('observable value');
        done();
      });
    });
  });

});
