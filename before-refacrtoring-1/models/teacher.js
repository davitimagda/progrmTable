class Teacher {
  constructor(aa, name, days) {
    this.aa = aa;
    this.name = name;
    this.days = days;
  }

  getTeacherTmima = (filters) => {
    const details = [];
    for (const day_aa in this.days) {
      if (Object.hasOwnProperty.call(this.days, day_aa)) {
        for (const hour in this.days[day_aa]["hours"]) {
          if (Object.hasOwnProperty.call(this.days[day_aa]["hours"], hour)) {
            const tmima = this.days[day_aa]["hours"][hour];
            details.push({
              teacher: this.name,
              tmima: tmima,
              day: day_aa,
              hour: hour,
            });
          }
        }
      }
    }
    if (
      filters &&
      filters.tmimata &&
      filters.days &&
      (filters.tmimata.length > 0 || filters.days.length > 0)
    ) {
      return this.filterTeacher(details, filters.tmimata, filters.days);
    }
    return details;
  };

  filterTeacher = (teacher, tmimaFilter, dayFilter) => {
    const teacher_lines = teacher.filter((t) => {
      let tmimaCheck = true;
      let dayCheck = true;
      if (tmimaFilter.length > 0) {
        const listTmima = tmimaFilter.find((t_list) => t_list.name == t.tmima);
        if (!listTmima) {
          tmimaCheck = false;
        }
      }
      if (dayFilter.length > 0) {
        const listDay = dayFilter.find((t_list) => t_list.aa == t.day);
        if (!listDay) {
          dayCheck = false;
        }
      }

      if (tmimaCheck && dayCheck) {
        return t;
      }
    });
    return teacher_lines;
  };
}

export default Teacher;
const sample = {
  Δαβίτη: {
    1: { hours: { 2: "Β1", 3: "Γο1", 4: "Γο2", 7: "Β2" } },
    2: { hours: { 2: "Α2", 3: "Γο2", 4: "Γο1", 5: "Β1" } },
    3: { hours: { 3: "Γο1", 4: "Γο1", 5: "Γο2", 7: "Α2" } },
    4: { hours: { 1: "Β3", 2: "Γο2", 3: "Γο2" } },
    5: { hours: { 1: "Β2", 2: "Β3", 4: "Γο1", 5: "Γο1", 6: "Γο2" } },
  },
};
