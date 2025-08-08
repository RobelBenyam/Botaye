import React, { useRef } from 'react';
import { Download, Printer, X } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface LeaseAgreementProps {
  tenant: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  property: {
    name: string;
    address: string;
    rentAmount: number;
  };
  leaseStart: Date;
  leaseEnd: Date;
  onClose: () => void;
}

export const LeaseAgreement: React.FC<LeaseAgreementProps> = ({
  tenant,
  property,
  leaseStart,
  leaseEnd,
  onClose
}) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!pdfRef.current) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    // Use jsPDF.html to auto-paginate without overlapping content
    // @ts-ignore - typings for html options can be looser depending on jsPDF version
    await pdf.html(pdfRef.current, {
      html2canvas: { scale: 2, useCORS: true },
      margin: [10, 10, 10, 10],
      autoPaging: 'text'
    });

    pdf.save(`Lease_Agreement_${tenant.firstName}_${tenant.lastName}.pdf`);
  };

  const printDocument = () => {
    window.print();
  };
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Lease Agreement</h2>
            <div className="flex items-center space-x-3">
              <button 
                onClick={printDocument}
                className="btn-secondary flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
              <button 
                onClick={downloadPDF}
                className="btn-primary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div ref={pdfRef} className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">RESIDENTIAL LEASE AGREEMENT</h1>
            <p className="text-gray-600">This agreement is made and entered into on {formatDate(new Date())}</p>
          </div>

          {/* Parties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">LANDLORD</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Name:</strong> Bottaye Property Management Ltd.</p>
                <p><strong>Address:</strong> Westlands Road, Westlands, Nairobi</p>
                <p><strong>Phone:</strong> +254 700 000 000</p>
                <p><strong>Email:</strong> info@bottaye.com</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">TENANT</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Name:</strong> {tenant.firstName} {tenant.lastName}</p>
                <p><strong>Phone:</strong> {tenant.phone}</p>
                <p><strong>Email:</strong> {tenant.email}</p>
                <p><strong>ID Number:</strong> 12345678</p>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">PROPERTY DETAILS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-gray-700">
                <p><strong>Property Name:</strong> {property.name}</p>
                <p><strong>Address:</strong> {property.address}</p>
                <p><strong>Unit Number:</strong> A12</p>
                <p><strong>Property Type:</strong> Residential</p>
              </div>
              <div className="space-y-2 text-gray-700">
                <p><strong>Lease Term:</strong> {formatDate(leaseStart)} to {formatDate(leaseEnd)}</p>
                <p><strong>Monthly Rent:</strong> KSh {property.rentAmount.toLocaleString()}</p>
                <p><strong>Security Deposit:</strong> KSh {property.rentAmount.toLocaleString()}</p>
                <p><strong>Rent Due Date:</strong> 1st of each month</p>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">TERMS AND CONDITIONS</h3>
            <div className="space-y-4 text-gray-700 text-sm">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">1. RENT PAYMENT</h4>
                <p className="mb-2">The tenant agrees to pay monthly rent of KSh {property.rentAmount.toLocaleString()} on or before the 1st day of each month. Late payments will incur a penalty of 5% of the rent amount.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">2. SECURITY DEPOSIT</h4>
                <p className="mb-2">A security deposit of KSh {property.rentAmount.toLocaleString()} is required and will be held by the landlord. This deposit will be refunded within 30 days of lease termination, less any deductions for damages or outstanding rent.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">3. UTILITIES AND SERVICES</h4>
                <p className="mb-2">The tenant is responsible for payment of electricity, water, and internet services. The landlord will provide basic maintenance and security services.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">4. MAINTENANCE AND REPAIRS</h4>
                <p className="mb-2">The landlord is responsible for structural repairs and major maintenance. The tenant is responsible for minor repairs and keeping the property clean and in good condition.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">5. QUIET ENJOYMENT</h4>
                <p className="mb-2">The tenant has the right to quiet enjoyment of the property. The landlord will provide 24 hours notice before entering the property for inspections or repairs.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">6. TERMINATION</h4>
                <p className="mb-2">Either party may terminate this lease with 30 days written notice. The tenant must give written notice of intent to vacate and arrange for a final inspection.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">7. GOVERNING LAW</h4>
                <p className="mb-2">This agreement is governed by the laws of Kenya and any disputes will be resolved in the courts of Nairobi.</p>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="border-t border-gray-200 pt-6 page-break-before avoid-page-break">
            <h3 className="text-lg font-bold text-gray-900 mb-3">SIGNATURES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-gray-900 mb-4">LANDLORD SIGNATURE</p>
                <div className="border-b-2 border-gray-300 h-12"></div>
                <p className="text-sm text-gray-600 mt-2">Date: {formatDate(new Date())}</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-4">TENANT SIGNATURE</p>
                <div className="border-b-2 border-gray-300 h-12"></div>
                <p className="text-sm text-gray-600 mt-2">Date: {formatDate(new Date())}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-600 avoid-page-break">
            <p>This lease agreement is valid and binding upon both parties.</p>
            <p className="mt-2">Generated by Bottaye Property Management System</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 