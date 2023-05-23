/*** SHADERPASS CLASS ***/
/***
 Here we create our ShaderPass object
 We will extend our DOMMesh class that handles all the WebGL part and basic HTML sizings
 ShaderPass class will add the frame buffer by creating a new RenderTarget class object

 params :
 @renderer (Curtains renderer or Renderer class object): our curtains object OR our curtains renderer object

 @Meshparams (object): see Mesh class object

 @depth (boolean, optionnal): whether the shader pass render target should use a depth buffer (see RenderTarget class object). Default to false.
 @clear (boolean, optional): whether the shader pass render target content should be cleared before being drawn (see RenderTarget class object). Default to true.
 @renderTarget (RenderTarget class object, optional): an already existing render target to use. Default to null.

 returns :
 @this: our ShaderPass element
 ***/
export class ShaderPass extends DOMMesh {
    constructor(renderer: any, { widthSegments, heightSegments, renderOrder, depthTest, cullFace, uniforms, vertexShaderID, fragmentShaderID, vertexShader, fragmentShader, texturesOptions, crossOrigin, depth, clear, renderTarget, }?: {
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
        depth?: boolean;
        clear?: boolean;
        renderTarget: any;
    });
    _isScenePass: boolean;
    index: any;
    _depth: boolean;
    _shouldClear: any;
    /*** RESTORING CONTEXT ***/
    /***
     Used internally to handle context restoration after the program has been successfully compiled again
     ***/
    _programRestored(): void;
    /***
     Here we init additionnal shader pass planes properties
     This mainly consists in creating our render texture and add a frame buffer object
     ***/
    _initShaderPass(): void;
    /***
     Here we create our frame buffer object
     We're also adding a render buffer object to handle depth inside our shader pass
     ***/
    _createFrameBuffer(): void;
    /*** DRAWING ***/
    /***
     Specific instructions for the Shader pass class to execute before drawing it
     ***/
    _startDrawing(): void;
}
import { DOMMesh } from "../core/DOMMesh.js";
