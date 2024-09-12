export function feedbackEmail({ userMessage }: { userMessage: string }) {
  return `
    <body style="padding-top: 8px; padding-bottom: 8px">
    <table
      width="100%"
      border="0"
      cellspacing="20"
      cellpadding="0"
      style="
        background: #f1f5f9;
        max-width: 600px;
        margin: auto;
        border-top: 10px solid #48566a;
        font-family: Helvetica, Arial, sans-serif;
      "
    >
      <tr>
        <td style="font-size: 1.3rem; text-align: center; line-height: 2">
          You have new feedback
        </td>
      </tr>
      <tr>
        <td style="font-size: 1rem; line-height: 2">
          <span style="display: inline-block; width: 5em; color: #1d283a"
            >Message:</span
          >${userMessage}
        </td>
      </tr>
    </table>
  </body>
    `;
}
