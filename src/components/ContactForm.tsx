'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import AnimButton from './ui/AnimButton';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real application, you would send the data to your backend API
      // For this demo, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Form submitted:', formData);
      setIsSubmitted(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error (show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (field in errors) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  if (isSubmitted) {
    return (
      <Card className="contact-success bg-green-50">
        <CardContent className="pt-6">
          <div className="">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="contact-success-title text-xl font-heading text-green-700 mb-2">
              Thank You!
            </h3>
            <p className="contact-success-text text-green-700 font-body">
              Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="mt-4 border-green-300 text-green-700 hover:bg-green-100 w-full"
            >
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="text-base font-heading text-charcoal mb-2 block">
            Full Name *
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1 font-body">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-base font-heading text-charcoal mb-2 block">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="your.email@company.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1 font-body">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="company" className="text-base font-heading text-charcoal mb-2 block">
            Company Name *
          </Label>
          <Input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className={`${errors.company ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Your company name"
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1 font-body">{errors.company}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-base font-heading text-charcoal mb-2 block">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Your phone number"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="service" className="text-base font-heading text-charcoal mb-2 block">
          Service Interest *
        </Label>
        <Select
          value={formData.service}
          onValueChange={(value) => handleInputChange('service', value)}
        >
          <SelectTrigger className={`${errors.service ? 'border-red-500 focus:ring-red-500' : ''}`}>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent className="bg-[white]">
            <SelectItem value="customer-experience">Customer Experience</SelectItem>
            <SelectItem value="operational-efficiency">Operational Efficiency</SelectItem>
            <SelectItem value="data-analytics">Data & Analytics</SelectItem>
            <SelectItem value="general-consultation">General Consultation</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.service && <p className="text-red-500 text-sm mt-1 font-body">{errors.service}</p>}
      </div>

      <div>
        <Label htmlFor="message" className="text-base font-heading text-charcoal mb-2 block">
          Message *
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className={`min-h-[120px] ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Tell us about your business challenges and transformation goals..."
        />
        {errors.message && <p className="text-red-500 text-sm mt-1 font-body">{errors.message}</p>}
      </div>

      <AnimButton isSubmit>
        <div className="contact-submit-button">
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </div>
      </AnimButton>
    </form>
  );
};

export default ContactForm;
