---
title: createRegistry
description: Create an id-keyed instance registry with optional reactive storage and identity-checked disposal handles.
seo:
  title: createRegistry
  description: Create an id-keyed instance registry with optional reactive storage and identity-checked disposal handles.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/createRegistry.ts
---

## Usage

`createRegistry` creates a registry that indexes instances by id, suited to accessing instances across component trees or routes.

```ts
import { createRegistry } from '@movk/core'

const registry = createRegistry<MapInstance>()

registry.register('main', map)
registry.get('main') // MapInstance
registry.has('main') // true
registry.unregister('main') // true
```

### Disposal Handles

The handle returned by `register` is identity-checked: it only deletes the entry while the stored value is still the one it registered. When instances hand over (the new one registers before the old one unmounts), the stale handle cannot remove the new registration.

```ts
const disposeFirst = registry.register('main', first)
registry.register('main', second)

disposeFirst()
registry.get('main') // second, untouched by the stale handle
```

Inside a component, hand the handle to the effect scope:

```ts
import { onScopeDispose } from 'vue'

const dispose = registry.register(id, instance)
onScopeDispose(dispose)
```

### Reactive Mode

With `reactive` enabled the registry stores entries in a `shallowReactive` map, so `computed` and `watch` observe registrations and removals.

```ts
const registry = createRegistry<DrawContext>({
  reactive: true,
  onDuplicate: id => console.warn(`"${id}" is already registered; the latest one takes over`),
})

const draw = computed(() => registry.get(mapId))
const count = computed(() => registry.size)
```

`onDuplicate` is a warning hook only; it does not change the "latest one wins" behavior.

## API

### `createRegistry<T>(options?)`{lang="ts-type"}

Create a registry that indexes instances by id.

### Parameters

::field-group
  ::field{name="options" type="RegistryOptions"}
  Registry behavior options.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="Registry<T>"}
  The registry instance.
  ::
::

### RegistryOptions

::field-group
  ::field{name="reactive" type="boolean"}
  Whether to store entries in a `shallowReactive` map so `computed`/`watch` observe changes. Defaults to `false`.
  ::

  ::field{name="onDuplicate" type="(id: string) => void"}
  Called when the same id is registered again, for warning purposes.
  ::
::

### Registry

::field-group
  ::field{name="register" type="(id: string, value: T) => () => void"}
  Register an instance and return an identity-checked disposal handle.
  ::

  ::field{name="unregister" type="(id: string) => boolean"}
  Remove an entry by id; returns whether an entry was actually deleted.
  ::

  ::field{name="get" type="(id: string) => T | undefined"}
  Read the instance registered under an id.
  ::

  ::field{name="has" type="(id: string) => boolean"}
  Whether an id is registered.
  ::

  ::field{name="keys" type="() => string[]"}
  Registered ids, in registration order.
  ::

  ::field{name="clear" type="() => void"}
  Remove every entry.
  ::

  ::field{name="size" type="number"}
  Number of registered entries.
  ::
::

## Changelog

:commit-changelog{prefix="helpers"}
