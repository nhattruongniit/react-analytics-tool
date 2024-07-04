import MonacoEditor from "@monaco-editor/react";

type IProps = {
  handleEditorChange?: (value: string | undefined) => void;
  onValidate?: (markers: any) => void;
  code?: string;
  language?: string;
};

const options: any = {
  autoIndent: "full",
  contextmenu: true,
  fontFamily: "monospace",
  fontSize: 14,
  lineHeight: 18,
  hideCursorInOverviewRuler: true,
  matchBrackets: "always",
  scrollbar: {
    // horizontalSliderSize: 4,
    verticalSliderSize: 18,
  },
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: "line",
  automaticLayout: true,
};

function CodeEditor({ handleEditorChange, onValidate, code = "", language = "json" }: IProps) {
  return (
    <>
      <MonacoEditor
        height="calc(100vh - 350px)"
        options={options}
        defaultLanguage={language}
        line={2}
        value={code}
        onChange={handleEditorChange}
        onValidate={onValidate}
      />
    </>
  );
}

export default CodeEditor;
