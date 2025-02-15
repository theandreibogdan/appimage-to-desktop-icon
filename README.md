# AppImage to Desktop Icon 🚀

A professional CLI tool that seamlessly integrates AppImage applications into your Linux desktop environment.

## Features

- 🎯 Automatically creates desktop entries for AppImage applications
- 🖼️ Handles icon integration
- 📂 Manages application placement in /opt
- 🔒 Creates desktop entries in both system and user locations
- 🛠️ Easy to use command-line interface
- 🔑 Secure installation with proper permissions
- 🗑️ Clean uninstallation support
- 🧹 Self-removal capability

## Installation

Install the tool with a single command:

```bash
curl -sSL https://raw.githubusercontent.com/theandreibogdan/appimage-to-desktop-icon/main/install.sh | bash
```

## Usage

```bash
# Install application (requires sudo)
sudo appimage [path_to_appimage] [path_to_icon]

# List installed applications
appimage list

# Remove application (requires sudo)
sudo appimage remove [app_name]

# Remove the tool itself (requires sudo)
sudo appimage uninstall
```

### Examples

```bash
# Install an AppImage
sudo appimage ~/Downloads/MyApp.AppImage ~/Downloads/icon.png

# List all installed applications
appimage list

# Remove an application
sudo appimage remove MyApp

# Remove the tool from your system
sudo appimage uninstall

# Get help
appimage --help
```

## Requirements

- Linux operating system
- Bash shell
- curl (for installation)
- sudo privileges for installation and removal
- Desktop environment (GNOME, KDE, XFCE, etc.)

## How It Works

1. Validates the provided AppImage and icon files
2. Creates necessary directories in /opt
3. Copies the AppImage to /opt with proper permissions
4. Installs the icon in /opt
5. Generates desktop entries in both /usr/share/applications and ~/.local/share/applications
6. Updates desktop database for immediate availability

When uninstalling an application:
1. Removes the AppImage from /opt
2. Removes the icon from /opt
3. Removes desktop entries from both system and user locations
4. Updates the desktop database

## Directory Structure

The tool uses a simplified directory structure:

- AppImages are stored in `/opt/`
- Icons are stored in `/opt/`
- Desktop entries are created in:
  - `/usr/share/applications/` (system-wide)
  - `~/.local/share/applications/` (user-specific)

## Desktop Environment Integration

After installation or uninstallation, the changes should appear in your applications menu. If you don't see the changes immediately:

1. Wait a few seconds for the desktop environment to refresh
2. Log out and log back in
3. For KDE: Run `killall plasmashell && plasmashell &`
4. For GNOME: Press ALT+F2, type 'r' and press Enter, or run `killall -HUP gnome-shell`
5. For XFCE: Run `xfdesktop --reload`
6. For Cinnamon: Run `killall -HUP cinnamon-launcher`
7. For MATE: Run `mate-panel --replace &`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - See LICENSE file for details

## Author

[Andrei Bogdan] - [@theandreibogdan](https://github.com/theandreibogdan)