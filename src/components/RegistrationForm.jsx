import React, { useState, useEffect } from 'react';
import { ShieldAlert, Loader2, Zap, ArrowLeft } from 'lucide-react';
import { SpiderIcon } from './SuperheroSilhouettes';
import { apiFetch } from '../admin/api';

export const DEPARTMENTS = [
  'AI&DS',
  'AI&ML',
  'CSE',
  'CSBS',
  'ECE',
  'EEE',
  'MECHANICAL',
  'VL&SI',
  'CYBER SECURITY',
  'AERONAUTICAL',
  'BIO-MEDICAL',
  'BIO-TECH',
  'Other'
];

export default function RegistrationForm({ category, onSuccess, onBackToHome }) {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    otherDepartment: '',
    dob: '',
    phone: '',
    instrument: category === 'Instruments' ? 'Guitar' : 'Vocals',
    otherInstrument: '',
    experience: '',
    confirmed: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      instrument: category === 'Instruments' ? 'Guitar' : 'Vocals',
      otherInstrument: ''
    }));
    setErrors({});
    setServerError('');
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.department) {
      newErrors.department = 'Please select your department';
    } else if (formData.department === 'Other' && !formData.otherDepartment.trim()) {
      newErrors.otherDepartment = 'Please specify your department';
    }

    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    
    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile / WhatsApp Number is required';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (at least 8 digits)';
    }

    if (category === 'Instruments' && formData.instrument === 'Other' && !formData.otherInstrument.trim()) {
      newErrors.otherInstrument = 'Please specify your instrument';
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Please share your musical experience details';
    } else if (formData.experience.trim().length < 10) {
      newErrors.experience = 'Experience description is too short (min 10 characters)';
    }

    if (!formData.confirmed) {
      newErrors.confirmed = 'You must confirm that the information provided is correct';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setServerError('');

    const finalInstrument = category === 'Singing'
      ? 'Vocals'
      : (formData.instrument === 'Other' ? formData.otherInstrument.trim() : formData.instrument);

    const finalDepartment = formData.department === 'Other'
      ? formData.otherDepartment.trim()
      : formData.department;

    const payload = {
      name: formData.name.trim(),
      department: finalDepartment,
      dob: formData.dob,
      phone: formData.phone.trim(),
      category,
      instrument: finalInstrument,
      experience: formData.experience.trim()
    };

    try {
      const { ok, data } = await apiFetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (!ok) {
        throw new Error(data?.error || 'Registration failed. Please try again.');
      }

      onSuccess(data.student || { registration_id: data.registration_id, name: payload.name, category, instrument: finalInstrument });
    } catch (err) {
      console.error('Submission error:', err);
      setServerError(err.message || 'Server connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="registration-form-section" className="section-container" style={{ paddingTop: 'clamp(10px, 2vw, 20px)', paddingBottom: 'clamp(40px, 6vw, 80px)' }}>
      
      {/* Top Back Navigation */}
      <div style={{ maxWidth: '850px', margin: '0 auto 20px', width: '100%' }}>
        <button 
          onClick={onBackToHome}
          className="btn-secondary"
          style={{ padding: '10px 18px', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', width: 'auto' }}
        >
          <ArrowLeft size={18} /> BACK TO AUDITIONS
        </button>
      </div>

      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '850px', 
          margin: '0 auto', 
          padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 36px)',
          border: category === 'Singing' ? '2px solid var(--spider-red)' : '2px solid var(--spider-blue)',
          boxShadow: category === 'Singing' ? '0 15px 50px rgba(255, 13, 53, 0.35)' : '0 15px 50px rgba(0, 212, 255, 0.35)',
          background: 'linear-gradient(180deg, rgba(8, 12, 22, 0.98) 0%, rgba(3, 5, 9, 0.99) 100%)',
          width: '100%'
        }}
      >
        <div className="spider-web-corner-tl" />
        <div className="spider-web-corner-tr" />

        {/* Form Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 13, 53, 0.15)', border: '1px solid rgba(255, 13, 53, 0.4)', padding: '6px 16px', borderRadius: '30px', marginBottom: '12px', maxWidth: '100%' }}>
            <SpiderIcon size={16} color="#ff0d35" />
            <span style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', fontWeight: 800, color: '#00d4ff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              MISSION: SHOW YOUR TALENT
            </span>
          </div>

          <h3 className="superhero-title" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', margin: '4px 0 8px' }}>
            {category === 'Singing' ? 'SINGING AUDITION REGISTRATION' : 'INSTRUMENT AUDITION REGISTRATION'}
          </h3>
          <p style={{ color: '#94a3b8', fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)' }}>
            SPIDER-WEB COMMAND PANEL — Enter your details to register for BAND UNKNOWN 2026.
          </p>
        </div>

        {serverError && (
          <div style={{ padding: '14px 18px', background: 'rgba(255, 13, 53, 0.18)', border: '1px solid #ff0d35', borderRadius: '12px', color: '#ffffff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={20} color="#ff0d35" />
            <span style={{ fontSize: '0.9rem' }}>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* 1. Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Peter Parker / Rahul Sharma"
              className="form-input"
            />
            {errors.name && <p style={{ color: '#ff0d35', fontSize: '0.8rem', marginTop: '4px' }}>{errors.name}</p>}
          </div>

          <div className="form-row-2">
            {/* 2. Department Dropdown */}
            <div className="form-group">
              <label className="form-label">Department *</label>
              <select 
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <p style={{ color: '#ff0d35', fontSize: '0.8rem', marginTop: '4px' }}>{errors.department}</p>}

              {/* Conditional input if 'Other' is selected */}
              {formData.department === 'Other' && (
                <div style={{ marginTop: '12px' }}>
                  <label className="form-label">Enter Department Name *</label>
                  <input 
                    type="text"
                    name="otherDepartment"
                    value={formData.otherDepartment}
                    onChange={handleChange}
                    placeholder="e.g. Chemical Engineering, Civil"
                    className="form-input"
                  />
                  {errors.otherDepartment && <p style={{ color: '#ff0d35', fontSize: '0.8rem', marginTop: '4px' }}>{errors.otherDepartment}</p>}
                </div>
              )}
            </div>

            {/* 3. Date of Birth */}
            <div className="form-group">
              <label className="form-label">Date of Birth *</label>
              <input 
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="form-input"
              />
              {errors.dob && <p style={{ color: '#ff0d35', fontSize: '0.8rem', marginTop: '4px' }}>{errors.dob}</p>}
            </div>
          </div>

          {/* 4. Mobile / WhatsApp Number */}
          <div className="form-group">
            <label className="form-label">Mobile Number / WhatsApp Number *</label>
            <input 
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className="form-input"
            />
            {errors.phone && <p style={{ color: '#ff0d35', fontSize: '0.8rem', marginTop: '4px' }}>{errors.phone}</p>}
          </div>

          {/* 5. Instrument Dropdown (only if category is Instruments) */}
          {category === 'Instruments' && (
            <div className="form-group">
              <label className="form-label">Select Your Instrument *</label>
              <select 
                name="instrument"
                value={formData.instrument}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Keyboard">Keyboard</option>
                <option value="Guitar">Guitar</option>
                <option value="Bass Guitar">Bass Guitar</option>
                <option value="Drums">Drums</option>
                <option value="Cajon">Cajon</option>
                <option value="Violin">Violin</option>
                <option value="Flute">Flute</option>
                <option value="Saxophone">Saxophone</option>
                <option value="Trumpet">Trumpet</option>
                <option value="Other">Other</option>
              </select>

              {formData.instrument === 'Other' && (
                <div style={{ marginTop: '14px' }}>
                  <label className="form-label">Enter Your Instrument *</label>
                  <input 
                    type="text"
                    name="otherInstrument"
                    value={formData.otherInstrument}
                    onChange={handleChange}
                    placeholder="e.g. Ukulele, Harmonica, Melodica"
                    className="form-input"
                  />
                  {errors.otherInstrument && <p style={{ color: '#ff0d35', fontSize: '0.8rem', marginTop: '4px' }}>{errors.otherInstrument}</p>}
                </div>
              )}
            </div>
          )}

          {/* 6. Experience Textarea */}
          <div className="form-group">
            <label className="form-label">Musical Experience *</label>
            <textarea 
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder={
                category === 'Singing'
                  ? 'Tell us about your musical experience — stage performances, school competitions, college events, singing competitions, etc.'
                  : 'Tell us about your musical experience — stage performances, school competitions, college events, competitions, previous band experience, etc.'
              }
              className="form-textarea"
            />
            {errors.experience && <p style={{ color: '#ff0d35', fontSize: '0.8rem', marginTop: '4px' }}>{errors.experience}</p>}
          </div>

          {/* 7. Confirmation Checkbox */}
          <div className="form-group" style={{ marginBottom: '28px' }}>
            <label className="checkbox-container">
              <input 
                type="checkbox"
                name="confirmed"
                checked={formData.confirmed}
                onChange={handleChange}
              />
              <span>I confirm that the information provided above is correct.</span>
            </label>
            {errors.confirmed && <p style={{ color: '#ff0d35', fontSize: '0.8rem', marginTop: '4px' }}>{errors.confirmed}</p>}
          </div>

          {/* Superhero Action Submit Button */}
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting}
            style={{ width: '100%', padding: '16px', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                SUBMITTING...
              </>
            ) : (
              <>
                <Zap size={20} color="#00d4ff" /> ENTER THE STAGE
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
