# Beam Volumator

A Max For Live device that mirrors a track's volume level to the audio signal passing through the device.

## Description

Because Ableton Live does not allow plugins to be "post-fader" this device can be useful.

For use with Fiedler Audio's Dolby Atmos Beam plugin. Allows you to use Ableton Live's track volume to change the volume going into the Dolby Atmos Beam. Beam Volumator applies the same volume scaling from your track's fader to the audio signal within the device itself. This creates a "volume within volume" effect that maintains consistent behavior regardless of whether the device is placed directly on a track or nested inside an Audio Effect Rack.

## Features

- Automatically detects whether it's on a track or inside an Audio Effect Rack
- Applies track volume scaling to the audio signal in real-time
- Works in both contexts without manual reconfiguration

## How It Works

The device uses the Live API to observe the track's volume parameter and applies that same volume scaling to the audio passing through the device. It includes smart context detection using JavaScript to determine whether it's placed directly on a track or inside an Audio Effect Rack chain, automatically adjusting its internal pathing to maintain functionality in either scenario.

## Usage in Live

1. Create an audio effect track.
2. Add Beam Volumator and Fiedler Dolby Atmos Beam in the first chain.
3. Set Beam to "Muted".
4. Optionally, create a "pass through" chain if you have a need to send audio out of the channel.

![image](https://github.com/user-attachments/assets/421332fe-0e42-4bf3-99e2-7ad73507e567)

## Release Notes

### 1.1 - April 9, 2025

- Updated javascript to recursively identify which parent object is the actual audio track to mimic.

### 1.0 - April 8, 2025

- First release

## License

MIT
