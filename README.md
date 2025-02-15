# AppImage to Desktop Icon 🚀

CLI tool that seamlessly integrates AppImage applications into your Linux desktop environment.

## Features

- 🎯 Automatically creates desktop entries for AppImage applications
- 🖼️ Handles icon integration
- 📂 Manages application placement in the correct system directories
- 🔒 Follows XDG Base Directory specifications
- 🛠️ Easy to use command-line interface
- 🔑 Supports both user-level and system-wide installations

## Installation

Install the tool with a single command:

```bash
curl -sSL https://raw.githubusercontent.com/theandreibogdan/appimage-to-desktop-icon/main/install.sh | bash
```

## Usage

```bash
# User installation (recommended)
appimage [path_to_appimage] [path_to_icon]

# System-wide installation (requires sudo)
sudo appimage --root [path_to_appimage] [path_to_icon]
```

### Examples

```bash
# Basic usage with an AppImage and icon (user installation)
appimage ~/Downloads/MyApp.AppImage ~/Downloads/icon.png

# System-wide installation
sudo appimage --root ~/Downloads/MyApp.AppImage ~/Downloads/icon.png

# Get help
appimage --help
```

## Requirements

- Linux operating system
- Bash shell
- curl (for installation)
- Basic user permissions for local installations
- sudo privileges for system-wide installations

## How It Works

1. Validates the provided AppImage and icon files
2. Creates necessary directory structures
3. Copies the AppImage to the applications directory
4. Installs the icon in the appropriate location
5. Generates and installs the .desktop file
6. Updates desktop database for immediate availability

## Directory Structure

The tool follows the XDG Base Directory specification:

For user installations:
- AppImages are stored in `~/.local/bin/`
- Icons are stored in `~/.local/share/icons/`
- Desktop entries are created in `~/.local/share/applications/`

For system-wide installations:
- AppImages are stored in `/usr/local/bin/`
- Icons are stored in `/usr/share/icons/`
- Desktop entries are created in `/usr/share/applications/`

## Desktop Environment Integration

After installation, the application should appear in your applications menu. If it doesn't appear immediately:

1. Wait a few seconds for the desktop environment to refresh
2. Log out and log back in
3. For KDE: Run `killall plasmashell && plasmashell &`
4. For GNOME: Press ALT+F2, type 'r' and press Enter, or run `killall gnome-shell`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - See LICENSE file for details

## Author

[Andrei Bogdan] - [@theandreibogdan](https://github.com/theandreibogdan)