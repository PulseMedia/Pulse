# GUI.Dialog

[Function]

## ok(String, String, Function, String)
Shows an Ok Dialog with the given Title & Message

### Parameter
> *title* String **Title to show**

> *message* String **Message to show**

> *okCallback* Function `Optional || undefined` **on OK Clicked**

> *okButtonText* String `Optional || "Ok"` **OK-Button Text**

```js
Dialog.ok("<title>", "<message>", () => {
  //okCallback
}, "<okButtonText>");
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## yesNo(String, String, Function, Function, String, String)
Shows an YesNo Dialog with the given Title & Message

### Parameter
> *title* String **Title to show**

> *message* String **Message to show**

> *yesCallback* Function **on YES Clicked**

> *noCallback* Function `Optional || undefined` **on NO Clicked**

> *yesButtonText* String `Optional || "Yes"` **Yes-Button Text**

> *noButtonText* String `Optional || "No"` **No-Button Text**

```js
Dialog.yesNo("<title>", "<message>", () => {
  //yesCallback
}, () => {
  //noCallback
}, "<yesButtonText>", "<noButtonText>");
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## context(String, String, Array)
Shows an Context Dialog with the given Title & Message

### Parameter
> *title* String **Title to show**

> *message* String **Message to show**

> *contextItems* Array **Context Items to show**


```js
Dialog.context("<title>", "<message>", [
  //contextItems
]);
```

##### Example with Items
```js
Dialog.context("<title>", "<message>", [
  [ "Item1", () => { /* Action 1 */ } ],
  [ "Item2", () => { /* Action 2 */ } ]
]);
```

### Compatibility
[Supports(*)]

[/Function]
