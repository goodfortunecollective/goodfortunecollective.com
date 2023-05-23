/***
 Here we create our Curtains object


 params:
 @container (HTML element or string, optional): the container HTML element or ID that will hold our canvas. Could be set later if not passed as parameter here

 (WebGL context parameters)
 @alpha (bool, optional): whether the WebGL context should handle transparency. Default to true.
 @premultipliedAlpha (bool, optional): whether the WebGL context should handle premultiplied alpha. Default to false.
 @antialias (bool, optional): whether the WebGL context should use the default antialiasing. When using render targets, WebGL disables antialiasing, so you can safely set this to false to improve the performance. Default to true.
 @depth (bool, optional): whether the WebGL context should handle depth. Default to true.
 @failIfMajorPerformanceCaveat (bool, optional): whether the WebGL context creation should fail in case of major performance caveat. Default to true.
 @preserveDrawingBuffer (bool, optional): whether the WebGL context should preserve the drawing buffer. Default to false.
 @stencil (bool, optional): whether the WebGL context should handle stencil. Default to false.

 @autoResize (bool, optional): Whether the library should listen to the window resize event and actually resize the scene. Set it to false if you want to handle this by yourself using the resize() method. Default to true.
 @autoRender (bool, optional): Whether the library should create a request animation frame loop to render the scene. Set it to false if you want to handle this by yourself using the render() method. Default to true.
 @watchScroll (bool, optional): Whether the library should listen to the window scroll event. Set it to false if you want to handle this by yourself. Default to true.

 @pixelRatio (float, optional): Defines the pixel ratio value. Use it to limit it on init to increase performance. Default to window.devicePixelRatio.
 @renderingScale (float, optional): Use it to downscale your rendering canvas. May improve performance but will decrease quality. Default to 1 (minimum: 0.25, maximum: 1).

 @production (bool, optional): Whether the library should throw useful console warnings and errors and check shaders and programs compilation status. Default to false.

 returns :
 @this: our Renderer
 ***/
