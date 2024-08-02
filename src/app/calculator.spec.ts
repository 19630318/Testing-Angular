import { Calculator } from "./calculator";

describe('Test for Calculator',  () => {
    it('#multiply should return nine', () => {
        //AAA = Arrange, Act, Assert
        //Arrange
        const calculator = new Calculator();
        //Act
        const rta = calculator.multiply(3,3);
        //Assert
        expect(rta).toEqual(9);
    })
    it('#divide should return error', ()=> {
        //Arrange
        const calculator = new Calculator();
        //Act
        const rta = () => calculator.divide(3,0);
        //Assert
        expect(rta).toThrowError(Error);
    })
    it('#divide should return 1', () => {
        //Arrange
        const calculator = new Calculator();
        //Act
        const rta = calculator.divide(3,3);
        //Assert
        expect(rta).toEqual(1);
    })
    it('#add should return 6', () => {
        //Arrange
        const calculator = new Calculator();
        //Act
        const rta = calculator.add(3,3);
        //Assert
        expect(rta).toEqual(6);
    })
    it('#subtract should return 0', () => {
        //Arrange
        const calculator = new Calculator();
        //Act
        const rta = calculator.subtract(3,3);
        //Assert
        expect(rta).toEqual(0);
    })
    it('#multiply and add should return 12', () => {
        //Arrange
        const calculator = new Calculator();
        //Act
        const rta = calculator.add(calculator.multiply(3,3),3);
        //Assert
        expect(rta).toEqual(12);
    })
    it('test matcherse', () => {
        //Arrange
        let name = 'Oscar'
        let name2 = ''
        let name3: undefined

        //Assert
        expect(name).toEqual('Oscar');
        expect(name2).toEqual('');
        expect(name3).toBeUndefined();
    })
})

/*

//Comunes
.toBe();
.not.toBe();
.toEqual();

//Veracidad
.toBeNull()
.toBeUndefined()
.toBeDefined()
.toBeUndefined()
.toBeTruthy() 
.toBeFalsy() 

//Numeros
.toBeGreaterThan(3);
.toBeGreaterThanOrEqual(3.5);
.toBeLessThan(5);
.toBeLessThanOrEqual(4.5);

//Numeros decimales
expect(0.3).toBeCloseTo(0.3)

//Strings
.not.toMatch(/I/);
.toMatch(/stop/);

//Arrays
.toContain('milk');

//Ecepciones
myfunction.toThrow(Error);

*/