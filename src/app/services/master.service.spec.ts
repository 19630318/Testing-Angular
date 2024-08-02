import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './value-fake.service';
import { TestBed } from '@angular/core/testing';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    //Aqui convinamos el servicio real con el servicio falso para hacer pruebas unitarias de MasterService 
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      providers: [ 
        MasterService,
        {
          provide: ValueService,
          useValue: spy
        }
       ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  /*it('should return "my value" from the real service', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toEqual('my value');
  });

  it('should return "my value" from a fake service', () => {
    const fakeValueService = new FakeValueService();
    const masterService = new MasterService(fakeValueService as unknown as ValueService);
    expect(masterService.getValue()).toEqual('fake value');
  });

  it('should return "my value" from a object', () => {
    const fake = { getValue: () => 'fake value' };
    const masterService = new MasterService(fake as unknown as ValueService);
    expect(masterService.getValue()).toEqual('fake value');
  }); 
  */
 
  //Spies son objetos simulados que registra información sobre llamadas a funciones

  it('should call to getValue from ValueService', () => {
    valueServiceSpy.getValue.and.returnValue('fake value');
    expect(masterService.getValue()).toEqual('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });

  //Mocking son objetos simulados que simulan el comportamiento de objetos reales en un controlado

});
