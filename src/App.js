import React from "react";
import jsyaml from "js-yaml";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import { Textarea } from "./components/textarea";
import { FormControl } from "./components/form-control";

import theme from "./components/themes/darkTheme";
import GlobalStyle from "./GlobalStyle";

const Wrapper = styled.div`
  padding: 1rem;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.backgroundPrimary};
  @media (min-width: 576px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 992px;
  @media (min-width: 576px) {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledTextarea = styled(Textarea)`
  min-height: 128px;
  @media (min-width: 576px) {
    min-height: 256px;
  }
`;

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

      setError("");
      setEnv(env);
    } catch (error) {
      setError(error);
      setYaml(value);
      setEnv("");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Container>
          <div>
            <FormControl
              label="YAML"
              caption={error && error.message}
              error={Boolean(error)}
            >
              <StyledTextarea value={yaml} onChange={handleOnChange} />
            </FormControl>
          </div>
          <div>
            <FormControl label=".env">
              <StyledTextarea value={env} readOnly />
            </FormControl>
          </div>
        </Container>
      </Wrapper>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
