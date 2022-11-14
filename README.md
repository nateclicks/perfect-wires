<h1 align="center">Perfect Wires</h1>
<p align="center">Some functions for connecting objects. Useful when creating diagrams.</p>

## Functions 
`getWire` - for wires between points

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

### `getWire()`
Returns path data for use in and SVG `<path>` object

#### Syntax
```ts
getWire(sx, sy, ex, ey)
```
### Parameters
| Argument | Type   | Description                                                                 |
| -------- | ------ | --------------------------------------------------------------------------- |
| `sx`     | number | X-coordinate of the starting point.                                       |
| `sy`     | number | Y-coordinate of the starting point.                                       |
| `ex`     | number | X-coordinate of the end point.                                       |
| `ey`     | number | Y-coordinate of the end point.                                        |


#### Returns
SVG Path data
```ts
//Example
const pathData = getWire(400, 400, 500, 500);
console.log(pathData);

///Returns
'M400,400 L400,450 a 50,50 90 0 0 50,50 L500,500'

```

## Contributing
This library is still working towards something more stable. Currently not accepting in contribution, but feel free to [create an issue](https://github.com/nateUX/perfect-wires/issues/new/choose). 

## Author

[@nateClicks](https://twitter.com/nateClicks)