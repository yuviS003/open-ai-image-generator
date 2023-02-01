import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const generateImage = async () => {
    setLoader(true);
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    let image_url = response["data"];
    console.log(image_url.data[0].url);
    setImageUrl(image_url.data[0].url);
    setLoader(false);
  };

  return (
    <div className="App">
      <h3>Generate Images using OPEN AI</h3>
      {loader ? <h5>Generating... Kindly wait</h5> : null}
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter text for which you want the image"
      />
      <button onClick={generateImage}>Generate Image</button>
      {imageUrl.length > 0 ? <img src={imageUrl} alt="image" /> : null}
    </div>
  );
}

export default App;