export class Curtains {
    constructor({ container, alpha, premultipliedAlpha, antialias, depth, failIfMajorPerformanceCaveat, preserveDrawingBuffer, stencil, autoResize, autoRender, watchScroll, pixelRatio, renderingScale, production, }?: {
        container: any;
        alpha?: boolean;
        premultipliedAlpha?: boolean;
        antialias?: boolean;
        depth?: boolean;
        failIfMajorPerformanceCaveat?: boolean;
        preserveDrawingBuffer?: boolean;
        stencil?: boolean;
        autoResize?: boolean;
        autoRender?: boolean;
        watchScroll?: boolean;
        pixelRatio?: number;
        renderingScale?: number;
        production?: boolean;
    });
    type: string;
    _autoResize: boolean;
    _autoRender: boolean;
    _watchScroll: boolean;
    pixelRatio: number;
    _renderingScale: number;
    premultipliedAlpha: boolean;
    alpha: boolean;
    antialias: boolean;
    depth: boolean;
    failIfMajorPerformanceCaveat: boolean;
    preserveDrawingBuffer: boolean;
    stencil: boolean;
    production: boolean;
    errors: boolean;
    /***
     Set up our Curtains container and start initializing everything
     Called on Curtains instancing if a params container has been provided, could be call afterwards else
     Useful with JS frameworks to init our Curtains class globally and then set the container in a canvas component afterwards to fully instantiate everything

     params:
     @container (HTML element or string): the container HTML element or ID that will hold our canvas
     ***/
    setContainer(container: any): void;
    container: any;
    /***
     Initialize everything that the class will need: WebGL renderer, scroll manager, sizes, listeners
     Then starts our animation frame loop if needed
     ***/
    _initCurtains(): void;
    planes: any;
    renderTargets: any;
    shaderPasses: any;
    _animationFrameID: number;
    /*** WEBGL CONTEXT ***/
    /***
     Initialize the Renderer class object
     ***/
    _initRenderer(): void;
    renderer: Renderer;
    gl: RenderingContext;
    canvas: HTMLCanvasElement;
    /***
     Force our renderer to restore the WebGL context
     ***/
    restoreContext(): void;
    /***
     This just handles our drawing animation frame
     ***/
    _animate(): void;
    /*** RENDERING ***/
    /***
     Enables rendering
     ***/
    enableDrawing(): void;
    /***
     Disables rendering
     ***/
    disableDrawing(): void;
    /***
     Forces the rendering of the next frame, even if disabled
     ***/
    needRender(): void;
    /***
     Executes a callback on next frame

     params:
     @callback (function): callback to execute on next frame
     @keep (bool): whether to keep calling that callback on each rendering call or not (act as a setInterval). Default to false

     returns:
     @queueItem: the queue item. Allows to keep a track of it and set its keep property to false when needed
     ***/
    nextRender(callback: any, keep?: boolean): {
        callback: any;
        keep: boolean;
        timeout: any;
    };
    /***
     Clear our WebGL renderer colors and depth buffers
     ***/
    clear(): void;
    /***
     Clear our WebGL renderer depth buffer
     ***/
    clearDepth(): void;
    /***
     Clear our WebGL renderer color buffer
     ***/
    clearColor(): void;
    /***
     Check whether the created context is WebGL2

     return:
     @isWebGL2 (bool): whether the created WebGL context is 2.0 or not
     ***/
    isWebGL2(): boolean;
    /***
     Tells our renderer to render the scene if the drawing is enabled
     ***/
    render(): void;
    /*** LISTENERS ***/
    /***
     Adds our resize event listener if needed
     ***/
    _addListeners(): void;
    _resizeHandler: any;
    /*** SIZING ***/
    /***
     Set the pixel ratio property and update everything by calling the resize() method
     ***/
    setPixelRatio(pixelRatio: any, triggerCallback: any): void;
    /***
     Set our renderer container and canvas sizes and update the scroll values
     ***/
    _setSize(): void;
    /***
     Useful to get our container bounding rectangle without triggering a reflow/layout

     returns :
     @boundingRectangle (object): an object containing our container bounding rectangle (width, height, top and left properties)
     ***/
    getBoundingRect(): {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    /***
     Resize our container and the renderer

     params:
     @triggerCallback (bool): Whether we should trigger onAfterResize callback
     ***/
    resize(triggerCallback: any): void;
    /*** SCROLL ***/
    /***
     Init our ScrollManager class object
     ***/
    _initScroll(): void;
    _scrollManager: ScrollManager;
    /***
     Handles the different values associated with a scroll event (scroll and delta values)
     If no plane watch the scroll then those values won't be retrieved to avoid unnecessary reflow calls
     If at least a plane is watching, update all watching planes positions based on the scroll values
     And force render for at least one frame to actually update the scene
     ***/
    _updateScroll(lastXDelta: any, lastYDelta: any): void;
    /***
     Updates the scroll manager X and Y scroll values as well as last X and Y deltas
     Internally called by the scroll handler if at least one plane is watching the scroll
     Could be called externally as well if the user wants to handle the scroll by himself

     params:
     @x (float): scroll value along X axis
     @y (float): scroll value along Y axis
     ***/
    updateScrollValues(x: any, y: any): void;
    /***
     Returns last delta scroll values

     returns:
     @delta (object): an object containing X and Y last delta values
     ***/
    getScrollDeltas(): {
        x: number;
        y: number;
    };
    /***
     Returns last window scroll values

     returns:
     @scrollValues (object): an object containing X and Y last scroll values
     ***/
    getScrollValues(): {
        x: number;
        y: number;
    };
    /*** ADDING / REMOVING OBJECTS TO THE RENDERER ***/
    /***
     Always keep sync between renderer and Curtains scene objects when adding/removing objects
     ***/
    _keepSync(): void;
    /*** UTILS ***/
    /***
     Linear interpolation helper defined in utils
     ***/
    lerp(start: any, end: any, amount: any): number;
    /*** EVENTS ***/
    /***
     This is called each time our container has been resized

     params :
     @callback (function) : a function to execute

     returns :
     @this: our Curtains element to handle chaining
     ***/
    onAfterResize(this: any, callback: any): any;
    _onAfterResizeCallback: any;
    /***
     This is called when an error has been detected

     params:
     @callback (function): a function to execute

     returns:
     @this: our Curtains element to handle chaining
     ***/
    onError(this: any, callback: any): any;
    _onErrorCallback: any;
    /***
     This triggers the onError callback and is called by the renderer when an error has been detected
     ***/
    _onRendererError(): void;
    /***
     This is called when the WebGL context has been successfully created

     params:
     @callback (function): a function to execute

     returns:
     @this: our Curtains element to handle chaining
     ***/
    onSuccess(this: any, callback: any): any;
    _onSuccessCallback: any;
    /***
     This triggers the onSuccess callback and is called by the renderer when the context has been successfully created
     ***/
    _onRendererSuccess(): void;
    /***
     This is called once our context has been lost

     params:
     @callback (function): a function to execute

     returns:
     @this: our Curtains element to handle chaining
     ***/
    onContextLost(this: any, callback: any): any;
    _onContextLostCallback: any;
    /***
     This triggers the onContextLost callback and is called by the renderer when the context has been lost
     ***/
    _onRendererContextLost(): void;
    /***
     This is called once our context has been restored

     params:
     @callback (function): a function to execute

     returns:
     @this: our Curtains element to handle chaining
     ***/
    onContextRestored(this: any, callback: any): any;
    _onContextRestoredCallback: any;
    /***
     This triggers the onContextRestored callback and is called by the renderer when the context has been restored
     ***/
    _onRendererContextRestored(): void;
    /***
     This is called once at each request animation frame call

     params:
     @callback (function): a function to execute

     returns:
     @this: our Curtains element to handle chaining
     ***/
    onRender(this: any, callback: any): any;
    _onRenderCallback: any;
    /***
     This is called each time window is scrolled and if our scrollManager is active

     params :
     @callback (function) : a function to execute

     returns :
     @this: our Curtains element to handle chaining
     ***/
    onScroll(this: any, callback: any): any;
    _onScrollCallback: any;
    /*** DESTROYING ***/
    /***
     Dispose everything
     ***/
    dispose(): void;
    /***
     This is called when the renderer has finished disposing all the WebGL stuff
     ***/
    _onRendererDisposed(): void;
}
import { Renderer } from "./Renderer.js";
import { ScrollManager } from "../utils/ScrollManager.js";
