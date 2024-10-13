# MusicLights

MusicLights is an open source music visualization library written in Typescript for web browsers.

## Visualizers

Check the individual types within the files to understand the options available for each.

### CellBars

Adds symmetric bars filled with square cells. The hue of the color changes outwards.

![](./imgs/cellbars.png)

## API

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
