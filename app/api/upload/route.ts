// import { IncomingForm } from "formidable";
// import fs from "fs";
// import path from "path";
// import { NextResponse } from "next/server";
// import { Readable } from "stream";

// // Disable body parsing to allow Formidable to process the request
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Helper: Convert NextRequest to Node.js IncomingMessage
// const convertNextRequestToNodeRequest = async (req: Request) => {
//   const contentType = req.headers.get("content-type") || "";
//   const body = await req.arrayBuffer();
//   const readableStream = Readable.from(Buffer.from(body));

//   // Create a mock Node.js IncomingMessage
//   const nodeReq: any = readableStream;
//   nodeReq.headers = Object.fromEntries(req.headers.entries());
//   nodeReq.method = req.method;
//   nodeReq.url = req.url;
//   nodeReq.headers["content-type"] = contentType;

//   return nodeReq;
// };

// export const POST = async (req: Request) => {
//   const uploadDir = path.join(process.cwd(), "public", "uploads");
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }

//   const form = new IncomingForm({
//     uploadDir,
//     keepExtensions: true,
//     maxFileSize: 5 * 1024 * 1024, // Limit file size to 5MB
//   });

//   const nodeReq = await convertNextRequestToNodeRequest(req);

//   return new Promise((resolve, reject) => {
//     form.parse(nodeReq, (err, fields, files) => {
//       if (err) {
//         console.error("File upload error:", err);
//         return resolve(
//           NextResponse.json({ error: "File upload failed" }, { status: 500 })
//         );
//       }

//       const file = files.file;

//       console.log("file", file);

//       if (!file) {
//         return resolve(
//           NextResponse.json({ error: "No file uploaded" }, { status: 400 })
//         );
//       }

//       const filePath = `/uploads/${path.basename(file[0].filepath)}`;
//       resolve(
//         NextResponse.json({
//           message: "File uploaded successfully",
//           filePath,
//         })
//       );
//     });
//   });
// };
