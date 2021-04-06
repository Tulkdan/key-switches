import { IKeySwitch } from "./interfaces.ts";

export async function createKeySwitch(
  {
    name,
    type,
    brand,
    compatibility,
    actuationForce,
    pcbMounted,
  }: IKeySwitch,
): Promise<
  {
    name?: string;
    type?: string;
    brand?: string;
    compatibility?: string;
    actuationForce?: string;
    pcbMounted?: string;
    error?: string;
  }
> {
  const query = `
    mutation($name: String!, $type: String!, $brand: String!, $compatibility: String!, $actuationForce: String!, $pcbMounted: String!) {
      createKeySwitch(data: {
        name: $name,
        type: $type,
        brand: $brand,
        compatibility: $compatibility,
        actuationForce: $actuationForce,
        pcbMounted: $pcbMounted,
      }) {
        name,
        type,
        brand,
        compatibility,
        actuationForce,
        pcbMounted,
      }
    }
  `;

  const { data, error } = await queryFauna<any>(query, {
    name,
    type,
    brand,
    compatibility,
    actuationForce,
    pcbMounted,
  });

  if (error) {
    return { error };
  }

  return data;
}

export async function getAllKeySwitches() {
  const query = `
    query {
      allKeysSwitches {
        data {
          name,
          type,
          brand,
          compatibility,
          actuationForce,
          pcbMounted,
        }
      }
    }
  `;

  const {
    data,
    error,
  } = await queryFauna<{ allKeysSwitches: { data: IKeySwitch } }>(query, {});

  if (error) {
    return { error };
  }

  return { switches: data?.allKeysSwitches.data };
}

async function queryFauna<T>(
  query: string,
  variables: { [key: string]: unknown },
): Promise<{
  data?: T;
  error?: any;
}> {
  // Grabbing the secret from env
  const token = Deno.env.get("FAUNA_SECRET");
  if (!token) {
    throw new Error("environment variable FAUNA_SECRET not set");
  }

  try {
    // Make a POST request to fauna's graphql endpoint with body being
    // the query and its variables
    const res = await fetch("https://graphql.fauna.com/graphql", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const { data, errors } = await res.json();
    if (errors) {
      return { data, error: errors[0] };
    }

    return { data };
  } catch (error) {
    return { error };
  }
}
