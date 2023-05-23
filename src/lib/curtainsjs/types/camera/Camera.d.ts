/***
 Here we create our Camera object
 Creates a perspective camera and its projection matrix (which is used by Plane's class objects)
 Uses a dirty _shouldUpdate flag used to determine if we should update the matrix

 params:
 @fov (float, optional): the perspective field of view. Should be greater than 0 and lower than 180. Default to 50.
 @near (float, optional): near plane, the closest point where a mesh vertex is drawn. Default to 0.1.
 @far (float, optional): far plane, farthest point where a mesh vertex is drawn. Default to 150.
 @width (float, optional): width used to calculate the camera aspect ratio. Default to the renderer container's width.
 @height (float, optional): height used to calculate the camera aspect ratio. Default to the renderer container's height.
 @pixelRatio (float, optional): pixel ratio used to calculate the camera aspect ratio. Default to the renderer's pixel ratio.

 returns:
 @this: our Mesh element
 ***/
export class Camera {
    constructor({ fov, near, far, width, height, pixelRatio, }?: {
        fov?: number;
        near?: number;
        far?: number;
        width: any;
        height: any;
        pixelRatio?: number;
    });
    position: Vec3;
    projectionMatrix: Mat4;
    worldMatrix: Mat4;
    viewMatrix: Mat4;
    _shouldUpdate: boolean;
    /***
     Sets the camera field of view
     Update the camera projection matrix only if the fov actually changed

     params:
     @fov (float, optional): field of view to use
     ***/
    setFov(fov: any): void;
    fov: any;
    /***
     Sets the camera near plane value
     Update the camera projection matrix only if the near plane actually changed

     params:
     @near (float, optional): near plane value to use
     ***/
    setNear(near: any): void;
    near: any;
    /***
     Sets the camera far plane value
     Update the camera projection matrix only if the far plane actually changed

     params:
     @far (float, optional): far plane value to use
     ***/
    setFar(far: any): void;
    far: any;
    /***
     Sets the camera pixel ratio value
     Update the camera projection matrix only if the pixel ratio actually changed

     params:
     @pixelRatio (float, optional): pixelRatio value to use
     ***/
    setPixelRatio(pixelRatio: any): void;
    pixelRatio: any;
    /***
     Sets the camera width and height
     Update the camera projection matrix only if the width or height actually changed

     params:
     @width (float, optional): width value to use
     @height (float, optional): height value to use
     ***/
    setSize(width: any, height: any): void;
    width: any;
    height: any;
    /***
     Sets the camera perspective
     Update the camera projection matrix if our _shouldUpdate flag is true

     params:
     @fov (float, optional): field of view to use
     @near (float, optional): near plane value to use
     @far (float, optional): far plane value to use
     @width (float, optional): width value to use
     @height (float, optional): height value to use
     @pixelRatio (float, optional): pixelRatio value to use
     ***/
    setPerspective(fov: any, near: any, far: any, width: any, height: any, pixelRatio: any): void;
    /***
     Sets the camera position based on its fov
     Used by the Plane class objects to scale the planes with the right amount
     ***/
    setPosition(): void;
    /***
     Sets a CSSPerspective property based on width, height, pixelRatio and fov
     Used to translate planes along the Z axis using pixel units as CSS would do
     Taken from: https://stackoverflow.com/questions/22421439/convert-field-of-view-value-to-css3d-perspective-value
     ***/
    setCSSPerspective(): void;
    CSSPerspective: number;
    /***
     Returns visible width / height at a given z-depth from our camera parameters

     Taken from: https://discourse.threejs.org/t/functions-to-calculate-the-visible-width-height-at-a-given-z-depth-from-a-perspective-camera/269
     ***/
    getScreenRatiosFromFov(depth?: number): {
        width: number;
        height: number;
    };
    /***
     Updates the camera projection matrix
     ***/
    updateProjectionMatrix(): void;
    /***
     Force the projection matrix to update (used in Plane class objects context restoration)
     ***/
    forceUpdate(): void;
    /***
     Cancel the projection matrix update (used in Plane class objects after the projection matrix has been updated)
     ***/
    cancelUpdate(): void;
}
import { Vec3 } from '../math/Vec3.js';
import { Mat4 } from '../math/Mat4.js';
