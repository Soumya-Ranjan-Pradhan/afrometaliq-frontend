import { useUnits } from "@/api/units/queries/useUnitsQuery";
import React, { useMemo } from "react";
import { Option } from "./CategoryInput";
import ComboBox from "./ComboBox";

const UnitInput = ({
  value,
  onChange,
}: {
  value: Option | null;
  onChange: (value: Option | null) => void;
}) => {
  const { data, isLoading } = useUnits();

  const options = useMemo(() => {
    return data?.data?.units
      ? data?.data?.units.map((unit) => ({
          label: unit.unit_name,
          value: unit._id,
        }))
      : [];
  }, [data]);

  return (
    <div className="">
      <label className="block text-sm mb-1 text-gray-700 font-medium">
        Unit
      </label>
      {isLoading ? (
        <div>Loading units...</div>
      ) : (
        <ComboBox
          options={options}
          value={value}
          onChange={onChange}
          disabled={isLoading}
        />
      )}
    </div>
  );
};

export default UnitInput;
