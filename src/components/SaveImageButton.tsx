import React from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';

interface SaveImageButtonProps {
  elementId: string;
  planType: 'workout' | 'meal';
}

const SaveImageButton: React.FC<SaveImageButtonProps> = ({ elementId, planType }) => {
  const handleSaveImage = async () => {
    const element = document.getElementById(elementId);
    if (element) {
      try {
        const dataUrl = await toPng(element);
        const response = await fetch('/api/save-screenshot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageData: dataUrl, planType }),
        });
        const result = await response.json();
        if (result.success) {
          alert('Plan saved successfully!');
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error('Error saving image:', error);
        alert('Failed to save the plan. Please try again.');
      }
    }
  };

  return (
    <Button onClick={handleSaveImage}>
      Save Plan
    </Button>
  );
};

export default SaveImageButton;