import { Feature } from "./Features.types";
import React, { useState, useEffect } from 'react';
import DefaultAddImage from './../../../assets/images/add_image.png';
import { Formik } from 'formik';
import { formStyle, formDivStyle, formElementStyle, formLabelStyle, addIconStyle, chooseFileStyle, imageListDivStyle, imageListImageStyle, addImageStyle } from './Features.styles';
import { TextField, Label, Dropdown, IDropdownOption } from "office-ui-fabric-react";
import { Form, Button } from 'tabler-react';
import ActionBar from "../../../utility/components/panel/ActionBar";
import { App } from "../apps/Apps.types";

interface AddEditFeatureProps {
    create: (values: Feature) => void;
    update: (values: Feature) => void;
    cancel: () => void;
    feature: Feature | undefined;
    apps: App[];
}

const AddEditFeature: React.FC<AddEditFeatureProps> = props => {

    const { cancel, feature, apps } = props;
    const [iconString, setIconString] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [selectedApp, setSelectedApp] = useState<App| undefined>(undefined);

    let iconRef: HTMLInputElement | null;

    const onIconClick = () => {
        if(!!iconRef) {
            iconRef.click();
        }
    };

    const update = (values: Feature) => {
        const icon = !!iconString? iconString: (!!feature ? feature.icon: '');
        if(!!feature) {
            props.update({_id: values._id, name: values.name, description: values.description, time: values.time, cost: values.cost, icon: icon, images: images, app: selectedApp});
        }else {
            props.create({name: values.name, description: values.description, time: values.time, cost: values.cost, icon: icon, images: images, app: selectedApp});
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

    const getInitialValues = (): Feature => {
        if(feature) {
            return  {...feature};
        }
        return {
            name: '',
            description: '',
            time: 0,
            cost: 0,
            icon: DefaultAddImage,
            app: undefined,
            images: [],
        };
    };

    const getDropdownOptions = (): IDropdownOption[] => {
        const options: IDropdownOption[] = [];
        apps.forEach((app, index) => {
            options.push({
                key: !!app._id? app._id: `app-${index}`,
                text: app.name,
                data: app,
            })
        })
        return options;
    };

    const onDropdownChange = (event, option: IDropdownOption | undefined) => {
        if(option){
            setSelectedApp(option.data as App);
        }
    }

    useEffect(() => {
        if(feature){
            setImages(feature.images);
            setSelectedApp(feature.app);
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
                        title: !!feature ? 'Update': 'Create',
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
                            <div className={formDivStyle}>
                                <TextField
                                    required
                                    className={formElementStyle}
                                    label="Time"
                                    name="time"
                                    value={`${formikProps.values.time}`}
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                />
                            </div>
                            <div className={formDivStyle}>
                                <TextField
                                    required
                                    className={formElementStyle}
                                    label="Cost"
                                    name="cost"
                                    value={`${formikProps.values.cost}`}
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                />
                            </div>
                            <div className={formDivStyle}>
                                <Label className={formLabelStyle}>App*</Label>
                                <Dropdown
                                    required
                                    placeHolder='Select app for the feature'
                                    className={formElementStyle}
                                    defaultSelectedKey={!!selectedApp && !!selectedApp._id? selectedApp._id: ''}
                                    options={getDropdownOptions()}
                                    onChange={onDropdownChange}
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

export default AddEditFeature;