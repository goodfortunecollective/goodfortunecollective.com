export class Program {
    constructor(renderer: any, { parent, vertexShader, fragmentShader, }?: {
        parent: any;
        vertexShader: any;
        fragmentShader: any;
    });
    type: string;
    renderer: any;
    gl: any;
    parent: any;
    defaultVsCode: string;
    defaultFsCode: string;
    vsCode: any;
    fsCode: any;
    compiled: boolean;
    /***
     Compile our WebGL shaders based on our written shaders

     params:
     @shaderCode (string): shader code
     @shaderType (shaderType): WebGL shader type (vertex or fragment)

     returns:
     @shader (compiled shader): our compiled shader
     ***/
    createShader(shaderCode: any, shaderType: any): any;
    /***
     Compiles and creates new shaders
     ***/
    useNewShaders(): void;
    vertexShader: any;
    fragmentShader: any;
    /***
     Checks whether the program has already been registered before creating it
     If yes, use the compiled shaders to create a new one with createProgram()
     If not, compile the shaders and call createProgram()
     ***/
    setupProgram(): void;
    activeUniforms: any;
    activeAttributes: any;
    /***
     Used internally to set up program based on the created shaders and attach them to the program
     Sets a list of active textures that are actually used by the shaders to avoid binding unused textures during draw calls
     Add the program to the cache
     ***/
    createProgram(): void;
    id: number;
    program: any;
    /*** UNIFORMS ***/
    /***
     Creates and attach the uniform handlers to our program

     params:
     @uniforms (object): an object describing our uniforms (see Uniforms class object)
     ***/
    createUniforms(uniforms: any): void;
    uniformsManager: Uniforms;
    /***
     Sets our uniforms (used on init and on context restoration)
     ***/
    setUniforms(): void;
    /***
     Updates our uniforms at each draw calls
     ***/
    updateUniforms(): void;
}
import { Uniforms } from './Uniforms.js';
