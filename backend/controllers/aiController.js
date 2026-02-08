const { GoogleGenAI } = require("@google/genai");
const Invoice = require("../models/Invoice");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//@desc   Generate Invoice from text in ai
//@route  POST  /api/ai/parse-text
//@access Private

const parseInvoiceFromText = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "Text is required" });
  try {
    const prompt = `You are an expert invoice data extraction AI. Analyze the following text and extract the relevant information.
                The output MUST be a valid JSON object.

        The JSON object should have the following structure:
        {
          "clientName": "string",
          "email": "string (if available)",
          "address": "string (if available)",
          "items": [
            {
              "name": "string",
              "quantity": "number",
              "unitPrice": "number"
            }
          ]
        }

        Here is the text to parse:
        --- TEXT START ---
        ${text}
        --- TEXT END ---

        Extract the data and provide only the JSON object.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const responseText = response.text;

    if (typeof response.text !== "string") {
      if (typeof response.text === "function") {
        responseText = response.text();
      } else {
        throw new Error("Could not extract text from AI response");
      }
    }

    const cleanedJson = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(cleanedJson);
    res.status(200).json(parsedData);
  } catch (error) {
    console.error("Error parsing invoice with ai :", error);
    res.status(500).json({
      message: "Failed to parse invoice data from text",
      details: error.message,
    });
  }
};

//@desc   Generate email remainders in ai
//@route  POST  /api/ai/generate-remainder
//@access Private

const generateRemainderEmail = async (req, res) => {
  const { invoiceId } = req.body;

  if (!invoiceId)
    return res.status(400).json({ message: "Invoice Id is required" });

  try {
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    const prompt = `
      You are a professional and polite accounting assistant. Write a friendly reminder email to a client about an overdue or upcoming invoice payment.

        Use the following details to personalize the email:
        - Client Name: ${invoice.billTo.clientName}
        - Invoice Number: ${invoice.invoiceNumber}
        - Amount Due: $${invoice.total.toFixed(2)}
        - Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}

      The tone should be friendly but clear. Keep it concise. Start the email with "Subject:".
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const responseText = response.text;

    res.status(200).json({ remainderText: responseText });
  } catch (error) {
    console.error("Error generating remainder email :", error);
    res.status(500).json({
      message: "Failed to generate remainder email with AI",
      details: error.message,
    });
  }
};

//@desc   Generate dashboard summary insights in ai
//@route  GET  /api/ai/dashboard-summary
//@access Private

const getDashboardSummary = async (req, res) => {
  try {
    const allInvoices = await Invoice.find({ user: req.user.id });
    if (allInvoices.length === 0)
      return res.status(404).json({
        insights: ["No invoice data available to generate insights."],
      });

    // Process and summarize data
    const totalInvoices = allInvoices.length;
    const paidInvoices = allInvoices.filter((inv) => inv.status === "Paid");
    const unpaidInvoices = allInvoices.filter((inv) => inv.status !== "Paid");
    const totalRevenue = paidInvoices.reduce((acc, inv) => acc + inv.total, 0);
    const totalOutstanding = unpaidInvoices.reduce(
      (acc, inv) => acc + inv.total,
      0,
    );

    const dataSummary = `
      - Total Invoices: ${totalInvoices}
      - Number of Paid Invoices: ${paidInvoices.length}
      - Number of Unpaid Invoices: ${unpaidInvoices.length}
      - Total Revenue From Paid Invoices: $${totalRevenue.toFixed(2)}
      - Total Revenue From Unpaid Invoices: $${totalOutstanding.toFixed(2)}
      - Recent Invoices (last 5): ${allInvoices
        .slice(0, 5)
        .map(
          (inv) =>
            `Invoice #${inv.invoiceNumber} for ${inv.total.toFixed(2)} with status ${inv.status}`,
        )
        .join(", ")}
    `;

    const prompt = `
        You are a friendly and insightful financial analyst for a small business owner.
        Based on the following summary of their invoice data, provide 2-3 concise and actionable insights.
        Each insight should be a short string in a JSON array.
        The insights should be encouraging and helpful. Do not just repeat the data.
        For example, if there is a high outstanding amount, suggest sending reminders. If revenue is high, be encouraging.

        Data Summary:
        ${dataSummary}

        Return your response as a valid JSON object with a single key "insights" which is an array of strings.
        Example format: { "insights": ["Your revenue is looking strong this month!", "You have 5 overdue invoices. Consider sending reminders to get paid faster."] }        
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const responseText = response.text;

    const cleanedJson = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(cleanedJson);
    res.status(200).json(parsedData);
  } catch (error) {
    console.error("Error getting dashboard summary :", error);
    res.status(500).json({
      message: "Failed to get dashboard summary",
      details: error.message,
    });
  }
};

module.exports = {
  parseInvoiceFromText,
  generateRemainderEmail,
  getDashboardSummary,
};
