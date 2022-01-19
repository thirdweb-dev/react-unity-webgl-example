import "./App.css";
import Unity, { UnityContext } from "react-unity-webgl";
import { useEffect, useRef } from "react";
import { ThirdwebBridgeSDK } from "@3rdweb/unity-bridge";

const unityContext = new UnityContext({
  loaderUrl: "unity/build.loader.js",
  dataUrl: "unity/build.data",
  frameworkUrl: "unity/build.framework.js",
  codeUrl: "unity/build.wasm",
});

function App() {
  const sdk = useRef(
    new ThirdwebBridgeSDK("https://rpc-mumbai.maticvigil.com")
  );

  // setting up a communication channel between the unity and the sdk
  useEffect(function () {
    unityContext.on("canvas", function (canvas) {
      window
        .createUnityInstance(canvas.current, unityContext.unityConfig)
        .then((unityInstance) => {
          window.unityInstance = unityInstance;
        });
    });
  }, []);

  return (
    <div className="App">
      <p>Hello World!</p>
      <Unity
        unityContext={unityContext}
        style={{ width: "80vw", height: "80vh" }}
      />
    </div>
  );
}

export default App;
