import React, { useRef, useState } from 'react';
import { Download, FileText, Printer, ArrowLeft, CheckCircle, Sparkles, Cloud, Share2, ExternalLink } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function RegistrationCertificate({ student, onClose, showBackHome = true }) {
  const certificateRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!student) return null;

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Format dates cleanly
  const formatDisplayDate = (dateVal) => {
    if (!dateVal) return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return dateVal;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const regDateDisplay = formatDisplayDate(student.timestamp || student.created_date || new Date().toISOString());
  const safeId = (student.registration_id || 'CERTIFICATE').replace(/[^a-zA-Z0-9_-]/g, '_');

  // Helper to capture certificate canvas
  const captureCanvas = async () => {
    if (!certificateRef.current) return null;
    const element = certificateRef.current;
    return await html2canvas(element, {
      scale: 2.5, // High-DPI crisp capture
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#05070d',
      logging: false,
      scrollX: 0,
      scrollY: 0
    });
  };

  // 1. Download certificate as high-resolution PNG image directly to drive / device
  const handleDownloadImage = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const canvas = await captureCanvas();
      if (!canvas) throw new Error('Canvas capture failed');

      const imgData = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `BAND_UNKNOWN_Certificate_${safeId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showNotification('Certificate downloaded to your drive as PNG!');
    } catch (err) {
      console.error('Certificate image download error:', err);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  // 2. Download certificate as official PDF file directly to drive / device
  const handleDownloadPDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const canvas = await captureCanvas();
      if (!canvas) throw new Error('Canvas capture failed');

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save(`BAND_UNKNOWN_Certificate_${safeId}.pdf`);

      showNotification('Certificate downloaded to your drive as PDF!');
    } catch (err) {
      console.error('Certificate PDF download error:', err);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  // 3. Save / Share to Google Drive or Cloud Storage via Web Share
  const handleSaveToDrive = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const canvas = await captureCanvas();
      if (!canvas) throw new Error('Canvas capture failed');

      // Convert canvas to Blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          handleDownloadPDF();
          setIsGenerating(false);
          return;
        }

        const file = new File([blob], `BAND_UNKNOWN_Certificate_${safeId}.png`, { type: 'image/png' });

        // If Web Share API with files is supported (Android, iPhone, Mac, Windows)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: `BAND UNKNOWN Audition Certificate - ${student.name}`,
              text: `Audition Registration Confirmation for ${student.name} (${student.registration_id})`,
              files: [file]
            });
            showNotification('Saved / Shared to Google Drive successfully!');
          } catch (shareErr) {
            if (shareErr.name !== 'AbortError') {
              // Fallback to downloading image and opening Google Drive
              handleDownloadImage();
              window.open('https://drive.google.com/drive/my-drive', '_blank');
              showNotification('Certificate saved! Opening Google Drive...');
            }
          }
        } else {
          // Desktop / Standard fallback: download file and open Google Drive
          const imgData = canvas.toDataURL('image/png', 1.0);
          const link = document.createElement('a');
          link.href = imgData;
          link.download = `BAND_UNKNOWN_Certificate_${safeId}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          window.open('https://drive.google.com/drive/my-drive', '_blank');
          showNotification('Certificate saved to your Drive/Downloads! Opening Google Drive...');
        }
        setIsGenerating(false);
      }, 'image/png');
    } catch (err) {
      console.error('Cloud save error:', err);
      handleDownloadPDF();
      setIsGenerating(false);
    }
  };

  // 4. Trigger Browser Print / Save as PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="certificate-modal-overlay">
      <div className="certificate-modal-wrapper">
        
        {/* Top Floating Actions Toolbar (hidden during print) */}
        <div className="certificate-actions-bar no-print">
          <div className="certificate-actions-left">
            <span className="certificate-status-badge">
              <CheckCircle size={16} color="#00d4ff" />
              <span>OFFICIAL REGISTRATION CERTIFICATE</span>
            </span>
          </div>

          <div className="certificate-actions-right">
            {/* Download PDF */}
            <button 
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="cert-btn cert-btn-primary"
              title="Download PDF to your drive"
            >
              <FileText size={16} />
              <span>{isGenerating ? 'SAVING...' : 'DOWNLOAD PDF'}</span>
            </button>

            {/* Download Image (PNG) */}
            <button 
              onClick={handleDownloadImage}
              disabled={isGenerating}
              className="cert-btn cert-btn-secondary"
              title="Download PNG image to your drive"
            >
              <Download size={16} />
              <span>DOWNLOAD PNG</span>
            </button>

            {/* Save to Google Drive */}
            <button 
              onClick={handleSaveToDrive}
              disabled={isGenerating}
              className="cert-btn cert-btn-drive"
              title="Save directly to Google Drive or Cloud Storage"
            >
              <Cloud size={16} />
              <span>SAVE TO DRIVE</span>
            </button>

            {/* Print / Save PDF */}
            <button 
              onClick={handlePrint}
              className="cert-btn cert-btn-print"
              title="Print Certificate or Save as PDF"
            >
              <Printer size={16} />
              <span>PRINT</span>
            </button>

            {showBackHome && (
              <button 
                onClick={onClose}
                className="cert-btn cert-btn-back"
                title="Return to home page"
              >
                <ArrowLeft size={16} />
                <span>BACK TO HOME</span>
              </button>
            )}

            {!showBackHome && (
              <button 
                onClick={onClose}
                className="cert-btn cert-btn-back"
                title="Close Certificate"
              >
                <span>CLOSE</span>
              </button>
            )}
          </div>
        </div>

        {toastMessage && (
          <div className="cert-toast-msg no-print">
            <Sparkles size={16} color="#00f0ff" /> {toastMessage}
          </div>
        )}

        {/* Printable Official Certificate Document */}
        <div 
          ref={certificateRef}
          id="audition-certificate-printable"
          className="band-official-certificate"
        >
          {/* Subtle Spider-Web Geometric Corner Accents */}
          <div className="cert-web-corner cert-web-tl" />
          <div className="cert-web-corner cert-web-tr" />
          <div className="cert-web-corner cert-web-bl" />
          <div className="cert-web-corner cert-web-br" />

          {/* Inner Official Border Frame */}
          <div className="cert-inner-frame">
            
            {/* 1. TOP: College Name / College Logo Header */}
            <div className="cert-college-header">
              <img 
                src="/kit-coimbatore-header.png" 
                alt="Kalaignarkarunanidhi Institute of Technology (KIT-COIMBATORE)" 
                className="cert-college-logo"
                crossOrigin="anonymous"
              />
            </div>

            {/* 2. CENTER: Band Branding & Auditions 2026 */}
            <div className="cert-band-header">
              <div className="cert-band-badge">
                <span className="cert-dot-red" />
                <span>OFFICIAL AUDITIONS 2026</span>
                <span className="cert-dot-blue" />
              </div>
              <h1 className="cert-band-name">BAND UNKNOWN</h1>
              <p className="cert-band-subtitle">College Band Auditions 2026</p>
            </div>

            {/* 3. MAIN TITLE: Certificate Confirmation Header */}
            <div className="cert-title-section">
              <div className="cert-title-decor-line left" />
              <h2 className="cert-main-title">REGISTRATION CONFIRMATION CERTIFICATE</h2>
              <div className="cert-title-decor-line right" />
            </div>

            {/* Prominent Registration ID Display */}
            <div className="cert-reg-id-banner">
              <div className="cert-reg-id-box">
                <span className="cert-reg-id-label">REGISTRATION ID</span>
                <span className="cert-reg-id-val">{student.registration_id || 'BU-A2026-01'}</span>
              </div>
            </div>

            {/* 4. MIDDLE: Candidate Details Grid */}
            <div className="cert-candidate-grid">
              <div className="cert-field-cell name-cell">
                <span className="cert-field-label">FULL NAME</span>
                <span className="cert-field-value strong-name">{student.name}</span>
              </div>

              <div className="cert-field-cell">
                <span className="cert-field-label">DEPARTMENT</span>
                <span className="cert-field-value dept-value">{student.department}</span>
              </div>

              <div className="cert-field-cell">
                <span className="cert-field-label">DATE OF BIRTH</span>
                <span className="cert-field-value">{student.dob || '—'}</span>
              </div>

              <div className="cert-field-cell">
                <span className="cert-field-label">AUDITION CATEGORY</span>
                <span className={`cert-category-tag ${student.category === 'Singing' ? 'cat-singing' : 'cat-instruments'}`}>
                  {student.category}
                </span>
              </div>

              {/* Show Instrument only when category is Instruments */}
              {student.category === 'Instruments' && (
                <div className="cert-field-cell">
                  <span className="cert-field-label">INSTRUMENT</span>
                  <span className="cert-field-value highlight-instrument">{student.instrument || 'Guitar'}</span>
                </div>
              )}

              <div className="cert-field-cell">
                <span className="cert-field-label">MOBILE / WHATSAPP NUMBER</span>
                <span className="cert-field-value contact-value">{student.phone}</span>
              </div>

              <div className="cert-field-cell">
                <span className="cert-field-label">REGISTRATION DATE</span>
                <span className="cert-field-value">{regDateDisplay}</span>
              </div>

              <div className="cert-field-cell full-width experience-cell">
                <span className="cert-field-label">MUSICAL EXPERIENCE</span>
                <span className="cert-field-value experience-text">{student.experience}</span>
              </div>
            </div>

            {/* 5. OFFICIAL CONFIRMATION STATEMENT */}
            <div className="cert-statement-box">
              <p className="cert-statement-text">
                This is to certify that the above-mentioned student has successfully registered for the <strong>BAND UNKNOWN College Band Auditions 2026</strong>. The student is permitted to attend and participate in the audition as part of the official selection process. The audition is being conducted on 25th September on KIT Auditorium at the time of 02:30 PM, and the registered student has been granted permission to attend the audition for this purpose.
              </p>
            </div>

            {/* 6. CERTIFICATE FOOTER */}
            <div className="cert-footer-section">
              <div className="cert-footer-col left">
                <span className="cert-footer-band">BAND UNKNOWN</span>
                <span className="cert-footer-role">College Music Band</span>
                <span className="cert-footer-edition">College Band Auditions 2026</span>
              </div>

              <div className="cert-footer-col center">
                <span className="cert-footer-venue-title">VENUE</span>
                <span className="cert-footer-venue">Auditorium</span>
              </div>

              <div className="cert-footer-col right">
                <span className="cert-footer-contact-title">CONTACT</span>
                <span className="cert-footer-contact-item">Jas Abishek – 9500741878</span>
                <span className="cert-footer-contact-item">Carolin Mary – 93458 84261</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Cloud & Drive Save Hint (hidden in print) */}
        <div className="cert-print-hint no-print" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span>💡 Download saves directly to your device/drive. You can also click <strong>SAVE TO DRIVE</strong> to save to Google Drive.</span>
        </div>

      </div>
    </div>
  );
}
