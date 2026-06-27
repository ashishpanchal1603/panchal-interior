"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, FileCheck, ArrowLeft, RefreshCw, UserPlus } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "./Toast";
import { Customer, PriceItem, EstimateItem, Estimate } from "@/lib/admin";
import { getBilingualItemName } from "@/lib/bilingual";

interface EstimateFormProps {
  initialData?: Estimate; // Provided if editing/duplicating
}

export default function EstimateForm({ initialData }: EstimateFormProps) {
  const router = useRouter();
  const { fetchWithAuth } = useAdminAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // central databases
  const [customersList, setCustomersList] = useState<Customer[]>([]);
  const [priceCatalog, setPriceCatalog] = useState<PriceItem[]>([]);
  const [defaultTerms, setDefaultTerms] = useState<string[]>([]);
  const [defaultGst, setDefaultGst] = useState<number>(18);
  const [defaultDiscount, setDefaultDiscount] = useState<number>(0);

  // customer selection states
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  
  // customer fields
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  
  // estimate details
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [estimateType, setEstimateType] = useState<"material" | "labour">("material");
  const [language, setLanguage] = useState<"en" | "gu">("en");
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState<string[]>([]);

  // items table
  const [items, setItems] = useState<EstimateItem[]>([
    { itemName: "", unit: "sq.ft", quantity: 1, rate: 0, amount: 0, length: undefined, width: undefined, multiplier: 1 }
  ]);

  // Load backend catalog data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // 1. Fetch prices
        const pricesRes = await fetchWithAuth("/api/admin/price-master");
        const pricesData = await pricesRes.json();
        setPriceCatalog(pricesData);

        // 2. Fetch customers
        const customersRes = await fetchWithAuth("/api/admin/customers");
        const customersData = await customersRes.json();
        setCustomersList(customersData);

        // 3. Fetch settings
        const settingsRes = await fetchWithAuth("/api/admin/settings");
        const settingsData = await settingsRes.json();
        setDefaultTerms(settingsData.defaultTerms || []);
        setDefaultGst(settingsData.gstRate ?? 18);
        setDefaultDiscount(settingsData.defaultDiscount ?? 0);

        // If editing/duplicating, prefill
        if (initialData) {
          setSelectedCustomerId(initialData.customerId);
          setCustomerName(initialData.customerName);
          setCustomerPhone(initialData.customerPhone);
          setSiteAddress(initialData.siteAddress);
          setDate(initialData.date);
          setEstimateType(initialData.estimateType);
          setLanguage(initialData.language);
          setNotes(initialData.notes || "");
          setTerms(initialData.termsAndConditions || []);
          const mappedItems = (initialData.items || []).map(item => ({
            ...item,
            itemName: getBilingualItemName(item.itemName),
            multiplier: item.multiplier ?? 1
          }));
          setItems(mappedItems);
        } else {
          setTerms(settingsData.defaultTerms || []);
        }
      } catch (err) {
        console.error("Load form data error:", err);
        showToast("Failed to load catalog settings database.", "error");
      } finally {
        setLoading(false);
      }
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  // Handle customer selection changes
  const handleCustomerChange = (id: string) => {
    setSelectedCustomerId(id);
    if (id === "new" || !id) {
      setIsNewCustomer(true);
      setCustomerName("");
      setCustomerPhone("");
      setSiteAddress("");
    } else {
      setIsNewCustomer(false);
      const cust = customersList.find((c) => c.id === id);
      if (cust) {
        setCustomerName(cust.name);
        setCustomerPhone(cust.phone);
        setSiteAddress(cust.address);
      }
    }
  };

  // Add Item Line
  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      { itemName: "", unit: "sq.ft", quantity: 1, rate: 0, amount: 0, length: undefined, width: undefined, multiplier: 1 }
    ]);
  };

  // Delete Item Line
  const removeItemRow = (index: number) => {
    if (items.length === 1) {
      showToast("Estimates must contain at least 1 item row.", "error");
      return;
    }
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle item column modifications
  const handleItemChange = (index: number, field: keyof EstimateItem, value: unknown) => {
    setItems((prev) => {
      const copy = [...prev];
      const updatedItem = { ...copy[index] };

      if (field === "itemName") {
        updatedItem.itemName = value as string;
        // Check if selected item matches price master catalog
        const match = priceCatalog.find((p) => {
          const bilingual = getBilingualItemName(p.name);
          return p.name === value || bilingual === value;
        });
        if (match) {
          updatedItem.unit = match.unit;
          updatedItem.rate = estimateType === "material" ? match.materialRate : match.labourRate;
          updatedItem.itemName = getBilingualItemName(match.name);
        }
      } else if (field === "unit") {
        updatedItem.unit = value as string;
      } else if (field === "quantity") {
        updatedItem.quantity = Math.max(0, Number(value));
      } else if (field === "rate") {
        updatedItem.rate = Math.max(0, Number(value));
      } else if (field === "length") {
        updatedItem.length = value === "" ? undefined : Math.max(0, Number(value));
      } else if (field === "width") {
        updatedItem.width = value === "" ? undefined : Math.max(0, Number(value));
      } else if (field === "multiplier") {
        updatedItem.multiplier = value === "" ? undefined : Math.max(0, Number(value));
      }

      // Check if both length and width are defined to auto-calculate quantity
      const hasLength = updatedItem.length !== undefined && !isNaN(updatedItem.length) && updatedItem.length > 0;
      const hasWidth = updatedItem.width !== undefined && !isNaN(updatedItem.width) && updatedItem.width > 0;
      
      if (hasLength && hasWidth) {
        const len = updatedItem.length!;
        const wid = updatedItem.width!;
        const mult = (updatedItem.multiplier !== undefined && !isNaN(updatedItem.multiplier)) ? updatedItem.multiplier! : 1;
        // Formula: Quantity = Length * Width * Multiplier (rounded to 2 decimals)
        updatedItem.quantity = Number((len * wid * mult).toFixed(2));
      }

      updatedItem.amount = Number((updatedItem.quantity * updatedItem.rate).toFixed(2));
      copy[index] = updatedItem;
      return copy;
    });
  };

  // Update rates when estimate type changes
  const handleEstimateTypeChange = (type: "material" | "labour") => {
    setEstimateType(type);
    
    // Update existing items rates if they match central prices
    setItems((prev) =>
      prev.map((item) => {
        const match = priceCatalog.find((p) => {
          const bilingual = getBilingualItemName(p.name);
          return p.name === item.itemName || bilingual === item.itemName;
        });
        if (match) {
          const newRate = type === "material" ? match.materialRate : match.labourRate;
          return {
            ...item,
            rate: newRate,
            amount: Number((item.quantity * newRate).toFixed(2))
          };
        }
        return item;
      })
    );
  };

  // Calculation Blocks
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const discountAmount = (subtotal * defaultDiscount) / 100;
  const taxableAmount = subtotal - discountAmount;
  const gstAmount = 0; // GST disabled: (taxableAmount * defaultGst) / 100;
  const grandTotal = Math.round(taxableAmount); // GST disabled: Math.round(taxableAmount + gstAmount);

  // Submit Handler
  const handleSubmit = async (status: "draft" | "saved") => {
    if (!customerName || !customerPhone) {
      showToast("Please fill in client name and contact phone.", "error");
      return;
    }

    const invalidItems = items.some((item) => !item.itemName || item.quantity <= 0 || item.rate <= 0);
    if (invalidItems) {
      showToast("Please ensure all item names are valid, quantity > 0, and rate > 0.", "error");
      return;
    }

    setSubmitting(true);

    try {
      let custId = selectedCustomerId;

      // 1. If customer is new, auto-create customer profile
      if (isNewCustomer || !selectedCustomerId) {
        const newCustRes = await fetchWithAuth("/api/admin/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: customerName,
            phone: customerPhone,
            address: siteAddress,
          }),
        });

        if (newCustRes.ok) {
          const newCustData = await newCustRes.json();
          custId = newCustData.customer.id;
          showToast(`Created customer file for ${customerName}`);
        } else {
          // If customer phone already exists, attempt to read ID or alert
          const errData = await newCustRes.json();
          showToast(errData.error || "Customer creation failed", "error");
          setSubmitting(false);
          return;
        }
      }

      // 2. Prepare Estimate Data
      const payload: Omit<Estimate, "id" | "estimateNumber" | "createdAt" | "updatedAt"> & { id?: string } = {
        customerId: custId,
        customerName,
        customerPhone,
        siteAddress,
        date,
        estimateType,
        status,
        items,
        subtotal,
        discount: defaultDiscount,
        gst: 0, // GST disabled
        grandTotal,
        language,
        termsAndConditions: terms,
        notes,
      };

      let res;
      if (initialData) {
        // Edit Mode: PUT update
        payload.id = initialData.id;
        res = await fetchWithAuth("/api/admin/estimates", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create Mode: POST new
        res = await fetchWithAuth("/api/admin/estimates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        showToast(status === "draft" ? "Draft saved successfully!" : "Estimate saved successfully!", "success");
        router.push("/admin/estimates");
      } else {
        showToast("Failed to save estimate details.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error occurred.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-stone-400 gap-3">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="font-semibold text-sm">Loading price catalog & client registers...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* Top action header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/admin/estimates")}
          className="p-2 border border-stone-200 dark:border-stone-850 bg-white dark:bg-stone-900 rounded-xl hover:border-primary transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 text-stone-600 dark:text-stone-300" />
        </button>
        <div>
          <h1 className="font-outfit text-2xl font-bold text-stone-900 dark:text-white">
            {initialData ? `Edit Estimate Proposal (${initialData.estimateNumber})` : "Create Estimate Proposal"}
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">Fill details below to calculate and generate printable estimates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Editor workspace */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: Customer details */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-800/80 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-outfit font-extrabold text-stone-900 dark:text-white text-sm">
                Client Information
              </h3>
              <button
                type="button"
                onClick={() => handleCustomerChange(isNewCustomer ? "" : "new")}
                className="flex items-center gap-1.5 text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>{isNewCustomer ? "Select Existing Client" : "Add New Client"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Profile dropdown selector */}
              {!isNewCustomer && (
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                    Search Customer Profiles
                  </label>
                  <select
                    value={selectedCustomerId}
                    onChange={(e) => handleCustomerChange(e.target.value)}
                    className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 text-sm bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100"
                  >
                    <option value="">-- Choose registered customer profile --</option>
                    {customersList.map((c) => (
                      <option key={c.id} value={c.id}>
                        👤 {c.name} ({c.phone})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Customer Name */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  disabled={!isNewCustomer && selectedCustomerId !== ""}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 text-sm bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary disabled:opacity-60 text-stone-800 dark:text-stone-100"
                  placeholder="e.g. Ashish Panchal"
                />
              </div>

              {/* Customer Phone */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  disabled={!isNewCustomer && selectedCustomerId !== ""}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 text-sm bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary disabled:opacity-60 text-stone-800 dark:text-stone-100"
                  placeholder="10-digit number"
                />
              </div>

              {/* Site Address */}
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Site Address
                </label>
                <textarea
                  value={siteAddress}
                  disabled={!isNewCustomer && selectedCustomerId !== ""}
                  onChange={(e) => setSiteAddress(e.target.value)}
                  rows={2}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 text-sm bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary disabled:opacity-60 text-stone-800 dark:text-stone-100"
                  placeholder="Ahmedabad project installation address..."
                />
              </div>
            </div>
          </div>

          {/* Card 2: Dynamic Items table */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-800/80 shadow-sm space-y-4 overflow-x-auto">
            <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3 min-w-[600px]">
              <h3 className="font-outfit font-extrabold text-stone-900 dark:text-white text-sm">
                Estimate Line Items
              </h3>
              <button
                type="button"
                onClick={addItemRow}
                className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer select-none"
              >
                <Plus className="h-4 w-4" />
                Add Item Line
              </button>
            </div>

            {/* Table wrapper */}
            <table className="w-full text-left min-w-[700px] border-collapse text-xs">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 border-b border-stone-100 dark:border-stone-800">
                  <th className="py-2.5 pb-3">Item Description</th>
                  <th className="py-2.5 pb-3 px-2 w-16 text-right">Length</th>
                  <th className="py-2.5 pb-3 px-2 w-16 text-right">Width</th>
                  <th className="py-2.5 pb-3 px-2 w-16 text-right">Mult</th>
                  <th className="py-2.5 pb-3 px-2 w-20 text-right">Qty</th>
                  <th className="py-2.5 pb-3 px-2 w-24">Unit</th>
                  <th className="py-2.5 pb-3 px-2 w-28 text-right">Rate (₹)</th>
                  <th className="py-2.5 pb-3 px-2 w-32 text-right">Amount (₹)</th>
                  <th className="py-2.5 pb-3 text-right w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-850">
                {items.map((item, index) => (
                  <tr key={index} className="align-middle">
                    {/* Item Name autofill autocomplete select + input */}
                    <td className="py-3 pr-2">
                      <div className="relative">
                        <input
                          type="text"
                          list="items-autocomplete"
                          value={item.itemName}
                          onChange={(e) => handleItemChange(index, "itemName", e.target.value)}
                          placeholder="Select or enter item"
                          className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 font-semibold"
                        />
                        <datalist id="items-autocomplete">
                          {priceCatalog.map((p) => {
                            const bilingual = getBilingualItemName(p.name);
                            return <option key={p.id} value={bilingual} />;
                          })}
                        </datalist>
                      </div>
                    </td>

                    {/* Length */}
                    <td className="py-3 px-2 w-16">
                      <input
                        type="number"
                        step="any"
                        placeholder="L"
                        value={item.length === undefined ? "" : item.length}
                        onChange={(e) => handleItemChange(index, "length", e.target.value)}
                        className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-2 py-2 text-right bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 font-medium"
                      />
                    </td>

                    {/* Width */}
                    <td className="py-3 px-2 w-16">
                      <input
                        type="number"
                        step="any"
                        placeholder="W"
                        value={item.width === undefined ? "" : item.width}
                        onChange={(e) => handleItemChange(index, "width", e.target.value)}
                        className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-2 py-2 text-right bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 font-medium"
                      />
                    </td>

                    {/* Multiplier */}
                    <td className="py-3 px-2 w-16">
                      <input
                        type="number"
                        step="any"
                        placeholder="Mult"
                        value={item.multiplier === undefined ? "" : item.multiplier}
                        onChange={(e) => handleItemChange(index, "multiplier", e.target.value)}
                        className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-2 py-2 text-right bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 font-medium"
                      />
                    </td>

                    {/* Qty */}
                    <td className="py-3 px-2 w-20">
                      <input
                        type="number"
                        step="any"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        placeholder="Qty"
                        readOnly={item.length !== undefined && item.width !== undefined && item.length > 0 && item.width > 0}
                        className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2 text-right bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 font-medium read-only:opacity-75"
                      />
                    </td>

                    {/* Unit */}
                    <td className="py-3 px-2 w-24">
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, "unit", e.target.value)}
                        placeholder="e.g. sq.ft"
                        className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100"
                      />
                    </td>

                    {/* Rate */}
                    <td className="py-3 px-2 w-28">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                        className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2 text-right bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 font-semibold"
                      />
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-2 text-right font-bold text-stone-900 dark:text-white leading-none w-32">
                      ₹{item.amount.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                    </td>

                    {/* Delete */}
                    <td className="py-3 text-right w-12">
                      <button
                        type="button"
                        onClick={() => removeItemRow(index)}
                        className="p-2 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-850 cursor-pointer"
                        title="Delete line"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {/* Card 3: Notes & Terms */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-800/80 shadow-sm space-y-5">
            <h3 className="font-outfit font-extrabold text-stone-900 dark:text-white text-sm border-b border-stone-100 dark:border-stone-800 pb-3">
              Remarks & Terms clauses
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Client comments / Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 text-sm bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100"
                  placeholder="Add details regarding materials, warranty limits, or custom designs..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Contract Terms & Conditions
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-stone-100 dark:border-stone-800 p-3.5 rounded-xl bg-stone-50/20">
                  {terms.map((clause, i) => (
                    <div key={i} className="flex gap-2 text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-bold shrink-0">{i + 1}.</span>
                      <p>{clause}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Summary and Save Controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: Summary calculation details */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-800/80 shadow-md space-y-5">
            <h3 className="font-outfit font-extrabold text-stone-900 dark:text-white text-sm border-b border-stone-100 dark:border-stone-800 pb-3">
              Summary Calculation
            </h3>

            <div className="space-y-4 text-xs font-semibold text-stone-500 dark:text-stone-400">
              
              {/* Type Select */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1.5">
                  Estimate Type
                </label>
                <div className="grid grid-cols-2 gap-2 bg-stone-50 dark:bg-stone-950 p-1 rounded-xl border border-stone-100 dark:border-stone-850">
                  <button
                    type="button"
                    onClick={() => handleEstimateTypeChange("material")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer select-none ${
                      estimateType === "material"
                        ? "bg-primary text-white shadow-sm"
                        : "hover:text-stone-950 dark:hover:text-white"
                    }`}
                  >
                    With Material
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEstimateTypeChange("labour")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer select-none ${
                      estimateType === "labour"
                        ? "bg-primary text-white shadow-sm"
                        : "hover:text-stone-950 dark:hover:text-white"
                    }`}
                  >
                    Labour Work
                  </button>
                </div>
              </div>

              {/* Language Select */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1.5">
                  Print language
                </label>
                <div className="grid grid-cols-2 gap-2 bg-stone-50 dark:bg-stone-950 p-1 rounded-xl border border-stone-100 dark:border-stone-850">
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer select-none ${
                      language === "en"
                        ? "bg-primary text-white"
                        : "hover:text-stone-950 dark:hover:text-white"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("gu")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer select-none ${
                      language === "gu"
                        ? "bg-primary text-white"
                        : "hover:text-stone-950 dark:hover:text-white"
                    }`}
                  >
                    Gujarati
                  </button>
                </div>
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1.5">
                  Estimate Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 font-semibold"
                />
              </div>

              <div className="border-t border-stone-100 dark:border-stone-800/80 pt-4 space-y-2.5">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-stone-900 dark:text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({defaultDiscount}%):</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {/* GST disabled
                {defaultGst > 0 && (
                  <div className="flex justify-between">
                    <span>GST ({defaultGst}%):</span>
                    <span className="font-bold text-stone-900 dark:text-white">₹{gstAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                */}
                <div className="flex justify-between text-sm font-extrabold text-stone-950 dark:text-white border-t border-stone-200 dark:border-stone-800 pt-2.5">
                  <span className="text-primary">Grand Total:</span>
                  <span className="text-primary text-base">
                    ₹{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSubmit("saved")}
              disabled={submitting}
              className="w-full py-3.5 px-4 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-lg shadow-primary/10 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
            >
              {submitting ? (
                <RefreshCw className="h-4.5 w-4.5 animate-spin" />
              ) : (
                <FileCheck className="h-4.5 w-4.5" />
              )}
              Save Estimate Proposal
            </button>

            <button
              onClick={() => handleSubmit("draft")}
              disabled={submitting}
              className="w-full py-3.5 px-4 bg-white hover:bg-stone-50 dark:bg-stone-900 dark:hover:bg-stone-850 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
            >
              {submitting ? (
                <RefreshCw className="h-4.5 w-4.5 animate-spin" />
              ) : (
                <Save className="h-4.5 w-4.5 text-stone-400" />
              )}
              Save Draft
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
