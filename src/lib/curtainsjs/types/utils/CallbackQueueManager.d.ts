/***
 Here we create a CallbackQueueManager class object
 This allows to store callbacks in a queue array with a timeout of 0 to be executed on next render call

 returns:
 @this: our CallbackQueueManager class object
 ***/
export class CallbackQueueManager {
    /***
     Clears our queue array (used on init)
     ***/
    clear(): void;
    queue: any;
    /***
     Adds a callback to our queue list with a timeout of 0

     params:
     @callback (function): the callback to execute on next render call
     @keep (bool): whether to keep calling that callback on each rendering call or not (act as a setInterval). Default to false

     returns:
     @queueItem: the queue item. Allows to keep a track of it and set its keep property to false when needed
     ***/
    add(callback: any, keep?: boolean): {
        callback: any;
        keep: boolean;
        timeout: any;
    };
    /***
     Executes all callbacks in the queue and remove the ones that have their keep property set to false.
     Called at the beginning of each render call
     ***/
    execute(): void;
}
