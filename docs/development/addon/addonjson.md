# Addon Json

### Properties
| Key | Type |
| ------------- | ------------- |
| [`id` *Required*](#propertie-addonid) | **string** |
| [`version` *Required*](#propertie-version) | **string** |
| [`type` *Required*](#propertie-type) | **string** |
| [`meta` *Optional*](#propertie-meta) | **object** |
| [`dependencies` *Optional*](#propertie-dependencies) | **object** |
| [`settings` *Optional*](#propertie-settings) | **object** |

Example: (`addon.json`)
```json
{
  "id": "pulse.example.addon",
  "version": "1.0",
  "type": "...",
  "meta": {
    "name": "Test Addon",
    "description": "This is an Test Addon"
  },
  "dependencies": {
    ...
  },
  "settings": {
    ...
  }
}
```
Depending on the defined type in the `addon.json` file, there might be some extra properties that are required or optional.
For more information see the type propertie info below.
___
#### **Propertie:** id
`string` Unique Id of the Addon , see [AddonID](/development/misc/addonid.md) for more informations.
___
#### **Propertie:** version
`string` Version of the addon, see [Versioning](/development/misc/versioning.md) for more informations.
___
#### **Propertie:** type
`string` type of the addon and how it gets managed internally

**Note**: the type may affect the `addon.json` file, so that more properties are required.  
Look at the "AddonJson Properties"-Section in the type you want to create:  

[filename](type/typeTable.md ':include')
___
#### **Propertie:** meta
`object` Object that holds meta informations, like name & description of the addon  

The following keys are available in the meta object: (all are optional)

| Key | Type |
| ------------- | ------------- |
| `name`| **string** |
| `description` | **string** |
| `author` | **string** |

Example: (`addon.json`)
```json
{
  "id": "pulse.example.addon",
  ...
  "meta": {
    "name": "Test Addon",
    "description": "This is an Test Addon",
    "author": "ExamplePerson, SuperUser"
  },
  ...
}
```
___
#### **Propertie:** dependencies
`object` this Object holts all dependencies where your addon relies on and which are required  

The keys in this object are the addonIds of the addon and the value is the required min-version:  

Example: (`addon.json`)
```json
{
  "id": "pulse.example.addon",
  ...
  "dependencies": {
    "pulse.another.addon": "1.2.9"
  },
  ...
}
```
In this example is the addon with the id `pulse.another.addon` and the version of `1.2.9` or higher (`>=`) required.
___
#### **Propertie:** settings
TODO
