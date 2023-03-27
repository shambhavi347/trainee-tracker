import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewDoc = () => {
  const { userId } = useParams();
  // console.log(userId);
  useEffect(() => {
    // const file_id = "641be81f959066e603ff3457";
    async function downloadFile(file_id) {
      const response = await fetch(`/api/files/${file_id}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "download.pdf";
      a.click();
    }
    downloadFile(userId);
  }, []);
  return <div>ViewDoc</div>;
};

export default ViewDoc;
