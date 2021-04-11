export interface IKeySwitch {
  name: string;
  type: string;
  brand: string;
  compatibility: string;
  actuationForce: string;
  pcbMounted: string;
}

export interface IKeySwitchDB extends IKeySwitch {
  _id: string;
}