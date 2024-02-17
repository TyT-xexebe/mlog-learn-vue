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
      { input: [range.variable], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.positiveInt], type: 'input' },
      { input: [range.variable, range.boolean], type: 'input' },
    ],
    [
      'set shootp of {1} unit {2} shoot {3}',
      { subcommand: 'shootp', type: 'setable', canWrite: false },
      { input: [range.variable], type: 'input' },
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

const op = {
  name: 'Op',
  select: true,
  type: 'Operations',
  commands: [
    [
      
    ]
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
}

for (const key in commands) {
  pallete.forEach((element) => {
    if (element.name == commands[key].type) {
      commands[key].pallete = element
    }
  })
}

export default { commands }
