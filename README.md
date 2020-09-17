# Refinery Engines

This repository contains Engine elements of Refinery. Engines are the most important element, since they define how the conversion between to and from an entity is supposed to happen.

To declare your own Engines, you can inherit from the `BaseEngine` class and implement `importCallback()` method for ingress and `exportCallback()` for egress. Then, import your engines in `yourEngines.ts` in the base repository and pass the engine type to the exported list. Don't forget to run `tsc`!

This repo also contains the PouchDb database wrapper that interfaces to the CouchDb instance. It's placed here because `baseEngine` needs to know how to `find` docs and when I placed it in `core`, the `find` plugin didn't work upon import.