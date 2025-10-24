import React from 'react';
// fix: Corrected import name from USDA_RD_LOGO_B64 to USDA_LOGO_B64 to match the export from assets.ts.
import { USDA_LOGO_B64 } from './assets';

const SocialIcon: React.FC<{ href: string, path: string, label: string }> = ({ href, path, label }) => (
    <a href={href} aria-label={label} className="text-white hover:opacity-80">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d={path} />
        </svg>
    </a>
)

const Footer: React.FC = () => {
  return (
    <>
    <footer className="bg-usda-blue text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Agency Footer */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left border-b border-gray-500 pb-8 mb-8">
             <a href="#" className="flex items-center mb-4 md:mb-0">
                {/* fix: Corrected variable name from USDA_RD_LOGO_B64 to USDA_LOGO_B64. */}
                <img src={USDA_LOGO_B64} alt="USDA RD Logo" className="h-20 mr-4 bg-white p-2 rounded-full"/>
                <div>
                  <h2 className="text-2xl font-bold font-serif">Rural Development</h2>
                  <p className="text-sm text-gray-300">U.S. DEPARTMENT OF AGRICULTURE</p>
                </div>
            </a>
            <div className="md:ml-auto">
                <p className="font-bold">Contact RD</p>
                <a href="#" className="text-usda-teal hover:underline">Stay Connected</a>
            </div>
        </div>
        {/* Nav Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
                <h3 className="font-bold text-lg mb-2">Programs & Services</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline text-gray-300">Single Family Housing Programs</a></li>
                  <li><a href="#" className="hover:underline text-gray-300">Multi-Family Housing Programs</a></li>
                  <li><a href="#" className="hover:underline text-gray-300">Community Facilities Programs</a></li>
                  <li><a href="#" className="hover:underline text-gray-300">Business Programs</a></li>
                </ul>
            </div>
             <div>
                <h3 className="font-bold text-lg mb-2">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline text-gray-300">Find Your State Office</a></li>
                  <li><a href="#" className="hover:underline text-gray-300">Forms & Publications</a></li>
                  <li><a href="#" className="hover:underline text-gray-300">Regulations & Guidance</a></li>
                  <li><a href="#" className="hover:underline text-gray-300">Success Stories</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-lg mb-2">About RD</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline text-gray-300">Our Agency</a></li>
                  <li><a href="#" className="hover:underline text-gray-300">Leadership</a></li>
                  <li><a href="#" className="hover:underline text-gray-300">Careers</a></li>
                  <li><a href="#" className="hover:underline text-gray-300">Contact Us</a></li>
                </ul>
            </div>
             <div>
                <h3 className="font-bold text-lg mb-2">Get Help</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline text-gray-300">AskUSDA</a></li>
                  <li><a href="#" className="hover:underline text-gray-300">File a Program Discrimination Complaint</a></li>
                   <li><a href="#" className="hover:underline text-gray-300">Report Fraud</a></li>
                </ul>
            </div>
        </div>
      </div>
    </footer>
    {/* Identifier Section */}
    <div className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
                <SocialIcon href="#" label="Twitter" path="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.94.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.01-.06 1.79 1.15 3.92 1.82 6.23 1.82 7.47 0 11.55-6.19 11.55-11.55 0-.17 0-.35-.01-.52.79-.57 1.47-1.28 2.02-2.09z" />
                <SocialIcon href="#" label="Facebook" path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
                <SocialIcon href="#" label="YouTube" path="M21.58 7.19c-.23-.86-.9-1.52-1.76-1.75C18.25 5 12 5 12 5s-6.25 0-7.82.44c-.86.23-1.52.9-1.76 1.75C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.9 1.52 1.76 1.75C5.75 19 12 19 12 19s6.25 0 7.82-.44c.86-.23 1.52-.9 1.76-1.75C22 15.25 22 12 22 12s0-3.25-.42-4.81zM9.5 15.5V8.5l6 3.5-6 3.5z"/>
                <SocialIcon href="#" label="LinkedIn" path="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-7 6h-2v7h2v-7m-1-2c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1m7 2h-2v3.5c0 .83-.02 1.88-1.14 1.88C13.64 16.38 13.5 15.5 13.5 14.5V11h-2v7h2v-3.26c0-.78.02-1.78 1.1-1.78s1.28.82 1.28 1.72V18h2v-7z" />
            </div>
            <div className="flex flex-wrap justify-center space-x-4">
              <a href="#" className="hover:underline">USDA.gov</a>
              <a href="#" className="hover:underline">FOIA</a>
              <a href="#" className="hover:underline">Accessibility Statement</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
            </div>
        </div>
    </div>
    </>
  );
};

export default Footer;