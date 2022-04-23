# VFS.File

[ContentTable]

[Function]

## existsFile(String)

*Async*

Checks if the file with the given path exists

### Parameter
> *path* String


### Returns
> Boolean **True if file exists**

```js
await File.existsFile("<path>")
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## readFile(String)

*Async*

Reads the content of the file at the given path

### Parameter
> *path* String


### Returns
> String **Content of the file**

```js
await File.readFile("<path>")
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
await File.writeFile("<path>", "<content>")
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
> String **True on success**

```js
await File.deleteFile("<path>")
```

### Compatibility
[Supports(*)]

[/Function]


[Class]

# myClass

[Function]

## CONSTRUCTOR(String)

*CONSTRUCTOR*

### Parameter
> *path* String

```js
var myClass = new Class("<path>")
```

[/Function]

[Property]

## path

*Property*

```js
var filePath = myFile.path;
```

[/Property]

[/Class]


[Class]

# myClass2

[Function]

## CONSTRUCTOR(String)

*CONSTRUCTOR*

### Parameter
> *path* String

```js
var myClass = new Class2("<path>")
```

[/Function]



[Function]

## write(String)

### Parameter
> *content* String

```js
var wasWritten = await myFile.write("<content>");
```

[/Function]

[/Class]


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

```js
var filePath = myFile.path;
```

[/Property]

[Function]

## exists()

*Async*

```js
var doesExist = await myFile.exists();
```

[/Function]


[Function]

## read()

*Async*

```js
var fileContent = await myFile.read();
```

[/Function]


[Function]

## delete()

*Async*

```js
var wasDeleted = await myFile.delete();
```

[/Function]


[Function]

## write(String)

*Async*

### Parameter
> *content* String

```js
var wasWritten = await myFile.write("<content>");
```

[/Function]


[/RepresentationClass]
