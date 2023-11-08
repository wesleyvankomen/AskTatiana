'use client'
 
import { useCompletion } from 'ai/react';

import Head from "next/head";
import { useState, useEffect } from "react";
// import styles from "./index.module.css";
import Link from 'next/link'
import 'tailwindcss/tailwind.css'
import Spinner from "../components/spinner";

export default function Completion() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion();

  return (

    <div>
      <Head>
        <title>Ask Tatiana</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="container lg:max-w-2xl sm:w-full w-full h-full text-center">
        <img src="/tatiana.png"/>
        <p className="text-l sm:text-xl py-4">My dear, I am here to listen and offer guidance. What troubles you today?</p>
        <form onSubmit={handleSubmit} className="column-2">
          <input
            className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-left sm:text"
            type="text"
            name="questionInput"
            placeholder="Ask a question or share a concern"
            value={input}
            maxLength="100"
            disabled={isLoading}
            onChange={handleInputChange}
          />
            
          <input
            type="submit"
            value="Ask Tatiana"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline disabled:bg-green-300"
            disabled={isLoading}
          />
          {/* <Link href="/support">Give Support</Link> */}
          {/* { <Link href="/stream">stream</Link> } */}

        </form>

        <div className="py-4" >
          {completion ? (
          <p className="text-xl">{completion}</p>
        ) : (
          // <center><Spinner/></center> null
          null
        )}
        </div>
      
      </main>

    </div>
  );
}
