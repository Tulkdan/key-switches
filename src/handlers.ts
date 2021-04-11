import { validateRequest, json } from "../deps.ts"
import { createKeySwitch, getAllKeySwitches } from "./fauna.ts"

export async function handleSwitches(request: Request) {
  const { error, body } = await validateRequest(request, {
    GET: {},
    POST: {
      body: [
        "name",
        "type",
        "brand",
        "compatibility",
        "actuationForce",
        "pcbMounted",
      ],
    },
  });

  if (error) {
    return json({ error: error.message }, { status: error.status });
  }

  if (request.method === "POST") {
    const {
      data,
      error,
    } = await createKeySwitch(
      body as {
        name: string;
        type: string;
        brand: string;
        compatibility: string;
        actuationForce: string;
        pcbMounted: string;
      },
    );
    if (error) {
      return json({ message: "couldn't create the quote", error }, { status: 500 });
    }
    return json({ ...data }, { status: 201 });
  }

  {
    const { switches, error } = await getAllKeySwitches();
    if (error) {
      return json(
        { error: "couldn't fetch the quotes" },
        { status: 500 },
      );
    }

    return json({ switches });
  }
}