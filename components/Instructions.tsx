const Instructions = () => {
  return (
    <div className="flex flex-col gap-3 p-2 border border-gray-100 rounded-lg shadow-lg">
      <span className="text-2xl border-b p-1 font-medium tracking-wider">
        Instructions
      </span>
      <ul className="flex flex-col gap-2 pl-5 marker:text-black list-disc">
        <li>
          <p>
            <span className="font-semibold">Email clients like Gmail: </span>
            Press "Copy signature" button in the{" "}
            <span className="italic underline">Preview</span> block and paste it
            into an email client.
          </p>
        </li>
        <li>
          <p>
            <span className="font-semibold">
              Email clients that support HTML signatures:{" "}
            </span>
            Press "Copy signature source code" button in the{" "}
            <span className="italic underline">Signature source code</span>{" "}
            block and paste it into the signature settings of your email client.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Instructions;
