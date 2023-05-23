/***
 Here we create a RenderTarget class object

 params :
 @renderer (Curtains renderer or Renderer class object): our curtains object OR our curtains renderer object

 @shaderPass (ShaderPass class object): shader pass that will use that render target. Default to null
 @depth (bool, optional): whether to create a depth buffer (handle depth inside your render target). Default to false.
 @clear (bool, optional): whether the content of the render target should be cleared before being drawn. Should be set to false to handle ping-pong shading. Default to true.

 @minWidth (float, optional): minimum width of the render target
 @minHeight (float, optional): minimum height of the render target

 @texturesOptions (object, optional): options and parameters to apply to the render target texture. See the Texture class object.

 returns :
 @this: our RenderTarget class object
 ***/
export class RenderTarget {
    constructor(renderer: any, { shaderPass, depth, clear, maxWidth, maxHeight, minWidth, minHeight, texturesOptions }?: {
        shaderPass: any;
        depth?: boolean;
        clear?: boolean;
        maxWidth: any;
        maxHeight: any;
        minWidth?: number;
        minHeight?: number;
        texturesOptions?: {};
    });
    type: string;
    renderer: any;
    gl: any;
    index: any;
    _shaderPass: any;
    _depth: boolean;
    _shouldClear: boolean;
    _maxSize: {
        width: number;
        height: number;
    };
    _minSize: {
        width: number;
        height: number;
    };
    _texturesOptions: {};
    userData: {};
    uuid: string;
    /***
     Init our RenderTarget by setting its size, creating a textures array and then calling _createFrameBuffer()
     ***/
    _initRenderTarget(): void;
    textures: any[];
    /*** RESTORING CONTEXT ***/
    /***
     Restore a render target
     Basically just re init it
     ***/
    _restoreContext(): void;
    /***
     Sets our RenderTarget size based on its parent plane size
     ***/
    _setSize(): void;
    _size: {
        width: any;
        height: any;
    } | {
        width: number;
        height: number;
    };
    /***
     Resizes our RenderTarget (only resize it if it's a ShaderPass scene pass FBO)
     ***/
    resize(): void;
    /***
     Binds our depth buffer
     ***/
    _bindDepthBuffer(): void;
    /***
     Here we create our frame buffer object
     We're also adding a render buffer object to handle depth if needed
     ***/
    _createFrameBuffer(): void;
    _frameBuffer: any;
    _depthBuffer: any;
    /*** GET THE RENDER TARGET TEXTURE ***/
    /***
     Returns the render target's texture

     returns :
     @texture (Texture class object): our RenderTarget's texture
     ***/
    getTexture(): any;
    /*** DESTROYING ***/
    /***
     Remove an element by calling the appropriate renderer method
     ***/
    remove(): void;
    /***
     Delete a RenderTarget buffers and its associated texture
     ***/
    _dispose(): void;
}
