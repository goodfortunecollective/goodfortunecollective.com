/***
 Here we create a Vec3 class object
 This is a really basic Vector3 class used for vector calculations
 Highly based on https://github.com/mrdoob/three.js/blob/dev/src/math/Vector3.js and http://glmatrix.net/docs/vec3.js.html

 params :
 @x (float): X component of our vector
 @y (float): Y component of our vector
 @z (float): Z component of our vector

 returns :
 @this: our Vec3 class object
 ***/
export class Vec3 {
    constructor(x?: number, y?: number, z?: number);
    type: string;
    _x: number;
    _y: number;
    _z: number;
    set x(arg: number);
    /***
     Getters and setters (with onChange callback)
     ***/
    get x(): number;
    set y(arg: number);
    get y(): number;
    set z(arg: number);
    get z(): number;
    onChange(callback: any): Vec3;
    _onChangeCallback: any;
    /***
     Sets the vector from values

     params:
     @x (float): X component of our vector
     @y (float): Y component of our vector
     @z (float): Z component of our vector

     returns:
     @this (Vec2): this vector after being set
     ***/
    set(this: any, x: any, y: any, z: any): any;
    /***
     Adds a vector to this vector

     params:
     @vector (Vec3): vector to add

     returns:
     @this (Vec3): this vector after addition
     ***/
    add(this: any, vector: any): any;
    /***
     Adds a scalar to this vector

     params:
     @value (float): number to add

     returns:
     @this (Vec3): this vector after addition
     ***/
    addScalar(this: any, value: any): any;
    /***
     Subtracts a vector from this vector

     params:
     @vector (Vec3): vector to use for subtraction

     returns:
     @this (Vec3): this vector after subtraction
     ***/
    sub(this: any, vector: any): any;
    /***
     Subtracts a scalar to this vector

     params:
     @value (float): number to use for subtraction

     returns:
     @this (Vec3): this vector after subtraction
     ***/
    subScalar(this: any, value: any): any;
    /***
     Multiplies a vector with this vector

     params:
     @vector (Vec3): vector to use for multiplication

     returns:
     @this (Vec3): this vector after multiplication
     ***/
    multiply(this: any, vector: any): any;
    /***
     Multiplies a scalar with this vector

     params:
     @value (float): number to use for multiplication

     returns:
     @this (Vec3): this vector after multiplication
     ***/
    multiplyScalar(this: any, value: any): any;
    /***
     Copy a vector into this vector

     params:
     @vector (Vec3): vector to copy

     returns:
     @this (Vec3): this vector after copy
     ***/
    copy(this: any, vector: any): any;
    /***
     Clone this vector

     returns:
     @vector (Vec3): cloned vector
     ***/
    clone(): Vec3;
    /***
     Merges this vector with a vector when values are NaN. Mostly used internally.

     params:
     @vector (Vec3): vector to use for sanitization

     returns:
     @vector (Vec3): sanitized vector
     ***/
    sanitizeNaNValuesWith(vector: any): Vec3;
    /***
     Apply max values to this vector

     params:
     @vector (Vec3): vector representing max values

     returns:
     @vector (Vec3): vector with max values applied
     ***/
    max(vector: any): Vec3;
    /***
     Apply min values to this vector

     params:
     @vector (Vec3): vector representing min values

     returns:
     @vector (Vec3): vector with min values applied
     ***/
    min(vector: any): Vec3;
    /***
     Checks if 2 vectors are equal

     returns:
     @isEqual (bool): whether the vectors are equals or not
     ***/
    equals(vector: any): boolean;
    /***
     Normalize this vector

     returns:
     @this (Vec3): normalized vector
     ***/
    normalize(this: any): any;
    /***
     Calculates the dot product of 2 vectors

     returns:
     @dotProduct (float): dot product of the 2 vectors
     ***/
    dot(vector: any): number;
    /***
     Apply a matrix 4 to a point (vec3)
     Useful to convert a point position from plane local world to webgl space using projection view matrix for example
     Source code from: http://glmatrix.net/docs/vec3.js.html

     params :
     @matrix (array): 4x4 matrix used

     returns :
     @this (Vec3): this vector after matrix application
     ***/
    applyMat4(this: any, matrix: any): any;
    /***
     Apply a quaternion (rotation in 3D space) to this vector

     params :
     @quaternion (Quat): quaternion to use

     returns :
     @this (Vec3): this vector after applying the transformation
     ***/
    applyQuat(this: any, quaternion: any): any;
    /***
     Project 3D coordinate to 2D point

     params:
     @camera (Camera): camera to use for projection
     ***/
    project(camera: any): Vec3;
    /***
     Unproject 2D point to 3D coordinate

     params:
     @camera (Camera): camera to use for projection
     ***/
    unproject(camera: any): Vec3;
}
