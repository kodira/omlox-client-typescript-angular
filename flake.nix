{
  description = "Development environment for OMLOX TypeScript Angular client library";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_24
          ];

          shellHook = ''
            echo "OMLOX Angular client library development environment"
            echo "Node: $(node --version)"
            echo "npm: $(npm --version)"
            echo ""
            if [ ! -d "node_modules" ]; then
              echo "Installing dependencies..."
              npm install
            fi
            echo ""
            echo "Available npm scripts:"
            npm run
          '';
        };
      }
    );
}
