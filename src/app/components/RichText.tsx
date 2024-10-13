// // "use client"
// import React, { useEffect, useState } from "react";
// import Quill from "quill"; // Quill needs to be installed as a package

// interface RichTextProps {
//   label: string;
//   value: string;
//   onChangeFun: (html: string) => void;
// }

// const RichText: React.FC<RichTextProps> = ({ label, value, onChangeFun }) => {
//   const [mailBody, setMailBody] = useState<string>(value || "");
//   const [quillFunction, setQuillFunction] = useState<Quill | undefined>(
//     undefined
//   );

//   useEffect(() => {
//     if (JSON.stringify(value) !== JSON.stringify(mailBody)) {
//       setMailBody(value || "");
//     }
//   }, [value, mailBody]);

//   useEffect(() => {
//     if (typeof document !== "undefined") {
//       const toolbarOptions = [
//         ["bold", "italic", "underline", "strike"], // toggled buttons
//         ["blockquote", "code-block"],
//         ["link"],
//         [{ header: 1 }, { header: 2 }], // custom button values
//         [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
//         [{ script: "sub" }, { script: "super" }], // superscript/subscript
//         [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//         [{ direction: "rtl" }], // text direction
//         [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//         [{ font: [] }],
//         [{ align: [] }],
//         ["clean"], // remove formatting button
//       ];
//       console.log("first");
//       const editorId = `editor_box`;
//       const editor = document.getElementById(editorId) as HTMLElement;
//       if (editor) {
//         editor.innerHTML = mailBody;

//         const thisEditor = new Quill(`#${editorId}`, {
//           modules: {
//             toolbar: toolbarOptions,
//           },
//           theme: "snow",
//         });

//         setQuillFunction(thisEditor);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (quillFunction) {
//       const html = quillFunction.container.firstChild as HTMLElement;
//       const innerHTML = html.innerHTML;
//       if (mailBody !== innerHTML) {
//         html.innerHTML = mailBody;
//       }
//     }
//   }, [mailBody, quillFunction]);

//   useEffect(() => {
//     if (quillFunction) {
//       quillFunction.on("text-change", function () {
//         const html = quillFunction.container.firstChild as HTMLElement;
//         const innerHTML = html.innerHTML;
//         setMailBody(innerHTML);
//         onChangeFun(innerHTML);
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [quillFunction]);

//   return (
//     <div style={{ width: "100%" }}>
//       <span className="placeholder">{label}</span>
//       <div
//         className="mailthread_compose_message_editor"
//         id={`editor_box`}
//         style={{ width: "100%", minHeight: "120px" }}
//       />
//     </div>
//   );
// };

// export default RichText;
