/***
 Here we create our Mesh object
 We will create an object containing the program that handles shaders and uniforms, a geometry that handles attributes
 Also handles anything that relates to textures creation and basic drawing operations

 params:
 @renderer (Curtains renderer or Renderer class object): our curtains object OR our curtains renderer object
 @type (string): Object type (should be either "Plane" or "ShaderPass")

 @vertexShaderID (string, optional): the vertex shader script ID. If not specified, will look for a data attribute data-vs-id on the plane HTML element.
 @fragmentShaderID (string, optional): the fragment shader script ID. If not specified, will look for a data attribute data-fs-id on the plane HTML element.
 @vertexShader (string, optional): the vertex shader as a string. Will look for a vertexShaderID if not specified.
 @fragmentShader (string, optional): the fragment shader as a string. Will look for a fragmentShaderID if not specified.
 @uniforms (object, optional): the uniforms that will be passed to the shaders.
 @widthSegments (int, optional): mesh definition along the X axis (1 by default)
 @heightSegments (int, optional): mesh definition along the Y axis (1 by default)
 @renderOrder (int, optional): mesh render order in the scene draw stacks (0 by default)
 @depthTest (bool, optional): if the mesh should enable or disable the depth test. Default to true.
 @cullFace (string, optional): which face of the mesh should be culled. Could either be "back", "front" or "none". Default to "back".
 @texturesOptions (object, optional): options and parameters to apply to the textures loaded by the mesh's loader. See the Texture class object.
 @crossorigin (string, optional): defines the crossOrigin process to load images if any (default to "anonymous").

 returns:
 @this: our Mesh element
 ***/
