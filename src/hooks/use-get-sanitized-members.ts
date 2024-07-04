import { IAvailableMembers, IMemberBase } from "@src/types/query-builder";

type IProps = {
  allowedMembers?: string[];
  members: IMemberBase[];
  availableMembers: IAvailableMembers[];
};

export const useGetSanitizedMembers = ({ allowedMembers, members, availableMembers }: IProps) => {
  const sanitizedMembers = allowedMembers
    ? availableMembers.filter(
        (item) =>
          allowedMembers.filter((item2) => {
            return item.name.startsWith(item2);
          }).length > 0,
      )
    : availableMembers;
  const missing = members
    ? sanitizedMembers.filter((item) => members.map((m) => m.name).indexOf(item.name) < 0)
    : sanitizedMembers;

  return {
    sanitizedMembers,
    missing,
  };
};
