<<<<<<< HEAD
import React, {useEffect, useRef, useState} from "react";
=======
<<<<<<< HEAD
import React, {useEffect, useRef, useState} from "react";
=======
import React from "react";
>>>>>>> 2380bea (Initialize: 초기 세팅)
>>>>>>> 44b06cd (Initialize: 초기 세팅)
import styled from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";
import pdf from "../assets/images/pdf.png";
import "react-toastify/dist/ReactToastify.css";
import DropDownBox from "./DropDownBox";

const StageBox = ({
  selectedFiles,
  setSelectedFiles,
  stagedFileList,
  setStagedFileList,
  progressList,
  totalProgress,
  totalSize,
  handleProgressRef,
  onReset,
  setModifiedFileNameList,
<<<<<<< HEAD
  setIsAllSelected,
=======
<<<<<<< HEAD
  setIsAllSelected,
=======
>>>>>>> 2380bea (Initialize: 초기 세팅)
>>>>>>> 44b06cd (Initialize: 초기 세팅)
}) => {
  const hasFiles = stagedFileList ? stagedFileList.length : 0;
  const getByteSize = (size) => {
    const byteUnits = ["KB", "MB", "GB", "TB"];

    for (let i = 0; i < byteUnits.length; i++) {
      size = size / 1024;

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44b06cd (Initialize: 초기 세팅)
      if (size < 1024) return size.toFixed(0) + byteUnits[i];
    }
  };

  const handleDeleteBtn = (idx, file) => {
    fileRemove(file);
  };

<<<<<<< HEAD
=======
=======
      if (size < 1024) return size.toFixed(2) + byteUnits[i];
    }
  };
