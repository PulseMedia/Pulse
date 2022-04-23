# VFS.Path

[ContentTable]

[Function]

## combine(...args&lt;String&gt;)
Combines the given string arguments to an File-path with the the OS Path Separator.  
The special protocol is also translated

### Parameter
> *string1* String

> *string2* String `Optional`

> *string3* String `Optional`

> *...* `Optional`

### Returns
> String **Combined path**

```js
Path.combine("<string1>", "<string2>", "<string3>", ...)
```

##### Example with special protocol
```js
Path.combine("HOME://", "addons", "my.addon.id")
```


### Compatibility
[Supports(*)]

[/Function]


[Function]

## translate(String)
Translates the special protocol of the path and replaces `"/"` to the OS Path Separator

### Parameter
> *path* String **Path to translate**


### Returns
> String **Translated path**

```js
Path.translate("HOME://addons/my.addon.id")
```

### Compatibility
[Supports(*)]

[/Function]
