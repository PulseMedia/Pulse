# Addon ID

Pulse uses addonId's to identify addons.
___
### Structure
The addonId is the unique identifier.  
It must be unique, and must use only lowercase characters and dots.  
This identifier must also be used as the name of the folder that contains the add-on.  

We recommend to use the following parts in your addonId:  

- TYPE
- NAME

The following format is recommend: (divided by a dot)
`TYPE`.`NAME`  
eg: **script**.**example.addon**
___
### Example
Example for the `addon.json` file:  
```json
{
  ...
  "id": "script.example.addon",
  ...
}
```
