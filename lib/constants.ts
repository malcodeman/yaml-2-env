const CONFIG_MAP = `apiVersion: v1
kind: ConfigMap
metadata:
  name: api
data:
  PASSWORD: "hunter2"
`;
const GITHUB_PROFILE = "https://github.com/malcodeman";
const GITHUB_REPO = "https://github.com/malcodeman/yaml-2-env";
const EXPORTS = { CONFIG_MAP, GITHUB_PROFILE, GITHUB_REPO };

export default EXPORTS;
