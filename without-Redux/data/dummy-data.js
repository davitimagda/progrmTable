import GroupTmima from "../models/group-tmima";
import Teacher from "../models/teacher";
import Day from "../models/day";
import Hour from "../models/hour";
import Tmima from "../models/tmima";

export const GROUPTMIMATA = [
  new GroupTmima("Α1", ["Α1", "Αγαλ1", "Αγερμ1"]),
  new GroupTmima("Α2", ["Α2", "Αγαλ1", "Αγαλ2", "Αγερμ1", "Αγερμ2"]),
  new GroupTmima("Α3", ["Α3", "Αγαλ2", "Αγερμ2"]),
  new GroupTmima("Β1", ["Β1", "Βα1", "Βθ1", "Βγαλ1", "Βγερμ1"]),
  new GroupTmima("Β2", [
    "Β2",
    "Βα1",
    "Βθ1",
    "Βα2",
    "Βθ2",
    "Βγαλ1",
    "Βγαλ2",
    "Βγερμ1",
  ]),
  new GroupTmima("Β3", ["Β3", "Βα2", "Βθ2", "Βγαλ2", "Βγερμ2"]),
  new GroupTmima("Γ1", ["Γ1", "Γαν", "Γυγ", "Γο1", "Γθ/υ", "Γο1θ"]),
  new GroupTmima("Γ2", ["Γ2", "Γαν", "Γυγ", "Γο1", "Γο2", "Γθ/υ", "Γο1θ"]),
  new GroupTmima("Γ3", ["Γ3", "Γαν", "Γυγ", "Γο2", "Γθ/υ", "Γο1θ"]),
  // new GroupTmima("ST", ["ST"]),
];

