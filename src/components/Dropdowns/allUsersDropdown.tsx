import React, { useMemo, useState } from "react";
import Select, {
  components,
  type MultiValue,
  type SingleValue,
  type MenuListProps,
} from "react-select";
import { useAllUsersInfinite } from "../../hooks/useAllUsersInfinite";

type Option = {
  label: string;
  value: string;
};

type Props = {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multi?: boolean;
};

const AllUsersDropdown: React.FC<Props> = ({
  value,
  onChange,
  multi = false,
}) => {
  const [searchText, setSearchText] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useAllUsersInfinite(searchText);

  // 🔹 flatten pages → options
  const options: Option[] = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        page.content.map((user) => ({
          label: user.fullName,
          value: user.externalId,
        }))
      ) ?? []
    );
  }, [data]);

  // 🔹 selected value mapping
  const selectedValue = useMemo(() => {
    if (multi && Array.isArray(value)) {
      return options.filter((opt) => value.includes(opt.value));
    }
    if (!multi && typeof value === "string") {
      return options.find((opt) => opt.value === value) ?? null;
    }
    return null;
  }, [value, options, multi]);

  // 🔹 change handler
  const handleChange = (selected: MultiValue<Option> | SingleValue<Option>) => {
    if (multi) {
      onChange((selected as MultiValue<Option>).map((o) => o.value));
    } else {
      onChange((selected as SingleValue<Option>)?.value ?? "");
    }
  };

  // 🔽 MenuList with AUTO infinite scroll
  const MenuList = (props: MenuListProps<Option, boolean>) => {
    const { children, innerProps } = props;

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;

      const isBottom =
        target.scrollHeight - target.scrollTop <= target.clientHeight + 10;

      if (isBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    return (
      <components.MenuList
        {...props}
        innerProps={{
          ...innerProps,
          onScroll: handleScroll, // ✅ სწორი გზა react-select-ში
        }}
      >
        {children}

        {isFetchingNextPage && (
          <div className="text-center text-xs py-2 text-gray-400">
            იტვირთება...
          </div>
        )}
      </components.MenuList>
    );
  };

  if (error) {
    return <div className="text-sm text-red-500">Error loading users</div>;
  }

  return (
    <Select
      isMulti={multi}
      options={options}
      value={selectedValue}
      onChange={handleChange}
      onInputChange={(val) => setSearchText(val)}
      placeholder="აირჩიე მომხმარებელი"
      isClearable
      className="w-full"
      classNamePrefix="react-select"
      isLoading={isLoading || isFetchingNextPage}
      components={{ MenuList }}
    />
  );
};

export default AllUsersDropdown;
