import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ProductsService } from './products.service';
import { TokenService } from './token.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environment/environment';

fdescribe('AuthService', () => {
  let service: AuthService;
  let productsService: ProductsService;
  let tokenService: TokenService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            provideHttpClient(),
            provideHttpClientTesting(),
        ]
    });
    service = TestBed.inject(AuthService);
    productsService = TestBed.inject(ProductsService);
    tokenService = TestBed.inject(TokenService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for login', () => {
    it('should return token', (done: DoneFn) => {
        //Arrange
        const mockData = {
            access_token: '123456'
        }
        const email = 'email@mail.com';
        const password = 'password';
        //Act
        service.login(email, password).subscribe(response => {
            //Assert
            expect(response.access_token).toEqual(mockData.access_token);
            done();
        });
        //Http config
        const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/auth/login`);
        req.flush(mockData);
    });
    it('should call to token service', (done: DoneFn) => {
        //Arrange
        const mockData = {
            access_token: '123456'
        }
        const email = 'email@mail.com';
        const password = 'password';
        spyOn(tokenService, 'saveToken').and.callThrough(); //El callThrough se usa para que el metodo espia se ejecute normalmente y ademas se pueda hacer un seguimiento de el
        //Act
        service.login(email, password).subscribe(response => {
            //Assert
            expect(response.access_token).toEqual(mockData.access_token);
            expect(tokenService.saveToken).toHaveBeenCalled();
            expect(tokenService.saveToken).toHaveBeenCalledOnceWith(mockData.access_token);

            done();
        });
        //Http config
        const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/auth/login`);
        req.flush(mockData);
    });
  });

});