import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Switch,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TMIMATA, TEACHERS, DAYS } from "../data/dummy-data";
import ListSelect from "../components/ListSelect";
import Card from "../components/UI/Card";

const DaysListText = ({ listData }) => {
  const msg =
    listData.length > 0 ? listData.map((day) => day.name).join(", ") : "Όλες";
  return (
    <Card>
      <Text>Επιλογή ημερών : {msg}</Text>
    </Card>
  );
};
const TmimataListText = ({ listData }) => {
  const msg =
    listData.length > 0 ? listData.map((tmima) => tmima.name).join(", ") : "Όλα";
  return <Text>Επιλογή τμημάτων : {msg}</Text>;
};
const TeachersListText = ({ listData }) => {
  const msg =
    listData.length > 0 ? listData.map((teacher) => teacher.name).join(", ") : "Όλοι";
  return <Text>Επιλογή καθηγητών : {msg}</Text>;
};

const ListHandler = (props) => {
  const [listVisible, setListVisible] = useState(false);

  // const msg =
  //   listData.length > 0 ? listData.map((t) => t.name).join(", ") : "Όλα";

  const listName = props.listName;
  const listData = props.listData;
  const updateList = props.updateList;
  return (
    <View>
      <Text
        onPress={() => {
          setListVisible((prev) => !prev);
        }}
      >
        {listName == "days" && <DaysListText listData={listData} />}
        {listName == "tmimata" && <TmimataListText listData={listData} />}
        {listName == "teachers" && <TeachersListText listData={listData} />}
      </Text>
      {listVisible && (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <ListSelect
            listName={listName}
            updateList={updateList}
            selectedList={listData}
          />
        </ScrollView>
      )}
    </View>
  );
};

const FilterScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tmimaGroup, setTmimaGroup] = useState(true);
  const [
    [header2SortDays, header2SortTmimata, header2SortTeachers],
    setHeader2Sort,
  ] = useState([]);
  const [daysListData, setDaysListData] = useState([]);
  const [tmimataListData, setTmimataListData] = useState([]);
  const [teachersListData, setTeachersListData] = useState([]);

  console.log("Filter Screen ----");
  const updateTeachersList = (data) => {
    setTeachersListData(data);
  };
  const updateDaysList = (data) => {
    setDaysListData(data);
  };
  const updateTmimataList = (data) => {
    setTmimataListData(data);
  };
  const toggleTmimaGrouph = () =>
    setTmimaGroup((previousState) => !previousState);

  const setHeader2 = (header2) => {
    const initHeader2 = [];
    if (header2 == "days") {
      initHeader2.push(!header2SortDays);
      initHeader2.push(!!header2SortDays);
      initHeader2.push(!!header2SortDays);
    }
    if (header2 == "tmimata") {
      initHeader2.push(!!header2SortTmimata);
      initHeader2.push(!header2SortTmimata);
      initHeader2.push(!!header2SortTmimata);
    }
    if (header2 == "teachers") {
      initHeader2.push(!!header2SortTeachers);
      initHeader2.push(!!header2SortTeachers);
      initHeader2.push(!header2SortTeachers);
    }
    setHeader2Sort(initHeader2);
  };

  const filterType = props.route.params.filterType;

  useEffect(() => {
    if (filterType == "day") {
      setHeader2("teachers");
    }
    if (filterType == "tmima") {
      setHeader2("days");
    }
    if (filterType == "teacher") {
      setHeader2("days");
    }
  }, []);

  let choices;

  if (filterType == "day") {
    choices = DAYS;
  }

  if (filterType == "tmima") {
    choices = tmimaGroup
      ? TMIMATA.filter((tmima) => tmima.type == "group")
      : TMIMATA.filter((tmima) => tmima.type == "single");
  }

  if (filterType == "teacher") {
    choices = TEACHERS;
  }

  // const startLoading = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 0);
  // };

  const displayProgram = (choice) => {
    // startLoading();

    const listFilters = {
      days: daysListData,
      tmimata: tmimataListData,
      teachers: teachersListData,
      header1Sort: filterType,
      header2Sort: header2SortDays
        ? "day"
        : header2SortTmimata
        ? "tmima"
        : "teacher",
    };
    props.navigation.navigate("ProgramDisplay", {
      filterType: filterType,
      tmimaGroupFilter: tmimaGroup,
      displayName: choice,
      listFilters: listFilters,
    });
  };

  return (
    <ScrollView style={styles.screen}>
      {isLoading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator
            size="large"
            color="green"
            //visibility of Overlay Loading Spinner
            visible={isLoading}
            //Text with the Spinner
            textContent={"Loading..."}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) : (
        <View>
          <View style={styles.contentContainer}>
            <Card key="all" style={styles.choiceButton}>
              <Button title="Όλα" onPress={displayProgram.bind(this, "all")} />
            </Card>
            {choices && choices.length > 0 ? (
              choices.map((choice) => (
                <View key={choice.name} style={styles.choiceButton}>
                  <Button
                    title={choice.name}
                    onPress={displayProgram.bind(this, choice.name)}
                  />
                </View>
              ))
            ) : (
              <Text>Nothing found</Text>
            )}
          </View>
          {filterType == "day" ? (
            <View>
              <View style={styles.header2FilterStyle}>
                <Text>Προβολή ανά : Καθηγητή</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={header2SortTeachers ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setHeader2("teachers")}
                  value={header2SortTeachers}
                />

                <Text>Τμήμα</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={header2SortTmimata ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setHeader2("tmimata")}
                  value={header2SortTmimata}
                />
              </View>
              <ListHandler
                listName="teachers"
                listData={teachersListData}
                updateList={updateTeachersList}
              />
              <ListHandler
                listName="tmimata"
                listData={tmimataListData}
                updateList={updateTmimataList}
              />
            </View>
          ) : filterType == "tmima" ? (
            <View>
              <View style={styles.tmimaFilter}>
                <Text>Ομαδοποίηση τμημάτων</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={tmimaGroup ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleTmimaGrouph}
                  value={tmimaGroup}
                />
              </View>
              <View style={styles.header2FilterStyle}>
                <Text>Προβολή ανά : Ημέρα </Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={header2SortDays ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setHeader2("days")}
                  value={header2SortDays}
                />
                <Text>Καθηγητή</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={header2SortTeachers ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setHeader2("teachers")}
                  value={header2SortTeachers}
                />
              </View>
              <ListHandler
                listName="teachers"
                listData={teachersListData}
                updateList={updateTeachersList}
              />
              <ListHandler
                listName="days"
                listData={daysListData}
                updateList={updateDaysList}
              />
            </View>
          ) : (
            <View>
              <View style={styles.header2FilterStyle}>
                <Text>Προβολή ανά : Ημέρα</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={header2SortDays ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setHeader2("days")}
                  value={header2SortDays}
                />

                <Text>Τμήμα</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={header2SortTmimata ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setHeader2("tmimata")}
                  value={header2SortTmimata}
                />
              </View>
              <ListHandler
                listName="days"
                listData={daysListData}
                updateList={updateDaysList}
              />

              <ListHandler
                listName="tmimata"
                listData={tmimataListData}
                updateList={updateTmimataList}
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  tmimaFilter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header2FilterStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    // flex: 1,
    flexDirection: "row",
    backgroundColor: "#999",
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  choiceButton: {
    backgroundColor: "#fff",
    margin: 5,
    // padding: 5,
    // width: "30%",
    // borderRadius: 15,
    borderColor: "white",
    borderWidth: 3,
  },
  button: {
    fontSize: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 30,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
export default FilterScreen;
