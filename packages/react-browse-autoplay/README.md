# React Browse Autoplay

A React component library that automatically plays audio when users scroll between defined anchor points. Perfect for creating immersive storytelling experiences or background music that responds to scroll position.

## Features

- 🎵 **Scroll-triggered audio playback** - Audio plays when scrolling between defined anchor points
- 🔇 **Mute/unmute controls** - Built-in audio control functionality
- ⚡ **Enable/disable autoplay** - Toggle autoplay behavior on demand
- 📱 **Responsive** - Works across different device sizes
- 🎯 **Precise control** - Audio plays when the viewport center is between anchors
- 🔄 **Automatic pause** - Audio pauses when scrolling outside the defined area

## 🌐 Live Demo

Try the interactive demo: **[https://ericsen-tsai.github.io/react-browse-autoplay/](https://ericsen-tsai.github.io/react-browse-autoplay/)**

## Installation

```bash
npm install @erichandsen/react-browse-autoplay
```

```bash
yarn add @erichandsen/react-browse-autoplay
```

```bash
pnpm add @erichandsen/react-browse-autoplay
```

## Quick Start

```tsx
import { 
  BrowseAutoplayProvider, 
  AutoplayAnchor, 
  useBrowseAutoplay 
} from '@erichandsen/react-browse-autoplay';

function MyComponent() {
  const { isMuted, onToggleMuted, isEnabledAutoplay, onToggleEnabledAutoplay } = useBrowseAutoplay();

  return (
    <div>
      {/* Control buttons */}
      <button onClick={onToggleMuted}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
      <button onClick={onToggleEnabledAutoplay}>
        {isEnabledAutoplay ? 'Disable' : 'Enable'} Autoplay
      </button>

      {/* Content before autoplay zone */}
      <div style={{ height: '100vh' }}>
        <h1>Scroll down to enter the audio zone</h1>
      </div>

      {/* Define the autoplay zone */}
      <AutoplayAnchor type="top" />
      <div style={{ height: '100vh' }}>
        <h2>Audio will play while this section is in view</h2>
      </div>
      <AutoplayAnchor type="bottom" />

      {/* Content after autoplay zone */}
      <div style={{ height: '100vh' }}>
        <h1>Audio stops when you scroll past this point</h1>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowseAutoplayProvider initialAudioPath="https://example.com/your-audio-file.mp3">
      <MyComponent />
    </BrowseAutoplayProvider>
  );
}

export default App;
```

## API Reference

### `BrowseAutoplayProvider`

The main provider component that wraps your application and manages audio state.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components to wrap |
| `initialAudioPath` | `string` | `''` | URL path to the audio file to play |

#### Example

```tsx
<BrowseAutoplayProvider initialAudioPath="https://example.com/background-music.mp3">
  <App />
</BrowseAutoplayProvider>
```

### `AutoplayAnchor`

Invisible anchor components that define the boundaries of the autoplay zone.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `type` | `'top' \| 'bottom'` | Defines whether this is the top or bottom boundary of the autoplay zone |

#### Example

```tsx
{/* Start of autoplay zone */}
<AutoplayAnchor type="top" />

{/* Your content here */}
<div>Content that triggers audio playback</div>

{/* End of autoplay zone */}
<AutoplayAnchor type="bottom" />
```

### `useBrowseAutoplay`

Hook that provides access to the autoplay context and controls.

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `isMuted` | `boolean` | Current mute state of the audio |
| `onToggleMuted` | `() => void` | Function to toggle mute state |
| `isEnabledAutoplay` | `boolean` | Whether autoplay is currently enabled |
| `onToggleEnabledAutoplay` | `() => void` | Function to toggle autoplay on/off |
| `audioPath` | `string` | Current audio file path |
| `onAudioPathChange` | `(path: string) => void` | Function to change the audio file |
| `registerAnchorRef` | `(anchorType: AnchorType, ref: React.RefObject<HTMLDivElement \| null>) => void` | Internal function for anchor registration |

#### Example

```tsx
function Controls() {
  const { 
    isMuted, 
    onToggleMuted, 
    isEnabledAutoplay, 
    onToggleEnabledAutoplay,
    audioPath,
    onAudioPathChange
  } = useBrowseAutoplay();

  return (
    <div>
      <button onClick={onToggleMuted}>
        {isMuted ? '🔇 Unmute' : '🔊 Mute'}
      </button>
      <button onClick={onToggleEnabledAutoplay}>
        {isEnabledAutoplay ? '⏸️ Disable' : '▶️ Enable'} Autoplay
      </button>
      <button onClick={() => onAudioPathChange('https://example.com/new-audio.mp3')}>
        Change Audio
      </button>
    </div>
  );
}
```

## How It Works

1. **Setup**: Wrap your app with `BrowseAutoplayProvider` and provide an audio file URL
2. **Define Zone**: Place `AutoplayAnchor` components with `type="top"` and `type="bottom"` to define the autoplay zone
3. **Scroll Detection**: The library monitors scroll position and checks if the viewport center is between the anchors
4. **Auto Play/Pause**: Audio automatically plays when entering the zone and pauses when leaving

## Advanced Usage

### Dynamic Audio Switching

You can change the audio source dynamically using the `onAudioPathChange` function:

```tsx
function DynamicAudioExample() {
  const { onAudioPathChange, audioPath } = useBrowseAutoplay();

  const audioOptions = [
    { path: 'https://example.com/forest.mp3', label: 'Forest Sounds' },
    { path: 'https://example.com/ocean.mp3', label: 'Ocean Waves' },
    { path: 'https://example.com/rain.mp3', label: 'Rain Sounds' }
  ];

  return (
    <div>
      <select 
        value={audioPath} 
        onChange={(e) => onAudioPathChange(e.target.value)}
      >
        {audioOptions.map((option) => (
          <option key={option.path} value={option.path}>
            {option.label}
          </option>
        ))}
      </select>

      <AutoplayAnchor type="top" />
      <div style={{ height: '100vh' }}>
        Content with switchable audio
      </div>
      <AutoplayAnchor type="bottom" />
    </div>
  );
}
```

### Fixed Control Panel

Create a floating control panel for better UX:

```tsx
function FloatingControls() {
  const { isMuted, onToggleMuted, isEnabledAutoplay, onToggleEnabledAutoplay } = useBrowseAutoplay();

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      zIndex: 1000
    }}>
      <button onClick={onToggleMuted} style={{ margin: '5px' }}>
        {isMuted ? '🔇' : '🔊'}
      </button>
      <button onClick={onToggleEnabledAutoplay} style={{ margin: '5px' }}>
        {isEnabledAutoplay ? '⏸️' : '▶️'}
      </button>
    </div>
  );
}
```

## Browser Compatibility

This library relies on modern browser features:

- HTML5 Audio API
- ES6+ features

Supported browsers:

- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 79+

## License

ISC

## Author

Ericsen Tsai
