const Invoice = require("../models/Invoice");

//@desc Create new Invoice
//@route POST/api/invoices
//@access Private

const createInvoice = async (req, res) => {
  try {
    const user = req.user;
    const {
      invoiceNumber,
      invoiceDate,
      dueDate,
      billFrom,
      billTo,
      items,
      notes,
      paymentTerms,
    } = req.body;

    //Items calculation
    let subtotal = 0;
    let taxTotal = 0;

    items.forEach((item) => {
      subtotal += item.unitPrice * item.quantity;
      taxTotal +=
        (item.unitPrice * item.quantity * (item.taxPercent || 0)) / 100;
    });

    const total = subtotal + taxTotal;

    const invoice = await Invoice.create({
      user,
      invoiceNumber,
      invoiceDate,
      dueDate,
      billFrom,
      billTo,
      items,
      notes,
      paymentTerms,
      subtotal,
      taxTotal,
      total,
    });
    res.status(201).json(invoice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating invoice", error: error.message });
  }
};

//@desc GET all Invoices of logged-in user
//@route GET /api/invoices
//@access Private

const getInvoices = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting invoice list", error: error.message });
  }
};

//@desc GET single Invoice
//@route GET /api/invoices/:id
//@access Private

const getInvoiceById = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting invoice", error: error.message });
  }
};

//@desc Update Invoice
//@route PUT /api/invoices/:id
//@access Private

const updateInvoice = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating invoice", error: error.message });
  }
};

//@desc Delete Invoice
//@route DELETE /api/invoices/:id
//@access Private

const deleteInvoice = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting invoice", error: error.message });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
