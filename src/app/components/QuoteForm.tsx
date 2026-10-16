"use client";
import { useState } from "react";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    phone: "",
    garment: "",
    quantity: "",
    specifications: "Designs and patterns",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="quote-form" action="/api/inquiry" method="post">
      <div className="form-heading">
        <span>PRODUCTION INQUIRY</span>
        <p>Fields marked * are required.</p>
      </div>
      <label>Company or brand name *
        <input name="company" required placeholder="Your fashion brand" value={formData.company} onChange={handleChange} />
      </label>
      <div className="form-row">
        <label>Business email *
          <input type="email" name="email" required placeholder="you@brand.com" value={formData.email} onChange={handleChange} />
        </label>
        <label>Phone / WhatsApp
          <input type="tel" name="phone" placeholder="+234 ..." value={formData.phone} onChange={handleChange} />
        </label>
      </div>
      <div className="form-row">
        <label>Garment category *
          <select name="garment" required defaultValue="" value={formData.garment} onChange={handleChange}>
            <option value="" disabled>Select category</option>
            <option>T‑shirts and tops</option>
            <option>Dresses and womenswear</option>
            <option>Shirts and menswear</option>
            <option>Trousers and bottoms</option>
            <option>Uniforms and workwear</option>
            <option>Sportswear and activewear</option>
            <option>Mixed collection / other</option>
          </select>
        </label>
        <label>Estimated quantity *
          <select name="quantity" required defaultValue="" value={formData.quantity} onChange={handleChange}>
            <option value="" disabled>Select quantity</option>
            <option>Under 100 pieces</option>
            <option>100–499 pieces</option>
            <option>500–999 pieces</option>
            <option>1,000–4,999 pieces</option>
            <option>5,000+ pieces</option>
            <option>To be discussed</option>
          </select>
        </label>
      </div>
      <label>What do you have ready?
        <select name="specifications" defaultValue="Designs and patterns" value={formData.specifications} onChange={handleChange}>
          <option>Designs and patterns</option>
          <option>Technical pack</option>
          <option>Prints and specifications</option>
          <option>Sample garment</option>
          <option>Need help defining production specifications</option>
        </select>
      </label>
      <label>Tell us about your order *
        <textarea name="details" required rows={4} placeholder="Garment details, size range, fabric, branding, target delivery date..." value={formData.details} onChange={handleChange} />
      </label>
      <button className="button button-dark form-submit" type="submit">Send production inquiry <span>↗</span></button>
      <p className="form-privacy">Please do not submit confidential design files until a secure file‑sharing process has been agreed.</p>
    </form>
  );
}
