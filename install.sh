#!/usr/bin/env bash

# Set strict error handling
set -euo pipefail

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to log messages
log() {
    local level=$1
    shift
    case "$level" in
        "error")   echo -e "${RED}[ERROR]${NC} $*" >&2 ;;
        "info")    echo -e "${GREEN}[INFO]${NC} $*" ;;
        "warning") echo -e "${YELLOW}[WARNING]${NC} $*" ;;
    esac
}

# Installation directory
INSTALL_DIR="${HOME}/.local/bin"

# Create installation directory if it doesn't exist
mkdir -p "${INSTALL_DIR}"

# Download the script
log "info" "Downloading AppImage to Desktop Icon tool..."
curl -sSL "https://raw.githubusercontent.com/theandreibogdan/appimage-to-desktop-icon/main/appimage" -o "${INSTALL_DIR}/appimage"

# Make the script executable
chmod +x "${INSTALL_DIR}/appimage"

# Check if ~/.local/bin is in PATH
if [[ ":$PATH:" != *":${INSTALL_DIR}:"* ]]; then
    log "warning" "The directory ${INSTALL_DIR} is not in your PATH."
    log "info" "Adding it to your PATH in ~/.bashrc..."
    
    # Add to PATH in .bashrc if not already there
    if ! grep -q "export PATH=\"\$PATH:${INSTALL_DIR}\"" ~/.bashrc; then
        echo "export PATH=\"\$PATH:${INSTALL_DIR}\"" >> ~/.bashrc
        log "info" "Please restart your terminal or run: source ~/.bashrc"
    fi
fi

log "info" "Installation completed successfully!"
log "info" "You can now use the 'appimage' command to integrate AppImage applications."
log "info" "Run 'appimage --help' for usage instructions." 