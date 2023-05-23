/***
 Here we create our Renderer object
 It will create our WebGL context and handle everything that relates to it
 Will create a container, append a canvas, handle WebGL extensions, context lost/restoration events
 Will create a Scene class object that will keep tracks of all added objects
 Will also handle all global WebGL commands, like clearing scene, binding frame buffers, setting depth, blend func, etc.
 Will use a state object to handle all those commands and keep a track of what is being drawned to avoid redundant WebGL calls.

 params:
 @Curtainsparams see Curtains class object

 @onError (function): called when there has been an error while initiating the WebGL context
 @onSuccess (function): called when the WebGL context has been successfully created
 @onContextLost (function): called when the WebGL context is lost
 @onContextRestored (function): called when the WebGL context is restored
 @onSceneChange (function): called every time an object has been added/removed from the scene

 returns :
 @this: our Renderer
 ***/
export class Renderer {
    constructor({ alpha, antialias, premultipliedAlpha, depth, failIfMajorPerformanceCaveat, preserveDrawingBuffer, stencil, container, pixelRatio, renderingScale, production, onError, onSuccess, onContextLost, onContextRestored, onDisposed, onSceneChange, }: {
        alpha: any;
        antialias: any;
        premultipliedAlpha: any;
        depth: any;
        failIfMajorPerformanceCaveat: any;
        preserveDrawingBuffer: any;
        stencil: any;
        container: any;
        pixelRatio: any;
        renderingScale: any;
        production: any;
        onError: any;
        onSuccess: any;
        onContextLost: any;
        onContextRestored: any;
        onDisposed: any;
        onSceneChange: any;
    });
    type: string;
    alpha: any;
    antialias: any;
    premultipliedAlpha: any;
    depth: any;
    failIfMajorPerformanceCaveat: any;
    preserveDrawingBuffer: any;
    stencil: any;
    container: any;
    pixelRatio: any;
    _renderingScale: any;
    production: any;
    onError: any;
    onSuccess: any;
    onContextLost: any;
    onContextRestored: any;
    onDisposed: any;
    onSceneChange: any;
    canvas: HTMLCanvasElement;
    gl: RenderingContext;
    _isWebGL2: boolean;
    /***
     Set/reset our context state object
     ***/
    initState(): void;
    state: {
        isActive: boolean;
        isContextLost: boolean;
        drawingEnabled: boolean;
        forceRender: boolean;
        currentProgramID: any;
        currentGeometryID: any;
        forceBufferUpdate: boolean;
        depthTest: any;
        blending: any;
        cullFace: any;
        frameBufferID: any;
        scenePassIndex: any;
        activeTexture: any;
        unpackAlignment: any;
        flipY: any;
        premultiplyAlpha: any;
    };
    /***
     Add a callback queueing manager (execute functions on the next render call, see CallbackQueueManager class object)
     ***/
    initCallbackQueueManager(): void;
    nextRender: CallbackQueueManager;
    /***
     Init our renderer
     ***/
    initRenderer(): void;
    planes: any;
    renderTargets: any;
    shaderPasses: any;
    cache: CacheManager;
    scene: Scene;
    _contextLostHandler: any;
    _contextRestoredHandler: any;
    /***
     Get all available WebGL extensions based on WebGL used version
     Called on init and on context restoration
     ***/
    getExtensions(): void;
    extensions: any[];
    /*** HANDLING CONTEXT LOST/RESTORE ***/
    /***
     Called when the WebGL context is lost
     ***/
    contextLost(event: any): void;
    /***
     Call this method to restore your context
     ***/
    restoreContext(): void;
    /***
     Check that all objects and textures have been restored

     returns:
     @isRestored (bool): whether everything has been restored or not
     ***/
    isContextexFullyRestored(): boolean;
    /***
     Called when the WebGL context is restored
     ***/
    contextRestored(): void;
    /*** SIZING ***/
    /***
     Updates pixelRatio property
     ***/
    setPixelRatio(pixelRatio: any): void;
    /***
     Set/reset container sizes and WebGL viewport sizes
     ***/
    setSize(): void;
    _boundingRect: {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    /***
     Resize all our elements: planes, shader passes and render targets
     Their textures will be resized as well
     ***/
    resize(): void;
    /*** CLEAR SCENE ***/
    /***
     Clear our WebGL scene colors and depth
     ***/
    clear(): void;
    /***
     Clear our WebGL scene depth
     ***/
    clearDepth(): void;
    /***
     Clear our WebGL scene colors and depth
     ***/
    clearColor(): void;
    /*** FRAME BUFFER OBJECTS ***/
    /***
     Called to bind or unbind a FBO

     params:
     @frameBuffer (frameBuffer): if frameBuffer is not null, bind it, unbind it otherwise
     @cancelClear (bool / undefined): if we should cancel clearing the frame buffer (typically on init & resize)
     ***/
    bindFrameBuffer(frameBuffer: any, cancelClear: any): void;
    /*** DEPTH ***/
    /***
     Called to set whether the renderer will handle depth test or not
     Depth test is enabled by default

     params:
     @setDepth (boolean): if we should enable or disable the depth test
     ***/
    setDepthTest(depthTest: any): void;
    /***
     Called to set the depth buffer behavior
     Only available option is gl.LEQUAL at the moment
     (see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthFunc)
     ***/
    setDepthFunc(): void;
    /*** BLENDING ***/
    /***
     Whether we should enable or disable the blending state
     Used to draw transparent planes

     params:
     @enableBlending (boolean): if we should enable or disable the blending (default to false)
     ***/
    setBlending(enableBlending?: boolean): void;
    /***
     Called to set the blending function (transparency)
     ***/
    setBlendFunc(): void;
    /*** FACE CULLING ***/
    /***
     Called to set whether we should cull an object face or not

     params:
     @cullFace (boolean): what face we should cull
     ***/
    setFaceCulling(cullFace: any): void;
    /***
     Tell WebGL to use the specified program if it's not already in use

     params:
     @program (object): a program object
     ***/
    useProgram(program: any): void;
    /*** PLANES ***/
    /***
     Removes a Plane element (that has already been disposed) from the scene and the planes array

     params:
     @plane (Plane object): the plane to remove
     ***/
    removePlane(plane: any): void;
    /*** POST PROCESSING ***/
    /***
     Completely remove a RenderTarget element

     params:
     @renderTarget (RenderTarget object): the render target to remove
     ***/
    removeRenderTarget(renderTarget: any): void;
    /*** SHADER PASSES ***/
    /***
     Removes a ShaderPass element (that has already been disposed) from the scene and the shaderPasses array

     params:
     @shaderPass (ShaderPass object): the shader pass to remove
     ***/
    removeShaderPass(shaderPass: any): void;
    /***
     Enables the render loop
     ***/
    enableDrawing(): void;
    /***
     Disables the render loop
     ***/
    disableDrawing(): void;
    /***
     Forces the rendering of the next frame, even if disabled
     ***/
    needRender(): void;
    /***
     Called at each draw call to render our scene and its content
     Also execute our nextRender callback queue
     ***/
    render(): void;
    /*** DISPOSING ***/
    /***
     Delete all cached programs
     ***/
    deletePrograms(): void;
    /***
     Dispose our WebGL context and all its objects
     ***/
    dispose(): void;
}
import { CallbackQueueManager } from "../utils/CallbackQueueManager.js";
import { CacheManager } from "../utils/CacheManager.js";
import { Scene } from "./Scene.js";
