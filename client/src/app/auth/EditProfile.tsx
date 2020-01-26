import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { formStyle, formElementStyle, formDivStyle, formLabelStyle, addIconStyle, chooseFileStyle } from './Auth.styles';
import ActionBar from '../../utility/components/panel/ActionBar';
import DefaultAddImage from './../../assets/images/add_image.png';
import { TextField, Label } from 'office-ui-fabric-react';

interface EditProfileProps {
    cancel: () => void;
    update: (user) => void;
}

const EditProfile: React.FC<EditProfileProps> = props => {
    const { cancel, update } = props;
    const [profileImage, setProfileImage] = useState(DefaultAddImage);
    
    let iconRef: HTMLInputElement | null;

    const onIconClick = () => {
        if(!!iconRef) {
            iconRef.click();
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
            setProfileImage(reader.result as string);
        };
    }

    const submit = (values) => {
        update({name: values.name, icon: profileImage});
    };

    const getInitialValues = () => {
        const userFromStorage = localStorage.getItem('user');
        if(!!userFromStorage) {
          try{
            const jsonUser = JSON.parse(userFromStorage);
            if(!!jsonUser.icon) {
                setProfileImage(jsonUser.icon as string);
            }
            return {...jsonUser};
          }catch (err) {
    
          }
        }
        return {name: '', email: '', icon: ''};
    }

    return (
        <div className='row'>
            <Formik
                    initialValues={getInitialValues()}
                    onSubmit={submit}
                >
                    {(formikProps) => {
                        const actionBarPrimaryButtonProps = {
                            id: 'run',
                            title: 'Update',
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
                                    <TextField
                                        required
                                        className={formElementStyle}
                                        label="Email"
                                        name="email"
                                        disabled={true}
                                        value={formikProps.values.email}
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                    />
                                </div>
                                <div className={formDivStyle} >
                                <Label className={formLabelStyle}>Pofile Image*</Label>
                                <img src={!!profileImage? profileImage: formikProps.values.icon} className={addIconStyle} onClick={onIconClick}/>
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
                                    id="edit-profile-footer"
                                    primaryButton={actionBarPrimaryButtonProps}
                                    secondaryButton={actionBarSecondaryButtonProps}
                                />
                            </form>
                        );
                    }}
            </Formik>
        </div>
    );
};

export default EditProfile;