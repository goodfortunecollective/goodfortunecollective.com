/***
 Uniforms class manages uniforms setting and updating

 params:
 @renderer (Renderer class object): our renderer class object
 @program (object): our mesh's Program (see Program class object)

 @uniforms (object): our uniforms object:
 - name (string): uniform name to use in your shaders
 - type (uniform type): uniform type. Will try to detect it if not set (see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/uniform)
 - value (float / int / Vec2 / Vec3 / Mat4 / array): initial value of the uniform

 returns:
 @this: our Uniforms manager
 ***/
export class Uniforms {
    constructor(renderer: any, program: any, uniforms: any);
    type: string;
    renderer: any;
    gl: any;
    program: any;
    uniforms: {};
    /***
     Set uniforms WebGL function based on their types

     params :
     @uniform (object): the uniform
     ***/
    handleUniformSetting(uniform: any): void;
    /***
     Auto detect the format of the uniform (check if its a float, an integer, a Vector, a Matrix, an array...)
     Also set a lastValue property that we'll use to compare to our value property and update the uniform if it changed

     params :
     @uniform (object): the uniform
     ***/
    setInternalFormat(uniform: any): void;
    /***
     This inits our uniforms
     Sets its internal format and type if not provided then upload the uniform
     ***/
    setUniforms(): void;
    /***
     This updates all uniforms of an object that were set by the user
     It is called at each draw call
     ***/
    updateUniforms(): void;
    /***
     Use appropriate WebGL uniform setting function based on the uniform type

     params :
     @uniform (object): the uniform
     ***/
    setUniform1i(uniform: any): void;
    setUniform1iv(uniform: any): void;
    setUniform1f(uniform: any): void;
    setUniform1fv(uniform: any): void;
    setUniform2i(uniform: any): void;
    setUniform2iv(uniform: any): void;
    setUniform2f(uniform: any): void;
    setUniform2fv(uniform: any): void;
    setUniform3i(uniform: any): void;
    setUniform3iv(uniform: any): void;
    setUniform3f(uniform: any): void;
    setUniform3fv(uniform: any): void;
    setUniform4i(uniform: any): void;
    setUniform4iv(uniform: any): void;
    setUniform4f(uniform: any): void;
    setUniform4fv(uniform: any): void;
    setUniformMatrix2fv(uniform: any): void;
    setUniformMatrix3fv(uniform: any): void;
    setUniformMatrix4fv(uniform: any): void;
}
