import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import React, { useState } from 'react';
import { UPLOAD_AIRLINE_IMAGE } from '../../api/endpoints';
import { localStorageKey } from '../../keys';
import './imageUpload.scss';
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
    fileList,
    setFileList,
    multiple,
    isUserImage,
    label,
    defaultFileList,
    showRemoveIcon = true,
    showUploadButton = true,
    isCircle = false,
    required,
    isMultipleForm,
    isDetailPage,
    length = 1,
}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const token = localStorage.getItem(localStorageKey.AUTH_TOKEN);
    const handleCancel = () => setPreviewOpen(false);
    const onRemoveFile = async (file) => {
        const newFileList = fileList.filter((item) => item?.uid !== file?.uid);
        setFileList(newFileList);
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
        if (file?.response) {
            const updatedFileList = [...fileList];
            const fileObj = {
                url: file?.response?.data?.upload,
                name: file?.name,
            };
            updatedFileList[fileList?.length - 1] = fileObj;
            setFileList(updatedFileList);
        }
        else {
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
                {label && <div className='image-title'>{required && <span className='image-required'>*</span>}{label}</div>}
                <div>
                    {showUploadButton &&
                        <Upload
                            style={{ height: '10rem' }}
                            listType={isCircle ? 'picture-circle' : 'picture-card'}
                            fileList={fileList}
                            accept="image/png, image/jpg, image/jpeg, image/webp, image/svg, image/svg+xml"
                            action={process.env.baseURL + UPLOAD_AIRLINE_IMAGE}
                            headers={{
                                'access-control-allow-origin': '*',
                                Authorization: `Bearer ${token}`,
                            }}
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
