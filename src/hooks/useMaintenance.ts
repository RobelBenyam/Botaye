import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MaintenanceRequest } from "../types";
import { mockMaintenanceRepository } from "../services/maintenance";

export const maintenanceQueryKeys = {
  all: ["maintenanceRequests"] as const,
};

export function useMaintenanceRequests() {
  return useQuery<MaintenanceRequest[]>({
    queryKey: maintenanceQueryKeys.all,
    queryFn: () => mockMaintenanceRepository.list(),
  });
}

export function useCreateMaintenanceRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MaintenanceRequest) =>
      mockMaintenanceRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: maintenanceQueryKeys.all });
    },
  });
}
