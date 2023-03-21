import { equals, length, inc, toString, toPairs } from "ramda";

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

function yamlToEnv(json: unknown[], env = "", index = 0): string {
  if (equals(index, length(json))) {
    return env;
  }
  const configMap = json[index];
  if (
    configMap &&
    typeof configMap === "object" &&
    "kind" in configMap &&
    "data" in configMap &&
    configMap.data &&
    typeof configMap.data === "object"
  ) {
    const isSecret = equals(configMap.kind, "Secret");
    const pairs = toPairs(configMap.data);
    const newLine = equals(index, 0) ? env : `${env}\n`;
    const newEnv = `${newLine}${jsonToEnv(pairs, isSecret)}`;
    return yamlToEnv(json, newEnv, inc(index));
  }
  return env;
}

const EXPORTS = {
  decodeBase64,
  jsonToEnv,
  yamlToEnv,
};

export default EXPORTS;
