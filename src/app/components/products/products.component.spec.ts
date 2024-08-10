import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../../services/products.service';
import { generateManyProducts } from '../../models/product.mock';
import { of, defer } from 'rxjs';
import { ValueService } from '../../services/value.service';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {

    const spy = jasmine.createSpyObj('ProductsService', ['getAll']);  
    const spyValue = jasmine.createSpyObj('ValueService', ['getPromiseValue']);

    await TestBed.configureTestingModule({
      imports: [ProductsComponent, ProductComponent],
      providers: [
        {
          provide: ProductsService,
          useValue: spy
        },
        {
          provide: ValueService,
          useValue: spyValue
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    const products = generateManyProducts(3);
    productService.getAll.and.returnValue(of(products));// El of es un observable que emite los valores que le pasamos
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  /*describe('Test for getAllProducts', () => { 
    it('should return products list', () => {
      //Arrange
      const products = generateManyProducts(10);
      productService.getAll.and.returnValue(of(products));
      const countProducts = component.products.length;
      //Act
      component.getAllProducts();
      fixture.detectChanges();
      //Assert
      expect(component.products.length).toEqual(products.length + countProducts);
    });
  });*/

  it('should change status "loading" to success', fakeAsync(() => {
    //Arrange
    const productsMock = generateManyProducts(10);
    productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
    //Act
    component.getAllProducts();
    fixture.detectChanges();

    expect(component.status).toEqual('loading');

    tick(); // Espera a que todas las promesas pendientes se resuelvan o se rechacen 
    fixture.detectChanges();
    //Assert
    expect(component.status).toEqual('loaded');
  }));

  //FakeAsync es una función que envuelve un test y permite controlar el tiempo de ejecución de las promesas
  it('should change status "loading" to error', fakeAsync(() => {
    //Arrange
    const productsMock = generateManyProducts(10);
    productService.getAll.and.returnValue(defer(() => Promise.reject(productsMock)));
    //Act
    component.getAllProducts();
    fixture.detectChanges();

    expect(component.status).toEqual('loading');

    tick(5000); // Espera a que todas las promesas pendientes se resuelvan o se rechacen 
    fixture.detectChanges();
    //Assert
    expect(component.status).toEqual('error');
  }));

  describe('Call promise', () => {  
    it('should call promise', async () => {
      //Arrange
      const mockMsg = 'promise value';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      //Act
      await component.callPromise();
      fixture.detectChanges();
      //Assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });
    it('should show promise value in <p> when button was click', fakeAsync(() => {
      //Arrange
      const mockMsg = 'promise value';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      const buttonDebug = fixture.debugElement.query(By.css('button.btn-promise'));
      const pDebug = fixture.debugElement.query(By.css('p.btn-rta')).nativeElement;
      //Act
      buttonDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      //Assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(pDebug.textContent).toContain(mockMsg);
    }));
  });

});
