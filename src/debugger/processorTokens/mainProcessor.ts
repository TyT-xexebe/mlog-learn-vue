import { consoleOutput } from "@/main";

interface Issue {
  answer: boolean;
  issue: string | boolean;
}

const hasIssue = (issue: string | boolean): Issue => {
  return {
    answer: false,
    issue: issue,
  };
};

const noIssue = (): Issue => {
  return {
    answer: true,
    issue: false,
  };
};

const rangeChecker = (range: [number, number], n: any, float: boolean): Issue | undefined => {
  const decimalRegex = float ? /^-?\d+(\.\d+)?$/ : /^-?\d+$/;
  if (!decimalRegex.test(n)) return hasIssue(`${n} is not a valid decimal number`);

  if (isNaN(n)) return hasIssue('input is not a number');
  if (!float) {
    if (Number(n) === n && n % 1 !== 0) return hasIssue(`the ${n} is float`);
  }
  if (n < range[0]) {
    return hasIssue(`the ${n} is less then min range (${range[0]}:${range[1]})`);
  }
  if (n > range[1]) {
    return hasIssue(`the ${n} is greater then max range (${range[0]}:${range[1]})`);
  }
  if (n >= range[0] && n <= range[1]) {
    return noIssue();
  }
};

interface RangeObject {
  range: RegExp | ((n: any) => Issue | undefined);
  type: 'regexp' | 'func';
}
interface ConfigObjItem {
  blocks: string[];
  type: string | string[];
}

interface RangeMap {
  [key: string]: RangeObject | string[] | ConfigObjItem[];
}