export class Mesh {
    constructor(renderer: any, type?: string, { vertexShaderID, fragmentShaderID, vertexShader, fragmentShader, uniforms, widthSegments, heightSegments, renderOrder, depthTest, cullFace, texturesOptions, crossOrigin }?: {
        vertexShaderID: any;
        fragmentShaderID: any;
        vertexShader: any;
        fragmentShader: any;
        uniforms?: {};
        widthSegments?: number;
        heightSegments?: number;
        renderOrder?: number;
        depthTest?: boolean;
        cullFace?: string;
        texturesOptions?: {};
        crossOrigin?: string;
    });
    type: string;
    renderer: any;
    gl: any;
    _canDraw: boolean;
    renderOrder: number;
    _depthTest: boolean;
    cullFace: string;
    textures: any[];
    _texturesOptions: {
        premultiplyAlpha: boolean;
        anisotropy: number;
        floatingPoint: string;
        wrapS: any;
        wrapT: any;
        minFilter: any;
        magFilter: any;
    };
    crossOrigin: string;
    _geometry: Geometry;
    _program: Program;
    uniforms: {};
    _initMesh(): void;
    uuid: string;
    loader: PlaneTextureLoader;
    images: any[];
    videos: any[];
    canvases: any[];
    userData: {};
    /*** RESTORING CONTEXT ***/
    /***
     Used internally to handle context restoration
     ***/
    _restoreContext(): void;
    _matrices: any;
    /***
     This function adds a render target to a mesh

     params :
     @renderTarger (RenderTarget): the render target to add to that mesh
     ***/
    setRenderTarget(renderTarget: any): void;
    target: any;
    /***
     Set the mesh render order to draw it above or behind other meshes

     params :
     @renderOrder (int): new render order to apply: higher number means a mesh is drawn on top of others
     ***/
    setRenderOrder(renderOrder?: number): void;
    /*** IMAGES, VIDEOS AND CANVASES LOADING ***/
    /***
     This method creates a new Texture and adds it to the mesh

     params :
     @textureOptions (object, optional) : Parameters to apply to that texture (see Texture class). Will be merged with the mesh default textures options

     returns :
     @texture: our newly created texture
     ***/
    createTexture(textureOptions?: {}): Texture;
    /***
     Shortcut for addParent() Texture class method
     ***/
    addTexture(texture: any): void;
    /***
     This method handles the sources loading process

     params :
     @sourcesArray (array): array of html images, videos or canvases elements
     @texturesOptions (object, optional) : Parameters to apply to those textures (see Texture class). Will be merged with the mesh default textures options
     @successCallback (function): callback to execute on source loading success
     @errorCallback (function): callback to execute on source loading error
     ***/
    loadSources(sourcesArray: any, texturesOptions: {}, successCallback: any, errorCallback: any): void;
    /***
     This method loads one source using our mesh loader (see PlaneTextureLoader class)

     params :
     @source (html element) : html image, video or canvas element
     @textureOptions (object, optional) : Parameters to apply to that texture (see Texture class). Will be merged with the mesh default textures options
     @successCallback (function): callback to execute on source loading success
     @errorCallback (function): callback to execute on source loading error
     ***/
    loadSource(source: any, textureOptions: {}, successCallback: any, errorCallback: any): void;
    /***
     This method loads an image using our mesh loader (see PlaneTextureLoader class)

     params :
     @source (image) : html image element
     @textureOptions (object, optional) : Parameters to apply to that texture (see Texture class). Will be merged with the mesh default textures options
     @successCallback (function): callback to execute on source loading success
     @errorCallback (function): callback to execute on source loading error
     ***/
    loadImage(source: any, textureOptions: {}, successCallback: any, errorCallback: any): void;
    /***
     This method loads a video using the mesh loader (see PlaneTextureLoader class)

     params :
     @source (video) : html video element
     @textureOptions (object, optional) : Parameters to apply to that texture (see Texture class). Will be merged with the mesh default textures options
     @successCallback (function): callback to execute on source loading success
     @errorCallback (function): callback to execute on source loading error
     ***/
    loadVideo(source: any, textureOptions: {}, successCallback: any, errorCallback: any): void;
    /***
     This method loads a canvas using the mesh loader (see PlaneTextureLoader class)

     params :
     @source (canvas) : html canvas element
     @textureOptions (object, optional) : Parameters to apply to that texture (see Texture class). Will be merged with the mesh default textures options
     @successCallback (function): callback to execute on source loading success
     ***/
    loadCanvas(source: any, textureOptions: {}, successCallback: any): void;
    /*** LOAD ARRAYS ***/
    /***
     Loads an array of images

     params :
     @imagesArray (array) : array of html image elements
     @texturesOptions (object, optional) : Parameters to apply to those textures (see Texture class). Will be merged with the mesh default textures options
     @successCallback (function): callback to execute on source loading success
     @errorCallback (function): callback to execute on source loading error
     ***/
    loadImages(imagesArray: any, texturesOptions: {}, successCallback: any, errorCallback: any): void;
    /***
     Loads an array of videos

     params :
     @videosArray (array) : array of html video elements
     @texturesOptions (object, optional) : Parameters to apply to those textures (see Texture class). Will be merged with the mesh default textures options
     @successCallback (function): callback to execute on source loading success
     @errorCallback (function): callback to execute on source loading error
     ***/
    loadVideos(videosArray: any, texturesOptions: {}, successCallback: any, errorCallback: any): void;
    /***
     Loads an array of canvases

     params :
     @canvasesArray (array) : array of html canvas elements
     @texturesOptions (object, optional) : Parameters to apply to those textures (see Texture class). Will be merged with the mesh default textures options
     @successCallback (function): callback to execute on source loading success
     @errorCallback (function): callback to execute on source loading error
     ***/
    loadCanvases(canvasesArray: any, texturesOptions: {}, successCallback: any): void;
    /***
     This has to be called in order to play the planes videos
     We need this because on mobile devices we can't start playing a video without a user action
     Once the video has started playing we set an interval and update a new frame to our our texture at a 30FPS rate
     ***/
    playVideos(): void;
    /*** DRAW THE PLANE ***/
    /***
     We draw the plane, ie bind the buffers, set the active textures and draw it
     ***/
    _draw(): void;
    /*** EVENTS ***/
    /***
     This is called each time a mesh can't be instanciated

     params :
     @callback (function) : a function to execute

     returns :
     @this: our plane to handle chaining
     ***/
    onError(this: any, callback: any): any;
    _onErrorCallback: any;
    /***
     This is called each time a mesh's image has been loaded. Useful to handle a loader

     params :
     @callback (function) : a function to execute

     returns :
     @this: our plane to handle chaining
     ***/
    onLoading(this: any, callback: any): any;
    _onLoadingCallback: any;
    /***
     This is called when a mesh is ready to be drawn

     params :
     @callback (function) : a function to execute

     returns :
     @this: our plane to handle chaining
     ***/
    onReady(this: any, callback: any): any;
    _onReadyCallback: any;
    /***
     This is called at each requestAnimationFrame call

     params :
     @callback (function) : a function to execute

     returns :
     @this: our plane to handle chaining
     ***/
    onRender(this: any, callback: any): any;
    _onRenderCallback: any;
    /***
     This is called at each requestAnimationFrame call for each mesh after the draw call

     params :
     @callback (function) : a function to execute

     returns :
     @this: our plane to handle chaining
     ***/
    onAfterRender(this: any, callback: any): any;
    _onAfterRenderCallback: any;
    /*** DESTROYING ***/
    /***
     Remove an element by calling the appropriate renderer method
     ***/
    remove(): void;
    /***
     This deletes all our mesh webgl bindings and its textures
     ***/
    _dispose(): void;
}
import { Geometry } from './Geometry.js';
import { Program } from './Program.js';
import { PlaneTextureLoader } from '../loaders/PlaneTextureLoader.js';
import { Texture } from './Texture.js';
