import React from "react";
import jsyaml from "js-yaml";

function App() {
  const [yaml, setYaml] = React.useState("");
  const [env, setEnv] = React.useState("");
  const [error, setError] = React.useState("");

  function decodeBase64(encoded) {
    return window.atob(encoded);
  }

  function jsonToEnv(json, fun) {
    let env = "";

    for (const [key, value] of Object.entries(json)) {
      if (typeof fun === "function") {
        env += `${key}=${fun(value)}\n`;
      } else {
        env += `${key}=${value}\n`;
      }
    }

    return env;
  }

  function parseYaml(json) {
    const configMap = json[0];
    const secret = json[1];
    const configMapData = configMap.data;
    const configMapDataEnv = jsonToEnv(configMapData);

    if (secret) {
      const secretData = secret.data;
      const secretDataEnv = jsonToEnv(secretData, decodeBase64);

      return `${configMapDataEnv}\n${secretDataEnv}`;
    }

    return configMapDataEnv;
  }

  function handleOnChange(e) {
    const value = e.currentTarget.value;

    setYaml(value);
    try {
      const json = jsyaml.safeLoadAll(value);
      const env = parseYaml(json);

      setEnv(env);
    } catch (error) {
      setError(error);
      setYaml(value);
      setEnv("");
    }
  }

  return (
    <div>
      <div>
        {error && error.message ? <span>Error: {error.message}</span> : null}
        <p>YAML</p>
        <textarea value={yaml} onChange={handleOnChange} />
      </div>
      <div>
        <p>Env</p>
        <textarea value={env} readOnly />
      </div>
    </div>
  );
}

export default App;
