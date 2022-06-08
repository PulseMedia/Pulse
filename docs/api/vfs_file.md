# VFS.File

[ContentTable]

[Function]

## readFile(String)

*Async*

Reads the content of the file at the given path

### Parameter
> *path* String


### Returns
> String **Content of the file**

```js
var fileContent = await File.readFile("<path>")
```

### Compatibility
[Supports(*)]

[/Function]

[Function]

## writeFile(String, String)

*Async*

Writes content to the file at the given path

### Parameter
> *path* String

> *content* String

### Returns
> Boolean **True on success**

```js
var wasWritten = await File.writeFile("<path>", "<content>")
```

### Compatibility
[Supports(*)]

[/Function]

[Function]

## appendFile(String, String)

*Async*

Appends content to the file at the given path

### Parameter
> *path* String

> *content* String

### Returns
> Boolean **True on success**

```js
var wasAppended = await File.appendFile("<path>", "<content>")
```

### Compatibility
[Supports(*)]

[/Function]

[Function]

## deleteFile(String)

*Async*

Deletes the file at the given path

### Parameter
> *path* String

### Returns
> Boolean **True on success**

```js
var wasDeleted = await File.deleteFile("<path>")
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## existsFile(String)

*Async*

Checks if the file with the given path exists

### Parameter
> *path* String

### Returns
> Boolean **True if file exists**

```js
var doesExist = await File.existsFile("<path>")
```

### Compatibility
[Supports(*)]

[/Function]













[RepresentationClass]

[Function]

## CONSTRUCTOR(String)

*CONSTRUCTOR*

### Parameter
> *path* String

```js
var myFile = new VFS.File("<path>")
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

## read()

*Async*

[/Function]


[Function]

## delete()

*Async*

[/Function]


[Function]

## write(String)

*Async*

### Parameter
> *content* String

[/Function]


[Function]

## append(String)

*Async*

### Parameter
> *content* String

[/Function]

[/RepresentationClass]
