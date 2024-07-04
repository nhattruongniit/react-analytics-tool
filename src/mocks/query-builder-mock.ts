export const queryBuilderMock: any = [
  {
    name: "song_start by song_play_type",
    query: {
      limit: 99,
      measures: ["firebase.event_count"],
      timeDimensions: [
        {
          dimension: "firebase.event_timestamp",
          // granularity: "day",
          dateRange: "Last 7 days",
        },
      ],
      order: [["firebase.event_count", "desc"]],
      dimensions: ["firebase.ep__song_play_type"],
      filters: [
        {
          member: "firebase.event_name",
          operator: "equals",
          values: ["song_start"],
        },
      ],
    },
  },
];
