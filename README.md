# Thirdweb Unity WebGL Example

In the WebGL game, hit `ESC` and click on the last button, `Button` which would fetch data from the blockchain using our Unity SDK.

## In the Unity:
1. Install thirdweb sdk unitypackage. https://github.com/nftlabs/unity-webgl-sdk/releases
2. Add `thirdweb` prefab into the scene.
3. Add a `thirdweb` tag on the prefab, so that it can be easily reference throughout the GameObject.
4. On UI button click function script, you can interact with the sdk by:
```c#
// access the thirdweb sdk component however your project is setup!
Thirdweb.SDK sdk = GameObject.FindWithTag("thirdweb").GetComponent<Thirdweb.SDK>();
if (sdk == null) {
  throw new Exception("SDK is not initialized");
}

var nfts = await sdk.GetNFT("0x025b435B5ba354c9d0C8772cc36aDEE3957f2A6D").GetAllWithOwner();
foreach (var n in nfts)
{
  Debug.LogFormat("NFT: {0} {1} {2} {3}", n.owner, n.metadata.name, n.metadata.description, n.metadata.image);
}
```

## In the WebGL Templates: (react-unity-webgl)
1. Install the bridge and sdk via npm or yarn.
```
npm install @3rdweb/sdk @3rdweb/unity-bridge
```
2. Setup `react-unity-webgl` and thirdweb unity bridge.
```javascript
import Unity, { UnityContext } from "react-unity-webgl";
import { ThirdwebBridgeSDK } from "@3rdweb/unity-bridge";

const unityContext = new UnityContext({
  loaderUrl: "unity/build.loader.js",
  dataUrl: "unity/build.data",
  frameworkUrl: "unity/build.framework.js",
  codeUrl: "unity/build.wasm",
});

function App() {
  // sdk to interact with on the react side.
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

  // render the page
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
```
