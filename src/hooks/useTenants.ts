import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tenant } from "../types";
import { mockTenantsRepository } from "../services/tenants";
import { createDocument } from "../utils/db";

export const tenantsQueryKeys = {
  all: ["tenants"] as const,
};

export function useTenants() {
  return useQuery<Tenant[]>({
    queryKey: tenantsQueryKeys.all,
    queryFn: () => mockTenantsRepository.list(),
  });
}

export function useCreateTenant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Tenant, "id" | "createdAt">) =>
      await createDocument("tenants", data), // true for incremental id if needed
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: tenantsQueryKeys.all }),
  });
}
export function useUpdateTenant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Tenant, "id" | "createdAt">>;
    }) => mockTenantsRepository.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: tenantsQueryKeys.all });
      const previous = queryClient.getQueryData<Tenant[]>(tenantsQueryKeys.all);
      if (previous) {
        queryClient.setQueryData<Tenant[]>(
          tenantsQueryKeys.all,
          previous.map((p) => (p.id === id ? ({ ...p, ...data } as Tenant) : p))
        );
      }
      return { previous } as { previous?: Tenant[] };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(tenantsQueryKeys.all, ctx.previous);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: tenantsQueryKeys.all }),
  });
}

interface RenewLeaseInput {
  tenantId: string;
  newLeaseEnd: Date;
  newRentAmount?: number;
}

export function useRenewLease() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      tenantId,
      newLeaseEnd,
      newRentAmount,
    }: RenewLeaseInput) => {
      // Simulate server call
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { tenantId, newLeaseEnd, newRentAmount };
    },
    onMutate: ({ tenantId, newLeaseEnd, newRentAmount }) => {
      const previousTenants = queryClient.getQueryData<Tenant[]>(
        tenantsQueryKeys.all
      );
      if (previousTenants) {
        const updatedTenants = previousTenants.map((t) =>
          t.id === tenantId
            ? {
                ...t,
                leaseEnd: newLeaseEnd,
                rentAmount: newRentAmount ?? t.rentAmount,
                status: "active",
              }
            : t
        );
        queryClient.setQueryData(tenantsQueryKeys.all, updatedTenants);
      }
      return { previousTenants } as { previousTenants?: Tenant[] };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTenants) {
        queryClient.setQueryData(tenantsQueryKeys.all, context.previousTenants);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tenantsQueryKeys.all });
    },
  });
}

interface TerminateLeaseInput {
  tenantId: string;
  effectiveDate: Date;
  reason: string;
  notes?: string;
}

export function useTerminateLease() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      tenantId,
      effectiveDate,
      reason,
      notes,
    }: TerminateLeaseInput) => {
      // Simulate server call
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { tenantId, effectiveDate, reason, notes };
    },
    onMutate: ({ tenantId, effectiveDate }) => {
      const previousTenants = queryClient.getQueryData<Tenant[]>(
        tenantsQueryKeys.all
      );
      if (previousTenants) {
        const updatedTenants = previousTenants.map((t) =>
          t.id === tenantId
            ? {
                ...t,
                leaseEnd: effectiveDate,
                status: "expired",
              }
            : t
        );
        queryClient.setQueryData(tenantsQueryKeys.all, updatedTenants);
      }
      return { previousTenants } as { previousTenants?: Tenant[] };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTenants) {
        queryClient.setQueryData(tenantsQueryKeys.all, context.previousTenants);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tenantsQueryKeys.all });
    },
  });
}
