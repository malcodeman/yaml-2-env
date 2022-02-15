import jsyaml from "js-yaml";
import { equals, length, inc } from "ramda";

function decodeBase64(encoded: string) {
  return window.atob(encoded);
}

function jsonToEnv(entries: [string, unknown][], env = "", index = 0): string {
  if (equals(index, length(entries))) {
    return env;
  } else {
    const [key, value] = entries[index];
    return jsonToEnv(entries, (env += `${key}=${value}\n`), inc(index));
  }
}

function yamlToEnv(value: string) {
  const json = jsyaml.loadAll(value);
  const configMap = Array.isArray(json) ? json[0] : json;
  const configMapData = configMap.data;
  const configMapDataEnv = jsonToEnv(Object.entries(configMapData));
  return configMapDataEnv;
}

const EXPORTS = {
  decodeBase64,
  jsonToEnv,
  yamlToEnv,
};

export default EXPORTS;
