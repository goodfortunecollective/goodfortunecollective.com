/***
 Geometry class handles attributes, VertexArrayObjects (if available) and vertices/UVs set up

 params:
 @renderer (Renderer class object): our renderer class object

 @program (object): our mesh's Program (see Program class object)
 @width (int): number of vertices along width
 @height (int): number of vertices along height
 @id (int): an integer based on geometry's width and height and used to avoid redundant buffer binding calls

 returns:
 @this: our newly created Geometry
 ***/
export class Geometry {
    constructor(renderer: any, { program, width, height, }?: {
        program?: any;
        width?: number;
        height?: number;
    });
    type: string;
    renderer: any;
    gl: any;
    definition: {
        id: number;
        width: number;
        height: number;
    };
    /*** CONTEXT RESTORATION ***/
    /***
     Used internally to handle context restoration after the program has been successfully compiled again
     Reset the default attributes, the vertices and UVs and the program
     ***/
    restoreContext(program: any): void;
    program: any;
    /*** SET DEFAULT ATTRIBUTES ***/
    /***
     Our geometry default attributes that will handle the buffers
     We're just using vertices positions and texture coordinates
     ***/
    setDefaultAttributes(): void;
    attributes: {
        vertexPosition: {
            name: string;
            size: number;
            isActive: boolean;
        };
        textureCoord: {
            name: string;
            size: number;
            isActive: boolean;
        };
    };
    /***
     Set our vertices and texture coordinates array
     Get them from the cache if possible
     ***/
    setVerticesUVs(): void;
    /***
     Called on init and on context restoration to set up the attribute buffers
     Use VertexArrayObjects whenever possible
     ***/
    setProgram(program: any): void;
    _vao: any;
    /***
     This creates our mesh attributes and buffers by looping over it
     ***/
    initAttributes(): void;
    /***
     This method is used internally to create our vertices coordinates and texture UVs
     we first create our UVs on a grid from [0, 0, 0] to [1, 1, 0]
     then we use the UVs to create our vertices coords
     ***/
    computeVerticesUVs(): void;
    /***
     This method enables and binds our attributes buffers
     ***/
    initializeBuffers(): void;
    /***
     Used inside our draw call to set the correct plane buffers before drawing it
     ***/
    bindBuffers(): void;
    /***
     Draw a geometry
     ***/
    draw(): void;
    /***
     Dispose a geometry (ie delete its vertex array objects and buffers)
     ***/
    dispose(): void;
}
