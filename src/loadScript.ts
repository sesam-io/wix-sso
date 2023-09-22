export const loadScript = (url: string, callback: () => void) => {
  // Adding the script tag to the head as suggested before
  var head = document.head;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  //   console.log("🚀 ~ loadScript ~ url:", url);

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  //   script.onreadystatechange = callback;
  script.onload = callback;
  //   script.addEventListener("readystatechange", () => {
  //     console.log("🚀 ~ script.addEventListener ~ callback:", callback);
  //   });

  // Fire the loading
  head.appendChild(script);
};
