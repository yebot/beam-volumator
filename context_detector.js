// context_detector.js
autowatch = 1;
outlets = 2; // Two outlets - one for path, one for debug info

post("context_detector.js loaded\n");

function bang() {
  try {
    // Find the actual track's volume path
    var result = findTrackVolumePath();
    
    if (result.success) {
      // Output the path to the first outlet (for live.path)
      outlet(0, "path", result.path);
      
      // Output debug info to second outlet
      outlet(1, "Success: " + result.message);
    } else {
      // Output fallback path
      outlet(0, "path", "live_set view selected_track mixer_device volume");
      
      // Output debug info
      outlet(1, "Fallback: " + result.message);
    }
  } catch (err) {
    post("Error: " + err + "\n");
    
    // Output fallback path on error
    outlet(0, "path", "live_set view selected_track mixer_device volume");
  }
}

function findTrackVolumePath() {
  try {
    // Start from this device
    var api = new LiveAPI("this_device");
    var currentObj = api;
    var pathComponents = ["this_device"];
    var maxDepth = 10; // Safety limit
    
    // Loop until we find a Track or hit our safety limit
    for (var i = 0; i < maxDepth; i++) {
      // Get parent
      currentObj.goto("canonical_parent");
      pathComponents.push("canonical_parent");
      
      // Check what type of object we have
      var objType = "";
      try {
        // Try different properties to identify object type
        objType = currentObj.get("class_name");
        
        post("Current object: " + objType + "\n");
        
        // If we found a Track, we're done
        if (objType === "Track") {
          post("Found Track at depth " + i + "\n");
          
          // Build the final path
          pathComponents.push("mixer_device", "volume");
          return {
            success: true,
            path: pathComponents.join(" "),
            message: "Found track at depth " + i
          };
        }
      }
      catch(e) {
        post("Couldn't get class_name, trying another approach\n");
        
        // Try to determine type by checking available properties
        if (currentObj.id === 0) {
          return {
            success: false,
            message: "Hit invalid object (id 0)"
          };
        }
        
        // Check if it has a mixer_device child (which would suggest it's a Track)
        try {
          var hasMixer = currentObj.get("mixer_device");
          if (hasMixer && hasMixer[0] === "id") {
            post("Found object with mixer_device at depth " + i + "\n");
            
            // Build the final path
            pathComponents.push("mixer_device", "volume");
            return {
              success: true,
              path: pathComponents.join(" "),
              message: "Found object with mixer_device at depth " + i
            };
          }
        }
        catch(mixerErr) {
          post("No mixer_device\n");
        }
      }
    }
    
    // If we get here, we couldn't find a Track
    return {
      success: false,
      message: "Couldn't find Track within " + maxDepth + " parents"
    };
  }
  catch(err) {
    post("Error in findTrackVolumePath: " + err + "\n");
    return {
      success: false,
      message: "Error: " + err
    };
  }
}