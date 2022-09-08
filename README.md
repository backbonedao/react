# Backbone React hooks

A fully typed React wrapper for building Backbone apps

## Hooks

### useBackbone()

Wraps the Backbone Core Container API in a fully typed and more React friendly way

#### Usage

```typescript
import useBackbone from "backbone-react-hooks/src/hooks/useBackbone";

export function MyComponent() {
  const backbone = useBackbone();
  // window["backbone"] === backbone
}
```

### useAPI()

This hook gives you tools to interact with your custom defined Backbone API. It also has a built in stream object for handling reactive state changes when data gets sent through protocol. To use the stream object, copy the code below into your `src/app/api.js`

```typescript
// backbone-react dependencies
async backboneReactOnAdd(callback: Function) {
   return Data.onAdd(callback)
},
async backboneReactAll() {
   return Data.query({lt: "~"})
},
```

#### Usage

```typescript
import useAPI from "backbone-react-hooks/src/hooks/useAPI";

export function MyComponent() {
  const { API, stream } = useAPI();

  useEffect(() => {
    // Returns all the data sent through the Protocol
    console.log(stream.data);

    // Returns the last piece of data that was sent throught the Protocol
    console.log(stream.change);
  }, [stream]);
}
```

### useId()

Access the Id API for interfacing with Backbone Id

https://docs.backbone.build/docs/api/id/intro

#### Usage

```typescript
import useId from "backbone-react-hooks/src/hooks/useId";

export function MyComponent() {
  const { authenticate, id, isAuthenticated, signObject, registerApp } =
    useId();

  useEffect(() => {
    // Returns true if the user sucessfully authenticates with Backbone Id
    console.log(isAuthenticated);

    // Returns a string of the user's Backbone Id if authenticated
    console.log(id);
  }, [id, isAuthenticated]);
}
```

### useMeta()

Allows you to read the app's metadata from backbone.json

https://docs.backbone.build/docs/api/core/container#network

#### Usage

```typescript
import useMeta from "backbone-react-hooks/src/hooks/useMeta";

export function MyComponent() {
  const {
    appId,
    address,
    description,
    git,
    name,
    permissions,
    version,
    website,
  } = useMeta();
}
```

### useNetwork()

Access the app's network

https://docs.backbone.build/docs/api/core/container#network

#### Usage

```typescript
import useNetwork from "backbone-react-hooks/src/hooks/useNetwork";

export function MyComponent() {
  const { connect, disconnect, connectionId, network } = useNetwork();
}
```

### useUsers()

Add or remove users from Backbones Users API

https://docs.backbone.build/docs/api/core/container#users

#### Usage

```typescript
import useUsers from "backbone-react-hooks/src/hooks/useUsers";

export function MyComponent() {
  const { addUser, addTrustedUser, removeUser, removeTrustedUser } = useUsers();
}
```
