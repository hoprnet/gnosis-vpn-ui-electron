import { platform, arch } from "node:process";
import { homedir } from "os";
import { promises as fs } from "fs";
import { spawn, ChildProcess } from "child_process";
import { join } from "node:path";

const version = "v0.10.10";

const configFileTemplate = `
version = 2

[hoprd_node]
endpoint = "<ENDPOINT>"
api_token = "<API_TOKEN>"

internal_connection_port = <PORT>

[destinations]

[destinations.12D3KooWMEXkxWMitwu9apsHmjgDZ7imVHgEsjXfcyZfrqYMYjW7]
meta = { location = "Germany" }
path = { intermediates = [ "12D3KooWFUD4BSzjopNzEzhSi9chAkZXRKGtQJzU482rJnyd2ZnP" ] }

[destinations.12D3KooWBRB3y81TmtqC34JSd61uS8BVeUqWxCSBijD5nLhL6HU5]
meta = { location = "USA" }
path = { intermediates = [ "12D3KooWQLTR4zdLyXToQGx3YKs9LJmeL4MKJ3KMp4rfVibhbqPQ" ] }

[destinations.12D3KooWGdcnCwJ3645cFgo4drvSN3TKmxQFYEZK7HMPA6wx1bjL]
meta = { location = "Spain" }
path = { intermediates = [ "12D3KooWFnMnefPQp2k3XA3yNViBH4hnUCXcs9LasLUSv6WAgKSr" ] }

[destinations.12D3KooWJVhifJNJQPDSYz5aC8hWEyFdgB3xdJyKYQoPYLn4Svv8]
meta = { location = "India" }
path = { intermediates = [ "12D3KooWFcTznqz9wEvPFPsTTXDVtWXtPy8jo4AAUXHUqTW8fP2h" ] }
`;

export async function updateConfigFile(
  endpoint: string,
  api_token: string,
): Promise<void> {
  const port = "9095";

  const config = configFileTemplate
    .replace("<ENDPOINT>", endpoint)
    .replace("<API_TOKEN>", api_token)
    .replace("<PORT>", port);

  await writeConfig(config);
}

export function stopService(process: ChildProcess): void {
  process.kill();
}

export function startService(): ChildProcess {
  return executeBinary(
    vpnServiceBinaryPath(),
    ["-c", configFilePath()],
    (data) => {
      console.info("Service log output:", data);
    },
    (error) => {
      console.error("Error starting VPN service:", error);
    },
  );
}

export function getStatusInfo(): Promise<string> {
  return executeCommand(vpnControlBinaryPath(), ["status"]);
}

export async function connectToServer(server: string): Promise<boolean> {
  await executeCommand(vpnControlBinaryPath(), ["connect", server]);
  return true;
}

export async function disconnectToServer(server: string): Promise<boolean> {
  await executeCommand(vpnControlBinaryPath(), ["disconnect", server]);
  return true;
}

function isValidOsArchitecture() {
  const validArchitectures = ["x64", "arm64"];
  const validPlatforms = ["darwin", "linux"];

  return validArchitectures.includes(arch) && validPlatforms.includes(platform);
}

function vpnBinaryName(suffix: string = ""): string {
  if (!isValidOsArchitecture()) {
    throw new Error(`Unsupported OS or architecture: ${platform}-${arch}`);
  }
  const binaryArch = arch === "x64" ? "x86_64" : "arm64";
  const fullSuffix = suffix ? `-${suffix}` : "";
  // Result: gnosis_vpn[-ctl]-x86_64-darwin
  return `gnosis_vpn${fullSuffix}-${binaryArch}-${platform}`;
}

function vpnServiceBinaryPath() {
  return join(__dirname, "..", "binaries", version, vpnBinaryName());
}

function vpnControlBinaryPath() {
  return join(__dirname, "..", "binaries", version, vpnBinaryName("ctl"));
}

function executeBinary(
  command: string,
  args: string[] = [],
  onOutput: (data: string) => void,
  onError?: (error: string) => void,
): ChildProcess {
  const process = spawn(command, args);

  process.stdout?.on("data", (data: Buffer) => {
    onOutput(data.toString());
  });

  if (onError) {
    process.stderr?.on("data", (data: Buffer) => {
      onError(data.toString());
    });
  }

  return process;
}

function executeCommand(command: string, args: string[] = []): Promise<string> {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args);
    let output = "";
    let errorOutput = "";

    process.stdout?.on("data", (data: Buffer) => {
      output += data.toString();
    });

    process.stderr?.on("data", (data: Buffer) => {
      errorOutput += data.toString();
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`Command failed with code ${code}: ${errorOutput}`));
      }
    });

    process.on("error", (error) => {
      reject(error);
    });
  });
}

function configDir(): string {
  return join(homedir(), ".config", "gnosis_vpn");
}

function configFilePath(): string {
  return join(configDir(), "config.toml");
}

async function writeConfig(configContent: string): Promise<void> {
  await fs.mkdir(configDir(), { recursive: true });
  await fs.writeFile(configFilePath(), configContent, "utf8");
}
