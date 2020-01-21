import { App } from "./Apps.types";
import React, { useState, useEffect } from 'react';
import { formStyle, formDivStyle, formElementStyle, formLabelStyle, addIconStyle, chooseFileStyle, imageListDivStyle, imageListImageStyle, addImageStyle, assignPanelIconStyle } from './Apps.styles';
import { TextField, Label } from "office-ui-fabric-react";
import { Form, Text, Grid, ProgressCard, Avatar } from 'tabler-react';
import ActionBar from "../../../utility/components/panel/ActionBar";
import { Tag } from "../tags/Tags.types";
import { Category } from "../categories/Categories.types";
import { Platform } from "../platforms/Platforms.types";
import { Problem } from "../problems/Problems.types";
import { upperFirst } from 'lodash-es';

interface AssignAppProps {
    assign: (appId: string, newTags: string[], newCategories: string[], newPlatforms: string[], newProblems: string[]) => void;
    cancel: () => void;
    app: App;
    categories: Category[];
    tags: Tag[];
    platforms: Platform[];
    problems: Problem[];
}

const AssignApp: React.FC<AssignAppProps> = props => {

    const { cancel, app, categories, tags, platforms, problems } = props;
    const [selectedTags, setSelectedTags] = useState<(string|undefined)[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<(string|undefined)[]>([]);
    const [selectedProblems, setSelectedProblems] = useState<(string|undefined)[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<(string|undefined)[]>([]);
    const [selectedComponent, setSelectedComponent] = useState<'' | 'category' | 'tag' | 'platform' | 'problem'>('category');

    const run = () => {
        if(app._id){
            let tagItems: string[] = [];
            selectedTags.forEach((item) => {
                if(!!item){
                    tagItems.push(item);
                }
            });
            let categoryItems: string[] = [];
            selectedCategories.forEach((item) => {
                if(!!item){
                    categoryItems.push(item);
                }
            });
            let platformItems: string[] = [];
            selectedPlatforms.forEach((item) => {
                if(!!item){
                    platformItems.push(item);
                }
            });
            let problemItems: string[] = [];
            selectedProblems.forEach((item) => {
                if(!!item){
                    problemItems.push(item);
                }
            });
            props.assign(app._id, tagItems, categoryItems, platformItems, problemItems);
        }
    };

    const onComponentChange = (e) => {
        setSelectedComponent(e.target.value);
    }

    const actionBarPrimaryButtonProps = {
        id: 'run',
        title: 'Assign',
        onClick: run,
        disable: false,
    };

    const actionBarSecondaryButtonProps = {
        id: 'cancel',
        title: 'Cancel',
        onClick: cancel,
        disable: false,
    };

    const onCategoryClick = (id: string | undefined) => {
        if(!!id){
            const temp = selectedCategories;
            if(temp.indexOf(id) >= 0){
                delete temp[temp.indexOf(id)];
            }else {
                temp.push(id);
            }
            setSelectedCategories([...temp]);
        }
    };

    const onProblemClick = (id: string | undefined) => {
        if(!!id){
            const temp = selectedProblems;
            if(temp.indexOf(id) >= 0){
                delete temp[temp.indexOf(id)];
            }else {
                temp.push(id);
            }
            setSelectedProblems([...temp]);
        }
    };

    const onPlatformClick = (id: string | undefined) => {
        if(!!id){
            const temp = selectedPlatforms;
            if(temp.indexOf(id) >= 0){
                delete temp[temp.indexOf(id)];
            }else {
                temp.push(id);
            }
            setSelectedPlatforms([...temp]);
        }
    };

    const onTagClick = (id: string | undefined) => {
        if(!!id){
            const temp = selectedTags;
            if(temp.indexOf(id) >= 0){
                delete temp[temp.indexOf(id)];
            }else {
                temp.push(id);
            }
            setSelectedTags([...temp]);
        }
    };

    const onCheckboxChange = (e: any) => {

    };
    
    useEffect(() => {        
        setSelectedTags(!!app.tags? app.tags.map((item) => item._id): []);
        setSelectedCategories(!!app.categories? app.categories.map((item) => item._id): []);
        setSelectedProblems(!!app.problems? app.problems.map((item) => item._id): []);
        setSelectedPlatforms(!!app.platforms? app.platforms.map((item) => item._id): []);
    }, []);
    return (
        <div className='row'>
            <form className={formStyle}>
                <div className={formDivStyle}>
                    <Label className={formLabelStyle}>Assign <u>{upperFirst(selectedComponent)}</u> to <u>{app.name}</u></Label>     
                </div>
                <div className={formDivStyle}>
                <Form.Group isRequired>
                    <Form.SelectGroup onChange={onComponentChange}>
                        <Form.SelectGroupItem
                            label='Category'
                            name='app-component'
                            value='category'
                        />
                        <Form.SelectGroupItem
                            label='Tag'
                            name='app-component'
                            value='tag'
                        />
                        <Form.SelectGroupItem
                            label='Problem'
                            name='app-component'
                            value='problem'
                        />
                        <Form.SelectGroupItem
                            label='Platform'
                            name='app-component'
                            value='platform'
                        />
                    </Form.SelectGroup>
                </Form.Group>
                </div>
                <div className={formDivStyle}>
                    <Grid.Row cards={true}>
                            {
                                selectedComponent === 'category' && (
                                    categories.map((item, index) =>{
                                        return (
                                            <Grid.Col sm={6} md={4} lg={4} key={`category-${index}`}>       
                                                <ProgressCard
                                                    header={
                                                        <Form.Group>
                                                            <Text.Small>
                                                                <Form.Checkbox
                                                                    label={item.name}
                                                                    name={`category-${index}`}
                                                                    value={`category-${index}`}
                                                                    checked={selectedCategories.indexOf(item._id) >= 0}
                                                                    onChange={(e) => onCategoryClick(item._id)}
                                                                />
                                                            </Text.Small>
                                                        </Form.Group>
                                                    }
                                                    content={
                                                        <Avatar
                                                            className={`d-block ${assignPanelIconStyle}`}
                                                            size="md"
                                                            imageURL={item.icon}
                                                        />
                                                    }
                                                    />
                                                
                                            </Grid.Col>
                                        )
                                    })
                                )
                            }
                            {
                                selectedComponent === 'tag' && (
                                    tags.map((item, index) =>{
                                        return (
                                            <Grid.Col sm={6} md={4} lg={4} key={`tag-${index}`}>       
                                                <ProgressCard
                                                    header={
                                                        <Form.Group>
                                                            <Text.Small>
                                                                <Form.Checkbox
                                                                    label={item.name}
                                                                    name={`tag-${index}`}
                                                                    value={`tag-${index}`}
                                                                    checked={selectedTags.indexOf(item._id) >= 0}
                                                                    onChange={(e) => onTagClick(item._id)}
                                                                />
                                                            </Text.Small>
                                                        </Form.Group>
                                                    }
                                                    content={
                                                        <Avatar
                                                            className={`d-block ${assignPanelIconStyle}`}
                                                            size="md"
                                                            imageURL={item.icon}
                                                        />
                                                    }
                                                    />
                                                
                                            </Grid.Col>
                                        )
                                    })
                                )
                            }
                            {
                                selectedComponent === 'problem' && (
                                    problems.map((item, index) =>{
                                        return (
                                            <Grid.Col sm={6} md={4} lg={4} key={`problem-${index}`}>       
                                                <ProgressCard
                                                    header={
                                                        <Form.Group>
                                                            <Text.Small>
                                                                <Form.Checkbox
                                                                    label={item.name}
                                                                    name={`problem-${index}`}
                                                                    value={`problem-${index}`}
                                                                    checked={selectedProblems.indexOf(item._id) >= 0}
                                                                    onChange={(e) => onProblemClick(item._id)}
                                                                />
                                                            </Text.Small>
                                                        </Form.Group>
                                                    }
                                                    content={
                                                        <Avatar
                                                            className={`d-block ${assignPanelIconStyle}`}
                                                            size="md"
                                                            imageURL={item.icon}
                                                        />
                                                    }
                                                    />
                                                
                                            </Grid.Col>
                                        )
                                    })
                                )
                            }
                            {
                                selectedComponent === 'platform' && (
                                    platforms.map((item, index) =>{
                                        return (
                                            <Grid.Col sm={6} md={4} lg={4} key={`platform-${index}`}>       
                                                <ProgressCard
                                                    header={
                                                        <Form.Group>
                                                            <Text.Small>
                                                                <Form.Checkbox
                                                                    label={item.name}
                                                                    name={`platform-${index}`}
                                                                    value={`platform-${index}`}
                                                                    checked={selectedPlatforms.indexOf(item._id) >= 0}
                                                                    onChange={(e) => onPlatformClick(item._id)}
                                                                />
                                                            </Text.Small>
                                                        </Form.Group>
                                                    }
                                                    content={
                                                        <Avatar
                                                            className={`d-block ${assignPanelIconStyle}`}
                                                            size="md"
                                                            imageURL={item.icon}
                                                        />
                                                    }
                                                    />
                                                
                                            </Grid.Col>
                                        )
                                    })
                                )
                            }
                    </Grid.Row>
                </div>
                
                <ActionBar
                    id="app-settings-edit-footer"
                    primaryButton={actionBarPrimaryButtonProps}
                    secondaryButton={actionBarSecondaryButtonProps}
                />
            </form>
        </div>
    );
}

export default AssignApp;