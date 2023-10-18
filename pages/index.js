import Head from "next/head";
import { useState } from "react";
// import styles from "./index.module.css";
import Link from 'next/link'
import 'tailwindcss/tailwind.css'
import Spinner from "../components/spinner";

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();
  const [waiting, setWaiting] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    try {

      if(questionInput.trim().length === 0){return};

      setResult("");
      setWaiting(true);

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

      // setTimeout(() => {
      //   setResult("success!");
      //   setTimeout(() => {
      //     setWaiting(false);
      //   }, 4000);
      // }, 2000);

      setQuestionInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }

    setWaiting(false);

  }

  return (

    <div>
      <Head>
        <title>Ask Tatiana</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="container lg:max-w-2xl sm:w-full w-full h-full text-center">
        <img src="/tatiana.png"/>
        <p className="text-l py-4">My dear, I am here to listen and offer guidance. What troubles you today?</p>
        <form onSubmit={onSubmit} className="column-2">
          <input
            className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-left"
            type="text"
            name="questionInput"
            placeholder="Ask a question or share a concern"
            value={questionInput}
            maxLength="100"
            disabled={waiting}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
            
            
          <input
            type="submit"
            value="Ask Tatiana"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline disabled:bg-green-300"
            disabled={waiting}
          />
          {/* <Link href="/support">Give Support</Link> */}
        </form>

        <div className="py-4" >
          { waiting ? <center><Spinner/></center> : null }
          { result ? <p className="text-xl">{result}</p>: null }
        </div>
      
      </main>

    </div>
  );
}
