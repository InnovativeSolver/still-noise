# Still

A tiny white noise player that generates audio locally with the Web Audio API. It has no audio files, build step, or third-party runtime dependencies. The app shell is cached by a service worker so it can be opened after the first successful online load.

## Use

Visit the hosted site once while online, then open it again offline. Press **Start listening** once to satisfy browser audio permissions. For a standalone app, use your browser's Install or Add to Home Screen command.

Browsers require a user gesture before starting sound. Offline support requires HTTPS (provided by GitHub Pages) and a browser that supports service workers. Some mobile browsers may pause audio when the device sleeps or the app is backgrounded.

## Run locally on macOS

```sh
git clone https://github.com/InnovativeSolver/still-noise.git
cd still-noise
python3 -m http.server 8000
```

Open http://localhost:8000 in a browser. A server is needed for service workers; opening `index.html` as a file will play sound but will not install/cache the offline app shell.

## Publish

The repository is a static site. In GitHub, enable Pages from the `main` branch and `/ (root)` folder.
