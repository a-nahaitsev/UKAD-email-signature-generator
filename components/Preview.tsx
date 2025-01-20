import DOMPurify from "dompurify";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Instructions from "./Instructions";
import { FormDataProps } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_PROFILE_PHOTO, UKAD_LOGO } from "@/constants";
import { useRef } from "react";

const Preview = ({ formData }: { formData: FormDataProps }) => {
  const { toast } = useToast();
  const tableRef = useRef<HTMLTableElement | null>(null);

  const {
    firstName,
    lastName,
    position,
    phoneLabel,
    phoneValue,
    bookACallLinkName,
    bookACallLinkValue,
    photo,
  } = formData;

  const profilePhoto = photo.length > 0 ? photo : DEFAULT_PROFILE_PHOTO;

  let htmlContent = `
    <table style="max-width: 650px; width: 100%; font-family: Calibri, Arial, sans-serif; padding: 2px;" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td width="64px" align="left" style="width:64px; vertical-align: top; padding-right: 8px;">
          <div style="width: 64px; height: 64px; border-radius: 50%;">
            <img alt="" width="64px" height="64px" style="display: block; width: 64px; height: 64px; border-radius: 50%;" src="${profilePhoto}" />
          </div>
        </td>
        <td width="100%" style="width: 100%;">
          <table width="100%" style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
            <td style="font-size: 14px; line-height: 16px; font-weight: 600; color: #000000; padding-bottom: 4px; font-family: Calibri, Arial, sans-serif;">${firstName} ${lastName}</td>
            </tr>`;

  if (position.trim().length > 0) {
    htmlContent += `
      <tr>
        <td style="font-size: 14px; line-height: 16px; font-weight: 400; color: #4C4D4E; padding-bottom: 4px; font-family: Calibri, Arial, sans-serif;">
          ${position}
        </td>
      </tr>
    `;
  }

  if (phoneLabel.trim().length > 0 || phoneValue.trim().length > 0) {
    htmlContent += `
      <tr>
        <td style="font-size: 14px; line-height: 16px; padding-bottom: 4px;">
          <p style="display: inline-block; margin: 0; font-size: 14px; line-height: 16px; color: #000000;">
            <span style="font-family: Calibri, Arial, sans-serif;">${phoneLabel}: </span>
              <a href="tel:${phoneValue}" style="display: inline-block; font-size: 14px; line-height: 16px; color: #4C4D4E; text-decoration: none; font-family: Calibri, Arial, sans-serif;">
                ${phoneValue}
              </a>
          </p>
        </td>
      </tr>
    `;
  }

  if (
    bookACallLinkName.trim().length > 0 ||
    bookACallLinkValue.trim().length > 0
  ) {
    htmlContent += `
      <tr>
        <td style="font-size: 14px; line-height: 16px; padding-bottom: 4px;">
          <p style="display: inline-block; margin: 0; font-size: 14px; line-height: 16px; color: #000000;">
            <span style="font-family: Calibri, Arial, sans-serif;">Book a call: </span>
            <a href="${bookACallLinkValue}" style="display: inline-block; font-size: 14px; line-height: 16px; color: #5574C9; font-family: Calibri, Arial, sans-serif;">
              ${bookACallLinkName || bookACallLinkValue}
            </a>
          </p>
        </td>
      </tr>
    `;
  }

  htmlContent += `
          </table>
        </td>
        <td width="70px" align="right" style="vertical-align: top;">
          <div style="width: 64px; height: 16px;">
            <img alt="" width="64px" height="16px" style="width: 64px; height: 16px;" src="${UKAD_LOGO}">
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="3" style="font-size: 12px; color: #4C4D4E; padding-top: 6px;">
          <p style="margin: 0; font-family: Calibri, Arial, sans-serif;">This message contains confidential information and is intended only for the individual named. If you are not the named addressee, you should not disseminate, distribute or copy this email. Please notify the sender immediately by email if you have received this email by mistake and delete this email from your system.</p>
        </td>
      </tr>
    </table>
  `;

  const sanitizedContent = DOMPurify.sanitize(htmlContent);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      toast({ description: "Copied" });
    } catch {
      toast({ description: "Failed to copy", variant: "destructive" });
    }
  };

  const copyTableAsHtml = async () => {
    if (tableRef.current) {
      const table = tableRef.current;

      try {
        const tableHtml = table.outerHTML;

        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([tableHtml], { type: "text/html" }),
          }),
        ]);

        alert(
          "Table copied as HTML! You can now paste it into an email client."
        );
      } catch (err) {
        console.error("Failed to copy table as HTML:", err);
      }
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 p-2 border border-gray-100 rounded-lg shadow-lg">
        <span className="text-2xl border-b p-1 font-medium tracking-wider">
          Preview
        </span>
        <div>
          <div
            ref={tableRef}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
          <Button onClick={copyTableAsHtml} className="mt-4 w-full">
            Copy signature
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-2 border border-gray-100 rounded-lg shadow-lg">
        <span className="text-2xl border-b p-1 font-medium tracking-wider">
          Signature source code
        </span>
        <div>
          <Textarea
            readOnly
            value={htmlContent}
            rows={10}
            className="mb-4 font-mono text-xs"
          />
          <Button onClick={handleCopy} className="w-full">
            Copy signature source code
          </Button>
        </div>
      </div>
      <Instructions />
    </section>
  );
};

export default Preview;
