import { useRef, useState } from "react";
import { Button, Input } from "@heroui/react";
import { ImageUpIcon, SendHorizonalIcon } from "lucide-react";

export default function Inputs() {
  const [input, setInput] = useState("");
  const imageEl = useRef(null);

  const onImageUpload = async (e) => {
    const file = e.target.files[0];

    // BASE 64
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64String = reader.result;
      console.log(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!input) {
      imageEl.current.click();
    }

    console.log(input);

    setInput("");
  };

  return (
    <form
      className="absolute bottom-0 w-full flex gap-0 sm:gap-1 mb-0 sm:mb-2 px-0 sm:px-8 max-w-6xl left-1/2 -translate-x-1/2"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        value={input}
        placeholder="Enter a message..."
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
      />

      <input
        type="file"
        name="file"
        accept="image/png, image/webp, image/jpeg"
        ref={imageEl}
        onChange={onImageUpload}
        hidden
      />

      <Button type="Submit" className="bg-blue-100">
        {input ? <SendHorizonalIcon /> : <ImageUpIcon />}
      </Button>
    </form>
  );
}
