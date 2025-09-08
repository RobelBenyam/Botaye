import React from "react";
import { X } from "lucide-react";
import { uploadFileToCloudinary } from "../../utils/file";

interface UnitModalProps {
  onClose: () => void;
  onSubmit: (unit: {
    name: string;
    description?: string;
    imageUrls?: string[];
  }) => void;
  initial?: { name?: string; description?: string; imageUrls?: string[] };
}

export const UnitModal: React.FC<UnitModalProps> = ({
  onClose,
  onSubmit,
  initial,
}) => {
  const [name, setName] = React.useState(initial?.name || "");
  const [description, setDescription] = React.useState(
    initial?.description || ""
  );
  const [selectedFiles, setSelectedFiles] = React.useState<File[] | null>(null);
  const [previewUrls] = React.useState<string[]>(initial?.imageUrls || []);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    return () => {
      // revoke object URLs
      if (selectedFiles) {
        selectedFiles.forEach((f) =>
          URL.revokeObjectURL((f as any).__preview || "")
        );
      }
    };
  }, [selectedFiles]);

  const onFilesChange = (files?: FileList | null) => {
    if (!files) return setSelectedFiles(null);
    const arr = Array.from(files);
    // attach preview URLs for cleanup
    arr.forEach((f) => {
      (f as any).__preview = URL.createObjectURL(f);
    });
    setSelectedFiles(arr);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setIsSaving(true);
    try {
      let uploadedUrls: string[] = [];
      if (selectedFiles && selectedFiles.length > 0) {
        uploadedUrls = await Promise.all(
          selectedFiles.map((f) => uploadFileToCloudinary(f, "units"))
        );
      }

      const finalUrls = [...(initial?.imageUrls || []), ...uploadedUrls];

      onSubmit({
        name: name.trim(),
        description: description.trim() || "",
        imageUrls: finalUrls.length > 0 ? finalUrls : [],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 relative"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-bold mb-3">
          {initial ? "Edit Unit" : "Add Unit"}
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Unit images (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => onFilesChange(e.target.files)}
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {previewUrls.map((u, i) => (
                <img
                  key={i}
                  src={u}
                  alt={`unit-${i}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
              {selectedFiles &&
                selectedFiles.map((f, i) => (
                  <img
                    key={i}
                    src={(f as any).__preview}
                    alt={`preview-${i}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-1">
            <button onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="btn-primary"
            >
              {isSaving ? "Saving..." : initial ? "Save" : "Add Unit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitModal;