>>>>>>> 2380bea (Initialize: 초기 세팅)
>>>>>>> 44b06cd (Initialize: 초기 세팅)
  const fileRemove = (targetFile) => {
    const tempFileList = stagedFileList.filter((file) => file !== targetFile);
    setStagedFileList(tempFileList);
  };
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44b06cd (Initialize: 초기 세팅)

  return (
    <StageWrap>
      {hasFiles === 0 ? null : (
<<<<<<< HEAD
=======
=======
  return (
    <StageWrap>
      {hasFiles === 0 ? (
        <p>비어있음</p>
      ) : (
>>>>>>> 2380bea (Initialize: 초기 세팅)
>>>>>>> 44b06cd (Initialize: 초기 세팅)
        <>
          <TotalProgressBarWrap>
            <TotalProgressBar
              progress={
                totalSize ? Math.round((totalProgress * 100) / totalSize) : 0
              }
            ></TotalProgressBar>
          </TotalProgressBarWrap>
          {stagedFileList.map((file, idx) => {
            return (
              <FileWrap key={file.name}>
                <PngIcon src={pdf} alt="pdf icon" />
                <StagedFileInfoWrap>
                  <StagedFileInfo>
                    <StagedFileInfoText>
                      <StagedFileName>{file.name}</StagedFileName>
                      <StagedFileSize>{getByteSize(file.size)}</StagedFileSize>
                    </StagedFileInfoText>
<<<<<<< HEAD
                    <DeleteStagedFileBtn
                      onClick={() => handleDeleteBtn(idx, file)}
                    >
=======
<<<<<<< HEAD
                    <DeleteStagedFileBtn
                      onClick={() => handleDeleteBtn(idx, file)}
                    >
=======
                    <DeleteStagedFileBtn onClick={() => fileRemove(file)}>
>>>>>>> 2380bea (Initialize: 초기 세팅)
>>>>>>> 44b06cd (Initialize: 초기 세팅)
                      X
                    </DeleteStagedFileBtn>
                  </StagedFileInfo>
                  <UploadProgressBarWrap>
                    {progressList && (
                      <UploadProgressBar
                        ref={handleProgressRef}
                        progress={progressList[idx]}
                      />
                    )}
                  </UploadProgressBarWrap>
                </StagedFileInfoWrap>
                <DropDownBox
                  fileIndex={idx}
                  setModifiedFileNameList={setModifiedFileNameList}
<<<<<<< HEAD
                  setIsAllSelected={setIsAllSelected}
=======
<<<<<<< HEAD
                  setIsAllSelected={setIsAllSelected}
=======
>>>>>>> 2380bea (Initialize: 초기 세팅)
>>>>>>> 44b06cd (Initialize: 초기 세팅)
                />
              </FileWrap>
            );
          })}
        </>
      )}
    </StageWrap>
  );
};

const StageWrap = styled.div`
  font-weight: 750;
  margin-bottom: 15px;
  width: 100%;
  max-width: 700px;
  min-width: 300px;
`;

const TotalProgressBarWrap = styled.div``;

const TotalProgressBar = styled(ProgressBar).attrs((props) => ({
  min: 0,
  max: 100,
  animated: true,
  now: props.progress,
  label: `${props.progress ? props.progress : 0}%`,
}))`
  height: 30px;
  .progress-bar {
    background-color: #006064;
    font-size: 17px;
    font-weight: 1000;
  }
`;

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44b06cd (Initialize: 초기 세팅)
const FileWrap = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr; /* 새로운 열 추가 */
  // grid-template-columns: 1fr 9fr;
  padding: 15px 0px;
<<<<<<< HEAD
=======
=======
const FileWrap = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr; /* 새로운 열 추가 */
  // grid-template-columns: 1fr 9fr;
  padding: 10px 0px;
  font-weight: 750;
>>>>>>> 2380bea (Initialize: 초기 세팅)
>>>>>>> 44b06cd (Initialize: 초기 세팅)
  border-bottom: 1px solid #dcdcdc;
  @media (max-width: 400px) {
    padding: 5px 0px;
  }
`;

const StagedFileInfoWrap = styled.div`
  display: grid;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44b06cd (Initialize: 초기 세팅)
  grid-template-rows: 1fr 1fr;
`;

const PngIcon = styled.img`
  width: 100%;
  height: 100%;
  @media (max-width: 650px) {
    width: 30px;
<<<<<<< HEAD
=======
=======
  grid-template-rows: 1fr 1fr; /* 새로운 열 추가 */
`;

const PngIcon = styled.img`
  width: 55px;
  height: 50px;
  padding-left: 9px;
  @media (max-width: 650px) {
    margin-right: 19px;
    width: 27px;
>>>>>>> 2380bea (Initialize: 초기 세팅)
>>>>>>> 44b06cd (Initialize: 초기 세팅)
    height: 30px;
  }
`;

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44b06cd (Initialize: 초기 세팅)
const StagedFileInfoText = styled.div``;

const StagedFileInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StagedFileName = styled.div`
  font-size: 15px;
  font-weight: 750;
`;

const StagedFileSize = styled.div`
  padding-top: 2px;
  font-size: 12px;
  font-weight: 750;
`;

const UploadProgressBarWrap = styled.div`
  padding-top: 5px;
`;
<<<<<<< HEAD
=======
=======
const UploadProgressBarWrap = styled.div``;
>>>>>>> 2380bea (Initialize: 초기 세팅)
>>>>>>> 44b06cd (Initialize: 초기 세팅)

const UploadProgressBar = styled(ProgressBar).attrs((props) => ({
  min: 0,
  max: 100,
  animated: true,
  now: props.progress,
  label: `${props.progress ? props.progress : 0}%`,
}))`
  height: 20px;
  .progress-bar {
    background-color: #006064;
    font-size: 17px;
    font-weight: 1000;
  }
`;

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
const StagedFileInfoText = styled.div``;

const StagedFileName = styled.div``;

const StagedFileSize = styled.div``;

const StagedFileInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

>>>>>>> 2380bea (Initialize: 초기 세팅)
>>>>>>> 44b06cd (Initialize: 초기 세팅)
const DeleteStagedFileBtn = styled.button`
  justify-self: end; /* 오른쪽 끝으로 이동 */
  cursor: pointer;
`;

export default StageBox;
