import React from "react";
import {
  Anchor,
  Center,
  Container,
  SimpleGrid,
  Text,
  Textarea,
  Flex,
  Tooltip,
} from "@mantine/core";
import Head from "next/head";
import { toString } from "ramda";
import jsyaml from "js-yaml";
import { useClipboard } from "@mantine/hooks";
import { FiCopy, FiCheck } from "react-icons/fi";
import type { NextPage } from "next";

import constants from "../lib/constants";
import utils from "../lib/utils";

const envInitial = utils.yamlToEnv([constants.CONFIG_MAP]);

const Home: NextPage = () => {
  const [yaml, setYaml] = React.useState(JSON.stringify(constants.CONFIG_MAP));
  const [env, setEnv] = React.useState(envInitial);
  const [error, setError] = React.useState("");
  const clipboard = useClipboard({ timeout: 2000 });

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.currentTarget.value;
    setYaml(value);
    try {
      setError("");
      setEnv(utils.yamlToEnv(jsyaml.loadAll(value)));
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
              minRows={10}
              error={error}
              value={yaml}
              onChange={handleOnChange}
            />
            <Tooltip
              withArrow
              position="top-end"
              bg="dark.6"
              color="dark.0"
              opened
              label={
                clipboard.copied ? (
                  <Flex align="center">
                    <FiCheck
                      color="#51cf66"
                      style={{ marginRight: "0.625rem" }}
                    />
                    Copied to clipboard
                  </Flex>
                ) : (
                  <>
                    <FiCopy /> Click to copy
                  </>
                )
              }
            >
              <Textarea
                label=".env"
                radius={"md"}
                variant={"default"}
                minRows={10}
                value={env}
                readOnly
                onClick={() => clipboard.copy(env)}
              />
            </Tooltip>
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
