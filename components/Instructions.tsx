const Instructions = () => {
  return (
    <div className="flex flex-col gap-3 p-2 border border-gray-100 rounded-lg shadow-lg">
      <span className="text-2xl border-b p-1 font-medium tracking-wider">
        Instructions
      </span>
      <ol className="flex flex-col gap-2 pl-5 marker:text-black list-decimal">
        <li>
          <span className="font-semibold">Email clients like Gmail: </span>

          <ul className="pl-6 marker:text-black list-disc">
            <li>
              Click the "Copy Signature" button located in the Preview section.
            </li>
            <li>
              Paste the copied signature directly into your email client's
              signature settings.
            </li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">
            Email clients that support HTML signatures:{" "}
          </span>
          <ul className="pl-6 marker:text-black list-disc">
            <li>
              Click the "Copy Signature Source Code" button in the Signature
              Source Code section.
            </li>
            <li>
              Paste the copied HTML code into the signature settings of your
              email client.
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default Instructions;
