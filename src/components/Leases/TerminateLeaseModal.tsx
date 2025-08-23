import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tenant } from '../../types';
import { X } from 'lucide-react';

const schema = z.object({
  effectiveDate: z.string().min(1, 'Effective date is required'),
  reason: z.string().min(3, 'Reason is required'),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface TerminateLeaseModalProps {
  tenant: Tenant;
  onSubmit: (values: { effectiveDate: Date; reason: string; notes?: string }) => void;
  onClose: () => void;
}

export const TerminateLeaseModal: React.FC<TerminateLeaseModalProps> = ({ tenant, onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      effectiveDate: new Date().toISOString().slice(0, 10),
      reason: '',
      notes: '',
    },
  });

  const submit = (values: FormValues) => {
    onSubmit({
      effectiveDate: new Date(values.effectiveDate),
      reason: values.reason,
      notes: values.notes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 max-h-[80vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Terminate Lease</h3>
        <p className="text-xs text-gray-600 mb-4">
          {tenant.firstName} {tenant.lastName} — Current end: {new Date(tenant.leaseEnd).toLocaleDateString()}
        </p>
        <form onSubmit={handleSubmit(submit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
            <input type="date" className="input-field" {...register('effectiveDate')} />
            {errors.effectiveDate && <p className="mt-1 text-xs text-danger-600">{errors.effectiveDate.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <input type="text" className="input-field" placeholder="e.g. Early termination"
              {...register('reason')} />
            {errors.reason && <p className="mt-1 text-xs text-danger-600">{errors.reason.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
            <textarea className="input-field" rows={3} placeholder="Additional details..." {...register('notes')} />
          </div>
          <div className="flex justify-end space-x-2 pt-1">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Saving...' : 'Terminate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 