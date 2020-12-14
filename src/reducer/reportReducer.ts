export type Action = {
  type: ActionType;
  payload?: any;
};

export enum ActionType {
  SELECT_MONTH_ACTION,
}

export type ReportState = {
  selectedMonth: string;
};

export const initialReportState: ReportState = {
  selectedMonth: "2020-12",
};

export const reportReducer = (
  state: ReportState,
  action: Action
): ReportState => {
  console.log(action);
  switch (action.type) {
    case ActionType.SELECT_MONTH_ACTION:
      console.log({
        ...state,
        selectedMonth: action.payload,
      });
      return {
        ...state,
        selectedMonth: action.payload,
      };
    default:
      return state;
  }
};
