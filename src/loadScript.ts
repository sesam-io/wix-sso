export const loadScript = (url: string, callback: () => void, id = "") => {
  return new Promise<void>((resolve, _reject) => {
    const head = document.head;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.id = id;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    //   script.onreadystatechange = callback;
    script.onload = () => {
      callback();

      resolve();
    };

    head.appendChild(script);
  });
};
