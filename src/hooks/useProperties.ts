import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Property } from "../types";
import { mockPropertiesRepository } from "../services/properties";
import { createDocument } from "../utils/db";

export const propertiesQueryKeys = {
  all: ["properties"] as const,
};

export function useProperties() {
  return useQuery<Property[]>({
    queryKey: propertiesQueryKeys.all,
    queryFn: () => mockPropertiesRepository.list(),
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Property, "id" | "createdAt">) =>
      await createDocument("properties", data), // true for incremental id if needed
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: propertiesQueryKeys.all }),
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Property, "id" | "createdAt">>;
    }) => mockPropertiesRepository.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: propertiesQueryKeys.all });
      const previous = queryClient.getQueryData<Property[]>(
        propertiesQueryKeys.all
      );
      if (previous) {
        queryClient.setQueryData<Property[]>(
          propertiesQueryKeys.all,
          previous.map((p) =>
            p.id === id ? ({ ...p, ...data } as Property) : p
          )
        );
      }
      return { previous } as { previous?: Property[] };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(propertiesQueryKeys.all, ctx.previous);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: propertiesQueryKeys.all }),
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => mockPropertiesRepository.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: propertiesQueryKeys.all });
      const previous = queryClient.getQueryData<Property[]>(
        propertiesQueryKeys.all
      );
      if (previous) {
        queryClient.setQueryData<Property[]>(
          propertiesQueryKeys.all,
          previous.filter((p) => p.id !== id)
        );
      }
      return { previous } as { previous?: Property[] };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(propertiesQueryKeys.all, ctx.previous);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: propertiesQueryKeys.all }),
  });
}
