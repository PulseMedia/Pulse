# JavaScript Package Structure

### Content
The JavaScript part contains various parts of the app from an pure JavaScript Api up to mapped Native Functions  
Currently the whole JavaScript part is created as one NPM-Package and currently contains **5** important parts of the App

| |
| ------------- |
| [`map.js`](#mapjs)  |
| [`api.js`](#apijs)  |
| [`casts.js`](#castsjs)  |
| [`browserApi.js`](#browserApijs)  |
| [`representations.js`](#representationsjs)  |
___
### map.js
This js-file contains the whole structure of the api, note that internal api functions are not inserted here and are added via an internal map

The whole map is structured as follows:  
**{** "`MAINCATEGORY`" :**{** "`subCategory`" :**{** "`FUNCTION_NAME`" :`{FUNCTION_OBJECT}` **}** **}** **}**  

case of the `MAINCATEGORY` and `subCategory` will stay and not change,  
the upper structure will result in the following api function:  
`MAINCATEGORY.subCategory.functionName(..)`  

where the "**FUNCTION_NAME**" is **ALWAYS** fully in uppercase and parts are seperated with underscores  
for example `DELETE_DIRECTORY` will result in the `deleteDirectory` function name  
(underscores are removed and name will be converted to LowerCamelCase)  

the "**FUNCTION_OBJECT**" is structed as follow:  

`{ args: [ ... ], before: (args) => { return args; }, after: (val) => { return val; } }`  

 - args: `string[]` (*REQUIRED*)  
   this array contains the required and optional arguments that should be used

 - before: `FUNCTION(args: any[]): args: any[]` (*OPTIONAL*)  
   callback that is executed **before** the native/jsApi function is executed  
   this can be used to modify args that will be send to the the native/jsApi function

 - after: `FUNCTION(val: any): val: any` (*OPTIONAL*)  
   callback that is executed **after** the native/jsApi function is executed  
   this can perfectly used to modify the return value

##### Example:
map.js:
```javascript
"MAINCATEGORY": {
    "subCategory": {
      "REVERSE_STRING": {
        args: [ "STRING" ],
        before: (args) => {
          //...
          return args;
        },
        after: (val) => {
          //...
          return val;
        }
      }
    }
  }
```
___
### api.js
This file contains the raw JavaScript api which is not dependent on any native platform function, and works out of the box in any web-browser

The Object returned in this file is basically the same as the map file above with the difference that the function should already be in the correct case (LowerCamelCase).  
Example: If function is `TEST_FUNCTION` in the map.js file in should be `testFunction` here  
Instead of an "**FUNCTION_OBJECT**" an real JavaScript function should be inserted here.  

If you want to add an **Native Function** see the section below...

##### Example:
map.js:
```javascript
"MAINCATEGORY": {
    "subCategory": {
      "REVERSE_STRING": {
        args: [ "STRING" ]
      }
    }
  }
```
than the api.js file should contains the following:
```javascript
"MAINCATEGORY": {
    "subCategory": {
      reverseString(str){
          return [...str].reverse().join("");
      }
    }
  }
```
___
### casts.js
The casts.js file is an simpler system, if the function (in upperCase with underscores) is given in this object, the return value will be "casted" to the assigned class instead of returning value of the function

##### Example:
casts.js:
```javascript
"REVERSE_STRING": ReversedStringClass
```

reversedStringClass:
```javascript
export class ReversedStringClass{

  //oData = outputData
  //iArgs = inputArguments
  constructor(oData, iArgs){
    this.__output = oData; //the returned value from the function
    this.__input = iArgs[0]; //arguments given, get index 0 which is the input string
  }

  get reversedString(){
      return this.__output;
  }

  get originalString(){
      return this.__input;
  }

  testFunc(){
      return this.__output + ", what?"
  }

}
```

useage:
```javascript
var myText = MAINCATEGORY.subCategory.reverseString("Hello World");

myText.reversedString //returns: "dlroW olleH"
myText.originalString //returns: "Hello World"
myText.testFunc() //returns: "dlroW olleH, what?"
```
It basically makes no sense to cast an `reverseString` function to an Class, this is just an example
___
### browserApi.js
By default all global functions are removed from the global "window"-object.  
All functions that are inserted in this array that will returned in this file will be available and doesnt gets removed from the global object.  
The main purpose of this system is to only allow functions that are available on all platforms.  
Since some platforms deliver some different and extra functions, where some Addons that are using this functions will eventually not work on other platforms  
___
### representations.js
The representations.js file is something similar than the casts.js file. The only difference here is that an class will be mapped to the whole `subCategory`. The whole `subCategory` can than be used as an class

##### Example:
casts.js
```javascript
"MAINCATEGORY": {
    "subCategory": SubCategoryClass
    }
  }
```

subCategoryClass:
```javascript
import { presenter } from "./presenter.js"; //see note below

export class SubCategoryClass extends presenter {

  constructor(str = ""){
    super();
    this.str = str;
  }

  reverse(){
    return this.api.reverseString(this.str);
  }

}
```

extends presenter?  
The presenter class inherit adds an `api` getter which can be access by `this.api`.  
it will return an object with all function in the subCategory, in the examples above it will be the following object:  
```javascript
{
    reverseString: FUNCTION, //Function is:  MAINCATEGORY.subCategory.reverseString
    //where the function here is the function defined natively or from the api.js file
}
```

useage:
```javascript
var myText = MAINCATEGORY.subCategory("Hello World");

myText.reverse() //returns: "dlroW olleH"
```
This is also useless and no real-world useage, but is an good example how the system works
