# viser

![pointcloud_preview](./viser.png)

## TODO

Python-controllable GUI

- [x] Plumbing
- [ ] Primitives
  - [x] Select / drop-down
  - [x] Checkbox
  - [x] Slider
  - [ ] Basic textbox
  - [ ] 2D vector
  - [ ] 3D vector
- [x] .value(), last_updated()
- [x] Callback interface
- [ ] Set value from Python
- [ ] Synchronization across clients (for broadcasted)

Scene tree

- [x] useState prototype
- [x] useState -> zustand

- Websocket connection

  - [x] Stateful server
  - [x] Redundant message culling
  - [ ] Multiple "servers"? Conflicting ports?

- Camera controls

  - [x] Orbit controls
  - [ ] Keyboard

- Message types

  - [x] Coordinate frame
  - [x] Point cloud
    - [x] Naive serialization
    - [x] Directly access `.data`
  - [x] Camera frustum
  - [x] Image
  - [x] Video stream (seems fine to just images for this)
  - [x] Background set
  - [x] Camera read
  - [ ] Camera write
  - [x] Ensure message ordering

- Serialization

  - [x] JSON
  - [x] JSON -> msgpack
  - [x] Automate synchronization of typescript / dataclass definitions

- UI

  - [ ] Remove visibility toggle interface
  - [ ] Regex filter for visibility
  - [ ] Icons for scene node type

- Exporting
  - [ ] Video export
  - [ ] SVG export
