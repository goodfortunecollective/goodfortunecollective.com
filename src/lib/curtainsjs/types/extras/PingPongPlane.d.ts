/*** FBO PING PONG PLANE CLASS ***/
/***
 A little helper to create a plane that will perform FBO ping pong
 This plane will use FBOs swapping, using these following steps:
 - create two render targets (read and write)
 - create a texture onto which we'll draw
 - before drawing our plane (onRender callback), apply the write pass as our plane render target
 - after drawing our plane (onAfterRender callback), swap the read and write pass and copy the read pass texture again

 params:
 @sampler (string): sampler name used to create our texture and that will be used inside your shader
 @planeParams: see Plane class object

 returns :
 @this: our PingPongPlane element
 ***/
export class PingPongPlane extends Plane {
    constructor(curtains: any, htmlElement: any, { sampler, widthSegments, heightSegments, renderOrder, depthTest, cullFace, uniforms, vertexShaderID, fragmentShaderID, vertexShader, fragmentShader, texturesOptions, crossOrigin, alwaysDraw, visible, transparent, drawCheckMargins, autoloadSources, watchScroll, fov, }?: {
        sampler?: string;
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
        alwaysDraw: any;
        visible: any;
        transparent: any;
        drawCheckMargins: any;
        autoloadSources: any;
        watchScroll: any;
        fov: any;
    });
    readPass: RenderTarget;
    writePass: RenderTarget;
    /***
     Copy the current target texture once both render targets textures have been uploaded
     Wait for next tick to be sure our texture is correctly initiated
     ***/
    _checkIfReady(loadedTextures: any): void;
    /***
     After each draw call, we'll swap the 2 render targets and copy the read pass texture again
     ***/
    _swapPasses(): void;
    /***
     Returns the created texture where we're writing
     ***/
    getTexture(): any;
    _onPingPongRenderCallback: any;
    _onPingPongAfterRenderCallback: any;
}
import { Plane } from "../core/Plane.js";
import { RenderTarget } from "../framebuffers/RenderTarget.js";
