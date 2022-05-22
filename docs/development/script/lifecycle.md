# Script Addon Lifecycle

Addons can have `Lifecycle`-functions which are executed in the following order:  

##### `Awake()` ⇒ `Start()` ⇒ *SERVE-CONTENT* ⇒ `Ready()`

**Note**: All `Lifecycle`-functions/events are awaitable and are called internally with the `await`-operator.  
That means you can mark each `Lifecycle`-function with the `async`-declaration to use `await` inside the `Lifecycle`-function.

| Addon-Lifecycle |
| ------------- |
| [**1.** `Awake()`](#_1-lifecycle-awake)  |
| [**2.** `Start()`](#_2-lifecycle-start)  |
| [**3.** `SERVE-CONTENT`](#_3-serve-content)  |
| [**4.** `Ready()`](#_4-lifecycle-ready)  |

---
### 1. Lifecycle: **Awake**
Awake is called immediatly after the addon is registered.  
This can be used as an `constructor` alternative, since an custom `constructor` is not allowed.  

**Note**: At this point you cannot access other addons since this function is called internally immediatly after the constructor.

Useage:
```javascript
...
  async Awake(){
    ...
  }
...
```
---
### 2. Lifecycle: **Start**
This `Lifecycle`-function is called AFTER all Addon-`Awake` calls are done.  
At this point you can access other addons.

Useage:
```javascript
...
  async Start(){
    ...
  }
...
```
---
### 3. Serve Content
After the Addon-`Start` call is done, the Serve-Phase begins.  
In this phase all `get`-functions are called, that are defined by the used `Addonbehaviour`.  
More informations about the `get`-functions can you find the [Content Serve](/development/script/serves.md) section
---
### 4. Lifecycle: **Ready**
`Ready` is called after all `get`-functions are successfully executed and the addon-content is registered and served internally.

Useage:
```javascript
...
  async Ready(){
    ...
  }
...
```
