# Script Addon Structure

The folder structure of an script addon contains all scripts and modules of the addon

- 📁 [`<addonId>`](/development/misc/addonid.md)
  - 📰 [`addon.json`](/development/addon/addonjson.md) **type="script"**
  - 📰 [`index.js` Index Script](#index-script-file)  **script="index.js"**

___
### Index Script File
The "Index" Script file is the root entry point of the addon.  
You can define the name in the `addon.json` file,  
since its the entry point of the addon we call it `index.js` in our documentations and will use this name for examples.  

The EntryScript file always contains the following parts:  
  - **1.** Main Class  
    Class of the Addon which extends from an AddonBehaviour
  - **2.** RegisterAddon function call  
    Function that will be called (Pass class as an argument, which is used as the addon)

More informations about, the `Main class`, `AddonBehaviours`, and the `RegisterAddon` function are below after the following example.

**Note**: Never implement an custom `constructor` (More informations below at the "Class Rules")

Example: (`index.js`)
```javascript

class MyExampleAddon extends Addon.Behaviour.<ADDON_BEHAVIOUR>{

  async Awake(){
    ...
  }

  async Start(){
    ...
  }

}

RegisterAddon(MyExampleAddon);

```

More informations about `Awake`, `Start` and more, can you find in the [Addon Lifecycle](/development/script/lifecycle.md) section

---
### Class Rules
There are some rules that need to be followed, to prevent overriding internal things which can affect performance or may break the whole addon.  

- **1.** Never implement an custom `constructor` in your addon class.  
  The constructor is internally used to create an `AddonInterface` which holds settings, informations and will register the addon.  

- **2.** Dont create or override function which starts with `_` or `__`.  
  Some names are used or reserved internally. These function will mainly start with underscores.  

- **3.** Addon classes must ALWAYS extends from an `AddonBehaviour`.  
  The `AddonBehaviour` is adding the main functionallity and handles the registration.

- **4.** Dont try to create your own/custom `AddonBehaviour` class.  
  This will fail, trust :)

- **5.** Always pass an class wich extends from an `AddonBehaviour` to the `RegisterAddon` function.
---
### MainClass extends AddonBehaviour
All addons needs to extends from an `AddonBehaviour`.  
Where each `Addonbehaviour` allows the addon to implement different Events and allows the addon to extends or override several parts.

All available `Addonbehaviours` are displayed in the following table.  
To see with which `Addonbehaviour` has which functionality, you can simply visit one of the following pages:

[filename](behaviour/behaviourTable.md ':include')  

<br/>

The following example uses the `ServiceAddon` as his AddonBehaviour:

Example: (`index.js`)
```javascript
class MyExampleAddon extends Addon.Behaviour.ServiceAddon { ... }

RegisterAddon(MyExampleAddon);

```
---
### RegisterAddon Function
After the addon class is defined you need to "Register" the addon.  
Pass your AddonClass to the `RegisterAddon` function.  

**Note**: Always pass the REFERENCE - never pass the created object. Your Class will be created internally.  
Example:
```javascript
RegisterAddon(MyExampleAddon);
```
**WRONG USEAGE:** `RegisterAddon(new MyExampleAddon());`  

---
### Addon Lifecycle
More informations about the addon lifecycle can you find in the [Addon Lifecycle](/development/script/lifecycle.md) section.
