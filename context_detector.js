// context_detector.js
autowatch = 1;
outlets = 2; // Two outlets - one for path, one for debug info

post("context_detector.js loaded\n");

function bang() {
  try {
    // Test direct track path
    var trackPath = "this_device canonical_parent mixer_device volume";
    var api = new LiveAPI(trackPath);

    // If ID is 0, this path didn't work
    if (api.id === 0) {
      // Output the rack path command to first outlet (for live.path)
      outlet(
        0,
        "path",
        "this_device",
        "canonical_parent",
        "canonical_parent",
        "canonical_parent",
        "mixer_device",
        "volume"
      );
      // Output debug info to second outlet
      outlet(1, "In rack context");
    } else {
      // Output the direct track path command to first outlet
      outlet(
        0,
        "path",
        "this_device",
        "canonical_parent",
        "mixer_device",
        "volume"
      );
      // Output debug info to second outlet
      outlet(1, "In track context");
    }
  } catch (err) {
    post("Error: " + err + "\n");
  }
}
