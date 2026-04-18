import React, { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState(6);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const passRef = useRef();
  const generatePassword = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num = "0123456789";
    let sym = "!@#$%^&*()_+";
    if (numbers) {
      str += num;
    }
    if (symbols) {
      str += sym;
    }
    let password = "";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      password += str.charAt(char);
    }
    setPassword(password);
    setCopied(false);
  }, [length, numbers, symbols]);
  const copyPassword = () => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(passRef.current.value);

    setCopied(true); // always true on click
    setTimeout(() => setCopied(false), 1500);
  };
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <>
      <div className="w-full h-screen bg-black flex-col flex justify-center items-center">
        <div className="flex items-center justify-center bg-gray-700 px-2 py-4 rounded-4xl m-2 h-25 w-auto">
          <h1 className="text-4xl text-4xl text-white">Password Generator</h1>
        </div>
        <div className="bg-gray-800 px-2 py-2 rounded-2xl h-12 w-auto">
          <input
            type="text"
            className="outline-none text-white"
            value={password}
            readOnly
            ref={passRef}
          />
          <button
            onClick={() => {
              copyPassword();
            }}
            className="outline-none text-white bg-blue-400 rounded-md p-1 cursor-pointer hover:bg-blue-900"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="flex justify-center items-center bg-mauve-600 m-4 p-4 rounded-2xl">
          <label className="text-white m-1">Length</label>
          <input
            type="range"
            min="6"
            max="20"
            className="m-1 "
            onChange={(e) => {
              setLength(parseInt(e.target.value));
            }}
          />
          <label className="text-white m-4">{length}</label>
          <label className="text-white m-4">Include Numbers</label>
          <input
            type="checkbox"
            className="h-4 w-4 outline-none"
            onChange={(e) => {
              setNumbers(e.target.checked);
            }}
          />
          <label className="text-white m-4">Include symbols</label>
          <input
            type="checkbox"
            className="h-4 w-4 outline-none"
            onChange={(e) => {
              setSymbols(e.target.checked);
            }}
          />
        </div>
        <button
          className="text-white text-3xl bg-blue-700 p-2 hover:bg-blue-900 rounded-2xl"
          onClick={() => {
            generatePassword();
          }}
        >
          Generate Password
        </button>
      </div>
    </>
  );
};

export default App;
