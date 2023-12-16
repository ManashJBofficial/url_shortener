/**
 * PaginationComponent renders a Pagination component from NextUI.
 * It takes in currentPage, totalPages and onChange as props.
 * currentPage: The current active page number.
 * totalPages: The total number of pages to paginate.
 * onChange: Callback when page changes, passed new page number.
 * Renders a compact Pagination component with props for page count,
 * initial page and onChange callback.
 */
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
