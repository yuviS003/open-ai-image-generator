import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const generateImage = async () => {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    let image_url = response["data"];
    console.log(image_url.data[0].url);
    setImageUrl(image_url.data[0].url);
  };

  return (
    <div className="App">
      <h3>Generate Images using OPEN AI</h3>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter text for which you want the image"
      />
      <button onClick={generateImage}>Generate Image</button>
      <img src={imageUrl} alt="image" />
    </div>
  );
}

export default App;
