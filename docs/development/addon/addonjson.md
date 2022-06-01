# Addon Json

### Properties
| Key | Type |
| ------------- | ------------- |
| [`id` *Required*](#propertie-addonid) | **string** |
| [`version` *Required*](#propertie-version) | **string** |
| [`type` *Required*](#propertie-type) | **string** |
| [`extends` *Required*](#propertie-extends) | **object** |
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
  "extends": {
    ...
  },
  "dependencies": {
    ...
  },
  "settings": {
    ...
  }
}
```
The content in the 'extends'-object will differ for each addon 'type'
For more information see the 'type' propertie info below.
___
#### **Propertie:** id
> `string` Unique Id of the Addon , see [AddonID](/development/misc/addonid.md) for more informations.
___
#### **Propertie:** version
> `string` Version of the addon, see [Versioning](/development/misc/versioning.md) for more informations.
___
#### **Propertie:** type
> `string` type of the addon and how it gets managed internally

**Note**: the 'type' affects the 'extends' object! Look at the "ExtendProperties"-Section on the page of the type you want to create   

Available 'type' values:  

[filename](type/typeTable.md ':include')
___
#### **Propertie:** extends
> `object` Object that holds configurations and data for the AddonType

The content of this object, is different for each AddonType.  
Look at the 'type'-propertie above for more informations.

___
#### **Propertie:** meta
> `object` Object that holds meta informations, like name & description of the addon  

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
> `object` this Object holts all dependencies where your addon relies on and which are required  

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
