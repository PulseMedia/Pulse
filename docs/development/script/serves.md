# Content Serve / Getter
Each Addon can implement `get`-functions which serve content & features to Pulse.  
Depending on the AddonBehaviour that your addon is using, you can implement different `get`-functions  

Look at the **Serve** column in the [AddonBehaviour](/development/script/behaviour/overview.md) section, which AddonBehaviour can use which `get`-function.  

The `get`-function must always return the value that is shown on the AddonBehaviour page.  


### Getter Example:
##### get Library()
> *Return* GUI.Element.LibraryItem[]

The `get`-function must here return an array of `GUI.Element.LibraryItem`'s.  

#### Getter:
Lets say you have created an `LibraryItem` in the `Start`-LifecycleFunction you can return it here:   
```js
get Library(){
  return [ myLibraryItem, ... ];
}
```  

#### Function Getter:
If you want to create for example the `LibraryItem` in the getter, you can also "execute" an function in the getter:  
```js
get Library(){
  return (() => {
    var myLibraryItem = new GUI.Element.LibraryItem(...);
    return [ myLibraryItem ];
  })();
}
```  

#### Asynchronous Getter:
If you need to make an `asynchronous` call in the getter you can also return an `promise`:  
```js
get Library(){
  return (async () => {
    var myAwaitLibraryItem = await ...
    return [ myAwaitLibraryItem ];
  })();
}
```  
If an Promise is returned we will use the `await`-operator interally, which will wait until your calls are done.

---
