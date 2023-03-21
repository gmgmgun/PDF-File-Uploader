import React, {useEffect, useState, useCallback, useRef} from "react";
import styled from "styled-components";
import dropdown from "../assets/images/dropdown.png";

function DropDownBox({fileIndex, setModifiedFileNameList}) {
  const yearRef = useRef(null);
  const [isBtnOpen, setIsBtnOpen] = useState({});
  const [isInputOpen, setIsInputOpen] = useState({});

  //✅누른 값 관리
  const [selected, setSelected] = useState({
    0: "",
    1: BASIC_DATA[0].name,
    2: BASIC_DATA[1].name,
    3: "",
  });

  const onClickSelected = useCallback(
    (e, idx) => {
      setSelected({...selected, [idx + 1]: e.target.innerHTML});
    },
    [selected]
  );

  const onClickSchoolSelected = (e) => {
    setUserInput(e.target.innerHTML);
  };
  const [userInput, setUserInput] = useState("");
  const [schools, setSchools] = useState([]);
  const [schoolSelected, setSchoolSelected] = useState("");

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const filteredSchools = schools.filter((schools) => {
    if (userInput) return schools.name.includes(userInput);
  });

  useEffect(() => {
    fetch("/data/school_list.json")
      .then((res) => res.json())
      .then((res) => {
        setSchools(res);
      });
  }, []);

  useEffect(() => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      0: yearRef.current.innerText,
    }));
  }, [yearRef]);

  useEffect(() => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      3: userInput,
    }));
  }, [userInput]);

  useEffect(() => {
    const modifiedFileName = `${selected[0]}_${selected[1]}_${selected[2]}_${selected[3]}`;
    setModifiedFileNameList((prev) => ({
      ...prev,
      [fileIndex]: modifiedFileName,
    }));
  }, [selected]);
  return (
    <DropDownWrap>
      <YearWrap ref={yearRef}>2023</YearWrap>
      <BasicDropDownWrap>
        {BASIC_DATA.map((option, idx) => {
          return (
            <OptionWrap
              onMouseEnter={() => setIsBtnOpen({[option.name]: true})}
              onMouseLeave={() => setIsBtnOpen({[option.name]: false})}
              name={option.name}
            >
              <p>{selected[idx + 1]}</p>
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
        ></SearchInput>
        {filteredSchools.length > 1
          ? isBtnOpen && (
              <SchoolSearchWrap>
                <SchoolSearchBox>
                  {filteredSchools.length !== schools.length &&
                    filteredSchools.map((schools) => {
                      return (
                        <SchoolSearchName
                          value={schoolSelected}
                          key={schools.id}
                          onClick={onClickSchoolSelected}
                        >
                          {schools.name}
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
  height: 27px;
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
  height: 30px;
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
  width: 80%;
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
  height: 28px;
  border: 1px solid #006064;
  border-radius: 10px;
  color: #006064;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 140px;
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
  width: 90%;
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
  max-height: 70px;
  padding: 0px;
  ::-webkit-scrollbar {
    width: 10px; /* 스크롤바의 너비 */
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

const SchoolSearchName = styled.div`
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
