export const schema = [
  {
    name: "firebase__ama_app_id",
    field_type: "STRING",
    mode: "NULLABLE",
  },
  {
    name: "firebase__event_name",
    field_type: "STRING",
    mode: "NULLABLE",
  },
  {
    name: "firebase__platform",
    field_type: "STRING",
    mode: "NULLABLE",
  },
  {
    name: "firebase__event_timestamp_day",
    field_type: "DATETIME",
    mode: "NULLABLE",
  },
  {
    name: "firebase__event_count",
    field_type: "INTEGER",
    mode: "NULLABLE",
  },
];

export const nodeOptions = ["tony", "phong", "tony_sql", "ngoc"];

export const blenderBodyMocks = {
  adapter_name: "data-blender",
  alias: "blended",
  model_config: {
    sources: [
      {
        query_step_alias: "source1",
        source_alias: "tbl1",
        dimensions: [],
        measures: [],
        filters: [],
      },
      {
        query_step_alias: "source2",
        source_alias: "tbl2",
        dimensions: [
          {
            name: "platform",
            alias: "platform1",
            type: "basic",
            args: ["tbl2.platform"],
          },
        ],
        measures: [
          {
            name: "firebase__event_timestamp_day",
            alias: "",
            type: "basic",
            aggregation: "sum",
            args: ["tbl2.firebase__event_timestamp_day"],
          },
        ],
        filters: [
          {
            name: "tonya",
            and: [{ name: "tony", type: "eq", args: ["tbl1.platform", "tbl2.platform"] }],
          },
        ],
      },
    ],
    joins: [
      {
        join_type: "INNER",
        on: [
          { name: "tony", type: "eq", args: ["tbl1.platform", "tbl2.platform"] },
          { name: "tony2", type: "eq", args: [] },
        ],
      },
    ],
    dimensions: [{ name: "platform", type: "basic", args: ["tbl1.platform"] }],
    measures: [],
  },
};
