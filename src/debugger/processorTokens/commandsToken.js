import { range, pallete } from './mainProccesor'

const write = {
  name: 'Write',
  select: false,
  type: 'Input & Output',
  commands: [
    [
      '{1} to {2} at {3}',
      { input: range.variable, type: 'input' },
      { input: [range.variable, range.blocks], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
  ],
}

const read = {
  name: 'Read',
  select: false,
  type: 'Input & Output',
  commands: [
    [
      '{1} = {2} at {3}',
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.blocks], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
  ],
}

const draw = {
  name: 'Draw',
  select: true,
  type: 'Input & Output',
  commands: [
    [
      'clear r {1} g {2} b {3}',
      { subcommand: 'clear', type: 'setable', canWrite: false },
      { input: [range.variable, range.colorScheme255], type: 'input' },
      { input: [range.variable, range.colorScheme255], type: 'input' },
      { input: [range.variable, range.colorScheme255], type: 'input' },
    ],
    [
      'color r {1} g {2} b {3} a {4}',
      { subcommand: 'clear', type: 'setable', canWrite: false },
      { input: [range.variable, range.colorScheme1], type: 'input' },
      { input: [range.variable, range.colorScheme1], type: 'input' },
      { input: [range.variable, range.colorScheme1], type: 'input' },
      { input: [range.variable, range.colorScheme1], type: 'input' },
    ],
    [
      'col color {1}',
      { subcommand: 'col', type: 'setable', canWrite: false },
      { input: [range.variable, range.hex], type: 'input' },
    ],
    [
      'stroke {1}',
      { subcommand: 'stroke', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
    [
      'stroke {1}',
      { subcommand: 'stroke', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
    [
      'line x {1} y {2} x2 {3} y2 {4}',
      { subcommand: 'line', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
    [
      'rect x {1} y {2} width {3} height {4}',
      { subcommand: 'rect', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
    [
      'lineRect x {1} y {2} width {3} height {4}',
      { subcommand: 'lineRect', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
    [
      'poly x {1} y {2} sides {3} radius {4} rotation {5}',
      { subcommand: 'poly', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.rotate360], type: 'input' },
    ],
    [
      'linePoly x {1} y {2} sides {3} radius {4} rotation {5}',
      { subcommand: 'linePoly', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.rotate360], type: 'input' },
    ],
    [
      'triangle x {1} y {2} x2 {3} y2 {4} x3 {5} y3 {6}',
      { subcommand: 'triangle', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
    [
      'image x {1} y {2} image {3} size {4} rotation {5}',
      { subcommand: 'image', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.drawImage], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.rotate360], type: 'input' },
    ],
  ],
}

const print = {
  name: 'Print',
  select: false,
  type: 'Input & Output',
  commands: [['{1}', { input: [range.variable, range.text], type: 'input' }]],
}

const printFlush = {
  name: 'Print Flush',
  select: false,
  type: 'Block Control',
  commands: [
    ['to {1}', { input: [range.variable, range.blocks], type: 'input' }],
  ],
}

const drawFlush = {
  name: 'Draw Flush',
  select: false,
  type: 'Block Control',
  commands: [
    ['to {1}', { input: [range.variable, range.blocks], type: 'input' }],
  ],
}

const getLink = {
  name: 'Get Link',
  select: false,
  type: 'Block Control',
  commands: [
    [
      '{1} = link# {2}',
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
  ],
}

const control = {
  name: 'Control',
  select: true,
  type: 'Block Control',
  commands: [
    [
      'set enabled of {1} to {2}',
      { subcommand: 'enabled', type: 'setable', canWrite: false },
      { input: [range.variable, range.blocks], type: 'input' },
      { input: [range.variable, range.boolean], type: 'input' },
    ],
    [
      'set shoot of {1} x {2} y {3} shoot {4}',
      { subcommand: 'shoot', type: 'setable', canWrite: false },
      { input: [range.variable, range.turret], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.boolean], type: 'input' },
    ],
    [
      'set shootp of {1} unit {2} shoot {3}',
      { subcommand: 'shootp', type: 'setable', canWrite: false },
      { input: [range.variable, range.turret], type: 'input' },
      { input: [range.variable], type: 'input' },
      { input: [range.variable, range.boolean], type: 'input' },
    ],
    [
      'set config of {1} to {2}',
      { subcommand: 'config', type: 'setable', canWrite: false },
      { input: [range.variable, range.config], type: 'input' },
      { input: [range.configObj], type: 'input' },
    ],
    [
      'set color of {1} to {2}',
      { subcommand: 'color', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'input' },
      { input: [range.variable, range.hex], type: 'input' },
    ],
  ],
}

const radar = {
  name: 'Radar',
  select: false,
  type: 'Block Control',
  commands: [
    [
      'from {1} target {2} and {3} and {4} order {5} sort {6} output {7}',
      { input: [range.turret, range.variable], type: 'input' },
      { input: [range.radarUnit], type: 'input' },
      { input: [range.radarUnit], type: 'input' },
      { input: [range.radarUnit], type: 'input' },
      { input: [range.boolean, range.variable], type: 'input' },
      { input: [range.radarSort], type: 'input' },
      { input: [range.variable], type: 'output' },
    ],
  ],
}

const sensor = {
  name: 'Sensor',
  select: false,
  type: 'Block Control',
  commands: [
    [
      '{1} = {2} in {3}',
      { input: [range.variable], type: 'output' },
      { input: [range.sensor, range.items, range.liquids], type: 'input' },
      { input: [range.variable, range.blocks, range.units], type: 'input' },
    ],
  ],
}

const set = {
  name: 'Set',
  select: 'func',
  type: 'Operations',
  func: (variable, value, arr) => {
    arr.push([variable, value]);
  },
  commands: [
    '{1} to {2}',
    { input: [range.variable], type: 'output' },
    { input: [range.variable, range.int, range.float, range.text, range.hex, range.blocks, range.items, range.liquids, range.units, range.buildings, range.special, range.teams], type: 'input' },
  ]
}

const operation = {
  name: 'Operation',
  select: true,
  type: 'Operations',
  commands: [
    [
      '{1} = {2} + {3}',
      { subcommand: 'add', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} - {3}',
      { subcommand: 'sub', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} * {3}',
      { subcommand: 'mul', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} / {3}',
      { subcommand: 'div', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} // {3}',
      { subcommand: 'idiv', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} % {3}',
      { subcommand: 'mod', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} ^ {3}',
      { subcommand: 'pow', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} == {3}',
      { subcommand: 'equal', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} not {3}',
      { subcommand: 'notEqual', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} and {3}',
      { subcommand: 'land', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} < {3}',
      { subcommand: 'lessThan', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} <= {3}',
      { subcommand: 'lessThanEq', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} > {3}',
      { subcommand: 'greaterThan', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} >= {3}',
      { subcommand: 'greaterThanEq', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} === {3}',
      { subcommand: 'strictEqual', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} << {3}',
      { subcommand: 'shl', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} >> {3}',
      { subcommand: 'shr', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} or {3}',
      { subcommand: 'or', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} b-and {3}',
      { subcommand: 'and', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} xor {3}',
      { subcommand: 'xor', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} flip {3}',
      { subcommand: 'not', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} max {3}',
      { subcommand: 'max', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} min {3}',
      { subcommand: 'min', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} angle {3}',
      { subcommand: 'angle', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} angle diff {3}',
      { subcommand: 'angleDiff', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} len {3}',
      { subcommand: 'len', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} noise {3}',
      { subcommand: 'noise', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} abs {3}',
      { subcommand: 'abs', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} log {3}',
      { subcommand: 'log', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} log10 {3}',
      { subcommand: 'log10', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} floor {3}',
      { subcommand: 'floor', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} ceil {3}',
      { subcommand: 'ceil', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} sqrt {3}',
      { subcommand: 'sqrt', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} rand {3}',
      { subcommand: 'rand', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} sin {3}',
      { subcommand: 'sin', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} cos {3}',
      { subcommand: 'cos', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} tan {3}',
      { subcommand: 'tan', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} asin {3}',
      { subcommand: 'asin', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} acos {3}',
      { subcommand: 'acos', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
    [
      '{1} = {2} atan {3}',
      { subcommand: 'atan', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
      { input: [range.variable, range.int, range.float, range.hex, range.special], type: 'input' },
    ],
  ]
}

const lookup = {
  name: 'Lookup',
  select: true,
  type: 'Operations',
  commands: [
    [
      '{1} = lookup item # {2}',
      { subcommand: 'item', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
    [
      '{1} = lookup unit # {2}',
      { subcommand: 'unit', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
    [
      '{1} = lookup liquid # {2}',
      { subcommand: 'liquid', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
    [
      '{1} = lookup block # {2}',
      { subcommand: 'block', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
  ]
}

const packcolor = {
  name: 'PackColor',
  select: false,
  type: 'Operations',
  commands: [
    '{1} = pack {2} {3} {4} {5}',
    { input: [range.variable], type: 'output' },
    { input: [range.variable, range.boolean], type: 'input' },
    { input: [range.variable, range.boolean], type: 'input' },
    { input: [range.variable, range.boolean], type: 'input' },
    { input: [range.variable, range.boolean], type: 'input' },
  ]
}

const wait = {
  name: 'Wait',
  select: false,
  type: 'Flow Control',
  commands: [
    '{1} sec',
    { input: [range.variable, range.positiveInt, range.float, range.special], type: 'input' },
  ]
}

const stop = {
  name: 'Wait',
  select: 'end',
  type: 'Flow Control'
}

const end = {
  name: 'Wait',
  select: 'end',
  type: 'Flow Control'
}

const jump = {
  name: 'Jump',
  select: true,
  type: 'Flow Control',
  commands: [
    [
      'if {1} == {2}',
      { subcommand: 'equal', type: 'setable', canWrite: false },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
    ],
    [
      'if {1} not {2}',
      { subcommand: 'notEqual', type: 'setable', canWrite: false },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
    ],
    [
      'if {1} < {2}',
      { subcommand: 'lessThan', type: 'setable', canWrite: false },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
    ],
    [
      'if {1} <= {2}',
      { subcommand: 'lessThanEq', type: 'setable', canWrite: false },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
    ],
    [
      'if {1} > {2}',
      { subcommand: 'greaterThan', type: 'setable', canWrite: false },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
    ],
    [
      'if {1} >= {2}',
      { subcommand: 'greaterThanEq', type: 'setable', canWrite: false },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
    ],
    [
      'if {1} === {2}',
      { subcommand: 'strictEqual', type: 'setable', canWrite: false },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
    ],
    [
      'if always',
      { subcommand: 'always', type: 'setable', canWrite: false },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
      { input: [range.variable, range.boolean, range.int, range.float, range.special, range.teams, range.hex], type: 'input' },
    ],
  ]
}

const ubind = {
  name: 'Unit Bind',
  select: false,
  type: 'Unit Control',
  commands: [
    '{1}',
    { input: [range.units], type: 'input' },
  ]
}

const ucontrol = {
  name: 'Unit Control',
  select: true,
  type: 'Unit Control',
  commands: [
    [
      'idle',
      { subcommand: 'idle', type: 'setable', canWrite: false },
    ],
    [
      'stop',
      { subcommand: 'stop', type: 'setable', canWrite: false },
    ],
    [
      'move x {1} y {2}',
      { subcommand: 'move', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt, range.float, range.special], type: 'input' },
      { input: [range.variable, range.positiveInt, range.float, range.special], type: 'input' },
    ],
    [
      'approach x {1} y {2} radius {3}',
      { subcommand: 'approach', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt, range.float, range.special], type: 'input' },
      { input: [range.variable, range.positiveInt, range.float, range.special], type: 'input' },
      { input: [range.variable, range.positiveInt, range.float, range.special], type: 'input' },
    ],
    [
      'pathfind x {1} y {2}',
      { subcommand: 'pathfind', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt, range.float, range.special], type: 'input' },
      { input: [range.variable, range.positiveInt, range.float, range.special], type: 'input' },
    ],
    [
      'autoPathfind',
      { subcommand: 'AutoPathfind', type: 'setable', canWrite: false },
    ],
    [
      'boost enable {1}',
      { subcommand: 'boost', type: 'setable', canWrite: false },
      { input: [range.variable, range.boolean, range.special], type: 'input' },
    ],
    [
      'target x {1} y {2} shoot {3}',
      { subcommand: 'target', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt, range.float, range.special], type: 'input' },
      { input: [range.variable, range.positiveInt, range.float, range.special], type: 'input' },
      { input: [range.variable, range.boolean, range.special], type: 'input' },
    ],
    [
      'targetp unit {1} shoot {2}',
      { subcommand: 'targetp', type: 'setable', canWrite: false },
      { input: [range.variable, range.special], type: 'input' },
      { input: [range.variable, range.boolean, range.special], type: 'input' },
    ],
    [
      'itemDrop to {1} amount {2}',
      { subcommand: 'itemDrop', type: 'setable', canWrite: false },
      { input: [range.variable, range.blocks, '@air'], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
    [
      'itemTake from {1} item {2} amount {3}',
      { subcommand: 'itemTake', type: 'setable', canWrite: false },
      { input: [range.variable, range.blocks], type: 'input' },
      { input: [range.variable, range.items], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
    ],
    [
      'payDrop',
      { subcommand: 'payDrop', type: 'setable', canWrite: false },
    ],
    [
      'payTake takeUnits {1}',
      { subcommand: 'payTake', type: 'setable', canWrite: false },
      { input: [range.variable, range.units], type: 'input' },
    ],
    [
      'payEnter',
      { subcommand: 'payEnter', type: 'setable', canWrite: false },
    ],
    [
      'mine x {1} y {2}',
      { subcommand: 'mine', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt, range.float, range.special], type: 'input' },
      { input: [range.variable, range.positiveInt, range.float, range.special], type: 'input' },
    ],
    [
      'flag value {1}',
      { subcommand: 'flag', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt, range.special], type: 'input' },
    ],
    [
      'build x {1} y {2} block {3} rotation {4} config {5}',
      { subcommand: 'build', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt, range.special], type: 'input' },
      { input: [range.variable, range.positiveInt, range.special], type: 'input' },
      { input: [range.variable, range.blocks], type: 'input' },
      { input: [range.variable, range.rotate3], type: 'input' },
      { input: [range.variable, configObj], type: 'input' },
    ],
    [
      'getBlock x {1} y {2} type {3} bilding {4} floor {5}',
      { subcommand: 'getBlock', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt, range.special], type: 'input' },
      { input: [range.variable, range.positiveInt, range.special], type: 'input' },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
    ],
    [
      'within x {1} y {2} radius {3} result {4}',
      { subcommand: 'within', type: 'setable', canWrite: false },
      { input: [range.variable, range.positiveInt, range.special], type: 'input' },
      { input: [range.variable, range.positiveInt, range.special], type: 'input' },
      { input: [range.variable, range.positiveInt, range.special], type: 'input' },
      { input: [range.variable], type: 'output' },
    ],
    [
      'unbind',
      { subcommand: 'unbind', type: 'setable', canWrite: false },
    ],
  ]
}

const uradar = {
  name: 'Unit Radar',
  select: false,
  type: 'Unit Control',
  commands: [
      'target {1} and {2} and {3} order {4} sort {5} output {6}',
      { input: [range.radarUnit], type: 'input' },
      { input: [range.radarUnit], type: 'input' },
      { input: [range.radarUnit], type: 'input' },
      { input: [range.boolean, range.variable], type: 'input' },
      { input: [range.radarSort], type: 'input' },
      { input: [range.variable], type: 'output' },
  ],
}

const ulocate = {
  name: 'Unit Locate',
  select: true,
  type: 'Unit Control',
  commands: [
    [
      'find building group {1} enemy {2} outX {3} outY {4} found {5} building {6}',
      { subcommand: 'building', type: 'setable', canWrite: false },
      { input: [range.locateSort], type: 'input' },
      { input: [range.variable, range.boolean], type: 'input' },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
    ],
    [
      'find ore ore {1} outX {2} outY {3} found {4}',
      { subcommand: 'ore', type: 'setable', canWrite: false },
      { input: [range.variable, range.oreSort], type: 'input' },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
    ],    
    [
      'find spawn outX {1} outY {2} found {3} building {4}',
      { subcommand: 'spawn', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
    ],   
    [
      'find damaged outX {1} outY {2} found {3} building {4}',
      { subcommand: 'damaged', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
      { input: [range.variable], type: 'output' },
    ],   
  ]
}

const commands = {
  write: write,
  read: read,
  draw: draw,
  print: print,
  printFlush: printFlush,
  drawFlush: drawFlush,
  control: control,
  getLink: getLink,
  radar: radar,
  sensor: sensor,
  set: set,
  operation: operation,
  lookup: lookup,
  packcolor: packcolor,
  wait: wait,
  stop: stop,
  end: end,
  jump: jump,
  ubind: ubind,
  ucontrol: ucontrol,
  uradar: uradar,
  ulocate: ulocate
}

for (const key in commands) {
  pallete.forEach((element) => {
    if (element.name == commands[key].type) {
      commands[key].pallete = element
    }
  })
}

export default { commands }
