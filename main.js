
//Contructor function of a Vehicle object
function Vehicle(a,b) {
    this.type = a;
    this.fuel = b;
    this.mileage = 0;
}

//The drive function will be configured on the vehicle prototype 
// and will be inherited by the car and motorocycle prototypes
Vehicle.prototype.drive = function(){
    if(this.type === 'car') {
        if (this.fuel == 0) 
            console.log('not enough fuel')
        else {
           while (this.fuel > 0 ) {
                this.mileage += 20;
                this.fuel -= 10;
            }  
        }   
    } 
    else if (this.type === 'motorcycle') {
        if (this.fuel == 0) 
            console.log('not enough fuel')
        else {
            while (this.fuel > 0 ) {
                this.mileage += 5;
                this.fuel -= 5;
            } 
        }   
    }
    else  
        throw new TypeError('Vehicle type does not exist', "main.js", 11);
    console.log('you drove ' + this.mileage + ' km');
}

//Constructor function of Car object
function Car (fuel) {
    /*the 'new' operator will set the reference of 'this'
     to a new object. The new object then is passed to the Vehicle
     constructor with the use of the .call() method of the function prototype,
     so the type, fuel and mileage properties can be set*/
    this._super.call(this, 'car', fuel);
    this.wheels = 4;
    this.lamps = 2;
}

//Car will inherit form the Vehicle prototype
Car.prototype = Object.create(Vehicle.prototype);
/*From the above expressiong the constructor function of the Car prototype
will be pointing to the constructor of the superclass (Vehicle)
Thus we need to set constructor poperty to the Car constructor function*/
Car.prototype.contrsuctor = Car;
//Explicitly set the _super to the superclass constructor function
Car.prototype._super = Vehicle;

//Contructor function of a Motorcycle object
function Motorcycle (fuel) {
    //same as the Motorcycle object
    this._super.call(this, 'motorcycle', fuel);
    this.wheels = 2;
    this.lamps = 1;
}

//Motorcycle will inherit form the Vehicle prototype
Motorcycle.prototype = Object.create(Vehicle.prototype);
//Set constructor function to the Motorcycle constructor function
Motorcycle.prototype.constructor = Motorcycle;
//Explicitly set the _super to the superclass constructor function
Motorcycle.prototype._super = Vehicle;

/*Creating the objects will call the Vehicle constructor and expose the properties
 defined in the vehicle to the 'this' property of the caller, 
 ergo to the Car or Motorcycle object*/
var car = new Car(100);
var motorcycle = new Motorcycle(50);

// The drive function is inhereted by prototype and can be called by the subclass objects
car.drive();
motorcycle.drive();
/*Alternativelly could be invoked by using the .call() method or by bind(), 
to bind the method to the subclass object. In this case one should instantiate 
an object of the superclass (vehicle):
var vehicle = new Vehicle();
car.dive = vehicle.drive.bind(car);
*/

