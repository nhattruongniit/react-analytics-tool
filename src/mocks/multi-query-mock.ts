export const multiQueryMock = {
  node_1: {
    name: "node_1",
    json_query: {
      measures: ["firebase.event_count"],
      timeDimensions: [
        {
          dimension: "firebase.event_timestamp",
          granularity: "day",
          dateRange: "Last 7 days",
        },
      ],
      filters: [
        {
          member: "firebase.event_name",
          operator: "equals",
          values: ["song_start"],
        },
      ],
      limit: 100,
    },
    sql_query: {},
  },
};
