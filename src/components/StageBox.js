import React from "react";
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
}) => {
  const hasFiles = stagedFileList ? stagedFileList.length : 0;
  const getByteSize = (size) => {
    const byteUnits = ["KB", "MB", "GB", "TB"];

    for (let i = 0; i < byteUnits.length; i++) {
      size = size / 1024;

      if (size < 1024) return size.toFixed(2) + byteUnits[i];
    }
  };
  const fileRemove = (targetFile) => {
    const tempFileList = stagedFileList.filter((file) => file !== targetFile);
    setStagedFileList(tempFileList);
  };
  return (
    <StageWrap>
      {hasFiles === 0 ? (
        <p>비어있음</p>
      ) : (
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
                    <DeleteStagedFileBtn onClick={() => fileRemove(file)}>
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

const FileWrap = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr; /* 새로운 열 추가 */
  // grid-template-columns: 1fr 9fr;
  padding: 10px 0px;
  font-weight: 750;
  border-bottom: 1px solid #dcdcdc;
  @media (max-width: 400px) {
    padding: 5px 0px;
  }
`;

const StagedFileInfoWrap = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr; /* 새로운 열 추가 */
`;

const PngIcon = styled.img`
  width: 55px;
  height: 50px;
  padding-left: 9px;
  @media (max-width: 650px) {
    margin-right: 19px;
    width: 27px;
    height: 30px;
  }
`;

const UploadProgressBarWrap = styled.div``;

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

const StagedFileInfoText = styled.div``;

const StagedFileName = styled.div``;

const StagedFileSize = styled.div``;

const StagedFileInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteStagedFileBtn = styled.button`
  justify-self: end; /* 오른쪽 끝으로 이동 */
  cursor: pointer;
`;

export default StageBox;