const ProgramTable = {
  days_template: {
    1: {
      name: "ΔΕΥΤΕΡΑ",
      hours: [1, 2, 3, 4, 5, 6, 7],
    },
    2: {
      name: "ΤΡΙΤΗ",
      hours: [1, 2, 3, 4, 5, 6, 7],
    },
    3: {
      name: "ΤΕΤΑΡΤΗ",
      hours: [1, 2, 3, 4, 5, 6, 7],
    },
    4: {
      name: "ΠΕΜΠΤΗ",
      hours: [1, 2, 3, 4, 5, 6, 7],
    },
    5: {
      name: "ΠΑΡΑΣΚΕΥΗ",
      hours: [1, 2, 3, 4, 5, 6, 7],
    },
  },
  hours_template: {
    1: { name: "1η", days: [1, 2, 3, 4, 5] },
    2: { name: "2η", days: [1, 2, 3, 4, 5] },
    3: { name: "3η", days: [1, 2, 3, 4, 5] },
    4: { name: "4η", days: [1, 2, 3, 4, 5] },
    5: { name: "5η", days: [1, 2, 3, 4, 5] },
    6: { name: "6η", days: [1, 2, 3, 4, 5] },
    7: { name: "7η", days: [1, 2, 3, 4, 5] },
  },
  groups: {
    Α1: ["Α1", "Αγαλ1", "Αγερμ1"],
    Α2: ["Α2", "Αγαλ1", "Αγαλ2", "Αγερμ1", "Αγερμ2"],
    Α3: ["Α3", "Αγαλ2", "Αγερμ2"],
    Β1: ["Β1", "Βα1", "Βθ1", "Βγαλ1", "Βγερμ1"],
    Β2: ["Β2", "Βα1", "Βθ1", "Βα2", "Βθ2", "Βγαλ1", "Βγαλ2", "Βγερμ1"],
    Β3: ["Β3", "Βα2", "Βθ2", "Βγαλ2", "Βγερμ2"],
    Γ1: ["Γ1", "Γαν", "Γυγ", "Γο1", "Γθ/υ", "Γο1θ"],
    Γ2: ["Γ2", "Γαν", "Γυγ", "Γο1", "Γο2", "Γθ/υ", "Γο1θ"],
    Γ3: ["Γ3", "Γαν", "Γυγ", "Γο2", "Γθ/υ", "Γο1θ"],
    ST: ["ST"],
  },
  teachers: {
    Πετρίδης: {
      1: {
        hours: { 3: "Γαν", 4: "Γαν" },
      },
      2: {
        hours: { 4: "Γαν" },
      },
      3: {
        hours: { 3: "Γαν", 6: "Γαν" },
      },
      4: {
        hours: { 1: "Γαν" },
      },
      5: {
        hours: {},
      },
    },
    Ανδριανός: {
      1: {
        hours: { 1: "Γθ/υ", 2: "Γθ/υ" },
      },
      2: {
        hours: { 3: "Βθ2", 4: "Βθ1", 6: "Γθ/υ" },
      },
      3: {
        hours: { 1: "Α1", 4: "Γθ/υ", 5: "Γθ/υ" },
      },
      4: {
        hours: { 2: "Α2", 3: "Βθ2", 7: "Α1" },
      },
      5: {
        hours: { 1: "Α2", 4: "Βθ1", 5: "Γθ/υ" },
      },
    },
    Παπαγεωργίου: {
      1: {
        hours: { 4: "Α1", 5: "Β2", 6: "Α2" },
      },
      2: {
        hours: {},
      },
      3: {
        hours: { 3: "Α3", 4: "Β3", 6: "Α2", 7: "Γ2" },
      },
      4: {
        hours: { 2: "Β3", 4: "Α1", 5: "Γ3", 6: "Γ1", 7: "Β1" },
      },
      5: {
        hours: { 5: "Α3", 6: "Β1", 7: "Β2" },
      },
    },
    Καραγιάννης: {
      1: {
        hours: { 1: "Γαν", 2: "Γαν", 5: "Α2", 6: "Γ2" },
      },
      2: {
        hours: { 1: "Γ2", 2: "Γ2", 3: "Βα2", 4: "Βα2" },
      },
      3: {
        hours: { 1: "Α2", 2: "Γ2", 4: "Γαν", 5: "Γαν" },
      },
      4: {
        hours: { 4: "Γαν", 5: "Γ2", 6: "Γ2", 7: "Α2" },
      },
      5: {
        hours: { 2: "Α2", 4: "Βα2", 5: "Γαν", 6: "Α2" },
      },
    },
    Κρητικά: {
      1: {
        hours: { 5: "Γ1", 6: "Γ1", 7: "Β1" },
      },
      2: {
        hours: { 1: "Α1", 2: "Γ1", 3: "Γαν", 5: "Γαν" },
      },
      3: {
        hours: { 1: "Β1", 2: "Γ1", 4: "Α1", 5: "Α1" },
      },
      4: {
        hours: { 1: "Α1", 2: "Γαν", 3: "Γαν", 5: "Γ1" },
      },
      5: {
        hours: { 1: "Γ1", 3: "Γαν", 4: "Γαν" },
      },
    },
    Μαραθιανός: {
      1: {
        hours: { 1: "Β2", 2: "Β3", 3: "Βα2" },
      },
      2: {
        hours: { 3: "Βα1", 5: "Β2", 6: "Α3", 7: "Β1" },
      },
      3: {
        hours: { 1: "Β3", 2: "Β2", 4: "Β1", 5: "Β2" },
      },
      4: {
        hours: { 3: "Βα2", 4: "Β2", 5: "Β2", 7: "Β3" },
      },
      5: {
        hours: { 3: "Α3", 4: "Βα1", 6: "Β3" },
      },
    },
    Τζέλλος: {
      1: {
        hours: { 1: "Β1", 2: "Β2", 3: "Α2", 4: "Α2" },
      },
      2: {
        hours: { 4: "Α1", 6: "Γο2", 7: "Β2" },
      },
      3: {
        hours: { 2: "Β3", 4: "Α2", 6: "Γο2", 7: "Β2" },
      },
      4: {
        hours: { 1: "Γθ/υ", 2: "Β2", 4: "Β1", 5: "Β1", 6: "Α1" },
      },
      5: {
        hours: { 3: "Β3", 5: "Α2", 6: "Γθ/υ", 7: "Β1" },
      },
    },
    Τσαλίκουσου: {
      1: {
        hours: { 3: "Βα1", 4: "Α3", 5: "Γ3", 6: "Γ3" },
      },
      2: {
        hours: { 2: "Γ3", 4: "Βα1", 5: "Α1", 6: "Α2" },
      },
      3: {
        hours: { 1: "Γ3", 2: "Γ3", 5: "Α3", 6: "Α3", 7: "Α1" },
      },
      4: {
        hours: { 3: "Βα1", 4: "Α2", 5: "Α1", 7: "Α3" },
      },
      5: {
        hours: { 1: "Α1", 2: "Γ3", 3: "Α1" },
      },
    },
    Τσαρμποπούλου: {
      1: {
        hours: {},
      },
      2: {
        hours: { 1: "Β1", 2: "Β3", 4: "Α3", 5: "Α3", 6: "Γο1" },
      },
      3: {
        hours: { 2: "Α3", 5: "Β1", 6: "Β3", 7: "Β3" },
      },
      4: {
        hours: { 1: "Γο1", 2: "Α3", 3: "Α3", 4: "Β3" },
      },
      5: {
        hours: {},
      },
    },
    Δρακόπουλος: {
      1: {
        hours: { 1: "Α1", 3: "Βθ2", 4: "Γο1θ", 5: "Α1" },
      },
      2: {
        hours: { 2: "Α1", 3: "Γο1θ", 4: "Βθ2", 5: "Α2" },
      },
      3: {
        hours: { 2: "Α2", 3: "Α1", 4: "Α3", 6: "Γο1θ" },
      },
      4: {
        hours: { 1: "Α3", 2: "Α1", 3: "Γο1θ", 4: "Γο1θ", 6: "Α2" },
      },
      5: {
        hours: { 2: "Α3", 3: "Γο1θ", 4: "Βθ2" },
      },
    },
    Ηλιακόπουλος: {
      1: {
        hours: { 1: "Γο2", 2: "Γο2", 3: "Βθ1", 5: "Β1", 6: "Β3" },
      },
      2: {
        hours: { 1: "Β2", 2: "Β1", 3: "Βθ1", 5: "Γο2" },
      },
      3: {
        hours: { 1: "Β2", 2: "Β1", 3: "Γο2" },
      },
      4: {
        hours: { 1: "Γο2", 2: "Β1", 3: "Βθ1", 6: "Β3" },
      },
      5: {
        hours: { 1: "Β3", 2: "Β1", 3: "Β2", 5: "Γο2" },
      },
    },
    Μπακάλη: {
      1: {
        hours: { 1: "Β3", 2: "Α2", 3: "Α3", 4: "Β2" },
      },
      2: {
        hours: { 6: "Γαν", 7: "Β3" },
      },
      3: {
        hours: {},
      },
      4: {
        hours: {},
      },
      5: {
        hours: { 4: "Α3", 5: "Β2", 6: "Γαν", 7: "Α2" },
      },
    },
    Σπυρόπουλος: {
      1: {
        hours: {},
      },
      2: {
        hours: { 1: "Β3", 2: "Α3" },
      },
      3: {
        hours: {},
      },
      4: {
        hours: {},
      },
      5: {
        hours: { 6: "Α3", 7: "Β3" },
      },
    },
    Ρούγγα: {
      1: {
        hours: { 1: "Α2", 3: "Γθ/υ", 4: "Β1", 5: "Β3", 6: "Α3" },
      },
      2: {
        hours: { 1: "Α3", 3: "Α2", 4: "Γθ/υ", 5: "Γθ/υ", 6: "Α1" },
      },
      3: {
        hours: { 3: "Γθ/υ", 6: "Β2", 7: "Β1" },
      },
      4: {
        hours: { 1: "Β1", 2: "Γθ/υ", 3: "Α1" },
      },
      5: {
        hours: { 3: "Β1", 4: "Γθ/υ", 5: "Β3", 6: "Β2" },
      },
    },
    Βλάσση: {
      1: {
        hours: { 2: "Α3", 3: "Α1", 4: "Γυγ", 7: "Β3" },
      },
      2: {
        hours: { 1: "Α2", 2: "Β2", 3: "Γυγ" },
      },
      3: {
        hours: { 3: "Β1", 5: "Β3", 6: "Γυγ", 7: "Α3" },
      },
      4: {
        hours: { 1: "Β2", 3: "Γυγ", 4: "Γυγ", 5: "Α2", 6: "Β2" },
      },
      5: {
        hours: { 1: "Β1", 2: "Β2", 3: "Γυγ", 4: "Α1" },
      },
    },
    Λαυρεντάκη: {
      1: {
        hours: { 4: "Β3", 5: "Γ2", 6: "Α1", 7: "Γ1" },
      },
      2: {
        hours: { 1: "Γ3", 3: "Α3", 5: "Β3", 6: "Β2" },
      },
      3: {
        hours: { 1: "Γ1", 2: "Α1", 3: "Β2", 5: "Α2" },
      },
      4: {
        hours: { 3: "Α2", 5: "Α3", 6: "Β1", 7: "Γ3" },
      },
      5: {
        hours: { 2: "Γ2", 3: "Α2", 5: "Β1", 6: "Α1", 7: "Α3" },
      },
    },
    Σαγανά: {
      1: {
        hours: { 6: "Β2d", 7: "Αd" },
      },
      2: {
        hours: { 6: "Β13d", 7: "Αd" },
      },
      3: {
        hours: {},
      },
      4: {
        hours: {},
      },
      5: {
        hours: {},
      },
    },
    Πανταζή: {
      1: {
        hours: { 1: "Γο1", 2: "Γο1", 3: "Γο2" },
      },
      2: {
        hours: { 4: "Γο2", 5: "Γο1" },
      },
      3: {
        hours: { 1: "Α3", 3: "Α2", 4: "Γο2", 5: "Γο1", 6: "Α1" },
      },
      4: {
        hours: { 1: "Α2", 2: "Γο1", 4: "Γο2", 6: "Α3" },
      },
      5: {
        hours: { 3: "Γο2", 4: "Γο2", 6: "Γο1", 7: "Α1" },
      },
    },
    Κοκκόλης: {
      1: {
        hours: {},
      },
      2: {
        hours: {
          7: "Γ2",
        },
      },
      3: {
        hours: { 1: "Γ2" },
      },
      4: {
        hours: {},
      },
      5: {
        hours: { 1: "Γ2" },
      },
    },
    Κουκουμπίκη: {
      1: {
        hours: { 5: "Α3", 6: "Β1", 7: "Γ3" },
      },
      2: {
        hours: { 1: "Γ1", 3: "Α1", 4: "Α2" },
      },
      3: {
        hours: { 3: "Β3", 4: "Β2", 6: "Β1", 7: "Γ1" },
      },
      4: {
        hours: { 4: "Α3", 5: "Β3", 6: "Γ3", 7: "Β2" },
      },
      5: {
        hours: { 1: "Γ3", 2: "Γ1", 4: "Α2", 5: "Α1" },
      },
    },
    Δαβίτη: {
      1: {
        hours: { 2: "Β1", 3: "Γο1", 4: "Γο2", 7: "Β2" },
      },
      2: {
        hours: { 2: "Α2", 3: "Γο2", 4: "Γο1", 5: "Β1" },
      },
      3: {
        hours: { 3: "Γο1", 4: "Γο1", 5: "Γο2", 7: "Α2" },
      },
      4: {
        hours: { 1: "Β3", 2: "Γο2", 3: "Γο2" },
      },
      5: {
        hours: {
          1: "Β2",
          2: "Β3",
          4: "Γο1",
          5: "Γο1",
          6: "Γο2",
        },
      },
    },
    Κυριακοπούλου: {
      1: {
        hours: { 1: "Α3", 2: "Α1" },
      },
      2: {
        hours: {},
      },
      3: {
        hours: {},
      },
      4: {
        hours: {},
      },
      5: {
        hours: { 1: "Α3", 2: "Α1" },
      },
    },
  },
};

