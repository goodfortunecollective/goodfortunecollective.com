/***
 Here we create a Vec2 class object
 This is a really basic Vector2 class used for vector calculations
 Highly based on https://github.com/mrdoob/three.js/blob/dev/src/math/Vector2.js and http://glmatrix.net/docs/vec2.js.html

 params :
 @x (float): X component of our vector
 @y (float): Y component of our vector

 returns :
 @this: our Vec2 class object
 ***/
export class Vec2 {
    constructor(x?: number, y?: number);
    type: string;
    _x: number;
    _y: number;
    set x(arg: number);
    /***
     Getters and setters (with onChange callback)
     ***/
    get x(): number;
    set y(arg: number);
    get y(): number;
    onChange(callback: any): Vec2;
    _onChangeCallback: any;
    /***
     Sets the vector from values

     params:
     @x (float): X component of our vector
     @y (float): Y component of our vector

     returns:
     @this (Vec2): this vector after being set
     ***/
    set(this: any, x: any, y: any): any;
    /***
     Adds a vector to this vector

     params:
     @vector (Vec2): vector to add

     returns:
     @this (Vec2): this vector after addition
     ***/
    add(this: any, vector: any): any;
    /***
     Adds a scalar to this vector

     params:
     @value (float): number to add

     returns:
     @this (Vec2): this vector after addition
     ***/
    addScalar(this: any, value: any): any;
    /***
     Subtracts a vector from this vector

     params:
     @vector (Vec2): vector to use for subtraction

     returns:
     @this (Vec2): this vector after subtraction
     ***/
    sub(this: any, vector: any): any;
    /***
     Subtracts a scalar to this vector

     params:
     @value (float): number to use for subtraction

     returns:
     @this (Vec2): this vector after subtraction
     ***/
    subScalar(this: any, value: any): any;
    /***
     Multiplies a vector with this vector

     params:
     @vector (Vec2): vector to use for multiplication

     returns:
     @this (Vec2): this vector after multiplication
     ***/
    multiply(this: any, vector: any): any;
    /***
     Multiplies a scalar with this vector

     params:
     @value (float): number to use for multiplication

     returns:
     @this (Vec2): this vector after multiplication
     ***/
    multiplyScalar(this: any, value: any): any;
    /***
     Copy a vector into this vector

     params:
     @vector (Vec2): vector to copy

     returns:
     @this (Vec2): this vector after copy
     ***/
    copy(this: any, vector: any): any;
    /***
     Clone this vector

     returns:
     @vector (Vec2): cloned vector
     ***/
    clone(): Vec2;
    /***
     Merges this vector with a vector when values are NaN. Mostly used internally.

     params:
     @vector (Vec2): vector to use for sanitization

     returns:
     @vector (Vec2): sanitized vector
     ***/
    sanitizeNaNValuesWith(vector: any): Vec2;
    /***
     Apply max values to this vector

     params:
     @vector (Vec2): vector representing max values

     returns:
     @vector (Vec2): vector with max values applied
     ***/
    max(vector: any): Vec2;
    /***
     Apply min values to this vector

     params:
     @vector (Vec2): vector representing min values

     returns:
     @vector (Vec2): vector with min values applied
     ***/
    min(vector: any): Vec2;
    /***
     Checks if 2 vectors are equal

     params:
     @vector (Vec2): vector to compare

     returns:
     @isEqual (bool): whether the vectors are equals or not
     ***/
    equals(vector: any): boolean;
    /***
     Normalize this vector

     returns:
     @this (Vec2): normalized vector
     ***/
    normalize(this: any): any;
    /***
     Calculates the dot product of 2 vectors

     params:
     @vector (Vec2): vector to use for dot product

     returns:
     @dotProduct (float): dot product of the 2 vectors
     ***/
    dot(vector: any): number;
}
