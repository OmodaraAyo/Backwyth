import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
