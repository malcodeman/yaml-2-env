import React from "react";
import jsyaml from "js-yaml";

function App() {
  const [yaml, setYaml] = React.useState("");
  const [env, setEnv] = React.useState("");
  const [error, setError] = React.useState("");

  function jsonToEnv(json) {
    // TODO
    return JSON.stringify(json);
  }

  function handleOnChange(e) {
    const value = e.currentTarget.value;

    setYaml(value);
    try {
      const json = jsyaml.load(value);
      const env = jsonToEnv(json);

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
