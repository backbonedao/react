# backbone-react
A React wrapper for building Backbone apps

## Hooks

### useAPI()
This hook gives you tools to interact with your custom defined Backbone API. It also has extra built in functions for handling reactive state changes when data gets sent through protocol. To use these extra functions, copy the code below into your `api.ts`

```
// backbone-react dependencies
async backboneReactOnAdd(callback: Function) {
   return Data.onAdd(callback)
},
async backboneReactAll() {
   return Data.query({lt: "~"})
},
```
