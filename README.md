# GitHub Contribution Widget

A cross-platform mobile widget showing GitHub contribution graphs for iOS and Android. Built with React Native.

## Features

- Real-time GitHub contribution graph display
- Support for both iOS and Android platforms
- Automatic updates every 6 hours
- Configurable GitHub username
- Offline support with caching

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Pouetpouets/github-contribution-widget.git
cd github-contribution-widget
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Setup your GitHub token:
Create a `.env` file in the root directory and add your GitHub token:
```
GITHUB_TOKEN=your_token_here
```

## Running the Project

### iOS
```bash
cd ios
pod install
cd ..
npm run ios
```

### Android
```bash
npm run android
```

## Testing

```bash
npm test
```

## Project Structure

```
├── src/
│   ├── components/          # React Native components
│   ├── services/            # API and business logic
│   ├── utils/              # Helper functions
│   └── widgets/            # Platform-specific widget implementations
├── ios/                    # iOS native code
└── android/                # Android native code
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.