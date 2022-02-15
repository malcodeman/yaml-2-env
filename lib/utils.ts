import jsyaml from "js-yaml";
import { equals, length, inc, toString, prop, or, and } from "ramda";

function decodeBase64(encoded: string) {
  return Buffer.from(encoded, "base64");
}

function jsonToEnv(
  entries: [string, unknown][],
  isSecret = false,
  env = "",
  index = 0
): string {
  if (equals(index, length(entries))) {
    return env;
  } else {
    const [key, value] = entries[index];
    return jsonToEnv(
      entries,
      isSecret,
      (env += `${key}=${isSecret ? decodeBase64(toString(value)) : value}\n`),
      inc(index)
    );
  }
}

function yamlToEnv(value: string) {
  const json = jsyaml.loadAll(value);
  const configMap = Array.isArray(json) ? json[0] : json;
  const isSecret = Boolean(
    and(equals(configMap.kind, "Secret"), prop("data", configMap))
  );
  const configMapData = or(
    prop("data", configMap),
    prop("stringData", configMap)
  );
  return jsonToEnv(Object.entries(configMapData), isSecret);
}

const EXPORTS = {
  decodeBase64,
  jsonToEnv,
  yamlToEnv,
};

export default EXPORTS;
