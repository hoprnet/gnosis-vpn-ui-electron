import { platform, arch } from "node:process";
import { spawn, ChildProcess } from "child_process";

const version = "v0.10.10";

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

import { platform, arch } from "node:process";
import { join } from "node:path";

function vpnServiceBinaryPath() {
  return join(__dirname, "binaries", version, vpnBinaryName());
}

function vpnControlBinaryPath() {
  return join(__dirname, "binaries", version, vpnBinaryName("ctl"));
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
