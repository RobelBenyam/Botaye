import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Property, Tenant } from "../../types";
import { readAllDocuments } from "../../utils/db";
import { PropertyCard } from "../Properties/PropertyCard";
import { useNavigate } from "react-router-dom";
import { useDeleteProperty } from "../../hooks/useProperties";
import { useToast } from "../Toast/ToastProvider";
import { useAuth } from "../../context/AuthContext";

const SEARCH_CATEGORIES = ["properties", "tenants"] as const;
type Category = (typeof SEARCH_CATEGORIES)[number];

export const SearchPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const [activeCategory, setActiveCategory] = useState<Category>("properties");
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);
  const deleteProperty = useDeleteProperty();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const RawPropertiesFromDB = await readAllDocuments("properties");
      const RawTenantsFromDB = await readAllDocuments("tenants");

      const rawProps = RawPropertiesFromDB.filter(
        (p: any) => p.createdBy === user?.id
      );

      const rawTens = RawTenantsFromDB.filter((t: any) =>
        rawProps.some((p: any) => p.id === t.propertyId)
      );

      const props: Property[] = rawProps.map((p: any) => ({
        id: p.id,
        name: p.name || "",
        address: p.address || "",
        type: p.type || "",
        units: p.units || 0,
        owner: p.owner || "",
        status: p.status || "",
        createdAt: p.createdAt || "",
        updatedAt: p.updatedAt || "",
        description: p.description || "",
        imageUrls: p.imageUrls || [],
        rentAmount: p.rentAmount || 0,
        floorPlanUrls: p.floorPlanUrls || [],
        amenities: p.amenities || [],
        createdBy: p.createdBy || "",
      }));

      const tens: Tenant[] = rawTens.map((t: any) => ({
        id: t.id,
        firstName: t.firstName || "",
        lastName: t.lastName || "",
        email: t.email || "",
        phone: t.phone || "",
        propertyId: t.propertyId || "",
        leaseStart: t.leaseStart || "",
        leaseEnd: t.leaseEnd || "",
        rent: t.rent || 0,
        status: t.status || "",
        createdAt: t.createdAt || "",
        updatedAt: t.updatedAt || "",
        rentAmount: t.rentAmount || 0,
        depositAmount: t.depositAmount || 0,
        emergencyContact: t.emergencyContact || "",
      }));

      setProperties(props);
      setTenants(tens);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();

    setFilteredProperties(
      properties.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q)
      )
    );

    setFilteredTenants(
      tenants.filter(
        (t) =>
          t.firstName.toLowerCase().includes(q) ||
          t.lastName.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q)
      )
    );
  }, [query, properties, tenants]);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Search results for "{query}"</h1>

      <div className="flex space-x-4 mb-6">
        {SEARCH_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium ${
              activeCategory === cat
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {activeCategory === "properties" ? (
        filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onView={(prop) => navigate(`/properties/${prop.id}`)}
                onDelete={(prop) => {
                  deleteProperty.mutate(prop.id, {
                    onSuccess: () => addToast("Property deleted", "success"),
                    onError: () =>
                      addToast("Failed to delete property", "error"),
                  });
                }}
              />
            ))}
          </div>
        ) : (
          <p>No properties found</p>
        )
      ) : filteredTenants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenants.map((tenant) => (
            <div
              key={tenant.id}
              className="p-6 border rounded-lg shadow-sm bg-white"
            >
              <h3 className="font-bold text-lg mb-1">
                {tenant.firstName} {tenant.lastName}
              </h3>
              <p className="text-gray-600 text-sm">{tenant.email}</p>
              <p className="text-gray-600 text-sm">{tenant.phone}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No tenants found</p>
      )}
    </div>
  );
};
