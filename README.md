# TrustSeal (Authentify v2.0)

TrustSeal is a modern React Native application built with **Expo**, designed to provide robust authentication, business verification, and agent management features. This project utilizes the **Expo Router** for navigation and **NativeWind** for styling, ensuring a seamless and beautiful user experience across key workflows like verification, business insights, and system status monitoring.

## 🚀 Features

- **Agent Management**: Dedicated tools for managing agents (`app/(drawer)/agents.tsx`).
- **Business Logic**: Detailed business profiles and insights (`app/business/[id].tsx`).
- **Verification System**: Streamlined verification processes (`app/(drawer)/verify.tsx`).
- **System Status**: Real-time monitoring of system health (`app/(drawer)/system-status.tsx`).
- **Admin Dashboard**: Comprehensive administrative controls (`app/(drawer)/admin.tsx`).
- **Settings & Profile**: User customization and profile management.
- **Drawer Navigation**: Easy access to all main sections of the app.

## 🛠 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (SDK 54)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) v6
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native) & Expo Vector Icons
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: (LTS version recommended) [Download Node.js](https://nodejs.org/)
- **npm** or **yarn**: Package manager.
- **Expo Go App**:
    - [Android (Play Store)](https://play.google.com/store/apps/details?id=host.exp.exponent)
    - [iOS (App Store)](https://apps.apple.com/us/app/expo-go/id982107779)

## 📦 Installation

1.  **Clone the repository** (if applicable):
    ```bash
    git clone <repository-url>
    cd Authentify v2.0
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

## 🏃‍♂️ Running the App

You can run the application on a physical device, an emulator, or in the browser.

### Option 1: Expo Go (Wireless - Recommended for Quick Testing)

This is the easiest way to test the app on your physical device.

1.  **Start the development server**:
    ```bash
    npx expo start
    ```
    *Note: If you have issues with LAN/Network, try tunneling:*
    ```bash
    npx expo start --tunnel
    ```

2.  **Open on your device**:
    - **Android**: Open the **Expo Go** app and scan the QR code displayed in your terminal.
    - **iOS**: Open the standard **Camera** app and scan the QR code.

### Option 2: USB Debugging (Wired - Best for Stability)

Useful if your Wi-Fi is unstable or for better performance.

**For Android Devices:**

1.  **Enable Developer Mode**:
    - Go to `Settings` > `About Phone`.
    - Tap `Build Number` 7 times to enable Developer Options.
2.  **Enable USB Debugging**:
    - Go to `Settings` > `System` > `Developer Options`.
    - Toggle on `USB debugging`.
3.  **Connect your device** to your computer via USB.
4.  **Run the app**:
    ```bash
    npx expo run:android
    ```
    *Alternatively, you can just use `npx expo start` and press `a` in the terminal if your device is connected and recognized by ADB.*

**For iOS Devices (requires Mac):**

1.  Connect your iPhone/iPad to your Mac.
2.  Run:
    ```bash
    npx expo run:ios
    ```
    *Or use `npx expo start` and press `i`.*

### Option 3: Web Browser

Run the app as a progressive web app (PWA).

```bash
npm run start-web
```
This will open the app in your default browser at `http://localhost:8080`.

## 📂 Project Structure

```text
/
├── app/                  # Expo Router pages and layouts
│   ├── (drawer)/         # Drawer navigation group
│   │   ├── _layout.tsx   # Drawer layout configuration
│   │   ├── agents.tsx    # Agents screen
│   │   └── ...
│   ├── business/         # Business dynamic routes
│   └── _layout.tsx       # Root layout
├── assets/               # Images and fonts
├── components/           # Reusable React components
├── constants/            # Configuration constants (Colors, etc.)
├── hooks/                # Custom React hooks
├── store/                # Zustand state stores
├── utils/                # Helper functions and API services
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
└── ...
```

## 🔧 Key Scripts

- `npm start`: Starts the Expo development server.
- `npm run start-web`: Starts the Web version specifically.
- `npm run android`: Shortcuts to run on Android.
- `npm run ios`: Shortcuts to run on iOS.
- `npm run lint`: Runs the linter.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.
