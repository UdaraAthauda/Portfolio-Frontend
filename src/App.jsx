import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/navbar/Navbar";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import Footer from "./components/ui/navbar/Footer";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Flex direction="column" minH="100vh">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Flex>
    </>
  );
}

export default App;