const hours = ProgramTable.hours_template;
const hours_table = [];
const hours_arr = {};
for (const key in hours) {
  if (Object.hasOwnProperty.call(hours, key)) {
    hours_table.push(new Hour(key, hours[key].name, hours[key].days));
    hours_arr[key] = { name: hours[key].name, days: hours[key].days };
  }
}
export const HOURS_TEMPLATE = hours_table;
export const HOURS_ARRAY = hours_arr;

const days = ProgramTable.days_template;
const days_table = [];
for (const key in days) {
  if (Object.hasOwnProperty.call(days, key)) {
    days_table.push(new Day(key, days[key].name, days[key].hours));
  }
}
export const DAYS = days_table;

const t1 = ProgramTable.teachers;
const teachers_table = [];
const tmimata = [];
let i = 0;
for (const t_name in t1) {
  if (Object.hasOwnProperty.call(t1, t_name)) {
    teachers_table.push(new Teacher(i, t_name, t1[t_name]));
    for (const day_aa in t1[t_name]) {
      if (Object.hasOwnProperty.call(t1[t_name], day_aa)) {
        const hours = HOURS_TEMPLATE.map((hour) => {
          let tmima = "";
          if (t1[t_name][day_aa].hours[hour.aa]) {
            tmima = t1[t_name][day_aa].hours[hour.aa];
            if (!tmimata[tmima]) {
              tmimata[tmima] = {};
              tmimata[tmima][day_aa] = {};
              tmimata[tmima][day_aa][hour.aa] = {};
            }
            if (!tmimata[tmima][day_aa]) {
              tmimata[tmima][day_aa] = {};
              tmimata[tmima][day_aa][hour.aa] = {};
            }
            tmimata[tmima][day_aa][hour.aa] = {
              h_name: hour.name,
              t_name: [t_name],
            };
          }
        });
      }
    }

    i++;
  }
}
const tmimata_table = [];
for (const tmima in tmimata) {
  const lines = tmimaLines(tmimata[tmima]);
  tmimata_table.push(new Tmima(tmima, "single", tmimata[tmima], lines));
}

