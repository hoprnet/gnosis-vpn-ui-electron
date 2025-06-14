{
  pkgs ? import <nixpkgs> { },
  ...
}:
let
  linuxPkgs = with pkgs; lib.optional stdenv.isLinux (inotifyTools);
  macosPkgs =
    with pkgs;
    lib.optional stdenv.isDarwin ([
      # macOS file watcher support
      apple-sdk_15
    ]);
in
with pkgs;
mkShell {
  buildInputs = [
    envsubst
    nodejs_22
    (yarn.override { nodejs = nodejs_22; })
    macosPkgs
    linuxPkgs
    curl
  ];
}
