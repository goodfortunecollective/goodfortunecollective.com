/*** TEXTURE LOADER CLASS ***/
/***
 An asset loader that handles images, videos and canvas loading
 Load the assets and create a Texture class object that will use those assets as sources

 params:
 @renderer (Curtains or Renderer class object): our curtains object OR our curtains renderer object
 @crossOrigin (string, optional): crossorigin policy to use

 returns :
 @this: our TextureLoader element
 ***/
export class TextureLoader {
    constructor(renderer: any, crossOrigin?: string);
    type: string;
    renderer: any;
    gl: any;
    crossOrigin: string;
    elements: any[];
    /***
     Keep a track of all sources loaded via this loader with an els array
     This allows to get clean refs to the event listeners to be able to remove them later

     params:
     @source (html element): html image, video or canvas element that has been loaded
     @texture (Texture class object): our newly created texture that will use that source
     @successCallback (function): reference to our success callback
     @errorCallback (function): reference to our error callback
     ***/
    _addElement(source: any, texture: any, successCallback: any, errorCallback: any): {
        source: any;
        texture: any;
        load: any;
        error: any;
    };
    /***
     Handles media loading errors

     params:
     @source (html element): html image or video element that has failed to load
     @callback (function): function to execute
     @error (object): loading error
     ***/
    _sourceLoadError(source: any, callback: any, error: any): void;
    /***
     Handles media loading success

     params:
     @source (html element): html image, video or canvas element that has been loaded
     @texture (Texture class object): our newly created texture that will use that source
     @callback (function): function to execute
     ***/
    _sourceLoaded(source: any, texture: any, callback: any): void;
    /***
     Get the source type based on its file extension if it's a string or it's tag name if its a HTML element

     params:
     @source (html element or string): html image, video, canvas element or source url

     returns :
     @sourceType (string): either "image", "video", "canvas" or null if source type cannot be determined
     ***/
    _getSourceType(source: any): string;
    /***
     Create an image HTML element based on an image source url

     params:
     @source (string): source url

     returns :
     @image (HTML image element): an HTML image element
     ***/
    _createImage(source: any): any;
    /***
     Create a video HTML element based on a video source url

     params:
     @source (string): source url

     returns :
     @video (HTML video element): an HTML video element
     ***/
    _createVideo(source: any): any;
    /***
     This method loads one source
     It checks what type of source it is then use the right loader

     params:
     @source (html element): html image, video or canvas element
     @textureOptions (object): parameters to apply to the textures, such as sampler name, repeat wrapping, filters, anisotropy...
     @successCallback (function): function to execute when the source has been loaded
     @errorCallback (function): function to execute if the source fails to load
     ***/
    loadSource(source: any, textureOptions: any, successCallback: any, errorCallback: any): void;
    /***
     This method loads an array of sources by calling loadSource() for each one of them

     params:
     @sources (array of html elements / sources url): array of html images, videos, canvases element or sources url
     @texturesOptions (object): parameters to apply to the textures, such as sampler name, repeat wrapping, filters, anisotropy...
     @successCallback (function): function to execute when each source has been loaded
     @errorCallback (function): function to execute if a source fails to load
     ***/
    loadSources(sources: any, texturesOptions: any, successCallback: any, errorCallback: any): void;
    /***
     This method loads an image
     Creates a new texture object right away and once the image is loaded it uses it as our WebGL texture

     params:
     @source (image): html image element
     @textureOptions (object): parameters to apply to the textures, such as sampler name, repeat wrapping, filters, anisotropy...
     @successCallback (function): function to execute when the source has been loaded
     @errorCallback (function): function to execute if the source fails to load
     ***/
    loadImage(source: any, textureOptions: {}, successCallback: any, errorCallback: any): void;
    /***
     This method loads an array of images by calling loadImage() for each one of them

     params:
     @sources (array of images / images url): array of html images elements or images url
     @texturesOptions (object): parameters to apply to the textures, such as sampler name, repeat wrapping, filters, anisotropy...
     @successCallback (function): function to execute when each source has been loaded
     @errorCallback (function): function to execute if a source fails to load
     ***/
    loadImages(sources: any, texturesOptions: any, successCallback: any, errorCallback: any): void;
    /***
     This method loads a video
     Creates a new texture object right away and once the video has enough data it uses it as our WebGL texture

     params:
     @source (video): html video element
     @textureOptions (object): parameters to apply to the textures, such as sampler name, repeat wrapping, filters, anisotropy...
     @successCallback (function): function to execute when the source has been loaded
     @errorCallback (function): function to execute if the source fails to load
     ***/
    loadVideo(source: any, textureOptions: {}, successCallback: any, errorCallback: any): void;
    /***
     This method loads an array of images by calling loadVideo() for each one of them

     params:
     @sources (array of videos / videos url): array of html videos elements or videos url
     @texturesOptions (object): parameters to apply to the textures, such as sampler name, repeat wrapping, filters, anisotropy...
     @successCallback (function): function to execute when each source has been loaded
     @errorCallback (function): function to execute if a source fails to load
     ***/
    loadVideos(sources: any, texturesOptions: any, successCallback: any, errorCallback: any): void;
    /***
     This method loads a canvas
     Creates a new texture object right away and uses the canvas as our WebGL texture

     params:
     @source (canvas): html canvas element
     @textureOptions (object): parameters to apply to the textures, such as sampler name, repeat wrapping, filters, anisotropy...
     @successCallback (function): function to execute when the source has been loaded
     ***/
    loadCanvas(source: any, textureOptions: {}, successCallback: any): void;
    /***
     This method loads an array of images by calling loadCanvas() for each one of them

     params:
     @sources (array of canvas): array of html canvases elements
     @texturesOptions (object): parameters to apply to the textures, such as sampler name, repeat wrapping, filters, anisotropy...
     @successCallback (function): function to execute when each source has been loaded
     ***/
    loadCanvases(sources: any, texturesOptions: any, successCallback: any): void;
    /*** REMOVING EVENT LISTENERS ***/
    /***
     Cleanly removes a texture source by removing its associated event listeners

     params:
     @texture (Texture class object): The texture that contains our source
     ***/
    _removeSource(texture: any): void;
}
