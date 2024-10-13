# MusicLights

MusicLights is an open source music visualization library written in Typescript for web browsers.

This library will contain many music visualizers that use HTML canvases to draw graphics. I don't plan to use any 3P graphics library to keep it as lightweight as possible. The library is modular and tree-shakeable, allowing devs to bundle only the visualizers they want into their web apps.

## Visualizers

Check the individual types within the files to understand the options available for each. I'll be adding more visualizers to come, but contributions are welcome.

### CellBars

Adds symmetric bars filled with square cells. The hue of the color changes outwards.

![](./imgs/cellbars.png)

## API

The library is meant to be imported via modules, so make sure to import the root `MusicLights` function and any visualizers you want. Then, initialize `MusicLights` passing the audio element and canvas element used, and then add visualizers with the `addVisualizer` function. 

```
MusicLights(audioEl, canvasEl, options)
    .addVisualizer(CellBars(options));
```

> Note: The API is bound to change at any time, including the names and options available. Use at your own will.

## Styling

Styling the canvas element should allow anyone to improve upon the graphics without requiring any updates to this library. These are the modifications that should be done in CSS and not within this library:

- Static background colors and gradients: It's easy to apply `background-color: black;` to the canvas via CSS.

- Positioning: It's likely that the canvas needs to be fullscreen, so `position: absolute; inset: 0;` can help achieve that.

- Background videos: Passing a video as the source element allows devs to connect a video file to the visualizer, and it should work in the same way.

## Contributing

This repo accepts new contributions.

To begin, fork the repo and install the dev dependencies (the example will use `pnpm` but other package managers can be used):

```
pnpm i
pnpm dev
```
The second command will print out the localhost address for testing, which contains the HTML file with an audio element and a visualizer ready to play.
