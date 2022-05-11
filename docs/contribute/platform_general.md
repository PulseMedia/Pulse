### Platform Contribution


### Platform Communication
Native functions are implementations directly on the platform side and can be called from JavaScript like any other function.  
The only difference here is that we need an way to communicate with the platform from the JS-side.  
Some Platforms allows direct communication and on some platforms an direct communication is not available.  

Thats the reason why we need an "System" that can be used on all Platforms and supports return values plus some extras like event callbacks.  
In this way we have decided to create a "Promise"-like system that uses an simple implementation and can be used on all platforms.
___
### Promise System
Native Functions are not correctly appended to the JavaScript-Engine, thats why we have decided to use an "Promise"-like System to receiver the return values from the native functions.  
Thats also the reason why **ALL** native functions are "awaitable" and can only be called with the "`await`"-operator  

There are currently two types of Promises, normal `Promises` and `Event-Promises`  
Each has his own usecase.
 - **Normal Promise**  
   Used to return an value from a Function (Always given, also on undefined)
 - **Event Promise**  
   Used to call an callback function like an progress event  

All Promises are passed as Strings to the native functions, the promise needs than to be created natively with the Promise-String passed to the native function.

Note that the Normal Promise is **ALWAYS** the first argument in the native functions and is also given if the function will return nothing.  
If nothing should be returned the native function should resolve the Promise as `undefined`, which will than also return undefined in JavaScript.  

Any break against this rule will cause crashed and unexpected behaviors. Pull requests that are also not following this rule may eventually not be accepted  
___
### Promise Events
Promise Events are basically the same as the Normal Promise except that it can be called multiple times and will send the value to the callback event.

If the "EVENT" string is used as an arg in the map.js file it will pass an PromiseEvent-String to the native Function, which can than be used to create an PromiseEvent to return values to the callback event.
