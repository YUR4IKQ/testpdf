import React from 'react';
import PDFViewer from './PDFViewer';

const port = window.location.port || 3000;
const references = [
  {
    content:
      'Cigna Dental Preventive Plan If You Wish To Cancel Or If You Have Questions If You are not satisfied, for any reason, with the terms of this Policy You may return it to Us within 10 days of receipt. We will then cancel Your coverage as of the original Effective Date and promptly refund any premium You have paid. This Policy will then be null and void. If You wish to correspond with Us for this or any other reason, write: Cigna Cigna Individual Services P. O. Box 30365 Tampa, FL 33630 1-877-484-5967',
  },
  {
    content:
      'EXCLUSIONS AND LIMITATIONS: WHAT IS NOT COVERED BY THIS POLICY........................................ 11',
  },
  {
    content:
      'Notice Regarding Provider Directories and Provider Networks If Your Plan utilizes a network of Providers, you will automatically and without charge, receive a separate listing of Participating Providers. You may also have access to a list of Providers who participate in the network by visiting www.cigna.com; mycigna.com. Your Participating Provider network consists of a group of local dental practitioners, of varied specialties as well as general practice, who are employed by or contracted with Cigna HealthCare or Cigna Dental Health. Notice Regarding Standard of Care Under state law, Cigna is required to adhere to the accepted standards of care in the administration of health benefits. Failure to adhere to the accepted standards of care may subject Cigna to liability for damages. PLEASE READ THE FOLLOWING IMPORTANT NOTICE',
  },
];

const App: React.FC = () => {
  return (
    <div>
      <PDFViewer file={`http://localhost:${port}/wa-cigna-dental-preventive-policy.pdf`} references={references} />
    </div>
  );
};

export default App;

