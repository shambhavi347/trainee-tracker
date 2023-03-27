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
    };
    fetchPdf(userId);
  }, []);

  return <div>PdfViewer</div>;
};

export default PdfViewer;
