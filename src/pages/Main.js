import React, {useState, useCallback, useRef} from "react";
import styled from "styled-components";
import moment from "moment/moment";
import UploadBox from "../components/UploadBox";
import StageBox from "../components/StageBox";
import SubmitBox from "../components/SubmitBox";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {API, SAMPLE_TOKEN} from "../config";
import axios from "axios";
import {v4} from "uuid";

const Main = () => {
  const [contactInput, setContactInput] = useState("010", "");
  const [selectedFile, setSelectedFile] = useState([]);
  const [stagedFileList, setStagedFileList] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [totalProgress, setTotalProgress] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [axiosCancelToken, setAxiosCancelToken] = useState();
  const [deleteCode, setDeleteCode] = useState(0);
  const [modifiedFileNameList, setModifiedFileNameList] = useState({});
  const cancelUpload = () => {
    axiosCancelToken.cancel("Upload cancelled by user.");
  };

  const handleStagedFileList = (sth) => {
    setStagedFileList(sth);
  };

  const sendFormData = async () => {
    let fileUploadedCount = 0;
    for (let i = 0; i < stagedFileList.length; i++) {
      const file = stagedFileList[i];
      const modifiedFileName = modifiedFileNameList[i];
      const formData = new FormData();
      formData.append("contact", contactInput);
      formData.append("date", moment().format("YYYY-MM-DD-ddd h:mm:ss a"));
      const deleteCode = v4();
      setDeleteCode(deleteCode);
      const source = axios.CancelToken.source();
      formData.append("file", file, `${modifiedFileName}.pdf`);
      formData.append("deleteCode", deleteCode);

      const axiosConfig = {
        url: `${API.postFileList}`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: SAMPLE_TOKEN,
        },
        data: formData,
        maxContentLength: 10000000, // 엑시오스 용량 늘리기
        maxBodyLength: 10000000, // 엑시오스 용량 늘리기
        onUploadProgress: (progressEvent) => {
          setAxiosCancelToken(source);
          setTotalProgress((prev) => prev + progressEvent.bytes);
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgressList((prev) => {
            const newList = [...prev];
            newList[i] = percentCompleted;
            return newList;
          });
        },
        cancelToken: source.token,
      };
      try {
        await axios(axiosConfig);
        fileUploadedCount++;
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        } else {
          console.log(error);
        }
      }
    }
    if (fileUploadedCount === stagedFileList.length) {
      setStagedFileList([]);
      onReset();
    }
  };

  const progressRefList = useRef([]);

  const initializeState = () => {
    setProgressList(Array(stagedFileList.length).fill(0));
    setTotalProgress(0);
    setTotalSize(0);
  };

  const onReset = () => {
    setSelectedFile([]) && setContactInput("010", "");
    toast.success("발송되었습니다.");
  };

  const onChangeInput = useCallback(
    (e) => {
      const regex = /^[0-9\b]{0,13}$/;
      if (regex.test(e.target.value)) {
        setContactInput(e.target.value);
      }
    },
    [contactInput]
  );

  const handleProgressRef = (el) => {
    if (el && !progressRefList.current.includes(el)) {
      progressRefList.current.push(el);
    }
  };

  const onSubmit = () => {
    sendFormData();
  };

  return (
    <Wrap>
      <ToastContainer
        position="top-center"
        limit={2}
        closeButton={false}
        autoClose={800}
        hideProgressBar
      />
      <UploadBox
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        stagedFileList={stagedFileList}
        setStagedFileList={setStagedFileList}
        progressList={progressList}
        setProgressList={setProgressList}
        totalProgress={totalProgress}
        setTotalProgress={setTotalProgress}
        totalSize={totalSize}
        setTotalSize={setTotalSize}
        initializeState={initializeState}
        handleProgressRef={handleProgressRef}
        handleStagedFileList={handleStagedFileList}
      />
      {stagedFileList && (
        <StageBox
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          stagedFileList={stagedFileList}
          setStagedFileList={setStagedFileList}
          progressList={progressList}
          setProgressList={setProgressList}
          totalProgress={totalProgress}
          setTotalProgress={setTotalProgress}
          totalSize={totalSize}
          setTotalSize={setTotalSize}
          initializeState={initializeState}
          setModifiedFileNameList={setModifiedFileNameList}
        />
      )}
      <SubmitBox
        contactInput={contactInput}
        onChangeInput={onChangeInput}
        onSubmit={onSubmit}
        stagedFileList={stagedFileList}
        setProgressList={setProgressList}
        setTotalProgress={setTotalProgress}
        setTotalSize={setTotalSize}
        cancelUpload={cancelUpload}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
  margin: 10px;
`;

export default Main;
