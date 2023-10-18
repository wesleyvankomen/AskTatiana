import Head from "next/head";
import { useState } from "react";
// import styles from "./index.module.css";
import Link from 'next/link'
import 'tailwindcss/tailwind.css'

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {

      if(questionInput.trim().length === 0){return};
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questionInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setQuestionInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (

    <div>
      <Head>
        <title>Ask Tatiana</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>


      <main className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <img src="/tatiana.png"/>
        <h4>My dear, I am here to listen and offer guidance. What troubles you today?</h4>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="questionInput"
            placeholder="Ask a question or share a concern"
            value={questionInput}
            maxLength="100"
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <input type="submit" value="Ask Tatiana" />
          <Link href="/support">Give Support</Link>
        </form>
        <div>{result}
        </div>
      </main>

    </div>
  );
}
