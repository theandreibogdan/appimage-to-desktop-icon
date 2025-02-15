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

# Function to check and install dependencies
check_dependencies() {
    local missing_deps=()
    local pkg_manager=""
    local install_cmd=""
    
    # Detect package manager
    if command -v apt-get >/dev/null 2>&1; then
        pkg_manager="apt"
        install_cmd="apt-get install -y"
    elif command -v dnf >/dev/null 2>&1; then
        pkg_manager="dnf"
        install_cmd="dnf install -y"
    elif command -v yum >/dev/null 2>&1; then
        pkg_manager="yum"
        install_cmd="yum install -y"
    elif command -v pacman >/dev/null 2>&1; then
        pkg_manager="pacman"
        install_cmd="pacman -S --noconfirm"
    elif command -v zypper >/dev/null 2>&1; then
        pkg_manager="zypper"
        install_cmd="zypper install -y"
    else
        log "error" "No supported package manager found. Please install dependencies manually: curl, file, desktop-file-utils, gtk-update-icon-cache"
        exit 1
    fi
    
    # Check for required commands
    for cmd in curl file update-desktop-database gtk-update-icon-cache; do
        if ! command -v "$cmd" >/dev/null 2>&1; then
            case "$cmd" in
                "curl") missing_deps+=("curl") ;;
                "file") missing_deps+=("file") ;;
                "update-desktop-database") 
                    case "$pkg_manager" in
                        "apt") missing_deps+=("desktop-file-utils") ;;
                        "dnf"|"yum") missing_deps+=("desktop-file-utils") ;;
                        "pacman") missing_deps+=("desktop-file-utils") ;;
                        "zypper") missing_deps+=("desktop-file-utils") ;;
                    esac
                    ;;
                "gtk-update-icon-cache")
                    case "$pkg_manager" in
                        "apt") missing_deps+=("gtk-update-icon-cache") ;;
                        "dnf"|"yum") missing_deps+=("gtk-update-icon-cache") ;;
                        "pacman") missing_deps+=("gtk3") ;;
                        "zypper") missing_deps+=("gtk3-tools") ;;
                    esac
                    ;;
            esac
        fi
    done
    
    # Install missing dependencies if any
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log "warning" "Missing required dependencies: ${missing_deps[*]}"
        if [ "$EUID" -ne 0 ]; then
            log "info" "Please run: sudo $install_cmd ${missing_deps[*]}"
            exit 1
        else
            log "info" "Installing missing dependencies..."
            $install_cmd "${missing_deps[@]}"
        fi
    fi
}

# Check dependencies before proceeding
check_dependencies

# Installation directory
INSTALL_DIR="${HOME}/.local/bin"

# Create installation directory if it doesn't exist
mkdir -p "${INSTALL_DIR}"

# Download the script
log "info" "Downloading AppImage to Desktop Icon tool..."
curl -sSL "https://raw.githubusercontent.com/theandreibogdan/appimage-to-desktop-icon/main/appimage" -o "${INSTALL_DIR}/appimage"

# Convert CRLF to LF (fix line endings)
if command -v dos2unix >/dev/null 2>&1; then
    dos2unix "${INSTALL_DIR}/appimage" >/dev/null 2>&1
else
    tr -d '\r' < "${INSTALL_DIR}/appimage" > "${INSTALL_DIR}/appimage.tmp"
    mv "${INSTALL_DIR}/appimage.tmp" "${INSTALL_DIR}/appimage"
fi

# Make the script executable
chmod +x "${INSTALL_DIR}/appimage"

# Add to PATH based on shell
add_to_path() {
    local shell_rc="$1"
    local path_entry="export PATH=\"\$PATH:${INSTALL_DIR}\""
    
    if [ -f "$shell_rc" ]; then
        if ! grep -q "export PATH.*${INSTALL_DIR}" "$shell_rc"; then
            echo "$path_entry" >> "$shell_rc"
            log "info" "Added to PATH in $shell_rc"
        fi
    fi
}

# Handle different shells
if [ -n "$SHELL" ]; then
    case "$SHELL" in
        */bash) add_to_path "${HOME}/.bashrc" ;;
        */zsh)  add_to_path "${HOME}/.zshrc" ;;
        */fish) 
            fish_path="${HOME}/.config/fish/config.fish"
            mkdir -p "$(dirname "$fish_path")"
            echo "set -gx PATH \$PATH ${INSTALL_DIR}" >> "$fish_path"
            ;;
    esac
else
    # Fallback to .profile
    add_to_path "${HOME}/.profile"
fi

log "info" "Installation completed successfully!"
log "info" "You can now use the 'appimage' command to integrate AppImage applications."
log "info" "Run 'appimage --help' for usage instructions."
log "warning" "Please restart your terminal or run: source ~/.bashrc (or your shell's rc file)" 