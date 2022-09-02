# Backbone React hooks
A React wrapper for making building Backbone React apps easier.

## Hooks

### useAPI()
This hook gives you tools to interact with your custom defined Backbone API. It also has extra built in functions for handling reactive state changes when data gets sent through protocol. To use these extra functions, copy the code below into your `src/app/api.js`

```typescript
// backbone-react dependencies
async backboneReactOnAdd(callback: Function) {
   return Data.onAdd(callback)
},
async backboneReactAll() {
   return Data.query({lt: "~"})
},
```
