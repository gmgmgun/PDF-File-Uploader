import React, {useEffect, useState, useCallback, useRef} from "react";
import styled from "styled-components";
import dropdown from "../assets/images/dropdown.png";

function DropDownBox({fileIndex, setModifiedFileNameList, setIsAllSelected}) {
  const [isBtnOpen, setIsBtnOpen] = useState({});
  const [isInputOpen, setIsInputOpen] = useState({});
  // const [currentIndex, setCurrentIndex] = useState(-1);
  const [userInput, setUserInput] = useState("");
  const [schoolList, setSchoolList] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedFilterList, setSelectedFilterList] = useState({
    0: "",
    1: BASIC_DATA[0].name,
    2: BASIC_DATA[1].name,
    3: "",
  });
  const [keyMutex, setKeyMutex] = useState(false);

  const yearRef = useRef(null);
  const schoolSearchNamesRef = useRef([]);
  const currentIndexRef = useRef(0);
  const schoolSearchBoxRef = useRef(null);

  const onClickSelected = useCallback(
    (e, idx) => {
      setSelectedFilterList({
        ...selectedFilterList,
        [idx + 1]: e.target.innerHTML,
      });
    },
    [selectedFilterList]
  );

  const onClickSchoolSelected = (e) => {
    setUserInput(e.target.innerHTML);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const filteredSchoolList = schoolList.filter((school) => {
    if (userInput) return school.name.includes(userInput);
  });

  const handleKeyDown = (e) => {
    // e.stopPropagation();
    console.log(e);
    if (!userInput) return;
    if (!e) return;
    // if (!currentIndex) return;
    switch (e.key) {
      case "ArrowUp":
        // e.preventDefault();
        const prevIndex =
          currentIndexRef.current > 0
            ? currentIndexRef.current - 1
            : filteredSchoolList.length - 1;
        setSelectedSchool(filteredSchoolList[prevIndex].name);
        // setCurrentIndex(
        //  prevIndex
        // );
        currentIndexRef.current = prevIndex;
        return;
      case "ArrowDown":
        // e.preventDefault();
        const nextIndex =
          currentIndexRef.current < filteredSchoolList.length - 1
            ? currentIndexRef.current + 1
            : 0;
        setSelectedSchool(filteredSchoolList[nextIndex].name);
        // setCurrentIndex(nextIndex);
        currentIndexRef.current = nextIndex;
        console.log(currentIndexRef.current);
        return;
      case "Enter":
        // e.preventDefault();
        if (currentIndexRef.current > -1) {
          setSelectedFilterList({
            ...selectedFilterList,
            3: filteredSchoolList[currentIndexRef.current].name,
          });
          setUserInput(filteredSchoolList[currentIndexRef.current].name);
          setIsInputOpen(false);
        }
        return;
      default:
        break;
    }

    if (schoolSearchNamesRef.current[currentIndexRef.current]) {
      console.log(schoolSearchNamesRef.current[currentIndexRef.current]);
      schoolSearchNamesRef.current[currentIndexRef.current].scrollIntoView({
        block: "start",
        inline: "start",
      });
    }
  };

  useEffect(() => {
    fetch("/data/school_list.json")
      .then((res) => res.json())
      .then((res) => {
        setSchoolList(res);
      });
  }, []);

  useEffect(() => {
    setIsAllSelected(false);
    if (selectedFilterList[1] === BASIC_DATA[0].name) return;
    if (selectedFilterList[2] === BASIC_DATA[1].name) return;
    if (selectedFilterList[3] === "") return;
    setIsAllSelected(true);
  }, [selectedFilterList]);

  useEffect(() => {
    setSelectedFilterList((prevSelected) => ({
      ...prevSelected,
      0: yearRef.current.innerText,
    }));
  }, [yearRef]);

  useEffect(() => {
    setSelectedFilterList((prevSelected) => ({
      ...prevSelected,
      3: userInput,
    }));
    setIsInputOpen(true);
  }, [userInput]);

  useEffect(() => {
    const modifiedFileName = `${selectedFilterList[0]}_${selectedFilterList[1]}_${selectedFilterList[2]}_${selectedFilterList[3]}`;
    setModifiedFileNameList((prev) => ({
      ...prev,
      [fileIndex]: modifiedFileName,
    }));
  }, [selectedFilterList]);

  useEffect(() => {
    if (schoolSearchNamesRef.current[currentIndexRef.current]) {
      schoolSearchNamesRef.current[currentIndexRef.current].scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [currentIndexRef.current]);

  return (
    <DropDownWrap>
      <YearWrap ref={yearRef}>2023</YearWrap>
      <BasicDropDownWrap>
        {BASIC_DATA.map((option, idx) => {
          return (
            <OptionWrap
              key={option.name}
              onMouseEnter={() => setIsBtnOpen({[option.name]: true})}
              onMouseLeave={() => setIsBtnOpen({[option.name]: false})}
              name={option.name}
            >
              <p>{selectedFilterList[idx + 1]}</p>
              {isBtnOpen[option.name] && (
                <BasicItemsWrap>
                  {option.options.map((data) => {
                    return (
                      <BasicItemsBox key={data.id}>
                        <BasicItemsName
                          onClick={(e) => onClickSelected(e, idx)}
                        >
                          {data.option}
                        </BasicItemsName>
                      </BasicItemsBox>
                    );
                  })}
                </BasicItemsWrap>
              )}

              <OptionIconWrap>
                <OptionIcon src={dropdown} />
              </OptionIconWrap>
            </OptionWrap>
          );
        })}
      </BasicDropDownWrap>

      <SearchWrap
        onMouseEnter={() => setIsInputOpen(true)}
        onMouseLeave={() => setIsInputOpen(false)}
      >
        <SearchInput
          onChange={handleSearch}
          placeholder="학교명"
          value={userInput}
          onKeyDown={handleKeyDown}
        />
        {filteredSchoolList.length > 1
          ? isInputOpen && (
              <SchoolSearchWrap>
                <SchoolSearchBox ref={schoolSearchBoxRef}>
                  {filteredSchoolList.length !== schoolList.length &&
                    filteredSchoolList.map((schoolList, idx) => {
                      return (
                        <SchoolSearchName
                          ref={(el) => (schoolSearchNamesRef.current[idx] = el)}
                          value={selectedSchool}
                          key={schoolList.id}
                          onClick={onClickSchoolSelected}
                          {...(idx === currentIndexRef.current
                            ? {tabIndex: 0}
                            : {})}
                        >
                          {schoolList.name}
                        </SchoolSearchName>
                      );
                    })}
                </SchoolSearchBox>
              </SchoolSearchWrap>
            )
          : !isBtnOpen}
      </SearchWrap>
    </DropDownWrap>
  );
}

const DropDownWrap = styled.div`
  ${({theme}) => theme.mixin.flex("flex", "center", "center")};
  padding-left: 5px;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: 0.5fr 1fr 1.5fr;
`;

const YearWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  padding: 1px 5px 0px 5px;
  height: 40px;
  width: 60px;
  border: 1px solid #006064;
  border-radius: 10px;
  color: #006064;
  font-size: 15px;
  cursor: default;
`;

const BasicDropDownWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const OptionWrap = styled.button`
  ${({theme}) => theme.mixin.flex("flex", "space-between", "center")};
  position: relative;
  height: 40px;
  margin-left: 5px;
  border: 1px solid #006064;
  border-radius: 10px;
  background-color: white;
  color: #006064;
  font-size: 15px;
  font-weight: 720;
  cursor: pointer;
  width: ${({name}) => (name === "학년" ? "60px" : "100px")};
`;

const OptionIconWrap = styled.div``;

const OptionIcon = styled.img`
  width: 13px;
  height: 9px;
`;

const BasicItemsWrap = styled.div`
  width: 100%;
  display: grid;
  position: absolute;
  padding: 8px;
  top: 30px;
  left: 0px;
  gap: 4px;
  background: #ffffff;
  border: 1px solid #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  z-index: 1;
`;

const BasicItemsBox = styled.ul`
  padding: 0px;
  z-index: 2;
`;

const BasicItemsName = styled.div`
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: #006064;
  font-weight: 600;
  cursor: pointer;
  :hover {
    background-color: #006064;
    color: white;
  }
`;

const SearchWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  padding: 0px 3px;
  height: 40px;
  border: 1px solid #006064;
  border-radius: 10px;
  color: #006064;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 140px;
  height: 20px;
  padding: 3px;
  border: none;
  color: #006064;
  font-size: 15px;
  font-weight: 720;
  ::placeholder {
    color: #006064;
    font-size: 15px;
    font-weight: 720;
  }
  :focus {
    outline: none;
  }
`;

const SchoolSearchWrap = styled.div`
  display: grid;
  position: absolute;
  padding: 8px;
  width: 100%;
  top: 30px;
  left: 0px;
  gap: 4px;
  background: #ffffff;
  border: 1px solid #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  z-index: 1;
`;

const SchoolSearchBox = styled.ul`
  overflow-y: scroll;
  max-height: 100px;
  padding: 0px;
  ::-webkit-scrollbar {
    // width: 10px; /* 스크롤바의 너비 */
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    height: 50%; /* 스크롤바의 길이 */
    background: #006064; /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: white; /*스크롤바 뒷 배경 색상*/
  }
`;

const SchoolSearchName = styled.li`
  margin: 6px 0px;
  color: #006064;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  /* 드래그 안되도록 설정 */
  :hover {
    background-color: #006064;
    color: white;
  }
  ${({tabIndex}) =>
    tabIndex === 0 &&
    `
    background-color: #006064;
    color: white;
  `};
`;

const BASIC_DATA = [
  {
    id: "1",
    name: "학년",

    options: [
      {
        id: "1",
        option: "고1",
      },
      {
        id: "2",
        option: "고2",
      },
      {
        id: "3",
        option: "고3",
      },
    ],
  },
  {
    id: "2",
    name: "과목",

    options: [
      {
        id: "1",
        option: "수학(상)",
      },
      {
        id: "2",
        option: "수학(하)",
      },
      {
        id: "3",
        option: "수학 1",
      },
      {
        id: "4",
        option: "수학 2",
      },
      {
        id: "5",
        option: "확률과통계",
      },
      {
        id: "6",
        option: "미적분",
      },
      {
        id: "7",
        option: "기하",
      },
    ],
  },
];

export default DropDownBox;
