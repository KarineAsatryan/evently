import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Toolbar,
  TodayButton,
  DateNavigator,
  Scheduler,
  Resources,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
import { owners } from "./data/tasks";
import { appointments, resourcesData } from "./data/resourses";



export default class Evently extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      data: appointments,
      resources: [
        {
          fieldName: "roomId",
          title: "Room",
          instances: resourcesData,
        },
        {
          fieldName: "members",
          title: "Members",
          instances: owners,
          allowMultiple: true,
        },
      ],
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, resources, date } = this.state;

    return (
      <Paper >
        <Scheduler data={data}>
          <ViewState defaultCurrentDate={date} />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <EditingState onCommitChanges={this.commitChanges} />
          <EditRecurrenceMenu />

          <MonthView />
          <Appointments />
          <AppointmentTooltip showOpenButton />
          <AppointmentForm />

          <Resources data={resources} mainResourceName="roomId" />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
