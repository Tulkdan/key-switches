import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.92.0/testing/asserts.ts";
import {
  createKeySwitch,
  deleteSwitchById,
  getAllKeySwitches,
  getSwitchById,
} from "../src/fauna.ts";
import { IKeySwitch } from "../src/interfaces.ts";

let id: string;

const switchTest: IKeySwitch = {
  actuationForce: "100cN",
  brand: "Test",
  compatibility: "MX",
  name: "Switch Testing",
  pcbMounted: "no",
  type: "Linear",
};

Deno.test({
  name: "Listing all switches from faunaDB",
  async fn(): Promise<void> {
    const { switches } = await getAllKeySwitches();
    assert(Array.isArray(switches));
    assertEquals(switches.length, 20);
  },
});

Deno.test({
  name: "Inserting switch into database (faunaDB)",
  async fn(): Promise<void> {
    const result = await createKeySwitch(switchTest);
    assert("data" in result, "couldn't insert switch into db");

    assert(result.data?._id);
    id = result.data?._id;
  },
});

Deno.test({
  name: "Checking for inserted switch",
  async fn(): Promise<void> {
    assert(id, "ID variable is not set");

    const switchInfo = await getSwitchById(id);
    assert("switch" in switchInfo, "couldn't find switch on database");

    assertEquals(switchInfo.switch, switchTest);
  },
});

Deno.test({
  name: "Deleting inserted switch for testing",
  async fn(): Promise<void> {
    assert(id, "ID variable is not set");

    const switchDeleted = await deleteSwitchById(id);
    assert("data" in switchDeleted, "couldn't delete switch on database");

    assertEquals(switchDeleted.data, switchTest);
  },
});
