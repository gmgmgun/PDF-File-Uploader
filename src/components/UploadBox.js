import React, {useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import pdfUploadRed from "../assets/images/pdfUploadRed.png";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadBox = ({
  // onChangeUpload,
  selectedFiles,
  setSelectedFiles,
  stagedFileList,
  setStagedFileList,
  progressList,
  setProgressList,
  totalProgress,
  setTotalProgress,
  totalSize,
  setTotalSize,
  handleStagedFileList,
}) => {
  /******* 1. props *******/
  /******* 2. state *******/

  /******* 3. hook *******/
  const fileUploadInputRef = useRef({});
  const fileUploadZoneRef = useRef(undefined);
  const fileRef = useRef(null);
  /******* 4. variable *******/
  const maxUploadNum = 7;
  /******* 5. function *******/
  const selectFiles = (files) => {
    const formData = new FormData();
    const tempFileList = [];
    let cntNotPdf = 0;
    let cntDup = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isExist = stagedFileList.find((obj) => obj.name === file.name);
      const isPdf = file.name.indexOf(".pdf");
      if (isPdf >= 0 && !isExist) {
        tempFileList.push(file);
        formData.append("file", file);
        setTotalSize((prev) => prev + file.size);
        handleStagedFileList([...stagedFileList, ...tempFileList]);
        // setStagedFileList([...stagedFileList, ...tempFileList]);
      } else {
        if (isPdf < 0) {
          cntNotPdf++;
        }
        if (isExist) {
          cntDup++;
        }
      }
    }
    if (cntNotPdf) {
      toast.error("pdf 형식의 파일만 업로드할 수 있습니다.");
    }
    if (cntDup) {
      toast.error("파일이 중복되었습니다.");
    }
  };
  /******* 6. event handler  *******/
  const onChangeUpload = (e) => {
    selectFiles(e.target.files);
  };

  //드래그되는 요소가 드롭 가능한 영역으로 처음 진입할 때
  const onDragEnter = useCallback(() =>
    fileUploadZoneRef.current?.classList.add("dragover")
  );

  //드래그되는 요소가 드롭 가능한 영역 위로 이동할 때
  const onDragOver = useCallback((e) => {
    e.preventDefault();
  });

  //드래그되는 요소가 드롭 가능한 영역을 벗어날 때
  const onDragLeave = useCallback(() =>
    fileUploadZoneRef.current?.classList.remove("dragover")
  );

  //드래그되는 요소가 드롭 가능한 영역에서 드롭될 때
  const onDrop = (e) => {
    fileUploadZoneRef.current?.classList.remove("dragover");
  };

  /******* 7. useEffect  *******/

  useEffect(() => {
    if (stagedFileList.length > maxUploadNum) {
      toast.error(`파일 업로드는 한번에 ${maxUploadNum}개 이하만 가능합니다.`);
      setStagedFileList((prev) => {
        let newArr = prev.slice(); // 이전 배열을 복사
        while (newArr.length > maxUploadNum) {
          newArr.splice(newArr.length - 1, 1); // 마지막 요소를 제거
        }
        return newArr;
      });
    }

    setProgressList(Array(stagedFileList.length).fill(0));
  }, [stagedFileList]);

  useEffect(() => {
    const wrap = fileUploadZoneRef.current;

    wrap.addEventListener("dragover", onDragOver);
    wrap.addEventListener("dragenter", onDragEnter);
    wrap.addEventListener("dragleave", onDragLeave);

    return () => {
      wrap.removeEventListener("dragover", onDragOver);
      wrap.removeEventListener("dragenter", onDragEnter);
      wrap.removeEventListener("dragleave", onDragLeave);
    };
  }, [fileUploadZoneRef, onDragOver, onDragEnter, onDragLeave]);

  return (
    <AttachmentsWrap>
      <ToastContainer
        position="top-center"
        limit={2}
        closeButton={false}
        autoClose={800}
        hideProgressBar
      />
      <UploadWrap
        ref={fileUploadZoneRef}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <UploadInput
          name="file"
          type="file"
          multiple={true}
          value=""
          onChange={(e) => {
            if (fileUploadInputRef.current.files.length > 0) {
              selectFiles(fileUploadInputRef.current.files);
              return;
            }
          }}
          ref={fileUploadInputRef}
        />
        <UploadIcon src={pdfUploadRed} alt="uploadIcon" />
        <UploadText>
          Drag Files To Upload <br /> <p>or</p>
        </UploadText>

        <UploadButton htmlFor="file">
          파일 선택
          <File
            type="file"
            accept=".pdf"
            id="file"
            onChange={onChangeUpload}
            multiple={true}
            ref={fileRef}
          ></File>
        </UploadButton>
      </UploadWrap>
    </AttachmentsWrap>
  );
};

const AttachmentsWrap = styled.div`
  ${({theme}) => theme.mixin.flex("flex", "center", "center")};
  position: relative;
  width: 100%;
  max-width: 700px;
  min-width: 300px;
  height: 350px;
  margin: 10px 0px;
  background: #ffffff;
  border: 1px dashed #006064;
  border-radius: 8px;
  @media (max-width: 400px) {
    height: 170px;
    padding: 5px 0px;
  }
`;

const UploadWrap = styled.div`
  display: grid;
  place-items: center;
  gap: 10px;

  // margin: 10% 0%;
  @media (max-width: 400px) {
    gap: 1px;
  }
`;

const UploadInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0px;
  width: 100%;
  height: 100%;
  // cursor: pointer;
  // pointer-events: none;
`;

const UploadIcon = styled.img`
  height: 64px;
  width: 61px;
  @media (max-width: 400px) {
    height: 54px;
    width: 51px;
  }
`;

const UploadText = styled.div`
  display: grid;
  justify-items: center;
  font-weight: 800;
  font-size: 18px;
  line-height: 31px;
  p {
    font-size: 15px;
    margin: 0px;
  }
  @media (max-width: 400px) {
    font-size: 15px;
  }
`;

const UploadButton = styled.label`
  ${({theme}) => theme.mixin.flex("flex", "center", "center")};
  width: 200px;
  height: 45px;
  background: #006064;
  border-radius: 6px;
  color: #ffffff;
  font-weight: 550;
  font-size: 15px;
  border-style: none;
  cursor: pointer;
  @media (max-width: 400px) {
    width: 220px;
    height: 28px;
    font-size: 13px;
  }
  z-index: 2;
`;

const File = styled.input`
  display: none;
`;
export default UploadBox;
