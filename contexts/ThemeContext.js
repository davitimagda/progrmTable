import React, { createContext, useContext, useState } from "react";
// https://ibjects.medium.com/the-simplest-implementation-of-context-api-in-react-native-94f749187873

export const themes = {
  Town: {
    primary: "#F2380F",
    accent: "#8C0404",
    filter1: "#260202",
    filter2: "#D98D62",
    filter2Selected: "#F2380F",
    filter3: "#F2CD88",
    textColor: "#BFBFBF",
    trackColorTrue: "#F2CD88",
    trackColorFalse: "#BFBFBF",
    thumbColorFalse: "#767577",
    thumbColorTrue: "#F2380F",
    ios_backgroundColor: "#3e3e3e",
  },
// .TOWN.CO-I-堂口-1-hex { color: #F2CD88 #D98D62 #F2380F #8C0404 #260202; }

  Ninghai: {
    primary: "#82B0D9",
    accent: "#515932",
    filter1: "#2B3840",
    filter2: "#515932",
    filter2Selected: "#7F8C4D",
    filter3: "#7F8C4D",
    textColor: "#BFBFBF",
    trackColorTrue: "#2B3840",
    trackColorFalse: "#767577",
    thumbColorFalse: "#f4f3f4",
    thumbColorTrue: "#7F8C4D",
    ios_backgroundColor: "#3e3e3e",
  },
// .Ninghai-Shili-Hongzhuang Museum-1-hex { color: #82B0D9 #ACD1F2 #2B3840 #7F8C4D #515932; }
Ninghai_2: {
  primary: "#2B3840",
  accent: "#7F8C4D",
  filter1: "#515932",
  filter2: "#ACD1F2",
  filter2Selected: "#2B3840",
  filter3: "#82B0D9",
  textColor: "#e4e3e4",
  trackColorTrue: "#2B3840",
  trackColorFalse: "#767577",
  thumbColorFalse: "#f4f3f4",
  thumbColorTrue: "#7F8C4D",
  ios_backgroundColor: "#3e3e3e",
},
// .Ninghai-Shili-Hongzhuang Museum-1-hex { color: #82B0D9 #ACD1F2 #2B3840 #7F8C4D #515932; }
  G4: {
    primary: "#42378C",
    accent: "#BFBFBF",
    filter1: "#402C25",
    filter2: "#8C8274",
    filter2Selected: "#42378C",
    filter3: "#BFBFBF",
    textColor: "#e0e0e0",
    trackColorTrue: "#767577",
    trackColorFalse: "#767577",
    thumbColorFalse: "#f4f3f4",
    thumbColorTrue: "#42378C",
    ios_backgroundColor: "#3e3e3e",
  },

  G4_2: {
    primary: "#8C8274",
    accent: "#402C25",
    filter1: "#F2F2F2",
    filter2: "#BFBFBF",
    filter2Selected: "#8C8274",
    filter3: "#8C8274",
    textColor: "#e0e0e0",
    trackColorTrue: "#42378C",
    trackColorFalse: "#767577",
    thumbColorFalse: "#f4f3f4",
    thumbColorTrue: "#8C8274",
    ios_backgroundColor: "#3e3e3e",
  },
// @G4-apartment-1-hex: #42378C #BFBFBF #8C8274 #402C25 #F2F2F2;

  Wilderness: {
    primary: "#0D0D0D",
    accent: "#262626",
    filter1: "#595959",
    filter2: "#A6A6A6",
    filter2Selected: "#0D0D0D",
    filter3: "#F2F2F2",
    textColor: "#BFBFBF",
    trackColorTrue: "#BFBFBF",
    trackColorFalse: "#BFBFBF",
    thumbColorFalse: "#767577",
    thumbColorTrue: "#0D0D0D",
    ios_backgroundColor: "#3e3e3e",
  },
  //.Wilderness-1-hex { color: #F2F2F2;  #A6A6A6;  #595959;  #262626;  #0D0D0D; }
  
  "Graphic-Design": {
    primary: "#0D0D0D",
    accent: "#403E3D",
    filter1: "#73706E",
    filter2: "#BFBBB8",
    filter2Selected: "#73706E",
    filter3: "#F2EDE9",
    textColor: "#BFBFBF",
    trackColorTrue: "#BFBFBF",
    trackColorFalse: "#BFBFBF",
    thumbColorFalse: "#767577",
    thumbColorTrue: "#0D0D0D",
    ios_backgroundColor: "#3e3e3e",
  },
  // .Graphic-Design-1-hex { color: #F2EDE9  #BFBBB8 #73706E #403E3D #0D0D0D; }

  Mirror_lake: {
    primary: "#8F8EBF",
    accent: "#2E4159",
    filter1: "#262626",
    filter2: "#4F4D8C",
    filter2Selected: "#8F8EBF",
    filter3: "#474073",
    gridBackground:"#BFBFBF",
    textColor: "#BFBFBF",
    textColor2: "#9F9F9F",
    trackColorTrue: "#BFBFBF",
    trackColorFalse: "#BFBFBF",
    thumbColorFalse: "#767577",
    thumbColorTrue: "#0D0D0D",
    ios_backgroundColor: "#3e3e3e",
  },
// .Mirror-lake-1-hex { color: #474073 #4F4D8C #8F8EBF #2E4159 #262626; }
};

const themeContextInitialState = {
  colors: themes.Mirror_lake,
  name: "theme3",
};

const ThemeContext = createContext();

const useTheme = () => {
  const [theme, setTheme] = React.useContext(ThemeContext);
  const handleTheme = (value) => {
    setTheme(value);
  };

  return {
    colors: theme.colors,
    name: theme.name,
    onThemeChange: handleTheme,
  };
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeContextInitialState);
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };

// .TOWN.CO-I-堂口-1-hex { color: #F2CD88 #D98D62 #F2380F #8C0404 #260202; }

// .Ninghai-Shili-Hongzhuang Museum-1-hex { color: #82B0D9 #ACD1F2 #2B3840 #7F8C4D #515932; }

// @G4-apartment-1-hex: #42378C #BFBFBF #8C8274 #402C25 #F2F2F2;

// https://ibjects.medium.com/the-simplest-implementation-of-context-api-in-react-native-94f749187873

// https://www.robinwieruch.de/react-usecontext-hook

/* Color Theme Swatches in Hex */
//.Wilderness-1-hex { color: #F2F2F2;  #A6A6A6;  #595959;  #262626;  #0D0D0D; }

/* Color Theme Swatches in Hex */
// .Graphic-Design-1-hex { color: #F2EDE9  #BFBBB8 #73706E #403E3D #0D0D0D; }

/* Color Theme Swatches in Hex */
// .Mirror-lake-1-hex { color: #474073 #4F4D8C #8F8EBF #2E4159 #262626; }

