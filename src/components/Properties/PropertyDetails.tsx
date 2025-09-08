import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Home,
  Image as ImageIcon,
  Tag,
  Users,
  Edit,
  Trash,
  DollarSign,
} from "lucide-react";
import { useProperties, useUpdateProperty } from "../../hooks/useProperties";
import UnitModal from "./UnitModal";

const Placeholder: React.FC = () => (
  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
    <ImageIcon className="w-12 h-12" />
  </div>
);

const statusColor = (status: string) => {
  switch (status) {
    case "occupied":
      return "bg-red-100 text-red-700";
    case "vacant":
      return "bg-green-100 text-green-700";
    case "maintenance":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: properties } = useProperties();

  const property = properties?.find((prop) => prop.id === id);

  const updateProperty = useUpdateProperty();
  const [showUnitModal, setShowUnitModal] = React.useState(false);
  const [editingUnitIndex, setEditingUnitIndex] = React.useState<number | null>(
    null
  );
  const [editingUnitInitial, setEditingUnitInitial] = React.useState<
    | {
        name?: string;
        description?: string;
        imageUrls?: string[];
      }
    | undefined
  >(undefined);

  if (!property) {
    return (
      <div className="p-6">
        <p className="text-lg">Property not found</p>
        <Link to="/properties" className="text-primary-600 underline">
          Back to properties
        </Link>
      </div>
    );
  }

  // Unit handlers (property exists beyond this point)
  const openAddUnit = () => {
    setEditingUnitIndex(null);
    setEditingUnitInitial(undefined);
    setShowUnitModal(true);
  };

  const openEditUnit = (
    idx: number,
    u: { name: string; description?: string; imageUrls?: string[] }
  ) => {
    setEditingUnitIndex(idx);
    setEditingUnitInitial(u);
    setShowUnitModal(true);
  };

  const handleUnitSubmit = (unit: {
    name: string;
    description?: string;
    imageUrls?: string[];
  }) => {
    const unitsList = property.unitsList as
      | { name: string; description?: string; imageUrls?: string[] }[]
      | undefined;
    const current = unitsList && unitsList.length > 0 ? [...unitsList] : [];

    let updated: { name: string; description?: string; imageUrls?: string[] }[];
    if (editingUnitIndex === null) {
      updated = [...current, unit];
    } else {
      updated = [...current];
      updated[editingUnitIndex] = unit;
    }

    updateProperty.mutate({ id: property.id, data: { unitsList: updated } });
    setShowUnitModal(false);
    setEditingUnitIndex(null);
    setEditingUnitInitial(undefined);
  };

  const handleDeleteUnit = (idx: number) => {
    const unitsList = property.unitsList as
      | { name: string; description?: string; imageUrls?: string[] }[]
      | undefined;
    const current = unitsList && unitsList.length > 0 ? [...unitsList] : [];
    const updated = current.filter((_, i) => i !== idx);
    updateProperty.mutate({ id: property.id, data: { unitsList: updated } });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{property.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{property.address}</p>
        </div>
        <div className="flex items-center space-x-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
              property.status
            )}`}
          >
            {property.status}
          </span>
          <button className="flex items-center space-x-2 px-3 py-2 bg-white border rounded-lg shadow-sm hover:shadow-md">
            <Edit className="w-4 h-4" />
            <span className="text-sm">Edit</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-white border rounded-lg shadow-sm hover:shadow-md">
            <Trash className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-600">Delete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {property.imageUrls && property.imageUrls.length > 0 ? (
            <div className="rounded-lg overflow-hidden">
              <img
                src={property.imageUrls[0]}
                alt={property.name}
                className="w-full h-96 object-cover"
              />
            </div>
          ) : (
            <Placeholder />
          )}

          <section className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">
              {property.description ?? "No description provided."}
            </p>
          </section>

          {property.floorPlanUrls && property.floorPlanUrls.length > 0 && (
            <section className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Floor plans</h2>
              <div className="grid grid-cols-2 gap-3">
                {property.floorPlanUrls.map((url, idx) => (
                  <div key={idx} className="border rounded overflow-hidden">
                    <img
                      src={url}
                      alt={`floorplan-${idx}`}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-md font-semibold mb-3">Key info</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center space-x-2">
                <Home className="w-4 h-4 text-gray-400" />
                <span>{property.type}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span>{property.units} units</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{property.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span>KSh {property.rentAmount.toLocaleString()}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <span>Created by: {property.createdBy}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-md font-semibold mb-3">Amenities</h3>
            {property.amenities && property.amenities.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {property.amenities.map((a, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No amenities listed.</p>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm text-sm text-gray-600">
            <h3 className="text-md font-semibold mb-2">Meta</h3>
            <div>Created: {new Date(property.createdAt).toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-md font-semibold">Units</h3>
              <button
                onClick={openAddUnit}
                className="text-sm px-2 py-1 bg-primary-600 text-white rounded-md"
              >
                Add unit
              </button>
            </div>
            {/* Units may be stored on the property as an array (unitsList) or only a count (units).
                Fall back to generated unit entries when only a count exists. */}
            {(() => {
              const unitsList = property.unitsList as
                | { name: string; description?: string; imageUrls?: string[] }[]
                | undefined;
              const unitsToShow =
                unitsList && unitsList.length > 0 ? unitsList : [];

              if (!unitsToShow || unitsToShow.length === 0) {
                return (
                  <p className="text-sm text-gray-500">No units defined.</p>
                );
              }

              return (
                <ul className="space-y-3">
                  {unitsToShow.map((u, idx) => (
                    <li
                      key={idx}
                      className="border rounded p-3 flex items-start gap-3"
                    >
                      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {u.imageUrls && u.imageUrls.length > 0 ? (
                          <img
                            src={u.imageUrls[0]}
                            alt={u.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{u.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => openEditUnit(idx, u)}
                              className="text-sm text-primary-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUnit(idx)}
                              className="text-sm text-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {u.description ? (
                            <p className="mt-2 text-sm text-gray-700">
                              {u.description}
                            </p>
                          ) : (
                            <span className="italic">No description</span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              );
            })()}
          </div>
          {showUnitModal && (
            <UnitModal
              onClose={() => setShowUnitModal(false)}
              initial={editingUnitInitial}
              onSubmit={(unit) => handleUnitSubmit(unit)}
            />
          )}
        </aside>
      </div>
    </div>
  );
};

export default PropertyDetails;
