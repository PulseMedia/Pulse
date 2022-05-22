# Versioning

Pulse uses an "semantic"-like versioning system.
___
### Structure
The Version is build up from **3** parts:  

- MAJOR
- MINOR
- PATCH

and will be displayed in the following format:  
`MAJOR`.`MINOR`.`PATCH`   
eg: **1**.**0**.**3**

Characters and special characters are not supported in versions and may be ignored  
that means that the follow version is INVALID: 1A.0!.3#  
Spaces are also ignored, Only Numbers are allowed.
___
### Rule
As a rule, everyone can design their parts of the version number as they wish,  
but most people proceed systematically with the individual parts of the version as follows:

1. **MAJOR**: Is increased when big changes are applied or changes are made that may not be compatible with an older pulse version  
2. **MINOR**: Is increased when changes are made that are compatible with the same Pulse version as the previous version of this addon, system, etc.  
3. **PATCH**: Is increased when small adjustments like bug fixes are changed  
___
### Example
Example for the `addon.json` file:  
```json
{
  ...
  "Version": "1.3.8",
  ...
}
```
