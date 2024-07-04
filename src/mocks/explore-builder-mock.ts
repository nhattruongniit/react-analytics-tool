import { IMemberDimensions } from "@src/types/query-builder";

export const availableDimensionsMocks: IMemberDimensions[] = [
  {
    name: "firebase.app_id",
    title: "Firebase App Id",
    shortTitle: "App Id",
    isVisible: true,
    public: true,
  },
  {
    name: "firebase.composite_key",
    title: "Firebase Composite Key",
    type: "string",
    shortTitle: "Composite Key",
    isVisible: true,
    public: true,
  },
  {
    name: "firebase.app_info__id",
    title: "Firebase App Info - ID",
    type: "string",
    shortTitle: "App Info - ID",
    meta: {
      member_groups: ["App Info"],
    },
    isVisible: true,
    public: true,
  },
  {
    name: "firebase.app_info__version",
    title: "Firebase App Info - Version",
    type: "string",
    shortTitle: "App Info - Version",
    meta: {
      member_groups: ["App Info"],
    },
    isVisible: true,
    public: true,
  },
];

export const availableMeasuresMocks = [
  {
    name: "firebase.event_count",
    title: "Firebase Event Count",
    shortTitle: "Event Count",
    isVisible: true,
    public: true,
  },
  {
    name: "user_ab_testing.distinct_user",
    title: "Distinct User",
    shortTitle: "Distinct User",
    isVisible: true,
    public: true,
  },
];
