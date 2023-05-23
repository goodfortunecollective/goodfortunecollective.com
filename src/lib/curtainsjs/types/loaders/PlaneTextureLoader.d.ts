/*** PLANE TEXTURE LOADER CLASS ***/
/***
 Extends our TextureLoader class to add sources loaded count, handle onComplete event
 Also adds the sources and textures to its defined parent

 params:
 @renderer (Curtains renderer or Renderer class object): our curtains object OR our curtains renderer object
 @parent (Plane or ShaderPass class object): The plane or shader pass that will use this loader

 @sourcesLoaded (int): Number of sources loaded
 @sourcesToLoad (int): Number of initial sources to load
 @complete (bool): Whether the loader has loaded all the initial sources
 @onComplete (function): Callback to execute when all the initial sources have been loaded

 returns :
 @this: our PlaneTextureLoader element
 ***/
export class PlaneTextureLoader extends TextureLoader {
    constructor(renderer: any, parent: any, { sourcesLoaded, sourcesToLoad, complete, onComplete, }?: {
        sourcesLoaded?: number;
        sourcesToLoad?: number;
        complete?: boolean;
        onComplete?: () => void;
    });
    _parent: any;
    sourcesLoaded: number;
    sourcesToLoad: number;
    complete: boolean;
    onComplete: () => void;
    /*** TRACK LOADING ***/
    /***
     Sets the total number of assets to load before firing the onComplete event

     params:
     @size (int): our curtains object OR our curtains renderer object
     ***/
    _setLoaderSize(size: any): void;
    /***
     Increment the number of sources loaded
     ***/
    _increment(): void;
    /*** UPDATE PARENT SOURCES AND TEXTURES ARAYS ***/
    /***
     Adds the source to the correct parent assets array

     params:
     @source (html element): html image, video or canvas element that has been loaded
     @sourceType (string): either "image", "video" or "canvas"
     ***/
    _addSourceToParent(source: any, sourceType: any): void;
    /***
     Adds the loader parent to the newly created texture
     Also adds the source to the correct parent assets array

     params:
     @texture (Texture class object): our newly created texture
     @source (html element): html image, video or canvas element that has been loaded
     @sourceType (string): either "image", "video" or "canvas"
     ***/
    _addToParent(texture: any, source: any, sourceType: any): void;
}
import { TextureLoader } from "./TextureLoader.js";