const range: RangeMap = {
  // for text in print/other
  text: {
    range: /"([^"]*)"/,
    type: 'regexp',
  },

  // variable checker, cant start on number
  variable: {
    range: /^[a-zA-Z][a-zA-Z0-9]*$/,
    type: 'regexp',
  },

  // boolean checking
  boolean: {
    range: (n: any) => {
      if (n == 0 || n == 1 || n === 'true' || n === 'false') {
        return noIssue();
      } else {
        return hasIssue(`${n} must be Boolean`);
      }
    },
    type: 'func',
  },

  // number checker, float numbers not allowed, can be positive or negative
  int: {
    range: (n: any) => {
      const range: [number, number] = [-Infinity, Infinity];
      return rangeChecker(range, n, false);
    },
    type: 'func',
  },

  // number cant be float, only positive number
  positiveInt: {
    range: (n: any) => {
      const range: [number, number] = [0, Infinity];
      return rangeChecker(range, n, false);
    },
    type: 'func',
  },

  // only float number can be positive or negative
  float: {
    range: (n: any) => {
      consoleOutput(n);
      if (Number(n) && !Number.isInteger(n)) {
        return noIssue();
      } else {
        return hasIssue(`the ${n} is not a float`);
      }
    },
    type: 'func',
  },

  // block side rotate, only positive and not float
  rotate3: {
    range: (n: any) => {
      const range: [number, number] = [0, 3];
      return rangeChecker(range, n, false);
    },
    type: 'func',
  },

  // unit rotate in deegres, only positive, can be float
  rotate360: {
    range: (n: any) => {
      const range: [number, number] = [0, 360];
      return rangeChecker(range, n, true);
    },
    type: 'func',
  },

  // color set 0-255
  colorScheme255: {
    range: (n: any) => {
      const range: [number, number] = [0, 255];
      return rangeChecker(range, n, true);
    },
    type: 'func',
  },

  // color set 0-1
  colorScheme1: {
    range: (n: any) => {
      const range: [number, number] = [0, 1];
      return rangeChecker(range, n, true);
    },
    type: 'func',
  },

  hex: {
    range: (n: any) => {
      const range = [0x000000, 0xFFFFFF];
      if (!n.startsWith('%')) return hasIssue(`${n} is not #HEX`);
      if (!(n.length > 7)) return hasIssue(`${n} is not #HEX`);
      let hexNum = parseInt(n.slice(1), 16);
      if (range[0] <= hexNum && range[1] >= hexNum) return noIssue();
      return hasIssue(`${n} is too big and can't be #hex`);
    },
    type: 'func'
  },
  blocks: ["conveyor","juction", "sorter", "router", "distributor", "gate", "driver", "source", "void", "duo", "scatter", "scorch", "hail", "wave", "lancer", "arc", "parallax", "swarmer", "salvo", "segment", "tsunami", "fuse", "ripple", "cyclone", "foreshadow", "spectre", "meltdown", "drill", "extractor", "cultivator", "pump", "conduit", "continer", "tank", "generator", "tower", "node", "diode", "battery", "panel", "reactor", "wall", "door", "thruster", "huge", "gigantic", "press", "smelter", "kiln", "compressator", "weaver", "mixer", "melter", "separator", "disassembler", "purvelizer", "centrifuge", "incinerator", "factory", "reconstructor", "point", "turret", "mender", "projector", "dome", "vault", "unloader", "mine" , "processor", "message", "display", "cell", "bank", "switch", "duct", "bridge", "loader", "breach", "diffuse", "sublimate", "titan", "disperse", "afflict", "lustre", "scathe", "smite", "milign", "crusher", "bore", "chamber", "crusible", "furnace", "electrolyzer", "redirector", "concentrator", "heater", "synthesizer", "fabricator", "refabricator", "assembler", "module", "decontructor", "constructor", "unloader", "nucleus", "foundation", "citadel", "acropolis", "bastion", "shard", "canvas"],
  liquids: ["@water","@slag","@oil","@cryofluid","@neoplasm","@arkycite","@gallium","@ozone","@hydrogen","@nitrogen","@cyanogen"],
  items: ["@copper","@lead","@metaglass","@graphite","@sand","@coal","@titanium","@thorium","@scrap","@silicon","@plastanium","@phase-fabric","@surge-alloy","@spore-pod","@blast-compound","@pyratite","@beryllium","@tungsten","@oxide","@carbide","@fissile-matter","@dormant-cyst"],
  units: ["@dagger","@mace","@fortress","@scepter","@reign","@nova","@pulsar","@quasar","@vela","@corvus","@crawler","@atrax","@spiroct","@arkyid","@toxopid","@flare","@horizon","@zenith","@antumbra","@eclipse","@mono","@poly","@mega","@quad","@oct","@risso","@minke","@bryde","@sei","@omura","@retusa","@oxynoe","@cyerce","@aegires","@navanax","@alpha","@beta","@gamma","@stell","@locus","@precept","@vanquish","@conquer","@merui","@cleroi","@anthicus","@anthicus-missile","@tecta","@collaris","@elude","@avert","@obviate","@quell","@quell-missile","@disrupt","@disrupt-missile","@renale","@latum","@evoke","@incite","@emanate","@block","@manifold","@assembly-drone","@scathe-missile","@turret-unit-build-tower", "@unit"],
  sensor: ["@totalItems","@firstItem","@totalLiquds","@totalPower","@itemCapacity","@liquidCapacity","@powerNetStored","@powerNetCapacity","@powerNetIn","@powerNetOut","@ammo","@ammoCapacity","@health","@maxHealth","@heat","@efficiency","@progress","@timescale","@rotation","@x","@y","@shootX","@shootY","@size","@dead","@range","@shooting","@boosting","@mineX","@mineY","@mine","@speed","@team","@type","@flag","@controlled","@controller","@name","shield","@payLoadCount","@payLoadType","@enabled","@config","@color"],
  locateSort: ["core", "storage", "generator", "turret", "factory", "repair", "battery", "reactor"],
  oreSort: ["@copper", "@lead", "@sand", "@coal", "@titanium", "@beryllium"],
  buildings: ["@graphite-press","@multi-press","@silicon-smelter","@silicon-crucible","@kiln","@plastanium-compressor","@phase-weaver","@surge-smelter","@cryofluid-mixer","@pyratite-mixer","@blast-mixer","@melter","@separator","@disassembler","@spore-press","@pulverizer","@coal-centrifuge","@incinerator","@silicon-arc-furnace","@electrolyzer","@atmospheric-concentrator","@oxidation-chamber","@electric-heater","@slag-heater","@phase-heater","@heat-redirector","@heat-router","@slag-incinerator","@carbide-crucible","@slag-centrifuge","@surge-crucible","@cyanogen-synthesizer","@phase-synthesizer","@heat-reactor","@copper-wall","@copper-wall-large","@titanium-wall","@titanium-wall-large","@plastanium-wall","@plastanium-wall-large","@thorium-wall","@thorium-wall-large","@phase-wall","@phase-wall-large","@surge-wall","@surge-wall-large","@door","@door-large","@scrap-wall","@scrap-wall-large","@scrap-wall-huge","@scrap-wall-gigantic","@thruster","@beryllium-wall","@beryllium-wall-large","@tungsten-wall","@tungsten-wall-large","@blast-door","@reinforced-surge-wall","@reinforced-surge-wall-large","@carbide-wall","@carbide-wall-large","@shielded-wall","@mender","@mend-projector","@overdrive-projector","@overdrive-dome","@force-projector","@shock-mine","@radar","@build-tower","@regen-projector","@shockwave-tower","@shield-projector","@large-shield-projector","@conveyor","@titanium-conveyor","@plastanium-conveyor","@armored-conveyor","@junction","@bridge-conveyor","@phase-conveyor","@sorter","@inverted-sorter","@router","@distributor","@overflow-gate","@underflow-gate","@mass-driver","@duct","@armored-duct","@duct-router","@overflow-duct","@underflow-duct","@duct-bridge","@duct-unloader","@surge-conveyor","@surge-router","@unit-cargo-loader","@unit-cargo-unload-point","@mechanical-pump","@rotary-pump","@impulse-pump","@conduit","@pulse-conduit","@plated-conduit","@liquid-router","@liquid-container","@liquid-tank","@liquid-junction","@bridge-conduit","@phase-conduit","@reinforced-pump","@reinforced-conduit","@reinforced-liquid-junction","@reinforced-bridge-conduit","@reinforced-liquid-router","@reinforced-liquid-container","@reinforced-liquid-tank","@power-node","@power-node-large","@surge-tower","@diode","@battery","@battery-large","@combustion-generator","@thermal-generator","@steam-generator","@differential-generator","@rtg-generator","@solar-panel","@solar-panel-large","@thorium-reactor","@impact-reactor","@beam-node","@beam-tower","@beam-link","@turbine-condenser","@chemical-combustion-chamber","@pyrolysis-generator","@flux-reactor","@neoplasia-reactor","@mechanical-drill","@pneumatic-drill","@laser-drill","@blast-drill","@water-extractor","@cultivator","@oil-extractor","@vent-condenser","@cliff-crusher","@plasma-bore","@large-plasma-bore","@impact-drill","@eruption-drill","@core-shard","@core-foundation","@core-nucleus","@core-bastion","@core-citadel","@core-acropolis","@container","@vault","@unloader","@reinforced-container","@reinforced-vault","@duo","@scatter","@scorch","@hail","@wave","@lancer","@arc","@parallax","@swarmer","@salvo","@segment","@tsunami","@fuse","@ripple","@cyclone","@foreshadow","@spectre","@meltdown","@breach","@diffuse","@sublimate","@titan","@disperse","@afflict","@lustre","@scathe","@smite","@malign","@ground-factory","@air-factory","@naval-factory","@additive-reconstructor","@multiplicative-reconstructor","@exponential-reconstructor","@tetrative-reconstructor","@repair-point","@repair-turret","@tank-fabricator","@ship-fabricator","@mech-fabricator","@tank-refabricator","@mech-refabricator","@ship-refabricator","@prime-refabricator","@tank-assembler","@ship-assembler","@mech-assembler","@basic-assembler-module","@unit-repair-tower","@payload-conveyor","@payload-router","@reinforced-payload-conveyor","@reinforced-payload-router","@payload-mass-driver","@large-payload-mass-driver","@small-deconstructor","@deconstructor","@constructor","@large-constructor","@payload-loader","@payload-unloader","@power-source","@power-void","@item-source","@item-void","@liquid-source","@liquid-void","@payload-source","@payload-void","@heat-source","@illuminator","@legacy-mech-pad","@legacy-unit-factory","@legacy-unit-factory-air","@legacy-unit-factory-ground","@command-center","@launch-pad","@interplanetary-accelerator","@message","@switch","@micro-processor","@logic-processor","@hyper-processor","@memory-cell","@memory-bank","@logic-display","@large-logic-display","@canvas","@reinforced-message","@world-processor","@world-cell","@world-message"],
  blocksFloors: ["@air","@spawn","@cliff","@build1","@build2","@build3","@build4","@build5","@build6","@build7","@build8","@build9","@build10","@build11","@build12","@build13","@build14","@build15","@build16","@deep-water","@shallow-water","@tainted-water","@deep-tainted-water","@darksand-tainted-water","@sand-water","@darksand-water","@tar","@pooled-cryofluid","@molten-slag","@space","@empty","@stone","@crater-stone","@char","@basalt","@hotrock","@magmarock","@sand-floor","@darksand","@dirt","@mud","@dacite","@rhyolite","@rhyolite-crater","@rough-rhyolite","@regolith","@yellow-stone","@carbon-stone","@ferric-stone","@ferric-craters","@beryllic-stone","@crystalline-stone","@crystal-floor","@yellow-stone-plates","@red-stone","@dense-red-stone","@red-ice","@arkycite-floor","@arkyic-stone","@rhyolite-vent","@carbon-vent","@arkyic-vent","@yellow-stone-vent","@red-stone-vent","@crystalline-vent","@redmat","@bluemat","@grass","@salt","@snow","@ice","@ice-snow","@shale","@moss","@core-zone","@spore-moss","@stone-wall","@spore-wall","@dirt-wall","@dacite-wall","@ice-wall","@snow-wall","@dune-wall","@regolith-wall","@yellow-stone-wall","@rhyolite-wall","@carbon-wall","@ferric-stone-wall","@beryllic-stone-wall","@arkyic-wall","@crystalline-stone-wall","@red-ice-wall","@red-stone-wall","@red-diamond-wall","@sand-wall","@salt-wall","@shrubs","@shale-wall","@spore-pine","@snow-pine","@pine","@white-tree-dead","@white-tree","@spore-cluster","@redweed","@pur-bush","@yellowcoral","@boulder","@snow-boulder","@shale-boulder","@sand-boulder","@dacite-boulder","@basalt-boulder","@carbon-boulder","@ferric-boulder","@beryllic-boulder","@yellow-stone-boulder","@arkyic-boulder","@crystal-cluster","@vibrant-crystal-cluster","@crystal-blocks","@crystal-orbs","@crystalline-boulder","@red-ice-boulder","@rhyolite-boulder","@red-stone-boulder","@metal-floor","@metal-floor-damaged","@metal-floor-2","@metal-floor-3","@metal-floor-4","@metal-floor-5","@dark-panel-1","@dark-panel-2","@dark-panel-3","@dark-panel-4","@dark-panel-5","@dark-panel-6","@dark-metal","@pebbles","@tendrils","@ore-copper","@ore-lead","@ore-scrap","@ore-coal","@ore-titanium","@ore-thorium","@ore-beryllium","@ore-tungsten","@ore-crystal-thorium","@ore-wall-thorium","@ore-wall-beryllium","@graphitic-wall","@ore-wall-tungsten"],
  radarUnit: ["any", "enemy", "ally", "player", "attacker", "flying", "boss", "ground"],
  radarSort: ["distance", "health", "shield", "armor", "maxHealth"],
  config: ["sorter", "gate", "source", "factory", "fabricator", "constructor", "unloader", "router"],
  configObj: [
    {
      blocks: ["sorter", "gate", "source", "unloader", "router"],
      type: "items"
    },
    {
      blocks: ["source"],
      type: "liquids"
    },
    {
      blocks: ["source"],
      type: "units"
    },
    {
      blocks: ["factory"],
      type: ["@dagger", "@nova", "@crawler", "@flare", "@mono", "@risso", "@retusa"]
    },
    {
      blocks: ["fabricator"],
      type: ["@elude", "@merui", "@stell"]
    },
    {
      blocks: ["constructor"],
      type: ["@multi-press", "@silicon-crucible","@surge-smelter","@disassembler","@pulverizer","@silicon-arc-furnace","@electrolyzer","@atmospheric-concentrator","@oxidation-chamber","@slag-heater","@heat-redirector","@heat-router","@slag-incinerator","@carbide-crucible","@slag-centrifuge","@surge-crucible","@cyanogen-synthesizer","@phase-synthesizer","@scrap-wall-huge","@scrap-wall-gigantic","@thruster","@overdrive-dome","@force-projector","@solar-panel-large","@thorium-reactor","@impact-reactor","@beam-node","@turbine-condenser","@chemical-combustion-chamber","@pyrolysis-generator","@laser-drill","@blast-drill","@oil-extractor","@vent-condenser","@large-plasma-bore","@impact-drill","@vault","@reinforced-container","@reinforced-liquid-container","@reinforced-vault","@tsunami","@fuse","@ripple","@cyclone","@foreshadow","@spectre","@meltdown","@breach","@diffuse","@sublimate","@titan","@disperse","@afflict","@lustre","@scathe","@ground-factory","@air-factory","@naval-factory","@additive-reconstructor","@tank-fabricator","@ship-fabricator","@mech-fabricator","@tank-refabricator","@mech-refabricator","@ship-refabricator","@payload-conveyor","@payload-router","@reinforced-payload-conveyor","@reinforced-payload-router","@payload-mass-driver","deconstructor","@constructor","@payload-loader","@payload-unloader", "@logic-display", "@hyper-processor", "@beam-node", "@carbide-wall-large", "@reinforced-surge-wall-large", "@beryllium-wall-large", "@tungsten-wall-large", "@build-tower", "@regen-projector", "@shockwave-tower", "@mass-driver", "@unit-cargo-loader", "@impulse-pump", "@liquid-tank", "@reinforced-liquid-tank", "@battery-large", "@differential-generator", "@"]
    }
  ],
  drawImage: [],
  special: ["@e","@pi","@time","@tick","@minute","@waveNumber","@waveTime","@degToRad","@radToDeg","@links","@ctrlProcessor","@ctrlPlayer","@ctrlCommand","@unitCount","@blockCount","@liquidCount","@itemCuont","@this","@thisx","@thisy","@unit","@counter","@maph","@mapw","@air","@ipt","@server",],
  teams: ["@crux","@sharded","@derelict","@malis","@blue","@green"],
};

const palleteCreator = (name: string, background: string, border: string) => {
  return {
    name: name,
    background: background,
    border: border,
  };
};

const pallete = [
  palleteCreator('Input & Output', '#A08B8A', '#685B5A'),
  palleteCreator('Block Control', '#D3816B', '#8B5548'),
  palleteCreator('Operations', '#877BAD', '#62597D'),
  palleteCreator('Operations', '#877BAD', '#62597D'),
  palleteCreator('Flow Control', '#6BB3B2', '#558C8B'),
  palleteCreator('Unit Control', '#C7B59D', '#A69784'),
  palleteCreator('World', '#6B84D4', '#4E6099'),
];

export { range, pallete/*, RangeObject, ConfigObjItem, RangeMap*/};
