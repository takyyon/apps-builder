import { Platform } from "./Platforms.types";
import React, { useState, useEffect } from 'react';
import DefaultAddImage from './../../../assets/images/add_image.png';
import { Formik } from 'formik';
import { formStyle, formDivStyle, formElementStyle, formLabelStyle, addIconStyle, chooseFileStyle } from './Platforms.styles';
import { TextField, Label } from "office-ui-fabric-react";
import { Form } from 'tabler-react';
import ActionBar from "../../../utility/components/panel/ActionBar";

interface AddEditPlatformProps {
    create: (values: Platform) => void;
    update: (values: Platform) => void;
    cancel: () => void;
    platform: Platform | undefined;
}

const AddEditPlatform: React.FC<AddEditPlatformProps> = props => {

    const { cancel, platform } = props;
    const [iconString, setIconString] = useState('');

    let iconRef: HTMLInputElement | null;

    const onIconClick = () => {
        if(!!iconRef) {
            iconRef.click();
        }
    };

    const update = (values: Platform) => {
        const icon = !!iconString? iconString: (!!platform ? platform.icon: '');
        if(!!platform) {
            props.update({_id: values._id, name: values.name, description: values.description, icon: icon});
        }else {
            props.create({name: values.name, description: values.description, icon: icon});
        }
    };

    const toBase64 = (e) => {
        if(!e){
            return;
        }
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setIconString(reader.result as string);
        };
    }

    const getInitialValues = (): Platform => {
        if(platform) {
            return  {...platform};
        }
        return {
            name: '',
            description: '',
            icon: DefaultAddImage
        };
    }

    return (
        <div className='row'>
            <Formik
                initialValues={getInitialValues()}
                onSubmit={update}
            >
                {(formikProps) => {
                    const actionBarPrimaryButtonProps = {
                        id: 'run',
                        title: !!platform ? 'Update': 'Create',
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

export default AddEditPlatform;