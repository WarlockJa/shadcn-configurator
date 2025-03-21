export default function HelpPanel() {
  return (
    <div className="max-h-96 w-screen max-w-sm overflow-y-scroll">
      <h2>Hotkeys:</h2>
      <ul>
        <li>
          <span className="font-semibold">Ctrl+1-5:</span> Select active palette
          color
        </li>
        <li>
          <span className="font-semibold">Ctrl+C:</span> Copy from palette
        </li>
        <li>
          <span className="font-semibold">Ctrl+V:</span> Copy to palette
        </li>
        <li>
          <span className="font-semibold">Ctrl+X:</span> Reset color to initial
        </li>
      </ul>
    </div>
  );
}
