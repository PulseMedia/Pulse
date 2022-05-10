# Contribute Platform

### Platforms
 - ⚡ [Example Platform](/)
___


### Scripting Language
Each platform may use another scripting language make sure to use the right language.
  
___


### Add or Modify an Native function
If you want to Add or Modify an Native function make sure to add it to the map.js file mentioned in the [JavaScript-Readme](../api) file  
After the function is added to the map.js file add it to the platform (see Platforms above)  
Each platform has his own ReadMe where and how you can add or modify an function  
Please note that each native platform function uses an "Promise"-like System (see below)  
  
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

All Promises are passed as Strings to the native functions, the promise needs than to be created natively with the Promise-String passed to the native function  
Note that the Normal Promise is **ALWAYS** the first argument in the native functions and is also given if the function will return nothing.  
If nothing should be returned the native function should resolve the Promise as `undefined`, which will than also return undefined in JavaScript  

Any break against this rule will cause crashed and unexpected behaviors. Pull requests that are also not following this rule may eventually not be accepted  

If the "EVENT" string is used as an arg in the map.js file it will pass an PromiseEvent-String to the native Function, which can than be used to create an PromiseEvent to return values to the callback event.
