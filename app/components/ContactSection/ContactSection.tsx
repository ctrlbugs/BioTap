'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

const LOGO_VERSION = 1;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = (formData.get('firstName') as string)?.trim() || '';
    const lastName = (formData.get('lastName') as string)?.trim() || '';
    const email = (formData.get('email') as string)?.trim() || '';
    const jobTitle = (formData.get('jobTitle') as string)?.trim() || '';
    const companyName = (formData.get('companyName') as string)?.trim() || '';
    const industry = (formData.get('industry') as string)?.trim() || '';
    const description = (formData.get('description') as string)?.trim() || '';

    const newErrors: { firstName?: string; email?: string } = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!email || !email.includes('@')) newErrors.email = 'Email is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      fullName: [firstName, lastName].filter(Boolean).join(' '),
      email,
      jobTitle,
      orgName: companyName,
      industrySector: industry,
      description,
      orgType: '',
      country: '',
      phone: '',
      contactMethod: 'email',
      procurementCategory: '',
      supportType: '',
    };

    setIsSubmitting(true);
    setToast(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({ type: 'error', message: data.message || data.error || 'Failed to submit. Please try again.' });
        return;
      }

      setToast({ type: 'success', message: data.message || 'Your request has been submitted successfully.' });
      form.reset();
      setErrors({});
      setTimeout(() => setToast(null), 4000);
    } catch {
      setToast({ type: 'error', message: 'Failed to submit. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-section-grid fade-in">
        <div className="contact-section-left">
          <p className="contact-section-eyebrow">Contact us</p>
          <h2 className="contact-section-title">Talk to us</h2>
          <p className="contact-section-subtitle">Let&apos;s Build the Future of Biometric Payments Together</p>
          <p className="contact-section-desc">
            Have a question, partnership idea, or want to learn more about BioTap? Our team is here to help.
            Whether you&apos;re a user, merchant, financial institution, or technology partner, <span className="contact-section-nowrap">we&apos;d love to hear from you.</span>
          </p>
          <div className="contact-section-brand">
            <Image
              src={`/images/logo-white.png?v=${LOGO_VERSION}`}
              alt="BioTap"
              width={32}
              height={32}
              className="contact-section-logo"
              unoptimized
            />
            <span className="contact-section-brand-name">BioTap</span>
          </div>
        </div>

        <div className="contact-section-right">
          <form ref={formRef} className="contact-section-form" onSubmit={handleSubmit}>
            <div className="contact-section-grid-fields">
              <div className="contact-section-field">
                <label htmlFor="contact-firstName">First name</label>
                <input
                  id="contact-firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your First name"
                  required
                  className={errors.firstName ? 'contact-section-input-error' : ''}
                />
                {errors.firstName && (
                  <span className="contact-section-error">
                    <span className="material-icons contact-section-error-icon">warning</span>
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="contact-section-field">
                <label htmlFor="contact-lastName">Last name</label>
                <input id="contact-lastName" name="lastName" type="text" placeholder="Enter your Last name" />
              </div>
            </div>

            <div className="contact-section-field">
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                className={errors.email ? 'contact-section-input-error' : ''}
              />
              {errors.email && (
                <span className="contact-section-error">
                  <span className="material-icons contact-section-error-icon">warning</span>
                  {errors.email}
                </span>
              )}
            </div>

            <div className="contact-section-field">
              <label htmlFor="contact-jobTitle">Job title</label>
              <input id="contact-jobTitle" name="jobTitle" type="text" placeholder="Enter your Job title" />
            </div>

            <div className="contact-section-field">
              <label htmlFor="contact-companyName">Company name</label>
              <input id="contact-companyName" name="companyName" type="text" placeholder="Enter your company name" />
            </div>

            <div className="contact-section-field">
              <label htmlFor="contact-industry">Industry</label>
              <select id="contact-industry" name="industry">
                <option value="">Select your company&apos;s industry</option>
                <option value="retail">Retail</option>
                <option value="hospitality">Hospitality</option>
                <option value="healthcare">Healthcare</option>
                <option value="financial">Financial Services</option>
                <option value="oil-gas">Oil & Gas</option>
                <option value="government">Government / Public Sector</option>
                <option value="technology">Technology</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="contact-section-field">
              <label htmlFor="contact-description">How can BioTap power your solution?</label>
              <textarea id="contact-description" name="description" rows={4} placeholder="Let's know how we can help you"></textarea>
            </div>

            {toast && (
              <div className={`contact-section-toast contact-section-toast-${toast.type}`}>
                <span className="contact-section-toast-icon">{toast.type === 'success' ? '✓' : '!'}</span>
                <span>{toast.message}</span>
              </div>
            )}

            <button type="submit" className="contact-section-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
              <span className="material-icons contact-section-submit-icon">arrow_forward</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
