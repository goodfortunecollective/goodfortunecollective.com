/***
 Here we create our Scene object
 The Scene will stack all the objects that will be drawn (planes and shader passes) in different arrays, and call them in the right order to be drawn.

 Based on the concept exposed here https://webgl2fundamentals.org/webgl/lessons/webgl-drawing-multiple-things.html
 The idea is to optimize the order of the rendered object so that the WebGL calls are kept to a strict minimum

 Here's the whole draw process order:
 - first we draw the ping pong planes
 - if needed, we bind the first scene pass frame buffer
 - draw all the planes that are rendered onto a render target (render pass)
 - draw the planes from the first render target created, ordered by their renderOrder then indexes (first added first drawn) order
 - draw the planes from the second render target created, etc.
 - draw the render passes content (depth buffer is cleared after each pass)
 - draw the transparent planes ordered by renderOrder, Z positions, geometry IDs and then indexes (first added first drawn)
 - draw the opaque planes ordered by renderOrder, geometry IDs and then indexes (first added first drawn)
 - draw the scene passes content

 params:
 @renderer (Renderer class object): our renderer class object

 returns :
 @this: our Scene
 ***/
export class Scene {
    constructor(renderer: any);
    type: string;
    renderer: any;
    gl: any;
    /***
     Init our Scene stacks object
     ***/
    initStacks(): void;
    stacks: {
        pingPong: any[];
        renderTargets: any[];
        opaque: any[];
        transparent: any[];
        renderPasses: any[];
        scenePasses: any[];
    };
    /*** RESET STACKS ***/
    /***
     Reset the plane stacks (used when disposing a plane)
     ***/
    resetPlaneStacks(): void;
    /***
     Reset the shader pass stacks (used when disposing a shader pass)
     ***/
    resetShaderPassStacks(): void;
    /*** ADDING PLANES ***/
    /***
     Add a plane to our renderTargets stack

     params:
     @plane (Plane object): plane to add to our stack
     ***/
    addToRenderTargetsStack(plane: any): void;
    /***
     Rebuilds our regular stack (transparent or opaque) with our plane added, geometry IDs and then indexes (first added first drawn)

     params:
     @plane (Plane object): plane to add to our stack

     returns:
     @planeStack (array): our transparent or opaque stack ready to be applied custom sorting filter
     ***/
    addToRegularPlaneStack(plane: any): any;
    /***
     This function will add a plane into one of our 4 stacks : pingPong, renderTargets, transparent and opaque
     - pingPong is just a simple array (ordered by order of creation)
     - renderTargets array is ordered by render target creation order, planes renderOrder value and then planes indexes (order of creation)
     - transparent array is ordered by renderOrder, Z positions, geometry IDs and then indexes (first added first drawn)
     - opaque array is ordered by renderOrder, geometry IDs and then indexes (first added first drawn)

     This is done to improve speed and reduce GL calls

     params:
     @plane (Plane object): plane to add to our scene
     ***/
    addPlane(plane: any): void;
    /***
     This function will remove a plane from our scene. This just reset the plane stacks for now.
     Useful if we'd want to change the way our draw stacks work and keep the logic separated from our renderer

     params:
     @plane (Plane object): plane to remove from our scene
     ***/
    removePlane(plane: any): void;
    /***
     Changing the position of a plane inside the correct plane stack to render it on above or behind the other planes

     params:
     @plane (Plane object): the plane that had its renderOrder property updated
     ***/
    setPlaneRenderOrder(plane: any): void;
    /*** ADDING POST PROCESSING ***/
    /***
     Add a shader pass to the stack

     params:
     @shaderPass (ShaderPass object): shaderPass to add to our scene
     ***/
    addShaderPass(shaderPass: any): void;
    /***
     This function will remove a shader pass from our scene. This just reset the shaderPass stacks for now.
     Useful if we'd want to change the way our draw stacks work and keep the logic separated from our renderer

     params:
     @shaderPass (ShaderPass object): shader pass to remove from our scene
     ***/
    removeShaderPass(shaderPass: any): void;
    /***
     Sorts the shader pass stack by index then by renderOrder property

     params:
     @passStack (array): which shader pass stack (scenePasses or renderPasses) to sort
     ***/
    sortShaderPassStack(passStack: any): void;
    /*** DRAWING SCENE ***/
    /***
     Enable the first Shader pass scene pass
     ***/
    enableShaderPass(): void;
    /***
     Draw the render passes
     ***/
    drawRenderPasses(): void;
    /***
     Draw the scene passes
     ***/
    drawScenePasses(): void;
    /***
     Loop through the special ping pong planes stack and draw its planes
     ***/
    drawPingPongStack(): void;
    /***
     Loop through one of our stack (renderTargets, opaque or transparent objects) and draw its planes
     ***/
    drawStack(stackType: any): void;
    /***
     Draw our scene content
     ***/
    draw(): void;
}
