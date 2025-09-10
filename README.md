# FakeChat - Modern Chat Application

[![React](https://img.shields.io/badge/React-v18-blue.svg)](https://reactjs.org)
[![Redux](https://img.shields.io/badge/Redux-v8-green.svg)](https://redux.js.org)
[![MUI](https://img.shields.io/badge/MUI-v5-orange.svg)](https://mui.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-v4-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Project Overview

FakeChat is a modern chat application built with React and Redux, featuring real-time messaging, voice support, and a clean, professional UI. This project serves as a showcase of modern web development practices and technologies.

## 📚 Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Component Documentation](#component-documentation)
- [API Reference](#api-reference)
- [State Management](#state-management)
- [Styling Guidelines](#styling-guidelines)
- [Testing](#testing)
- [Browser Support](#browser-support)
- [Version History](#version-history)
- [Contributing](#contributing)
- [License](#license)
- [Future Improvements](#future-improvements)

## Features

- Real-time messaging interface
- Powered by Mistral AI's advanced language model
- Voice message support
- User authentication and profile management
- Modern Material-UI design
- Responsive layout
- Customizable chat interface
- Voice-to-text functionality
- User avatars and badges

## 🛠️ Technologies

### Core
- **React 18** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **React Router** - Navigation and routing

### UI Components & Styling
- **Material-UI v5** - Component library
- **Emotion/Styled Components** - CSS-in-JS solution
- **SCSS** - CSS preprocessor for custom styles

### Development Tools
- **Vite** - Build tool and development server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Jest & React Testing Library** - Testing framework

### API & Data
- **Axios** - HTTP client
- **WebSocket** - Real-time communication
- **Mistral AI** - Advanced language model for chat interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher) or Yarn (v1.22 or higher)
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kiszuriwalilibori/FakeChat.git
   cd FakeChat
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Or using Yarn
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=your_api_url_here
   VITE_WS_URL=your_websocket_url_here
   ```

4. **Start the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Or using Yarn
   yarn dev
   ```

5. The application will be available at `http://localhost:3000`

### Development Workflow

1. **Branching Strategy**
   - `main` - Production-ready code
   - `develop` - Development branch
   - `feature/*` - New features
   - `bugfix/*` - Bug fixes
   - `hotfix/*` - Critical production fixes

2. **Commit Message Format**
   ```
   type(scope): short description
   
   [optional body]
   
   [optional footer]
   ```
   
   Types:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes
   - `refactor`: Code refactoring
   - `test`: Adding tests
   - `chore`: Build process or tooling changes

## 🏗️ Project Structure

```
src/
├── assets/            # Static assets (images, fonts, etc.)
├── components/        # Reusable UI components
│   ├── Common/        # Shared components
│   └── Chat/          # Chat-specific components
├── hooks/             # Custom React hooks
├── store/             # Redux store configuration
│   ├── slices/        # Redux slices
│   └── store.ts       # Store configuration
├── styles/            # Global styles and themes
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── App.tsx            # Root component
└── main.tsx           # Application entry point
```

## 🧩 Component Documentation

### ChatInput

A component that handles user message input with emoji picker and voice input support.

**Props:**
- `ID` (string): Unique identifier for the chat session
- `personality` (string): Personality setting for chat responses

**Features:**
- Text input with emoji support
- Voice-to-text functionality
- Keyboard navigation support
- Input validation

### Other Components

Documentation for other components can be found in their respective component directories.

## 🔌 API Reference

### Authentication

```typescript
POST /api/auth/login
```

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "avatar": "string"
  }
}
```

### Messages

```typescript
GET /api/messages?chatId=:chatId
```

**Response:**
```json
{
  "messages": [
    {
      "id": "string",
      "content": "string",
      "senderId": "string",
      "timestamp": "ISO8601",
      "status": "sent|delivered|read"
    }
  ]
}
```

## 🤖 AI Integration

The application leverages Mistral's advanced language model to power chat interactions. The integration includes:

- Natural language understanding and generation
- Context-aware responses
- Support for multiple languages
- Configurable response styles

To configure the Mistral model settings, update the configuration in `src/config/ai.ts`:

```typescript
export const AIConfig = {
  model: 'mistral-7b',
  temperature: 0.7,
  maxTokens: 1000,
  // Additional configuration options
};
```

## 🧠 State Management

The application uses Redux Toolkit for state management. The main slices include:

- `auth` - Authentication state
- `chat` - Chat messages and conversations
- `ui` - UI state (modals, loading states, etc.)

### Example Redux Slice

```typescript
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    // ... other reducers
  },
  extraReducers: (builder) => {
    // ... handle async actions
  }
});
```

## 🎨 Styling Guidelines

- Use Material-UI components when possible
- For custom styles, prefer styled-components
- Follow the theme structure in `src/styles/theme.ts`
- Use the `sx` prop for one-off styles
- Keep styles colocated with components when possible

## 🧪 Testing

Run tests with:
```bash
# Unit tests
npm test

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e
```

### Production Build

To create a production build:
```bash
# Using npm
npm run build

# Using Yarn
yarn build
```

The build files will be generated in the `dist` directory.

To preview the production build locally:
```bash
npm run preview
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

Note: The application is not compatible with Internet Explorer or Opera Mini.

## Version History

### 1.1.1
- Additional style improvements
- Bug fixes and optimizations

### 1.1.0
- Added voice support
- Integrated Axios for API calls
- Improved error handling

### 1.0.3
- Restructured file organization
- Enhanced TypeScript typing
- Fixed input clearing bug
- Improved code organization

### 1.0.2
- Updated to Material-UI v5
- Added avatar and badge components
- Improved language handling
- Custom favicon implementation

### 1.0.1
- Restyled main chat component
- Improved UI/UX
- Better component organization

### 1.0.0
- Initial release
- Basic chat functionality
- React and Redux implementation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Improvements

- Implement real-time chat using WebSocket
- Add message encryption
- Implement user authentication system
- Add message attachments
- Improve voice message handling
- Add more customization options

