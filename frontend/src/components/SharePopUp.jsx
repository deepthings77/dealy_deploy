import React from "react";

const SharePopup = ({ postUrl, setOpenSharePopup }) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">Share this post</h2>
        <p className="mb-4">Post URL: {postUrl}</p>
        <div className="flex gap-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Share on Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${postUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 text-white px-4 py-2 rounded"
          >
            Share on Twitter
          </a>
        </div>
        <button
          onClick={() => setOpenSharePopup(false)}
          className="mt-4 text-red-500 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SharePopup;
