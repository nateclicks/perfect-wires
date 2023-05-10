<h1 align="center">Perfect Wires</h1>
<p align="center">Some functions for connecting objects. Useful when creating diagrams.</p>

## Functions 
`getWire` - for wires between points
`getBoxToBoxWire` - for wires between boxes

## Installation

```
npm i perfect-wires
```
or

```
yarn add perfect-wires
```


## Usage
The functions in this library return path data for an SVG path that you can use to draw a wire. It only provides the data for the path.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/nateclicks/perfect-wires/tree/main/example)

### `getWire()`
Returns path data for use in and SVG `<path>` object

#### __Syntax__
```ts
getWire(sx, sy, ex, ey)
```
#### __Parameters__
| Argument | Type   | Description                                                                 |
| -------- | ------ | --------------------------------------------------------------------------- |
| `sx`     | number | X-coordinate of the starting point.                                       |
| `sy`     | number | Y-coordinate of the starting point.                                       |
| `ex`     | number | X-coordinate of the end point.                                       |
| `ey`     | number | Y-coordinate of the end point.                                        |


#### __Returns__ 

SVG Path data
```ts
//Example
const pathData = getWire(400, 400, 500, 500);
console.log(pathData);

///Returns
'M400,400 L400,450 a 50,50 90 0 0 50,50 L500,500'

```

### `getBoxToBoxWire()`
Returns path data for use in and SVG `<path>` object

#### __Syntax__
```ts
getBoxToBoxWire(sBox, eBox, options )
```
#### __Parameters__
| Argument | Type   | Description                                                                 |
| -------- | ------ | --------------------------------------------------------------------------- |
| `sBox`     | number | X-coordinate of the starting point.                                       |
| `eBox`     | number | Y-coordinate of the starting point.                                       |
| `options`     | WireOptions | Optional configuration for wiring                                       |

#### __WireOptions__
| Option     |  Type  |  Default   | Description                                                     |
| ---------- | ------ | -- | --------------------------------------------------------------------------- |
| `deadZone` | number  | 0 | Amount of space (padding) to use before creating a straight line between boxes. Useful when using boxes with rounded corners.                             |


### __Returns__

SVG Path data
```ts
//Example
const box1: Box = {
    x: 300,
    y: 350,
    h: 100,
    w: 200
  };
  const box2: Box = {
    x: 550,
    y: 500,
    h: 100,
    w: 150
  };

const pathData = getBoxToBoxWire(box1, box2, {deadZone: 5});
console.log(pathData);

///Returns
'M500,400 L575,400 a 50,50 90 0 1 50,50 L625,500'
```



## Contributing
This library is still working towards something more stable. Currently not accepting in contribution, but feel free to [create an issue](https://github.com/nateUX/perfect-wires/issues/new/choose). 

## Author

[@nateClicks](https://twitter.com/nateClicks)