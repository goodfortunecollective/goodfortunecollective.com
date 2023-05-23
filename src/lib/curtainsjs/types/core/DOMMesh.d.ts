export class DOMMesh extends Mesh {
    constructor(renderer: any, htmlElement: any, type?: string, { widthSegments, heightSegments, renderOrder, depthTest, cullFace, uniforms, vertexShaderID, fragmentShaderID, vertexShader, fragmentShader, texturesOptions, crossOrigin, }?: {
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
    });
    htmlElement: any;
    /*** PLANE SIZES ***/
    /***
     Set our plane dimensions and positions relative to document
     Triggers reflow!
     ***/
    _setDocumentSizes(): void;
    _boundingRect: {};
    /*** BOUNDING BOXES GETTERS ***/
    /***
     Useful to get our plane HTML element bounding rectangle without triggering a reflow/layout

     returns :
     @boundingRectangle (obj): an object containing our plane HTML element bounding rectangle (width, height, top, bottom, right and left properties)
     ***/
    getBoundingRect(): {
        width: any;
        height: any;
        top: any;
        left: any;
        right: any;
        bottom: any;
    };
    /***
     Handles each plane resizing
     used internally when our container is resized
     ***/
    resize(): void;
    /*** INTERACTION ***/
    /***
     This function takes the mouse position relative to the document and returns it relative to our plane
     It ranges from -1 to 1 on both axis

     params :
     @mouseCoordinates (Vec2 object): coordinates of the mouse

     returns :
     @mousePosition (Vec2 object): the mouse position relative to our plane in WebGL space coordinates
     ***/
    mouseToPlaneCoords(mouseCoordinates: any): any;
    /*** EVENTS ***/
    /***
     This is called each time a plane has been resized

     params :
     @callback (function) : a function to execute

     returns :
     @this: our plane to handle chaining
     ***/
    onAfterResize(this: any, callback: any): any;
    _onAfterResizeCallback: any;
}
import { Mesh } from './Mesh.js';
