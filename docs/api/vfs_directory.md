# VFS.Directory

[ContentTable]

[Function]

## existsDirectory(String)
Checks if the directory with the given path exists

### Parameter
> *path* String


### Returns
> Boolean **True if directory exists**

```js
Directory.existsDirectory("<path>")
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## createDirectory(String)
Creates an directory at the given path

### Parameter
> *path* String

### Returns
> Boolean **True on success**

```js
Directory.createDirectory("<path>")
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## deleteDirectory(String)
Deletes the directory at the given path

### Parameter
> *path* String

### Returns
> String **True on success**

```js
Directory.deleteDirectory("<path>")
```

### Compatibility
[Supports(*)]

[/Function]


[RepresentationClass]

[Function]

## CONSTRUCTOR(String)

### Parameter
> *path* String

```js
var myDirectory = new VFS.Directory("<path>")
```

[/Function]

[Function]

## exists()

```js
var doesExist = await myDirectory.exists();
```

[/Function]


[Function]

## create()

### Parameter
> *content* String

```js
var wasCreated = await myDirectory.create();
```

[/Function]


[Function]

## delete()

```js
var wasDeleted = await myDirectory.delete();
```

[/Function]


[/RepresentationClass]
