const CONFIG_MAP = `
apiVersion: v1
kind: ConfigMap
metadata:
  name: api
data:
  PASSWORD: "hunter2"
`;
const EXPORTS = { CONFIG_MAP };

export default EXPORTS;
