import React from "react";
import {
  Anchor,
  Center,
  Container,
  SimpleGrid,
  Text,
  Textarea,
} from "@mantine/core";
import Head from "next/head";
import { toString } from "ramda";
import type { NextPage } from "next";

import constants from "../lib/constants";
import utils from "../lib/utils";

const envInitial = utils.yamlToEnv(constants.CONFIG_MAP);

const Home: NextPage = () => {
  const [yaml, setYaml] = React.useState(constants.CONFIG_MAP);
  const [env, setEnv] = React.useState(envInitial);
  const [error, setError] = React.useState("");

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.currentTarget.value;
    setYaml(value);
    try {
      setError("");
      setEnv(utils.yamlToEnv(value));
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
          <SimpleGrid
            sx={() => ({
              gridTemplateColumns: "1fr",
              "@media (min-width: 576px)": {
                gridTemplateColumns: "1fr 1fr",
              },
            })}
            spacing={"xl"}
            mb={"xl"}
          >
            <Textarea
              label="YAML"
              radius={"md"}
              variant={"default"}
              minRows={6}
              error={error}
              value={yaml}
              onChange={handleOnChange}
            />
            <Textarea
              label=".env"
              radius={"md"}
              variant={"default"}
              minRows={6}
              value={env}
              readOnly
            />
          </SimpleGrid>
          <Text align={"center"}>
            Made by{" "}
            <Anchor href={constants.GITHUB_PROFILE} target="_blank">
              malcodeman
            </Anchor>{" "}
            -{" "}
            <Anchor href={constants.GITHUB_REPO} target="_blank">
              repo
            </Anchor>
          </Text>
        </Container>
      </Center>
    </div>
  );
};

export default Home;
