import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tenant } from '../../types';
import { X } from 'lucide-react';

const schema = z.object({
  newLeaseEnd: z.string().min(1, 'End date is required'),
  newRentAmount: z
    .string()
    .optional()
    .refine((v) => v === undefined || v === '' || Number(v) > 0, { message: 'Amount must be positive' }),
});

type FormValues = z.infer<typeof schema>;

interface RenewLeaseModalProps {
  tenant: Tenant;
  onSubmit: (values: { newLeaseEnd: Date; newRentAmount?: number }) => void;
  onClose: () => void;
}

export const RenewLeaseModal: React.FC<RenewLeaseModalProps> = ({ tenant, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      newLeaseEnd: new Date(tenant.leaseEnd).toISOString().slice(0, 10),
      newRentAmount: String(tenant.rentAmount),
    },
  });

  const submit = (values: FormValues) => {
    onSubmit({
      newLeaseEnd: new Date(values.newLeaseEnd),
      newRentAmount: values.newRentAmount && values.newRentAmount !== '' ? Number(values.newRentAmount) : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 max-h-[80vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Renew Lease</h3>
        <p className="text-xs text-gray-600 mb-4">
          {tenant.firstName} {tenant.lastName} — Current end: {new Date(tenant.leaseEnd).toLocaleDateString()}
        </p>

        <form onSubmit={handleSubmit(submit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Lease End</label>
            <input type="date" className="input-field" {...register('newLeaseEnd')} />
            {errors.newLeaseEnd && <p className="mt-1 text-xs text-danger-600">{errors.newLeaseEnd.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Monthly Rent (optional)</label>
            <input type="number" inputMode="decimal" className="input-field" placeholder="e.g. 95000" {...register('newRentAmount')} />
            {errors.newRentAmount && <p className="mt-1 text-xs text-danger-600">{errors.newRentAmount.message}</p>}
          </div>

          <div className="flex justify-end space-x-2 pt-1">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Saving...' : 'Renew'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 