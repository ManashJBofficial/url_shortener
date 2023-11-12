import React from "react";
import { Pagination } from "@nextui-org/react";

type PaginationComponentProps = {
  currentPage: number;
  totalPages: number;
  onChange: (newPage: number) => void;
};

export default function PaginationComponent({
  currentPage,
  totalPages,
  onChange,
}: PaginationComponentProps) {
  return (
    <Pagination
      total={totalPages}
      initialPage={currentPage}
      isCompact
      onChange={onChange}
    />
  );
}
