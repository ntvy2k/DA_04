import Editor from "@monaco-editor/react";

const About = () => {
  return (
    <>
      <Editor
        height="90vh"
        defaultLanguage="typescript"
        defaultValue="// some comment"
      />
      <p>=================</p>
      <Editor
        height="90vh"
        defaultLanguage="python"
        defaultValue="// some comment"
        theme="vs-dark"
      />
    </>
  );
};

export default About;
