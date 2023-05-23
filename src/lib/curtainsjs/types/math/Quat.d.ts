/***
 Here we create a Quat class object
 This is a really basic Quaternion class used for rotation calculations
 Highly based on https://github.com/mrdoob/three.js/blob/dev/src/math/Quaternion.js

 params :
 @elements (Float32Array of length 4): our quaternion array. Default to identity quaternion.

 returns :
 @this: our Quat class object
 ***/
export class Quat {
    constructor(elements?: Float32Array, axisOrder?: string);
    type: string;
    elements: Float32Array;
    axisOrder: string;
    /***
     Sets the quaternion values from an array

     params:
     @array (array): an array of at least 4 elements

     returns:
     @this (Quat class object): this quaternion after being set
     ***/
    setFromArray(this: any, array: any): any;
    /***
     Sets the quaternion axis order

     params:
     @axisOrder (string): an array of at least 4 elements

     returns:
     @this (Quat class object): this quaternion after axis order has been set
     ***/
    setAxisOrder(this: any, axisOrder: any): any;
    /***
     Copy a quaternion into this quaternion

     params:
     @vector (Quat): quaternion to copy

     returns:
     @this (Quat): this quaternion after copy
     ***/
    copy(this: any, quaternion: any): any;
    /***
     Clone a quaternion

     returns:
     @clonedQuaternion (Quat): cloned quaternion
     ***/
    clone(): any;
    /***
     Checks if 2 quaternions are equal

     returns:
     @isEqual (bool): whether the quaternions are equals or not
     ***/
    equals(quaternion: any): boolean;
    /***
     Sets a rotation quaternion using Euler angles and its axis order

     params:
     @vector (Vec3 class object): rotation vector to set our quaternion from

     returns :
     @this (Quat class object): quaternion after having applied the rotation
     ***/
    setFromVec3(this: any, vector: any): any;
}
