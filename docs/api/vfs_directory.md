# VFS.Directory

[ContentTable]

[Function]

## existsDirectory(String)

*Async*

Checks if the directory with the given path exists

### Parameter
> *path* String


### Returns
> Boolean **True if directory exists**

```js
var doesExist = await Directory.existsDirectory("<path>")
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## createDirectory(String)

*Async*

Creates an directory at the given path

### Parameter
> *path* String

### Returns
> Boolean **True on success**

```js
var wasCreated = await Directory.createDirectory("<path>")
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## deleteDirectory(String)

*Async*

Deletes the directory at the given path

### Parameter
> *path* String

### Returns
> String **True on success**

```js
var wasDeleted = await Directory.deleteDirectory("<path>")
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## readDirectory(String)

*Async*

Read the content of the directory at the given path

### Parameter
> *path* String

### Returns
> DirectoryObject (Object)
> ```javascript
  "DirectoryObject" {
    dirs: [], //Array of strings - directory names
    files: [], //Array of strings - file names
    all: [], //Array of strings - dirs & files together
  }
> ```

```js
var dirContent = await Directory.readDirectory("<path>");
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

[Property]

## path

*Property*

### Returns
> String **current path**

### Set
> String **change the current path**

[/Property]

[Function]

## exists()

*Async*

[/Function]

[Function]

## create()

*Async*

[/Function]

[Function]

## delete()

*Async*

[/Function]

[Function]

## read()

*Async*

[/Function]

[/RepresentationClass]
