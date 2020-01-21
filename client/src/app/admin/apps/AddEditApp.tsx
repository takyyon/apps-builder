import { App } from "./Apps.types";
import React, { useState, useEffect } from 'react';
import DefaultAddImage from './../../../assets/images/add_image.png';
import { Formik } from 'formik';
import { formStyle, formDivStyle, formElementStyle, formLabelStyle, addIconStyle, chooseFileStyle, imageListDivStyle, imageListImageStyle, addImageStyle } from './Apps.styles';
import { TextField, Label } from "office-ui-fabric-react";
import { Form, Button } from 'tabler-react';
import ActionBar from "../../../utility/components/panel/ActionBar";

interface AddEditAppProps {
    create: (values: App) => void;
    update: (values: App) => void;
    cancel: () => void;
    app: App | undefined;
}

const AddEditApp: React.FC<AddEditAppProps> = props => {

    const { cancel, app } = props;
    const [iconString, setIconString] = useState('');
    const [images, setImages] = useState<string[]>([]);

    let iconRef: HTMLInputElement | null;

    const onIconClick = () => {
        if(!!iconRef) {
            iconRef.click();
        }
    };

    const update = (values: App) => {
        const icon = !!iconString? iconString: (!!app ? app.icon: '');
        if(!!app) {
            props.update({_id: values._id, name: values.name, description: values.description, icon: icon, images: images});
        }else {
            props.create({name: values.name, description: values.description, icon: icon, images: images});
        }
    };

    const addImage = () => {
        setImages([...images, '']);
    };

    const toBase64 = (e, index?: number) => {
        if(!e){
            return;
        }
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if(index !== undefined) {
                const tempImages = images;
                tempImages[index] = reader.result as string;
                setImages([...images]);
            }else {
                setIconString(reader.result as string);
            }
        };
    }

    const getInitialValues = (): App => {
        if(app) {
            return  {...app};
        }
        return {
            name: '',
            description: '',
            icon: DefaultAddImage,
            images: [],
        };
    };

    useEffect(() => {
        if(app){
            setImages(app.images);
        }
    }, [])
    return (
        <div className='row'>
            <Formik
                initialValues={getInitialValues()}
                onSubmit={update}
            >
                {(formikProps) => {
                    const actionBarPrimaryButtonProps = {
                        id: 'run',
                        title: !!app ? 'Update': 'Create',
                        onClick: formikProps.submitForm,
                        disable: false,
                    };
              
                    const actionBarSecondaryButtonProps = {
                        id: 'cancel',
                        title: 'Cancel',
                        onClick: cancel,
                        disable: false,
                    };
                    
                    return (
                        <form className={formStyle}>
                            <div>
                                <TextField
                                    required
                                    className={formElementStyle}
                                    label="Name"
                                    name="name"
                                    value={formikProps.values.name}
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                />
                            </div>
                            <div className={formDivStyle}>
                                <Label className={formLabelStyle}>Description*</Label>
                                <Form.Textarea
                                    required
                                    className={formElementStyle}
                                    name="description"
                                    value={formikProps.values.description}
                                    rows={10}
                                    rowsMin={10}
                                    rowsMax={15}
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                />
                            </div>
                            <div className={formDivStyle} >
                                <Label className={formLabelStyle}>Icon*</Label>
                                <img src={!!iconString ? iconString: formikProps.values.icon} className={addIconStyle} onClick={onIconClick}/>
                                <input 
                                    type="file" 
                                    className={chooseFileStyle} 
                                    name='icon'
                                    accept="image/*" 
                                    ref={ref => iconRef = ref} 
                                    onChange={(e) =>{
                                        toBase64(e);
                                        formikProps.handleChange(e);
                                    }}
                                    onBlur={formikProps.handleBlur}
                                />
                            </div>
                            <div className={formDivStyle} >
                                <Label className={formLabelStyle}><Button pill type='button' color="primary" onClick={addImage}>Add Photo</Button></Label>
                                <div className={`row ${imageListDivStyle}`}>
                                    {images && (
                                        images.map((image, imageIndex) => {
                                            return (
                                                <span className={imageListImageStyle} key={`image-${imageIndex}`}>
                                                    <img src={!!image? image: DefaultAddImage} className={addImageStyle} onClick={onIconClick}/>
                                                    <input 
                                                        type="file"
                                                        className={chooseFileStyle}
                                                        accept="image/*"
                                                        ref={ref => iconRef = ref}
                                                        onChange={(e) => {
                                                            toBase64(e, imageIndex);
                                                        }} />
                                                </span>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                            <ActionBar
                                id="app-settings-edit-footer"
                                primaryButton={actionBarPrimaryButtonProps}
                                secondaryButton={actionBarSecondaryButtonProps}
                            />
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default AddEditApp;