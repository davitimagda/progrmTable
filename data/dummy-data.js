import GroupTmima from "../models/group-tmima";
import Teacher from "../models/teacher";
import Day from "../models/day";
import Hour from "../models/hour";
import Tmima from "../models/tmima";



const ProgramTable = {
  days_template: {
    1: { name: "ΔΕΥΤΕΡΑ", hours: [1, 2, 3, 4, 5, 6, 7] },
    2: { name: "ΤΡΙΤΗ", hours: [1, 2, 3, 4, 5, 6, 7] },
    3: { name: "ΤΕΤΑΡΤΗ", hours: [1, 2, 3, 4, 5, 6, 7] },
    4: { name: "ΠΕΜΠΤΗ", hours: [1, 2, 3, 4, 5, 6, 7] },
    5: { name: "ΠΑΡΑΣΚΕΥΗ", hours: [1, 2, 3, 4, 5, 6, 7] },
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
  teachers: {
    Πετρίδης: {
      1: { hours: { 3: "Γαν", 4: "Γαν" } },
      2: { hours: { 5: "Γαν" } },
      3: { hours: { 3: "Γαν", 6: "Γαν" } },
      4: { hours: { 4: "Γαν" } },
    },
    Ανδριανός: {
      1: { hours: { 1: "Γθ/υ", 2: "Γθ/υ" } },
      2: { hours: { 3: "Βθ2", 4: "Βθ1", 6: "Γθ/υ" } },
      3: { hours: { 1: "Α1", 4: "Γθ/υ", 5: "Γθ/υ" } },
      4: { hours: { 2: "Α2", 3: "Βθ2", 7: "Α1" } },
      5: { hours: { 3: "Γθυ", 4: "Βθ1", 6: "Α2" } },
    },
    Παπαγεωργίου: {
      1: { hours: { 4: "Α1", 6: "Β2", 7: "Α2" } },
      3: { hours: { 3: "Α3", 4: "Β3", 6: "Α2", 7: "Γ2" } },
      4: { hours: { 1: "Α1", 2: "Β3", 5: "Γ3", 6: "Γ1", 7: "Β1" } },
      5: { hours: { 5: "Α3", 6: "Β1", 7: "Β2" } },
    },
    Καραγιάννης: {
      1: { hours: { 1: "Γαν", 2: "Γαν", 3: "Α2", 5: "Γ2" } },
      2: { hours: { 1: "Γ2", 2: "Γ2", 3: "Βα2", 4: "Βα2" } },
      3: { hours: { 1: "Α2", 2: "Γ2", 4: "Γαν", 5: "Γαν" } },
      4: { hours: { 3: "Γαν", 5: "Γ2", 6: "Γ2", 7: "Α2" } },
      5: { hours: { 1: "Α2", 2: "Α2", 4: "Βα2", 5: "Γαν" } },
    },
    Κρητικά: {
      1: { hours: { 5: "Γ1", 6: "Γ1", 7: "Β1" } },
      2: { hours: { 1: "Α1", 2: "Γ1", 3: "Γαν", 4: "Γαν" } },
      3: { hours: { 1: "Β1", 2: "Γ1", 4: "Α1", 5: "Α1" } },
      4: { hours: { 1: "Γαν", 2: "Γαν", 3: "Α1", 5: "Γ1" } },
      5: { hours: { 1: "Γ1", 3: "Γαν", 4: "Γαν" } },
    },
    Μαραθιανός: {
      1: { hours: { 1: "Β2", 2: "Β3", 3: "Βα2" } },
      2: { hours: { 3: "Βα1", 5: "Β1", 6: "Β2", 7: "Α3" } },
      3: { hours: { 1: "Β3", 2: "Β2", 4: "Β1", 6: "Β2" } },
      4: { hours: { 3: "Βα2", 4: "Β2", 5: "Β2", 7: "Β3" } },
      5: { hours: { 1: "Β3", 3: "Α3", 4: "Βα1" } },
    },
    Τζέλλος: {
      1: { hours: { 1: "Β1", 2: "Β2", 4: "Α2", 5: "Α2" } },
      2: { hours: { 4: "Α1", 5: "Β3", 6: "Γο2", 7: "Α2" } },
      3: { hours: { 2: "Β3", 4: "Α2", 6: "Γο2", 7: "Β2" } },
      4: { hours: { 1: "Γθ/υ", 2: "Β2", 4: "Β1", 5: "Β1", 6: "Α1" } },
      5: { hours: { 5: "Β2", 6: "Γθ/υ", 7: "Β1" } },
    },
    Τσαλίκουσου: {
      1: { hours: { 3: "Βα1", 4: "Α3", 5: "Γ3", 6: "Γ3" } },
      2: { hours: { 2: "Γ3", 4: "Βα1", 5: "Α1", 6: "Α2" } },
      3: { hours: { 1: "Γ3", 2: "Γ3", 5: "Α3", 6: "Α3", 7: "Α1" } },
      4: { hours: { 3: "Βα1", 4: "Α2", 5: "Α1", 7: "Α3" } },
      5: { hours: { 1: "Α1", 2: "Γ3", 3: "Α1" } },
    },
    Τσαρμποπούλου: {
      2: { hours: { 1: "Β1", 2: "Β3", 4: "Α3", 5: "Α3", 6: "Γο1" } },
      3: { hours: { 2: "Α3", 5: "Β1", 6: "Β3", 7: "Β3" } },
      4: { hours: { 1: "Γο1", 2: "Α3", 3: "Α3", 4: "Β3" } },
    },
    Δρακόπουλος: {
      1: { hours: { 1: "Α1", 3: "Βθ2", 4: "Γο1θ", 6: "Α1" } },
      2: { hours: { 2: "Α1", 3: "Γο1θ", 4: "Βθ2" } },
      3: { hours: { 2: "Α2", 3: "Α1", 4: "Α3", 6: "Γο1θ" } },
      4: { hours: { 1: "Α3", 2: "Α1", 3: "Γο1θ", 4: "Γο1θ", 6: "Α2" } },
      5: { hours: { 2: "Α3", 3: "Α2", 4: "Βθ2", 5: "Γο1/θ" } },
    },
    Ηλιακόπουλος: {
      1: { hours: { 1: "Γο2", 2: "Γο2", 3: "Βθ1", 5: "Β1", 6: "Β3" } },
      2: { hours: { 1: "Β2", 2: "Β1", 3: "Βθ1", 5: "Γο2" } },
      3: { hours: { 1: "Β2", 2: "Β1", 3: "Γο2" } },
      4: { hours: { 1: "Γο2", 2: "Β1", 3: "Βθ1", 6: "Β3" } },
      5: { hours: { 2: "Β1", 3: "Β2", 5: "Γο2", 6: "Β3" } },
    },
    Μπακάλη: {
      1: { hours: { 1: "Β3", 2: "Α2", 3: "Α3", 4: "Β2" } },
      2: { hours: { 6: "Γαν", 7: "Β2" } },
      5: { hours: { 4: "Α3", 5: "Β3", 6: "Γαν", 7: "Α2" } },
    },
    Σπυρόπουλος: {
      2: { hours: { 1: "Β3", 2: "Α3" } },
      5: { hours: { 6: "Α3", 7: "Β3" } },
    },
    Ρούγγα: {
      1: { hours: { 1: "Α2", 3: "Γθ/υ", 4: "Β1", 5: "Β3", 6: "Α3" } },
      2: { hours: { 1: "Α3", 3: "Α2", 4: "Γθ/υ", 5: "Γθ/υ" } },
      3: { hours: { 3: "Γθ/υ", 5: "Β2", 6: "Α1", 7: "Β1" } },
      4: { hours: { 1: "Β1", 2: "Γθ/υ", 4: "Α1" } },
      5: { hours: { 3: "Β3", 4: "Γθ/υ", 5: "Β1", 6: "Β2" } },
    },
    Βλάσση: {
      1: { hours: { 2: "Α3", 3: "Α1", 4: "Γυγ", 7: "Β3" } },
      2: { hours: { 1: "Α2", 2: "Β2", 3: "Γυγ" } },
      3: { hours: { 3: "Β1", 5: "Β3", 6: "Γυγ", 7: "Α3" } },
      4: { hours: { 1: "Β2", 3: "Γυγ", 4: "Γυγ", 5: "Α2", 6: "Β2" } },
      5: { hours: { 1: "Β1", 2: "Β2", 4: "Α1", 5: "Γυγ" } },
    },
    " Ούτσικα": {
      1: { hours: { 5: "Β2f", 6: "Α2f", 7: "Α1f" } },
      2: { hours: { 5: "Α2f", 6: "Α1f", 7: "Β1f" } },
    },
    Λαυρεντάκη: {
      1: { hours: { 4: "Β3", 5: "Α1", 6: "Γ2", 7: "Γ1" } },
      2: { hours: { 1: "Γ3", 3: "Α3", 5: "Β2", 6: "Β3" } },
      3: { hours: { 1: "Γ1", 2: "Α1", 3: "Β2", 5: "Α2" } },
      4: { hours: { 3: "Α2", 5: "Α3", 6: "Β1", 7: "Γ3" } },
      5: { hours: { 2: "Γ2", 3: "Β1", 4: "Α2", 5: "Α1", 7: "Α3" } },
    },
    Σαγανά: {
      1: { hours: { 5: "Β2d", 6: "Α2d", 7: "Α1d" } },
      2: { hours: { 5: "Α2d", 6: "Α1d", 7: "Β1d" } },
    },
    Πανταζή: {
      1: { hours: { 1: "Γο1", 2: "Γο1", 3: "Γο2" } },
      2: { hours: { 4: "Γο2", 5: "Γο1", 7: "Α1" } },
      3: { hours: { 1: "Α3", 3: "Α2", 4: "Γο2", 5: "Γο1" } },
      4: { hours: { 1: "Α2", 2: "Γο1", 4: "Γο2", 6: "Α3" } },
      5: { hours: { 3: "Γο2", 4: "Γο2", 6: "Γο1", 7: "Α1" } },
    },
    Κοκκόλης: {
      2: { hours: { 7: "Γ2" } },
      3: { hours: { 1: "Γ2" } },
      5: { hours: { 1: "Γ2" } },
    },
    Κουκουμπίκη: {
      1: { hours: { 5: "Α3", 6: "Β1", 7: "Γ3" } },
      2: { hours: { 1: "Γ1", 3: "Α1", 4: "Α2" } },
      3: { hours: { 3: "Β3", 4: "Β2", 6: "Β1", 7: "Γ1" } },
      4: { hours: { 4: "Α3", 5: "Β3", 6: "Γ3", 7: "Β2" } },
      5: { hours: { 1: "Γ3", 2: "Γ1", 5: "Α2", 6: "Α1" } },
    },
    Δαβίτη: {
      1: { hours: { 2: "Β1", 3: "Γο1", 4: "Γο2", 7: "Β2" } },
      2: { hours: { 2: "Α2", 3: "Γο2", 4: "Γο1", 6: "Β1" } },
      3: { hours: { 3: "Γο1", 4: "Γο1", 5: "Γο2", 7: "Α2" } },
      4: { hours: { 1: "Β3", 2: "Γο2", 3: "Γο2" } },
      5: { hours: { 1: "Β2", 2: "Β3", 4: "Γο1", 5: "Γο1", 6: "Γο2" } },
    },
    Κυριακοπούλου: {
      1: { hours: { 1: "Α3", 2: "Α1" } },
      5: { hours: { 1: "Α3", 2: "Α1" } },
    },
  },
  tmimata: {
    Γαν: { type: "OP", subTmimaOf: ["Γ1", "Γ2", "Γ3"] },
    "Γθ/υ": { type: "OP", subTmimaOf: ["Γ1", "Γ2", "Γ3"] },
    Βθ2: { type: "OP", subTmimaOf: ["Β2", "Β3"] },
    Βθ1: { type: "OP", subTmimaOf: ["Β1", "Β2"] },
    Α1: { type: "GP", subTmimaOf: [] },
    Α2: { type: "GP", subTmimaOf: [] },
    Γθυ: { type: "OP", subTmimaOf: ["Γ1", "Γ2", "Γ3"] },
    Β2: { type: "GP", subTmimaOf: [] },
    Α3: { type: "GP", subTmimaOf: [] },
    Β3: { type: "GP", subTmimaOf: [] },
    Γ2: { type: "GP", subTmimaOf: [] },
    Γ3: { type: "GP", subTmimaOf: [] },
    Γ1: { type: "GP", subTmimaOf: [] },
    Β1: { type: "GP", subTmimaOf: [] },
    Βα2: { type: "OP", subTmimaOf: ["Β2", "Β3"] },
    Βα1: { type: "OP", subTmimaOf: ["Β1", "Β2"] },
    Γο2: { type: "OP", subTmimaOf: ["Γ2", "Γ3"] },
    Γο1: { type: "OP", subTmimaOf: ["Γ1", "Γ2"] },
    Γο1θ: { type: "OP", subTmimaOf: ["Γ1", "Γ2", "Γ3"] },
    "Γο1/θ": { type: "OP", subTmimaOf: ["Γ1", "Γ2", "Γ3"] },
    Γυγ: { type: "OP", subTmimaOf: ["Γ1", "Γ2", "Γ3"] },
    Β2f: { type: "FL", subTmimaOf: [] },
    Α2f: { type: "FL", subTmimaOf: ["Α2"] },
    Α1f: { type: "FL", subTmimaOf: ["Α1", "Α3"] },
    Β1f: { type: "FL", subTmimaOf: ["Β1", "Β3"] },
    Β2d: { type: "FL", subTmimaOf: ["Β2"] },
    Α2d: { type: "FL", subTmimaOf: ["Α2"] },
    Α1d: { type: "FL", subTmimaOf: ["Α1", "Α3"] },
    Β1d: { type: "FL", subTmimaOf: [] },
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
            }
            
          }
        });
      }
    }
    i++;
  }
}
const tmimata_table = [];
for (const tmima in tmimata) {
  const taxi = tmima[0];
  let type = "";
  let subTmimaOf = [];
  if (ProgramTable.tmimata[tmima]) {
    const subTmima = ProgramTable.tmimata[tmima];
    type = subTmima.type;
    subTmimaOf = subTmima.subTmimaOf;
  } else {
    type = "GP";
  }

  tmimata_table.push(new Tmima(tmima, taxi, type, subTmimaOf));
}

tmimata_table.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
export const TMIMATA = tmimata_table;

export const TEACHERS = teachers_table;
