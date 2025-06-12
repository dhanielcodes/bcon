// components/FileUploadField.tsx
import { FC, useState } from "react";
import { Field, FieldProps, useFormikContext } from "formik";
import { cn } from "@/libs/utils";
import { ApiServiceAuth } from "@/services/auth.service";
import Image from "next/image";

interface FileUploadFieldProps {
  name: string;
  label?: string;
  className?: string;
  accept?: string;
  disabled?: boolean;
  userId?: string;
}

const FileUploadField: FC<FileUploadFieldProps> = ({
  name,
  label,
  className,
  accept = "image/*",
  disabled = false,
  userId,
}) => {
  const { setFieldValue, values } = useFormikContext<{ [key: string]: any }>();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setFileName(file.name);

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", file);

      // Make API call to upload the file
      const response = await ApiServiceAuth.UploadFile({
        id: userId,
        data: formData,
      });

      // Set the image URL from the response
      if (response?.secure_url) {
        setFieldValue(name, response?.secure_url);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setFileName(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setFileName(null);
    setFieldValue(name, "");
  };

  return (
    <Field name={name}>
      {({ form, meta }: FieldProps) => {
        return (
          <div className={cn("w-full", className)}>
            {label && <div className="text-sm mb-2">{label}</div>}
            <div className="relative">
              <input
                type="file"
                accept={accept}
                onChange={handleFileChange}
                disabled={disabled || isUploading}
                className="hidden"
                id={`file-upload-${name}`}
              />
              <div className="space-y-4">
                <label
                  htmlFor={`file-upload-${name}`}
                  className={cn(
                    "flex items-center justify-center flex-1 h-40 border-2 border-dashed rounded-lg cursor-pointer",
                    "hover:bg-gray-50 transition-colors",
                    disabled && "opacity-50 cursor-not-allowed",
                    isUploading && "opacity-50 cursor-wait"
                  )}
                >
                  <div className="text-center">
                    <div className="text-gray-500">
                      {isUploading ? (
                        "Uploading..."
                      ) : meta?.value ? (
                        <Image
                          src={meta?.value}
                          width={140}
                          height={140}
                          alt={`document`}
                        />
                      ) : (
                        "Click to upload"
                      )}
                    </div>
                  </div>
                </label>
                {fileName && !isUploading && (
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="px-4 h-12 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      }}
    </Field>
  );
};

export default FileUploadField;
