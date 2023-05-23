export class Plane extends DOMMesh {
    constructor(renderer: any, htmlElement: any, { widthSegments, heightSegments, renderOrder, depthTest, cullFace, uniforms, vertexShaderID, fragmentShaderID, vertexShader, fragmentShader, texturesOptions, crossOrigin, alwaysDraw, visible, transparent, drawCheckMargins, autoloadSources, watchScroll, fov, }?: {
        widthSegments: any;
        heightSegments: any;
        renderOrder: any;
        depthTest: any;
        cullFace: any;
        uniforms: any;
        vertexShaderID: any;
        fragmentShaderID: any;
        vertexShader: any;
        fragmentShader: any;
        texturesOptions: any;
        crossOrigin: any;
        alwaysDraw?: boolean;
        visible?: boolean;
        transparent?: boolean;
        drawCheckMargins?: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        autoloadSources?: boolean;
        watchScroll?: boolean;
        fov?: number;
    });
    index: any;
    alwaysDraw: boolean;
    _shouldDraw: boolean;
    visible: boolean;
    _transparent: boolean;
    drawCheckMargins: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    autoloadSources: boolean;
    watchScroll: boolean;
    _updateMVMatrix: boolean;
    camera: Camera;
    /*** RESTORING CONTEXT ***/
    /***
     Used internally to handle context restoration after the program has been successfully compiled again
     ***/
    _programRestored(): void;
    /***
     Init our basic plane values (transformations, positions, camera, sources)
     ***/
    _initPlane(): void;
    /*** TRANSFORMATIONS, PROJECTION & MATRICES ***/
    /***
     Set/reset plane's transformation values: rotation, scale, translation, transform origin
     ***/
    _initTransformValues(): void;
    rotation: Vec3;
    quaternion: Quat;
    relativeTranslation: Vec3;
    _translation: Vec3;
    scale: Vec3;
    transformOrigin: Vec3;
    /***
     Reset our plane transformation values and HTML element if specified (and valid)

     params :
     @htmlElement (HTML element, optional) : if provided, new HTML element to use as a reference for sizes and position syncing.
     ***/
    resetPlane(htmlElement: any): void;
    /***
     This function removes the plane current render target
     ***/
    removeRenderTarget(): void;
    /***
     Init our plane position: set its matrices, its position and perspective
     ***/
    _initPositions(): void;
    /***
     Init our plane model view and projection matrices and set their uniform locations
     ***/
    _initMatrices(): void;
    /*** PLANES PERSPECTIVES, SCALES AND ROTATIONS ***/
    /***
     This will set our perspective matrix and update our perspective matrix uniform
     used internally at each draw call if needed
     ***/
    _setPerspectiveMatrix(): void;
    /***
     This will set our perspective matrix new parameters (fov, near plane and far plane)
     used internally but can be used externally as well to change fov for example

     params :
     @fov (float): the field of view
     @near (float): the nearest point where object are displayed
     @far (float): the farthest point where object are displayed
     ***/
    setPerspective(fov: any, near: any, far: any): void;
    /***
     This will set our model view matrix
     used internally at each draw call if needed
     It will calculate our matrix based on its plane translation, rotation and scale
     ***/
    _setMVMatrix(): void;
    /*** SCREEN TO WORLD CALCS ***/
    /***
     Convert our transform origin point from plane space to world space
     ***/
    _setWorldTransformOrigin(): void;
    /***
     This function takes pixel values along X and Y axis and convert them to world space coordinates

     params :
     @vector (Vec3): position to convert on X, Y and Z axes

     returns :
     @worldPosition: plane's position in WebGL space
     ***/
    _documentToWorldSpace(vector: any): any;
    /***
     Set our plane dimensions relative to clip spaces
     ***/
    _setWorldSizes(): void;
    /***
     Set our plane position relative to clip spaces
     ***/
    _setWorldPosition(): void;
    /*** TRANSFORMATIONS ***/
    /***
     This will set our plane scale
     used internally but can be used externally as well

     params :
     @scale (Vec2 object): scale to apply on X and Y axes
     ***/
    setScale(scale: any): void;
    /***
     This will apply our scale and tells our model view matrix to update
     ***/
    _applyScale(): void;
    /***
     This will set our plane rotation
     used internally but can be used externally as well

     params :
     @rotation (Vec3 object): rotation to apply on X, Y and Z axes (in radians)
     ***/
    setRotation(rotation: any): void;
    /***
     This will apply our rotation and tells our model view matrix to update
     ***/
    _applyRotation(): void;
    /***
     This will set our plane transform origin
     (0, 0, 0) means plane's top left corner
     (1, 1, 0) means plane's bottom right corner
     (0.5, 0.5, -1) means behind plane's center

     params :
     @origin (Vec3 object): coordinate of transformation origin X, Y and Z axes
     ***/
    setTransformOrigin(origin: any): void;
    /***
     This will set our plane translation by adding plane computed bounding box values and computed relative position values
     ***/
    _setTranslation(): void;
    /***
     This function takes pixel values along X and Y axis and convert them to clip space coordinates, and then apply the corresponding translation

     params :
     @translation (Vec3): translation to apply on X, Y and Z axes
     ***/
    setRelativeTranslation(translation: any): void;
    /***
     This function uses our plane HTML Element bounding rectangle values and convert them to the world clip space coordinates, and then apply the corresponding translation
     ***/
    _applyWorldPositions(): void;
    /***
     This function updates the plane position based on its CSS positions and transformations values.
     Useful if the HTML element has been moved while the container size has not changed.
     ***/
    updatePosition(): void;
    /***
     This function updates the plane position based on the Curtains class scroll manager values

     params:
     @lastXDelta (float): last scroll value along X axis
     @lastYDelta (float): last scroll value along Y axis
     ***/
    updateScrollPosition(lastXDelta: any, lastYDelta: any): void;
    /*** FRUSTUM CULLING (DRAW CHECK) ***/
    /***
     Find the intersection point by adding a vector starting from a corner till we reach the near plane

     params:
     @refPoint (Vec3 class object): corner of the plane from which we start to iterate from
     @secondPoint (Vec3 class object): second point near the refPoint to get a direction to use for iteration

     returns:
     @intersection (Vec3 class object): intersection between our plane and the camera near plane
     ***/
    _getIntersection(refPoint: any, secondPoint: any): any;
    /***
     Get intersection points between a plane and the camera near plane
     When a plane gets clipped by the camera near plane, the clipped corner projected coords returned by _applyMat4() are erronate
     We need to find the intersection points using another approach
     Here I chose to use non clipped corners projected coords and a really small vector parallel to the plane's side
     We're adding that vector again and again to our corner projected coords until the Z coordinate matches the near plane: we got our intersection

     params:
     @corners (array): our original corners vertices coordinates
     @mvpCorners (array): the projected corners of our plane
     @clippedCorners (array): index of the corners that are clipped

     returns:
     @mvpCorners (array): the corrected projected corners of our plane
     ***/
    _getNearPlaneIntersections(corners: any, mvpCorners: any, clippedCorners: any): any;
    /***
     Useful to get our WebGL plane bounding box in the world space
     Takes all transformations into account
     Used internally for frustum culling

     returns :
     @boundingRectangle (obj): an object containing our plane WebGL element 4 corners coordinates: top left corner is [-1, 1] and bottom right corner is [1, -1]
     ***/
    _getWorldCoords(): {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    /***
     Transpose our plane corners coordinates from world space to document space
     Sets an object with the accurate plane WebGL bounding rect relative to document
     ***/
    _computeWebGLBoundingRect(): void;
    /***
     Returns our plane WebGL bounding rect relative to document

     returns :
     @boundingRectangle (obj): an object containing our plane WebGL element bounding rectangle (width, height, top, bottom, right and left properties)
     ***/
    getWebGLBoundingRect(): any;
    /***
     Returns our plane WebGL bounding rectangle in document coordinates including additional drawCheckMargins

     returns :
     @boundingRectangle (obj): an object containing our plane WebGL element bounding rectangle including the draw check margins (top, bottom, right and left properties)
     ***/
    _getWebGLDrawRect(): {
        top: number;
        right: any;
        bottom: any;
        left: number;
    };
    /***
     This function checks if the plane is currently visible in the canvas and sets _shouldDraw property according to this test
     This is our real frustum culling check
     ***/
    _shouldDrawCheck(): void;
    /***
     This function returns if the plane is actually drawn (ie fully initiated, visible property set to true and not culled)
     ***/
    isDrawn(): boolean;
    /*** DEPTH AND RENDER ORDER ***/
    /***
     This function set/unset the depth test for that plane

     params :
     @shouldEnableDepthTest (bool): enable/disable depth test for that plane
     ***/
    enableDepthTest(shouldEnableDepthTest: any): void;
    /*** SOURCES ***/
    /***
     Load our initial sources if needed and calls onReady callback
     ***/
    _initSources(): void;
    /*** DRAWING ***/
    /***
     Specific instructions for the Plane class to execute before drawing it
     ***/
    _startDrawing(): void;
    /*** EVENTS ***/
    /***
     This is called each time a plane is entering again the view bounding box

     params :
     @callback (function) : a function to execute

     returns :
     @this: our plane to handle chaining
     ***/
    onReEnterView(this: any, callback: any): any;
    _onReEnterViewCallback: any;
    /***
     This is called each time a plane is leaving the view bounding box

     params :
     @callback (function) : a function to execute

     returns :
     @this: our plane to handle chaining
     ***/
    onLeaveView(this: any, callback: any): any;
    _onLeaveViewCallback: any;
}
import { DOMMesh } from "./DOMMesh.js";
import { Camera } from "../camera/Camera.js";
import { Vec3 } from '../math/Vec3.js';
import { Quat } from '../math/Quat.js';
