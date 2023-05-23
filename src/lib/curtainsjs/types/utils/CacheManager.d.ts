/***
 Here we create a CacheManager class object
 This will store geometries attributes arrays, textures and WebGL programs in arrays
 This helps speed up slow synchronous CPU operations such as WebGL shaders compilations, images decoding, etc.

 returns :
 @this: our CacheManager class object
 ***/
export class CacheManager {
    geometries: any[];
    /***
     Clear WebGL context depending cache arrays (used on init and context restoration)
     ***/
    clear(): void;
    textures: any;
    programs: any[];
    /*** GEOMETRIES ***/
    /***
     Check if this geometry is already in our cached geometries array

     params:
     @definitionID (integer): the geometry ID
     ***/
    getGeometryFromID(definitionID: any): any;
    /***
     Add a geometry to our cache if not already in it

     params:
     @definitionID  (integer): the geometry ID to add to our cache
     @vertices (array): vertices coordinates array to add to our cache
     @uvs (array): uvs coordinates array to add to our cache
     ***/
    addGeometry(definitionID: any, vertices: any, uvs: any): void;
    /*** PROGRAMS ***/
    /***
     Compare two shaders strings to detect whether they are equal or not

     params:
     @firstShader (string): shader code
     @secondShader (string): shader code

     returns:
     @isSameShader (bool): whether both shaders are equal or not
     ***/
    isSameShader(firstShader: any, secondShader: any): boolean;
    /***
     Returns a program from our cache if this program's vertex and fragment shaders code are the same as the one provided

     params:
     @vsCode (string): vertex shader code
     @fsCode (string): fragment shader code

     returns:
     @program (Program class object or null): our program if it has been found
     ***/
    getProgramFromShaders(vsCode: any, fsCode: any): any;
    /***
     Add a program to our cache

     params :
     @program (Program class object) : program to add to our cache
     ***/
    addProgram(program: any): void;
    /*** TEXTURES ***/
    /***
     Check if this source is already in our cached textures array

     params :
     @source (HTML element) : html image, video or canvas element (only images for now)
     ***/
    getTextureFromSource(source: any): any;
    /***
     Add a texture to our cache if not already in it

     params :
     @texture (Texture class object) : texture to add to our cache
     ***/
    addTexture(texture: any): void;
    /***
     Removes a texture from the cache array

     params :
     @texture (Texture class object) : texture to remove from our cache
     ***/
    removeTexture(texture: any): void;
}
