import React, { useState, useRef } from 'react';
import { Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please populate all protocol coordinates (Name, Email, Message).');
      return;
    }

    setStatus('submitting');

    // Retrieve keys from environment or use mock placeholders
    const serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID || 'service_placeholder';
    const templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID || 'template_placeholder';
    const publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_placeholder';

    if (serviceId === 'service_placeholder' || templateId === 'template_placeholder' || publicKey === 'public_key_placeholder') {
      // Simulation mode if credentials are placeholders
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        if (formRef.current) formRef.current.reset();
      }, 1500);
      return;
    }

    try {
      if (formRef.current) {
        await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        formRef.current.reset();
      }
    } catch (err: any) {
      console.error('EmailJS transmission failure:', err);
      setStatus('error');
      setErrorMessage(err?.text || 'Failed to transmit message. Please try again or verify keys.');
    }
  };

  return (
    <section className="parallax-section section-scroll bg-gray-100 z-[60] shadow-[0_-30px_60px_rgba(0,0,0,0.1)] py-20" id="contact">
      <div className="w-full px-margin-mobile md:px-margin-desktop max-w-2xl mx-auto flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="font-headline-md text-gray-900 text-4xl font-bold">Contact</h2>
          <p className="font-body-md text-gray-600 mt-4 max-w-md mx-auto">
            Secure a connection for high-priority collaborations and internship requests.
          </p>
        </div>

        {/* Contact Form Card */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-2xl border border-gray-300 rounded-3xl p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden shadow-2xl text-left"
        >
          {/* Decorative blur backdrop circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-200 blur-[60px] rounded-full pointer-events-none" />

          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              id="name"
              name="user_name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="peer w-full bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-900 focus:ring-0 px-0 py-3 text-gray-900 font-body-md placeholder-transparent transition-all outline-none"
            />
            <label
              htmlFor="name"
              className="absolute left-0 -top-3.5 text-gray-500 font-label-md text-[11px] uppercase tracking-widest transition-all peer-placeholder-shown:text-body-md peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-900 cursor-text"
            >
              Name
            </label>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="user_email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="peer w-full bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-900 focus:ring-0 px-0 py-3 text-gray-900 font-body-md placeholder-transparent transition-all outline-none"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-gray-500 font-label-md text-[11px] uppercase tracking-widest transition-all peer-placeholder-shown:text-body-md peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-900 cursor-text"
            >
              Email
            </label>
          </div>

          {/* Message Field */}
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={3}
              className="peer w-full bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-900 focus:ring-0 px-0 py-3 text-gray-900 font-body-md placeholder-transparent transition-all resize-none outline-none"
            />
            <label
              htmlFor="message"
              className="absolute left-0 -top-3.5 text-gray-500 font-label-md text-[11px] uppercase tracking-widest transition-all peer-placeholder-shown:text-body-md peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-900 cursor-text"
            >
              Message
            </label>
          </div>

          {/* Feedback Messages */}
          {status === 'success' && (
            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Signal Transmitted Successfully. Connection secured.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm font-semibold">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-silver w-full py-4 rounded-2xl font-label-md text-xs uppercase tracking-[0.3em] font-black mt-4 flex justify-center items-center gap-3 shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {status === 'submitting' ? (
              <>
                Transmitting
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                Transmit
                <Send className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>

      </div>
    </section>
  );
}
