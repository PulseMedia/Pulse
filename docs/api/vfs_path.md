# VFS.Path

[ContentTable]

[Function]

## combine(...args&lt;String&gt;)
Combines the given string arguments to an File-path with the platform path separator.  
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
[Supports(JSAPI)]

[/Function]

[Function]

## translate(String)
Translates the special protocol of the path and replaces `"/"` to the platform path separator

### Parameter
> *path* String **Path to translate**


### Returns
> String **Translated path**

```js
Path.translate("HOME://addons/my.addon.id")
```

### Compatibility
[Supports(JSAPI)]

[/Function]

[Function]

## extname(String)
Get the extension of an path

### Parameter
> *path* String **Path**

### Returns
> String **Extension (Empty String if not extension found)**

```js
Path.extname("..folderPath/sub/myFile.txt")
// Returns:
// .txt
```

### Compatibility
[Supports(JSAPI)]

[/Function]

[Function]

## basename(String)
Get the last portion of a path

### Parameter
> *path* String **Path**

### Returns
> String **Last Portion of the path (Empty String if nothing found)**

```js
Path.basename("..folderPath/sub/myFile.txt")
// Returns:
// myFile.txt
```

```js
Path.basename("..folderPath/sub/otherFolder/")
// Returns:
// otherFolder
```

### Compatibility
[Supports(JSAPI)]

[/Function]

[Function]

## separator

*Property*

Get the platform path separator

### Returns
> String **platform path separator**

```js
var platformPathSeparator = Path.separator;
```

### Compatibility
[Supports(JSAPIDIFF)]

[/Function]

[Function]

## delimiter

*Property*

Get the platform path delimiter

### Returns
> String **platform path delimiter**

```js
var platformPathDelimiter = Path.delimiter;
```

### Compatibility
[Supports(JSAPIDIFF)]

[/Function]
