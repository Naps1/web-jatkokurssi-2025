import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import MainContent from "./components/MainContent";
import About from "./components/About";
import Contact from "./components/Contact";
import "./styles/App.css";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Home />
        <MainContent />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
