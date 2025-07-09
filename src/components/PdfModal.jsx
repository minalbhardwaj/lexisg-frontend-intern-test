export default function PdfModal({ link, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] h-[90%] relative p-2 rounded shadow-lg">
        <button
          className="absolute top-2 right-2 text-red-500 font-bold text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="p-4 border-b mb-2 flex justify-between items-center">
          <p className="font-medium text-gray-700">
            🔍 Simulated scroll to: <span className="bg-yellow-200 px-1">Paragraph 7</span>
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Open in new tab ↗
          </a>
        </div>

        <iframe
          src={link}
          className="w-full h-full border rounded"
          title="PDF Viewer"
          allowFullScreen
        />
      </div>
    </div>
  );
}
