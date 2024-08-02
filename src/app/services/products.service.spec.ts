import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';
import { environment } from '../../environment/environment';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpStatusCode, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { TokenService } from './token.service';

describe('ProductsService', () => {
    let productService: ProductsService;
    let httpTestingController: HttpTestingController;
    let tokenService: TokenService;
    let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule, HttpClientTestingModule],
        providers: [
            ProductsService,
            TokenService,
            provideHttpClient(withInterceptors([TokenInterceptor])),
            provideHttpClientTesting()
        ]
    });
    productService = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('Test for getAllSimple', () => {
    it('should return a products list', (done: DoneFn) => {
        //Arrange
        const mockData: Product[] = generateManyProducts(3);
        //El spyOn se usa para espiar un metodo especifico de un objeto o clase para poder controlar su comportamiento
        spyOn(tokenService, 'getToken').and.returnValue('123');   
        //Act
        productService.getAllSimple().subscribe(data => {
            //Assert
            expect(data.length).toEqual(mockData.length);
            expect(data).toEqual(mockData);
            done();
        });

        //http config
        const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/products`); //Espera una peticion a la url especificada y devuelve un objeto de tipo TestRequest
        const headers = req.request.headers;
        expect(headers.get('Authorization')).toEqual(`Bearer 123`); // Verifica que el token sea igual a 123
        expect(req.request.method).toEqual('GET'); // Verifica que el metodo sea GET
        expect(headers.has('Authorization')).toBeTrue(); // Verifica que el header Authorization exista
        req.flush(mockData); // Responde a la peticion con los datos mockeados 
        //httpTestingController.verify(); // Verifica que no haya mas peticiones pendientes 
    });
  });

  describe('tests for getAll', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productService.getAll()
      .subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockData);
    });
    it('should return product list width taxes', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        {
            ...generateOneProduct(),
            price: 100, //100 * .19 = 19  
        },
        {
            ...generateOneProduct(),
            price: 200, //200 * .19 = 38  
        },
        {
            ...generateOneProduct(),
            price: 0, //0 * .19 = 0
        },
        {
            ...generateOneProduct(),
            price: -100, // = 0
        },
      ];
      //Act
      productService.getAll()
      .subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });
       //http config
       const url = `${environment.API_URL}/api/v1/products`;
       const req = httpTestingController.expectOne(url);
       req.flush(mockData);
    });
    it('should send query params with limit 10 and offset 3', (doneFn) => {
        //Arrange
        const mockData: Product[] = generateManyProducts(3);
        const limit = 10;
        const offset = 3;
        //Act
        productService.getAll(limit, offset)
        .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          doneFn();
        });
        //http config
        const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
        const req = httpTestingController.expectOne(url);
        req.flush(mockData);
        const params = req.request.params;
        expect(params.get('limit')).toEqual(limit.toString());
        expect(params.get('offset')).toEqual(offset.toString());
      });
  });

  describe('test for create', () => {
    it('should return a new product', (doneFn) => {
        //Arrange
        const mockData: Product = generateOneProduct();
        const dto: CreateProductDTO = {
            title: mockData.title,
            price: mockData.price,
            images: mockData.images,
            description: mockData.description,
            categoryId: mockData.category.id
        }
        //Act
        productService.create({...dto}).subscribe((data) => {
            //Assert
            expect(data).toEqual(mockData);
            doneFn();
        });

        //http config
        const url = `${environment.API_URL}/api/v1/products`;
        const req = httpTestingController.expectOne(url);
        req.flush(mockData);
        expect(req.request.body).toEqual(dto);
        expect(req.request.method).toEqual('POST');
    });
  });

  describe('test for update ' , () => {
    it('should update a product', (doneFn) => {
        //Arrange
        const mockData: Product = generateOneProduct();
        const dto: UpdateProductDTO = {
            title: mockData.title,
        }
        //Act
        productService.update(mockData.id, {...dto}).subscribe((data) => {
            //Assert
            expect(data).toEqual(mockData);
            doneFn();
        });

        //http config
        const url = `${environment.API_URL}/api/v1/products/${mockData.id}`;
        const req = httpTestingController.expectOne(url);
        req.flush(mockData);
        expect(req.request.body).toEqual(dto);
        expect(req.request.method).toEqual('PUT');
    });
  });

  describe('test for delete', () => {
    it('should delete a product', (doneFn) => {
        //Arrange in spanis is "preparar"
        const mockData = true
        const id = '12'
        //Act in spanish is "actuar"
        productService.delete(id).subscribe((data) => {
            //Assert in spanish is "afirmar"
            expect(data).toBeTrue();
            doneFn();
        });
        //http config
        const url = `${environment.API_URL}/api/v1/products/${id}`;
        const req = httpTestingController.expectOne(url);
        req.flush(mockData);
        expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('test for getOne' , () => {
    it('should return a product', (doneFn) => {
        //Arrange
        const mockData: Product = generateOneProduct();
        const id = mockData.id;
        //Act
        productService.getOne(id).subscribe((data) => {
            //Assert
            expect(data).toEqual(mockData);
            doneFn();
        });

        //http config
        const url = `${environment.API_URL}/api/v1/products/${id}`;
        const req = httpTestingController.expectOne(url);
        req.flush(mockData);
        expect(req.request.method).toEqual('GET');
    });
    it('should should return the right msg when the status code is 404', (doneFn) => {
        //Arrange
        const id = '123'
        const msgError = '404 message'
        const mockError = {
            status: HttpStatusCode.NotFound,
            statusText: msgError
        }
        //Act
        productService.getOne(id).subscribe({
            next: () => {},
            error: (error) => {
                //Assert
                expect(error).toEqual('El producto no existe');
                doneFn();
            }
        });

        //http config
        const url = `${environment.API_URL}/api/v1/products/${id}`;
        const req = httpTestingController.expectOne(url);
        req.flush(msgError, mockError);
        expect(req.request.method).toEqual('GET');
    });
    it('should should return the right msg when the status code is 401', (doneFn) => {
        //Arrange
        const id = '123'
        const msgError = '401 message'
        const mockError = {
            status: HttpStatusCode.Unauthorized,
            statusText: msgError
        }
        //Act
        productService.getOne(id).subscribe({
            next: () => {},
            error: (error) => {
                //Assert
                expect(error).toEqual('No estas permitido');
                doneFn();
            }
        });

        //http config
        const url = `${environment.API_URL}/api/v1/products/${id}`;
        const req = httpTestingController.expectOne(url);
        req.flush(msgError, mockError);
        expect(req.request.method).toEqual('GET');
    });
    it('should should return the right msg when the status code is 409', (doneFn) => {
        //Arrange
        const id = '123'
        const msgError = '409 message'
        const mockError = {
            status: HttpStatusCode.Conflict,
            statusText: msgError
        }
        //Act
        productService.getOne(id).subscribe({
            next: () => {},
            error: (error) => {
                //Assert
                expect(error).toEqual('Algo esta fallando en el server');
                doneFn();
            }
        });

        //http config
        const url = `${environment.API_URL}/api/v1/products/${id}`;
        const req = httpTestingController.expectOne(url);
        req.flush(msgError, mockError);
        expect(req.request.method).toEqual('GET');
    });
    it('should should return the right msg when is incorrect', (doneFn) => {
        //Arrange
        const id = '123'
        const msgError = '403 message'
        const mockError = {
            status: HttpStatusCode.Forbidden,
            statusText: msgError
        }
        //Act
        productService.getOne(id).subscribe({
            next: () => {},
            error: (error) => {
                //Assert
                expect(error).toEqual('Ups algo salio mal');
                doneFn();
            }
        });

        //http config
        const url = `${environment.API_URL}/api/v1/products/${id}`;
        const req = httpTestingController.expectOne(url);
        req.flush(msgError, mockError);
        expect(req.request.method).toEqual('GET');
    });
  });

});