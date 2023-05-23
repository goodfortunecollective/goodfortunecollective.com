/*** FXAAPASS CLASS ***/
/***
 Here we create our FXAAPass object
 This is just a regular ShaderPass with preset shaders and a resolution uniform

 params: see ShaderPas class object

 returns :
 @this: our FXAAPass element
 ***/
export class FXAAPass extends ShaderPass {
    constructor(curtains: any, { renderOrder, depthTest, texturesOptions, crossOrigin, depth, clear, renderTarget, }?: {
        renderOrder: any;
        depthTest: any;
        texturesOptions: any;
        crossOrigin: any;
        depth: any;
        clear: any;
        renderTarget: any;
    });
    _onFXAAPassAfterResizeCallback: any;
}
import { ShaderPass } from "../framebuffers/ShaderPass.js";
