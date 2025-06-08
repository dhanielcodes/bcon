"use client";

import { FC, useCallback, useMemo } from "react";
import AsyncSelect from "react-select/async";
import { Field, FieldProps, useField } from "formik";
import { cn } from "@/libs/utils";
import { MainSelectProps, OptionType } from "@/types/form-types";
import { useLoadGoogleMaps } from "@/libs/useLoadGoogleMaps";
import { SingleValue } from "react-select";

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          AutocompleteService: new () => {
            getPlacePredictions: (
              request: { input: string },
              callback: (
                predictions: Array<{ description: string; place_id: string }>
              ) => void
            ) => void;
          };
        };
      };
    };
  }
}

const LocationSelect: FC<Omit<MainSelectProps, "options">> = ({
  label,
  labelColor = "text-black",
  name,
  placeholder = "Select an option...",
  isSearchable = true,
  hint,
  disabled = false,
  cutBorder = false,
  onChange,
}) => {
  const [field, meta, helpers] = useField(name);
  const mapsLoaded = useLoadGoogleMaps(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  );

  const selectStyles = useMemo(
    () => ({
      control: (base: any, { isFocused }: any) => ({
        ...base,
        background: "#F6F8FA",
        padding: "0.25rem",
        borderColor: meta.touched && meta.error ? "#E10000" : "#ECEFF3",
        borderRadius: "0.5rem",
        boxShadow: isFocused ? "0 0 0 2px rgba(249, 167, 2, 0.2)" : "none",
        "&:hover": {
          borderColor: "#f9a702",
        },
      }),
    }),
    [meta]
  );

  const loadGoogleOptions = (
    inputValue: string,
    callback: (options: OptionType[]) => void
  ) => {
    if (!inputValue || !window.google) return callback([]);
    const service = new window.google.maps.places.AutocompleteService();

    service.getPlacePredictions({ input: inputValue }, (predictions = []) => {
      const results = predictions.map(
        (p: { description: string; place_id: string | number }) => ({
          label: p.description,
          value: p.place_id,
        })
      );
      callback(results);
    });
  };

  const handleChange = useCallback(
    (selectedOption: SingleValue<OptionType>) => {
      helpers.setValue(selectedOption ? selectedOption.label : "");
      if (onChange) onChange(selectedOption);
    },
    [helpers, onChange]
  );

  return (
    <div className="w-full mb-3">
      {label && (
        <label
          htmlFor={name}
          className={`block text-[#344054] text-sm font-medium ${labelColor}`}
        >
          {label}
        </label>
      )}

      <Field name={name}>
        {({ field }: FieldProps) =>
          mapsLoaded && (
            <AsyncSelect
              id={name}
              name={field.name}
              cacheOptions
              defaultOptions
              loadOptions={loadGoogleOptions}
              onChange={handleChange}
              placeholder={placeholder}
              isDisabled={disabled}
              isSearchable={isSearchable}
              className={cn(
                `mt-2 w-full bg-[#F6F8FA] text-gray-800 ${
                  cutBorder ? "border-l-0 border-t-0 border-r-0" : "border"
                } rounded-lg shadow-sm focus:ring focus:ring-orange-300`
              )}
              styles={selectStyles}
            />
          )
        }
      </Field>

      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs mt-1 flex items-center">
          {meta.error}
        </p>
      ) : hint ? (
        <p className="text-gray-500 text-xs mt-1">{hint}</p>
      ) : (
        <p className="text-transparent text-xs mt-1">full</p>
      )}
    </div>
  );
};

export default LocationSelect;
