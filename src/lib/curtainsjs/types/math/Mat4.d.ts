/***
 Here we create a Mat4 class object
 This is a really basic Matrix4 class used for matrix calculations
 Highly based on https://github.com/mrdoob/three.js/blob/dev/src/math/Matrix4.js and http://glmatrix.net/docs/mat4.js.html

 params :
 @elements (Float32Array of length 16): our matrix array. Default to identity matrix.

 returns :
 @this: our Mat4 class object
 ***/
export class Mat4 {
    constructor(elements?: Float32Array);
    type: string;
    elements: Float32Array;
    /***
     Sets the matrix values from an array

     params:
     @array (array): an array of at least 16 elements

     returns:
     @this (Mat4 class object): this matrix after being set
     ***/
    setFromArray(this: any, array: any): any;
    /***
     Copy another Mat4

     params:
     @matrix (Mat4 class object): matrix to copy

     returns:
     @this (Mat4 class object): this matrix after copy
     ***/
    copy(this: any, matrix: any): any;
    /***
     Clone a matrix

     returns:
     @clonedMatrix (Mat4 object): cloned matrix
     ***/
    clone(): any;
    /***
     Simple matrix multiplication helper

     params:
     @matrix (Mat4 class object): Mat4 to multiply with

     returns:
     @result (Mat4 class object): Mat4 after multiplication
     ***/
    multiply(matrix: any): Mat4;
    /***
     Get matrix inverse

     returns:
     @result (Mat4 class object): inverted Mat4
     ***/
    getInverse(): Mat4;
    /***
     Simple Mat4 scaling helper

     params :
     @vector (Vec3 class object): Vec3 representing scale along X, Y and Z axis

     returns :
     @result (Mat4 class object): Mat4 after scaling
     ***/
    scale(vector: any): Mat4;
    /***
     Creates a matrix from a quaternion rotation, vector translation and vector scale
     Equivalent for applying translation, rotation and scale matrices but much faster
     Source code from: http://glmatrix.net/docs/mat4.js.html

     params :
     @translation (Vec3 class object): translation vector
     @quaternion (Quat class object): rotation quaternion
     @scale (Vec3 class object): scale vector

     returns :
     @this (Mat4 class object): matrix after transformations
     ***/
    compose(this: any, translation: any, quaternion: any, scale: any): any;
    /***
     Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
     Equivalent for applying translation, rotation and scale matrices but much faster
     Source code from: http://glmatrix.net/docs/mat4.js.html

     params :
     @translation (Vec3 class object): translation vector
     @quaternion (Quat class object): rotation quaternion
     @scale (Vec3 class object): scale vector
     @origin (Vec3 class object): origin vector around which to scale and rotate

     returns :
     @this (Mat4 class object): matrix after transformations
     ***/
    composeFromOrigin(this: any, translation: any, quaternion: any, scale: any, origin: any): any;
}