function tmimaLines(tmima) {
  const lines = [];
  for (const day in days) {
    if (Object.hasOwnProperty.call(days, day)) {
      const day_hours = DAYS.find((d) => {
        return d.aa == day;
      });
      lines.push(["headerDay", day_hours.name]);

      for (const index in day_hours.hours) {
        if (Object.hasOwnProperty.call(day_hours.hours, index)) {
          const hour = day_hours.hours[index];

          if (!tmima[day]) {
          } else {
            const hour_name = ProgramTable.hours_template[hour].name;
            if (!tmima[day][hour]) {
              tmima[day][hour] = { h_name: hour_name, t_name: [] };
            }
            lines.push([tmima[day][hour]]);
          }
        }
      }
    }
  }
  return lines;
}

const group_table = {};
GROUPTMIMATA.map((group) => {
  const group_name = group.name;
  const group_tmimata = group.tmimata;
  for (let index = 0; index < group_tmimata.length; index++) {
    const group_tmima = group_tmimata[index];
    const tmima = tmimata_table.find((t) => {
      return t.name == group_tmima;
    });
    if (tmima) {
      if (!group_table[group_name]) {
        group_table[group_name] = {};
      }
      const days = tmima.days;
      for (const day in days) {
        if (Object.hasOwnProperty.call(days, day)) {
          const hours = days[day];
          if (!group_table[group_name][day]) group_table[group_name][day] = {};
          for (const hour in hours) {
            if (Object.hasOwnProperty.call(hours, hour)) {
              if (!group_table[group_name][day][hour]) {
                group_table[group_name][day][hour] = {
                  h_name: hours[hour].h_name,
                  t_name: [],
                };
              }
              let t_name = hours[hour].t_name.join(" ");
              if (t_name != "") {
                t_name =
                  tmima.name == group_name ? t_name : tmima.name + " " + t_name;
                group_table[group_name][day][hour].t_name.push(t_name);
              }
            }
          }
        }
      }
    }
  }
});

for (const tmima in group_table) {
  const lines = tmimaLines(group_table[tmima]);
  tmimata_table.push(new Tmima(tmima, "group", group_table[tmima], lines));
}

tmimata_table.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
export const TMIMATA = tmimata_table;

export const TEACHERS = teachers_table;
