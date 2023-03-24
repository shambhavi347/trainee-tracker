// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Document, Page, pdfjs } from "react-pdf";
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const PdfViewer = () => {
//   const { userId } = useParams();
//   //   const [dataUri, setDataUri] = React.useState([]);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   console.log("file id: " + userId);
//   useEffect(() => {
//     const viewPdf = async (file_id) => {
//       try {
//         const response = await fetch(`/api/files/view/${file_id}`);
//         // setDataUri(response);
//         const data = await response.blob();
//         setPdfFile(data);
//       } catch (error) {}
//     };
//     viewPdf(userId);
//   }, []);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   function handlePrevPage() {
//     setPageNumber((prevPageNumber) => prevPageNumber - 1);
//   }

//   function handleNextPage() {
//     setPageNumber((prevPageNumber) => prevPageNumber + 1);
//   }

//   return (
//     // <div>
//     //   {pdfFile && (
//     //     <Document file={pdfFile}>
//     //       <Page pageNumber={1} />
//     //     </Document>
//     //   )}
//     // </div>
//     <>
//       {/* <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
//         {Array.from(new Array(numPages), (el, index) => (
//           <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//         ))}
//       </Document> */}
//       <Document
//         file="path/to/your/pdf/file.pdf"
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <div>
//         <button disabled={pageNumber <= 1} onClick={handlePrevPage}>
//           Previous
//         </button>
//         <button disabled={pageNumber >= numPages} onClick={handleNextPage}>
//           Next
//         </button>
//       </div>
//     </>
//   );
// };
// export default PdfViewer;

// import React, { useState, useEffect } from "react";
// import { Document, Page } from "react-pdf";

// const PdfViewer = ({ fileId }) => {
//   const [pdfStream, setPdfStream] = useState(null);
//   const [numPages, setNumPages] = useState(null);

//   useEffect(() => {
//     // fetch the PDF file from the API endpoint
//     fetch(`/api/files/view/${fileId}`)
//       .then((res) => res.blob())
//       .then((blob) => setPdfStream(blob));
//   }, [fileId]);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div>
//       {pdfStream && (
//         <Document file={pdfStream}>
//           <Page pageNumber={1} />
//         </Document>
//       )}
//     </div>
//   );
// };

// export default PdfViewer;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const PdfViewer = () => {
  const { userId } = useParams();
  useEffect(() => {
    const fetchPdf = (fileId) => {
      //   try {
      fetch(`/api/files/view/${fileId}`)
        .then((res) => {
          // convert the response to a blob
          return res.blob();
        })
        .then((blob) => {
          // create a URL for the blob
          const url = URL.createObjectURL(blob);

          // create a new window to display the PDF
          const newWindow = window.open();
          newWindow.document.write(
            `<iframe src="${url}" width="100%" height="100%"></iframe>`
          );
        });
      //   } catch (error) {
      //     console.log(error);
      //   }
    };
    fetchPdf(userId);
  }, []);

  return <div>PdfViewer</div>;
};

export default PdfViewer;
