"use client";

import { useEffect, useState } from "react";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import darcula from "react-syntax-highlighter/dist/esm/styles/prism/darcula";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";

import useIsDarkMode from "@/hooks/use-is-dark-mode";

SyntaxHighlighter.registerLanguage("javascript", js);

export default function Compiler() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [examples, setExamples] = useState<string[]>([]);

  const isDarkMode = useIsDarkMode();

  const onChange = (value: string) => {
    setValue(value);
  };

  const onRandomize = () => {
    if (examples.length === 0) {
      return;
    }

    setValue(examples[Math.floor(Math.random() * examples.length)]);
  };

  const onCompile = () => {
    setResult("");
    setError("");

    if (value === "") {
      return;
    }

    setLoading(true);

    fetch("/api/compiler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: value }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("Something went wrong");
      })
      .then((data) => {
        setResult(data.result);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCopy = () => {
    if (!copied) {
      navigator.clipboard
        .writeText(result)
        .then(() => {
          setCopied(true);
        })
        .catch((err) => {})
        .finally(() => {});
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  useEffect(() => {
    fetchExamples(setExamples);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-16">
      <h1 className="text-2xl font-semibold">
        jQuery to Javascript Compiler ⚡
      </h1>
      {/* ✨🔥 */}

      <div className="flex items-center justify-center gap-4">
        <div className="relative">
          <AceEditor
            mode="javascript"
            theme={isDarkMode ? "terminal" : "textmate"}
            name="jquery-input"
            className={
              // dark:bg-current
              `rounded-md border ${isDarkMode ? "border-neutral-700" : ""}`
            }
            // onLoad={this.onLoad}
            value={value}
            onChange={onChange}
            fontSize={14}
            lineHeight={20}
            showPrintMargin={false}
            showGutter={false}
            highlightActiveLine={false}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: false,
              tabSize: 2,
            }}
            scrollMargin={[10, 10, 10, 10]}
          />

          <button
            className="absolute right-4 top-4 text-white text-sm bg-red-500 rounded-md px-3 py-1 hover:bg-red-400 transition duration-100"
            onClick={onRandomize}
          >
            random
          </button>

          <button
            className="absolute right-4 bottom-4 text-white text-sm bg-[#2b2b2b] rounded-md px-3 py-1 hover:bg-[#454545] transition duration-100"
            onClick={onCompile}
          >
            compile
          </button>
        </div>

        <span>➔</span>

        <div className="w-[500px] h-[500px] bg-[#2b2b2b] overflow-hidden rounded-md">
          <div className="w-full h-full overflow-auto relative">
            {result === "" ? (
              <p className="text-[#a9b7c6] p-[10px] text-sm">
                {!loading && !error ? "Result..." : null}
                {loading && !error ? "Compiling..." : null}
                {!loading && error ? error : null}
              </p>
            ) : (
              <SyntaxHighlighter
                language="javascript"
                style={darcula}
                customStyle={{
                  fontSize: "14px",
                }}
              >
                {result}
              </SyntaxHighlighter>
            )}

            {result && (
              <button
                className="absolute right-4 bottom-4 text-white text-sm bg-blue-600 rounded-md px-3 py-1 hover:bg-blue-500 transition duration-100"
                onClick={onCopy}
              >
                {copied ? "✔" : "copy"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function fetchExamples(setter: React.Dispatch<React.SetStateAction<string[]>>) {
  fetch("/api/examples")
    .then((res) => res.json())
    .then((data) => {
      const examples = data.content.split("\n\n");

      setter(examples);
    });
}
