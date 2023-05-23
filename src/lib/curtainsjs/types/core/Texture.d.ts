export class Texture {
    constructor(renderer: any, { isFBOTexture, fromTexture, loader, sampler, floatingPoint, premultiplyAlpha, anisotropy, generateMipmap, wrapS, wrapT, minFilter, magFilter, }?: {
        isFBOTexture?: boolean;
        fromTexture?: boolean;
        loader: any;
        sampler: any;
        floatingPoint?: string;
        premultiplyAlpha?: boolean;
        anisotropy?: number;
        generateMipmap?: any;
        wrapS: any;
        wrapT: any;
        minFilter: any;
        magFilter: any;
    });
    type: string;
    renderer: any;
    gl: any;
    uuid: string;
    _globalParameters: {
        unpackAlignment: number;
        flipY: boolean;
        premultiplyAlpha: boolean;
        shouldPremultiplyAlpha: boolean;
        floatingPoint: string;
        type: any;
        internalFormat: any;
        format: any;
    };
    parameters: {
        anisotropy: number;
        generateMipmap: any;
        wrapS: any;
        wrapT: any;
        minFilter: any;
        magFilter: any;
        _shouldUpdate: boolean;
    };
    sourceType: string;
    _useCache: boolean;
    _samplerName: any;
    _sampler: {
        isActive: boolean;
        isTextureBound: boolean;
        texture: any;
    };
    _textureMatrix: {
        matrix: Mat4;
        isActive: boolean;
    };
    _size: {
        width: number;
        height: number;
    };
    scale: Vec2;
    offset: Vec2;
    _loader: any;
    _sourceLoaded: boolean;
    _uploaded: boolean;
    _willUpdate: boolean;
    shouldUpdate: boolean;
    _forceUpdate: boolean;
    userData: {};
    _canDraw: boolean;
    _copyOnInit: boolean;
    _copiedFrom: true;
    /***
     Init per-texture parameters state
     Called on init and on context restoration to force parameters settings
     ***/
    _initState(): void;
    _state: any;
    /***
     Init our texture object
     ***/
    _initTexture(): void;
    /*** RESTORING CONTEXT ***/
    /***
     Restore a WebGL texture that is a copy
     Depending on whether it's a copy from start or not, just reset its uniforms or run the full init
     And finally copy our original texture back again
     ***/
    _restoreFromTexture(): void;
    /***
     Restore our WebGL texture
     If it is an original texture, just re run the init function and eventually reset its source
     If it is a texture set from another texture, wait for the original texture to be ready first
     ***/
    _restoreContext(): void;
    /*** ADD PARENT ***/
    /***
     Adds a parent to a texture
     Sets its index, its parent and add it to the parent textures array as well
     Then runs _setParent() to set the size and uniforms if needed
     ***/
    addParent(parent: any): void;
    _parent: any;
    index: any;
    /***
     Sets the parent
     Basically sets the uniforms names and locations and sizes
     ***/
    _setParent(): void;
    /***
     Checks if this texture has a parent

     return:
     @hasParent (bool): whether this texture has a parent or not
     ***/
    hasParent(): boolean;
    /*** SEND DATA TO THE GPU ***/
    /***
     Check if our textures is effectively used in our shaders
     If so, set it to active, get its uniform locations and bind it to our texture unit
     ***/
    _setTextureUniforms(): void;
    /***
     This copies an already existing Texture object to our texture

     params:
     @texture (Texture): texture to set from
     ***/
    copy(texture: any): void;
    source: any;
    _videoFrameCallbackID: any;
    /*** LOADING SOURCES ***/
    /***
     This uses our source as texture

     params:
     @source (images/video/canvas): either an image, a video or a canvas
     ***/
    setSource(source: any): void;
    /*** TEXTURE PARAMETERS ***/
    /***
     Updates textures parameters that depends on global WebGL context state
     Typically unpacking, flipY and premultiplied alpha
     Usually called before uploading a texture to the GPU
     ***/
    _updateGlobalTexParameters(): void;
    /***
     Updates per-textures parameters
     Wrapping, filters, anisotropy and mipmaps generation
     Usually called after uploading a texture to the GPU
     ***/
    _updateTexParameters(): void;
    /***
     Sets the texture wrapping for the texture coordinate S

     params:
     @wrapS (GLenum): WebGL constant specifying the texture wrapping function for the texture coordinate S
     ***/
    setWrapS(wrapS: any): void;
    /***
     Sets the texture wrapping for the texture coordinate T

     params:
     @wrapT (GLenum): WebGL constant specifying the texture wrapping function for the texture coordinate T
     ***/
    setWrapT(wrapT: any): void;
    /***
     Sets the texture minifaction filter value

     params:
     @minFilter (GLenum): WebGL constant specifying the texture minification filter
     ***/
    setMinFilter(minFilter: any): void;
    /***
     Sets the texture magnifaction filter value

     params:
     @magFilter (GLenum): WebGL constant specifying the texture magnifaction filter
     ***/
    setMagFilter(magFilter: any): void;
    /***
     Sets the texture anisotropy

     params:
     @anisotropy (int): Texture anisotropy value
     ***/
    setAnisotropy(anisotropy: any): void;
    /***
     This forces a texture to be updated on the next draw call
     ***/
    needUpdate(): void;
    /***
     This uses the requestVideoFrameCallback API to update the texture each time a new frame is displayed
     ***/
    _videoFrameCallback(): void;
    /***
     This updloads our texture to the GPU
     Called on init or inside our drawing loop if shouldUpdate property is set to true
     Typically used by videos or canvas
     ***/
    _upload(): void;
    /*** TEXTURE SIZINGS ***/
    /***
     This is used to calculate how to crop/center an texture

     returns:
     @sizes (obj): an object containing plane sizes, source sizes and x and y offset to center the source in the plane
     ***/
    _getSizes(): {
        parentWidth: any;
        parentHeight: any;
        sourceWidth: any;
        sourceHeight: any;
        xOffset: number;
        yOffset: number;
    };
    /***
     Set the texture scale and then update its matrix

     params:
     @scale (Vec2 object): scale to apply on X and Y axes
     ***/
    setScale(scale: any): void;
    setOffset(offset: any): void;
    /***
     Gets our texture and parent sizes and tells our texture matrix to update based on those values
     ***/
    _setSize(): void;
    /***
     This is used to crop/center a texture
     If the texture is using texture matrix then we just have to update its matrix
     If it is a render pass texture we also upload the texture with its new size on the GPU
     ***/
    resize(): void;
    /***
     This updates our textures matrix uniform based on plane and sources sizes

     params:
     @sizes (object): object containing plane sizes, source sizes and x and y offset to center the source in the plane
     ***/
    _updateTextureMatrix(sizes: any): void;
    /***
     This updates our textures matrix GL uniform
     ***/
    _updateMatrixUniform(): void;
    /***
     This calls our loading callback and set our media as texture source
     ***/
    _onSourceLoaded(source: any): void;
    /*** DRAWING ***/
    /***
     This is used to set the WebGL context active texture and bind it

     params:
     @texture (texture object): Our texture object containing our WebGL texture and its index
     ***/
    _bindTexture(): void;
    /***
     This is called to draw the texture
     ***/
    _draw(): void;
    /*** EVENTS ***/
    /***
     This is called each time a source has been loaded for the first time
     TODO useless?

     params :
     @callback (function) : a function to execute

     returns :
     @this: our texture to handle chaining
     ***/
    onSourceLoaded(this: any, callback: any): any;
    _onSourceLoadedCallback: any;
    /***
     This is called each time a texture has been uploaded to the GPU for the first time

     params :
     @callback (function) : a function to execute

     returns :
     @this: our texture to handle chaining
     ***/
    onSourceUploaded(this: any, callback: any): any;
    _onSourceUploadedCallback: any;
    /*** DESTROYING ***/
    /***
     This is used to destroy a texture and free the memory space
     Usually used on a plane/shader pass/render target removal

     params:
     @force (bool, optional): force the texture to be deleted even if cached
     ***/
    _dispose(force?: boolean): void;
}
import { Mat4 } from '../math/Mat4.js';
import { Vec2 } from '../math/Vec2.js';
