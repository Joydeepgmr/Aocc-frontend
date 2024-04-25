import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Modal, Upload, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import './imageUpload.scss'
// import {
//     getAdminInfo,
//     getExtensionFromUrl,
//     getFileNameFromUrl,
// } from 'utils/UtilsIndex';
const acceptedImages = [
    'png',
    'jpg',
    'jpeg',
    'svg',
    'svg+xml',
    'webp',
    'jfif',
];
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const ImageUpload = ({
    previewOpen,
    setPreviewOpen,
    previewImage,
    setPreviewImage,
    previewTitle,
    setPreviewTitle,
    fileList,
    setFileList,
    multiple,
    isUserImage,
    label,
    defaultFileList,
    showRemoveIcon = true,
    showUploadButton = true,
    isMultipleForm,
    isDetailPage,
    length = 1,
}) => {
    const dispatch = useDispatch();
    const handleCancel = () => setPreviewOpen(false);
    const onRemoveFile = async (file) => {
        const url = file?.url;
        // if (url) {
        //     await dispatch(removeFileReducer({ url }));
        //     const newFileList = fileList.filter((item) => item?.uid !== file?.uid);
        //     setFileList(newFileList);
        // }
    };
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file?.name || file?.url?.substring?.(file?.url?.lastIndexOf?.('/') + 1)
        );
    };
    const uploadButton = (
        <div style={{ pointerEvents: showUploadButton ? '' : 'none' }}>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    const beforeUpload = (file) => {
        let fileType = file?.type?.split?.('/');
        fileType = fileType?.[fileType?.length - 1];
        if (!acceptedImages?.includes?.(fileType)) {
            message.error(
                `File format is not accepted please upload (pdf, png, jpg, jpeg, svg, webp, jfif) only`
            );
            return false;
        }
        const isLt1M = file.size / 1024 / 1024 < 3;
        if (!isLt1M) {
            message.error('Image must be less than 3MB! Upload image less than 3Mb');
        }
        return isLt1M;
    };
    const handleChange = ({ file, fileList: newFileList }) => {
        if (file?.response?.data?.length) {
            const updatedFIleList = [...fileList];
            const fileObj = {
                url: file?.response?.data?.[0]?.location,
                name: file?.response?.data?.[0]?.originalName,
                type: file?.response?.data?.[0]?.contentType,
            };
            updatedFIleList[fileList?.length - 1] = fileObj;
            setFileList(updatedFIleList);
        } else {
            setFileList(newFileList);
        }
    };
    // useEffect(() => {
    //     if (!isMultipleForm) {
    //         let defaultFiles = [];
    //         if (defaultFileList?.length) {
    //             defaultFiles = defaultFileList?.map((file) => {
    //                 if (file?.url) {
    //                     if (!file?.type) {
    //                         const type = getExtensionFromUrl(file?.url);
    //                         return { ...file, type };
    //                     }
    //                     return file;
    //                 } else {
    //                     return {
    //                         url: file,
    //                         name: getFileNameFromUrl(file),
    //                         type: getExtensionFromUrl(file),
    //                     };
    //                 }
    //             });
    //             setFileList(defaultFiles);
    //         } else {
    //             setFileList([]);
    //         }
    //     }
    // }, [defaultFileList]);
    // const { token } = getAdminInfo();
    return (
        <>
            <div className='image-upload-container'>
                {label && <div>{label}</div>}
                <div>
                    {showUploadButton &&
                        <Upload
                            style={{height:'10rem'}}
                            listType='picture-card'
                            fileList={fileList}
                            accept="image/png, image/jpg, image/jpeg, image/webp, image/svg, image/svg+xml"
                            action={process.env.baseURL + "/files/upload-file"}
                            // headers={{
                            //     'access-control-allow-origin': '*',
                            //     authorization: `Bearer ${token}`,
                            // }}
                            onChange={handleChange}
                            showUploadList={{
                                showRemoveIcon: showRemoveIcon ? showUploadButton : false,
                            }}
                            beforeUpload={beforeUpload}
                            multiple={multiple ? true : false}
                            onRemove={(e) => onRemoveFile(e)}
                            onPreview={handlePreview}
                        >
                            {fileList?.length >= length || !showUploadButton
                                ? null
                                : uploadButton}
                        </Upload>
                    }
                    {!fileList?.length &&
                        isDetailPage &&
                        !showUploadButton &&
                        !isUserImage ? (
                        <div >
                            <span>No Images found</span>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>

            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt="Not Found"
                    fetchpriority="high"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};

export default React.memo(ImageUpload);
