# Compatibility Table

Each Function or Api that has individual platform implementations has a "Compatibility Table".  
The "Compatibility Table" displays a green dot if the function is supported or a red dot if it's not supported on that platform.

Functions that are independent of an platform implementations will showing an "Platform Independent" notice at the "Compatibility Table".  
These functions will work on all plaforms.

Additionally to some "Platform Independent"-function an "Different Results" or "Different Action" value will be displayed, this means that the function will work on all platforms,  
but will behave differently. Eg: Other return values, Other Actions/NativeActions.

#### Example:
> Platform implementations:
[Supports(0,2,4,6,8,10)]

> Independent implementations:
[Supports(JSAPI)]

> Independent implementations but platform dependent results:
[Supports(JSAPIDIFF)]

> Independent implementations but platform dependent action:
[Supports(JSAPIACTION)]

<br/><br/>

# Individual platform implementations

Since some parts of the app has different implementations on some platforms, it can occur that some features or functions behave differently on different platforms.  
We try to implement each feature for each platform that it matches the other platform that no differences occurs

<br/>

#### Why does some platforms have different implementations?
The best understandable reason for different implementations is the **FileSystem**:  
Each OS and/or Platform uses different ways to create, write or delete files
