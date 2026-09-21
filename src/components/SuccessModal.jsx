import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import RegistrationCertificate from './RegistrationCertificate';

export default function SuccessModal({ student, onClose }) {
  useEffect(() => {
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#ff0d35', '#00d4ff', '#ffffff', '#0055ff']
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }
  }, []);

  if (!student) return null;

  return (
    <RegistrationCertificate 
      student={student} 
      onClose={onClose} 
      showBackHome={true} 
    />
  );
}
