{
  description = "gnosis-vpn-ui-electron";

  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.nixpkgs.url   = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt-nix.url = "github:numtide/treefmt-nix";

    flake-parts.inputs.nixpkgs-lib.follows = "nixpkgs";
    treefmt-nix.inputs.nixpkgs.follows = "nixpkgs";
  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      flake-parts,
      flake-root,
      treefmt-nix,
      ...
    }@inputs:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        inputs.treefmt-nix.flakeModule
        inputs.flake-root.flakeModule
      ];
      perSystem = { config, lib, system, ... }:
        let
          localSystem = system;
          overlays = [];
          pkgs = import nixpkgs {
            inherit localSystem overlays;
          };

          defaultDevShell = import ./shell.nix { inherit pkgs config; };
        in
        {
          treefmt = {
            inherit (config.flake-root) projectRootFile;

            settings.global.excludes = [
              "LICENSE"
            ];

            programs.prettier.enable = true;
            settings.formatter.prettier.includes = [
              "*.md"
              "*.json"
              "*.ts"
            ];
            settings.formatter.prettier.excludes = [
              "*.yml"
              "*.yaml"
            ];

            programs.nixfmt.enable = true;
          };

          devShells.default = defaultDevShell;

          formatter = config.treefmt.build.wrapper;
        };
      # platforms which are supported as build environments
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];
    };
}
