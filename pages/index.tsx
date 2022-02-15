import React from "react";
import { Center, Container, SimpleGrid, Textarea } from "@mantine/core";
import jsyaml from "js-yaml";
import Head from "next/head";
import { toString } from "ramda";
import type { NextPage } from "next";

import constants from "../lib/constants";

const Home: NextPage = () => {
  const [yaml, setYaml] = React.useState(constants.CONFIG_MAP);
  const [env, setEnv] = React.useState(
    parseYaml(jsyaml.loadAll(constants.CONFIG_MAP))
  );
  const [error, setError] = React.useState("");

  function jsonToEnv(json = {}, env = "", length = 0): string {
    const entries = Object.entries(json);
    if (length === entries.length) {
      return env;
    } else {
      const [key, value] = entries[length];
      return jsonToEnv(json, (env += `${key}=${value}\n`), length + 1);
    }
  }

  function parseYaml(json: unknown[]) {
    const configMap = Array.isArray(json) ? json[0] : json;
    const configMapData = configMap.data;
    const configMapDataEnv = jsonToEnv(configMapData);
    return configMapDataEnv;
  }

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.currentTarget.value;
    setYaml(value);
    try {
      const json = jsyaml.loadAll(value);
      const env = parseYaml(json);
      setError("");
      setEnv(env);
    } catch (error) {
      setError(toString(error));
      setEnv("");
    }
  }

  return (
    <div>
      <Head>
        <title>YAML 2 env</title>
        <meta name="description" content="Simple YAML to .env convertor." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center sx={{ minHeight: "100vh" }}>
        <Container size={"md"} sx={{ width: "100%" }}>
          <SimpleGrid sx={{ gridTemplateColumns: "1fr 1fr" }} spacing={"xl"}>
            <Textarea
              label="YAML"
              minRows={6}
              error={error}
              value={yaml}
              onChange={handleOnChange}
            />
            <Textarea label=".env" minRows={6} value={env} readOnly />
          </SimpleGrid>
        </Container>
      </Center>
    </div>
  );
};

export default Home;
